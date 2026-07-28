<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNodeRequest;
use App\Http\Requests\UpdateNodeRequest;
use App\Models\Node;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NodeController extends Controller
{
    /**
     * Render the main IDE workspace.
     */
    public function index(Request $request): Response
    {
        $activeNodeId = $request->query('node');
        $activeNode = null;

        if ($activeNodeId) {
            $activeNode = Node::find($activeNodeId);
            $activeNode?->append('ancestors');
        }

        return Inertia::render('home', [
            'tree' => Inertia::defer(fn () => Node::query()
                ->root()
                ->notTrashed()
                ->with('childrenRecursive')
                ->orderBy('sort_order')
                ->get()),
            'activeNode' => $activeNode,
        ]);
    }

    /**
     * Load a single node's data (JSON for editor).
     */
    public function show(Node $node): JsonResponse
    {
        $node->append('ancestors');

        return response()->json($node);
    }

    /**
     * Create a new node (folder or page).
     * Returns Inertia redirect so the tree refreshes.
     */
    public function store(StoreNodeRequest $request): RedirectResponse
    {
        $maxSort = Node::query()
            ->where('parent_id', $request->validated('parent_id'))
            ->max('sort_order');

        $node = Node::create([
            ...$request->validated(),
            'sort_order' => ($maxSort ?? 0) + 1,
        ]);

        return redirect()->back()->with('newNodeId', $node->id);
    }

    /**
     * Update a node (rename, content save, metadata).
     * Returns JSON for autosave.
     */
    public function update(UpdateNodeRequest $request, Node $node): JsonResponse
    {
        $node->update($request->validated());

        return response()->json(['success' => true]);
    }

    /**
     * Soft-delete a node (move to trash).
     * Returns Inertia redirect so the tree refreshes.
     */
    public function destroy(Node $node): RedirectResponse
    {
        $node->update(['is_trashed' => true]);
        $this->trashDescendants($node);

        return redirect()->back();
    }

    /**
     * Move/reorder a node.
     */
    public function move(Request $request, Node $node): RedirectResponse
    {
        $validated = $request->validate([
            'parent_id' => ['nullable', 'integer', 'exists:nodes,id'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $node->update($validated);

        return redirect()->back();
    }

    /**
     * Global search across all nodes (JSON).
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->validate([
            'q' => ['required', 'string', 'min:1', 'max:255'],
        ])['q'];

        $results = Node::query()
            ->notTrashed()
            ->where(function ($builder) use ($query) {
                $builder->where('name', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%");
            })
            ->select(['id', 'parent_id', 'name', 'type', 'icon', 'updated_at'])
            ->limit(20)
            ->get()
            ->each->append('ancestors');

        return response()->json($results);
    }

    /**
     * Recursively trash all descendants of a node.
     */
    private function trashDescendants(Node $node): void
    {
        $children = $node->children()->get();

        foreach ($children as $child) {
            $child->update(['is_trashed' => true]);
            $this->trashDescendants($child);
        }
    }
}
