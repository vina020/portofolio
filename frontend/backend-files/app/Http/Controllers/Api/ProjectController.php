<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::orderBy('order')->orderByDesc('id');

        if ($request->filled('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        return response()->json($query->get());
    }

    public function show(string $slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();

        return response()->json($project);
    }

    public function store(Request $request)
    {
        $data = $this->validateData($request);
        $data['slug'] = $this->uniqueSlug($data['title']);

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail_path'] = $request->file('thumbnail')->store('projects', 'public');
        }

        if ($request->hasFile('gallery')) {
            $data['gallery'] = collect($request->file('gallery'))
                ->map(fn ($file) => $file->store('projects', 'public'))
                ->values()
                ->all();
        }

        $project = Project::create($data);

        return response()->json($project, 201);
    }

    public function update(Request $request, Project $project)
    {
        $data = $this->validateData($request);

        if ($data['title'] !== $project->title) {
            $data['slug'] = $this->uniqueSlug($data['title'], $project->id);
        }

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail_path) {
                Storage::disk('public')->delete($project->thumbnail_path);
            }
            $data['thumbnail_path'] = $request->file('thumbnail')->store('projects', 'public');
        }

        if ($request->hasFile('gallery')) {
            foreach ($project->gallery ?? [] as $oldImage) {
                Storage::disk('public')->delete($oldImage);
            }
            $data['gallery'] = collect($request->file('gallery'))
                ->map(fn ($file) => $file->store('projects', 'public'))
                ->values()
                ->all();
        }

        $project->update($data);

        return response()->json($project->fresh());
    }

    public function destroy(Project $project)
    {
        if ($project->thumbnail_path) {
            Storage::disk('public')->delete($project->thumbnail_path);
        }
        foreach ($project->gallery ?? [] as $image) {
            Storage::disk('public')->delete($image);
        }
        $project->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validateData(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'summary' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'tools' => ['nullable'],
            'key_results' => ['nullable'],
            'project_url' => ['nullable', 'string', 'max:255'],
            'featured' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
            'thumbnail' => ['nullable', 'image', 'max:4096'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['image', 'max:4096'],
        ]);

        // tools / key_results may arrive as JSON strings (multipart form data)
        foreach (['tools', 'key_results'] as $field) {
            if (isset($data[$field]) && is_string($data[$field])) {
                $decoded = json_decode($data[$field], true);
                $data[$field] = is_array($decoded) ? $decoded : array_filter(array_map('trim', explode("\n", $data[$field])));
            }
        }

        $data['featured'] = $request->boolean('featured');

        unset($data['gallery']); // handled separately as files

        return $data;
    }

    private function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $i = 1;

        while (
            Project::where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $base . '-' . (++$i);
        }

        return $slug;
    }
}
