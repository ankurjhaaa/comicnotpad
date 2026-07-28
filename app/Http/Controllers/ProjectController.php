<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Node;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request, User $user)
    {
        if ($request->user()->id !== $user->id) {
            abort(403);
        }

        $projects = $request->user()->projects()->with('user')->orderBy('updated_at', 'desc')->get();

        return Inertia::render('dashboard/Index', [
            'projects' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $slug = Str::slug($validated['name']);

        // Ensure unique slug for this user
        $count = 1;
        $originalSlug = $slug;
        while ($request->user()->projects()->where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        $project = $request->user()->projects()->create([
            'name' => $validated['name'],
            'slug' => $slug,
        ]);

        return redirect()->route('projects.show', [
            'user' => $request->user()->username,
            'project' => $project->slug,
        ]);
    }

    public function show(Request $request, User $user, Project $project)
    {
        // Check if project belongs to this user
        if ($project->user_id !== $user->id) {
            abort(404);
        }

        // Optional: Ensure the current authenticated user has access
        // For now, only the owner can view
        if ($request->user()->id !== $project->user_id) {
            abort(403);
        }

        $activeNodeId = $request->query('node');
        $activeNode = null;

        if ($activeNodeId) {
            $activeNode = $project->nodes()->find($activeNodeId);
            $activeNode?->append('ancestors');
        }

        $expandedCookie = $request->cookie('writeros-expanded');
        $expandedFolders = $expandedCookie ? json_decode($expandedCookie, true) : null;

        return Inertia::render('project/Workspace', [
            'project' => $project,
            'tree' => $project->nodes()
                ->root()
                ->notTrashed()
                ->with('childrenRecursive')
                ->orderBy('sort_order')
                ->get(),
            'activeNode' => $activeNode,
            'initialExpandedFolders' => $expandedFolders,
            'projectUrl' => url("/{$user->username}/{$project->slug}"),
        ]);
    }
}
