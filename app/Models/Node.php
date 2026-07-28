<?php

namespace App\Models;

use Database\Factories\NodeFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int|null $parent_id
 * @property string $name
 * @property string $type
 * @property string|null $icon
 * @property string|null $content
 * @property array<string, mixed>|null $meta
 * @property int $sort_order
 * @property bool $is_trashed
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['parent_id', 'name', 'type', 'icon', 'content', 'meta', 'sort_order', 'is_trashed'])]
class Node extends Model
{
    /** @use HasFactory<NodeFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'meta' => 'array',
            'is_trashed' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<Node, $this>
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Node::class, 'parent_id');
    }

    /**
     * @return HasMany<Node, $this>
     */
    public function children(): HasMany
    {
        return $this->hasMany(Node::class, 'parent_id')->orderBy('sort_order');
    }

    /**
     * Recursively load children for tree building.
     *
     * @return HasMany<Node, $this>
     */
    public function childrenRecursive(): HasMany
    {
        return $this->children()->with('childrenRecursive');
    }

    /**
     * @param  Builder<Node>  $query
     * @return Builder<Node>
     */
    public function scopeRoot(Builder $query): Builder
    {
        return $query->whereNull('parent_id');
    }

    /**
     * @param  Builder<Node>  $query
     * @return Builder<Node>
     */
    public function scopeFolders(Builder $query): Builder
    {
        return $query->where('type', 'folder');
    }

    /**
     * @param  Builder<Node>  $query
     * @return Builder<Node>
     */
    public function scopePages(Builder $query): Builder
    {
        return $query->where('type', 'page');
    }

    /**
     * @param  Builder<Node>  $query
     * @return Builder<Node>
     */
    public function scopeNotTrashed(Builder $query): Builder
    {
        return $query->where('is_trashed', false);
    }

    /**
     * Build the full path as an array of ancestors.
     *
     * @return array<int, array{id: int, name: string}>
     */
    public function getAncestorsAttribute(): array
    {
        $ancestors = [];
        $current = $this->parent;

        while ($current) {
            array_unshift($ancestors, [
                'id' => $current->id,
                'name' => $current->name,
            ]);
            $current = $current->parent;
        }

        return $ancestors;
    }
}
