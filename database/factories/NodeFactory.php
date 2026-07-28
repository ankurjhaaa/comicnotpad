<?php

namespace Database\Factories;

use App\Models\Node;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Node>
 */
class NodeFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_id' => \App\Models\Project::factory(),
            'name' => fake()->words(2, true),
            'type' => 'page',
            'content' => fake()->paragraphs(3, true),
            'sort_order' => 0,
        ];
    }

    public function folder(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'folder',
            'content' => null,
        ]);
    }

    public function childOf(Node $parent): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => $parent->id,
        ]);
    }
}
