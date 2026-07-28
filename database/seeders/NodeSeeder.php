<?php

namespace Database\Seeders;

use App\Models\Node;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NodeSeeder extends Seeder
{
    public function run(User $user): void
    {
        $project = Project::create([
            'user_id' => $user->id,
            'name' => 'My First Universe',
            'slug' => 'my-first-universe',
        ]);

        $projectId = $project->id;

        // Create a starter workspace structure
        $world = Node::create(['project_id' => $projectId, 'name' => 'World', 'type' => 'folder', 'sort_order' => 1]);
        $characters = Node::create(['project_id' => $projectId, 'name' => 'Characters', 'type' => 'folder', 'sort_order' => 2]);
        $stories = Node::create(['project_id' => $projectId, 'name' => 'Stories', 'type' => 'folder', 'sort_order' => 3]);
        $ideas = Node::create(['project_id' => $projectId, 'name' => 'Ideas', 'type' => 'folder', 'sort_order' => 4]);
        $research = Node::create(['project_id' => $projectId, 'name' => 'Research', 'type' => 'folder', 'sort_order' => 5]);

        // Nested world-building folders
        $kingdoms = Node::create(['project_id' => $projectId, 'name' => 'Kingdoms', 'type' => 'folder', 'parent_id' => $world->id, 'sort_order' => 1]);
        Node::create(['project_id' => $projectId, 'name' => 'Timeline', 'type' => 'page', 'parent_id' => $world->id, 'sort_order' => 2, 'content' => '<h1>Timeline</h1><p>The history of this world begins...</p>']);
        Node::create(['project_id' => $projectId, 'name' => 'Rules', 'type' => 'page', 'parent_id' => $world->id, 'sort_order' => 3, 'content' => '<h1>World Rules</h1><p>Magic system, physics, constraints...</p>']);

        // A kingdom page
        Node::create(['project_id' => $projectId, 'name' => 'Arvalis', 'type' => 'page', 'parent_id' => $kingdoms->id, 'sort_order' => 1, 'content' => '<h1>Arvalis</h1><p>A kingdom of scholars and stargazers, nestled between the Whispering Peaks and the Silvershore Sea.</p>']);

        // Characters
        Node::create(['project_id' => $projectId, 'name' => 'Kael Stormborn', 'type' => 'page', 'parent_id' => $characters->id, 'sort_order' => 1, 'content' => '<h1>Kael Stormborn</h1><p>A wandering cartographer haunted by maps that draw themselves.</p>']);

        // Stories
        Node::create(['project_id' => $projectId, 'name' => 'Chapter 1 — The Map That Bleeds', 'type' => 'page', 'parent_id' => $stories->id, 'sort_order' => 1, 'content' => '<h1>Chapter 1 — The Map That Bleeds</h1><p>The ink was still wet when Kael found the parchment on his doorstep. But the ink was not ink — it was warm, and it pulsed.</p>']);

        // Ideas
        Node::create(['project_id' => $projectId, 'name' => 'What if maps could remember', 'type' => 'page', 'parent_id' => $ideas->id, 'sort_order' => 1, 'content' => '<p>What if maps could remember the people who walked the paths they charted? What if the longer you followed a path, the more the map knew about you?</p>']);
    }
}
