<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    private function cloudinary(): Cloudinary
    {
        return new Cloudinary([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key'    => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
            ],
        ]);
    }

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
            $result = $this->cloudinary()->uploadApi()->upload(
                $request->file('thumbnail')->getRealPath(),
                ['folder' => 'portfolio/projects', 'resource_type' => 'image']
            );
            $data['thumbnail_path'] = $result['secure_url'];
        }

        if ($request->hasFile('gallery')) {
            $data['gallery'] = collect($request->file('gallery'))
                ->map(function ($file) {
                    $result = $this->cloudinary()->uploadApi()->upload(
                        $file->getRealPath(),
                        ['folder' => 'portfolio/projects', 'resource_type' => 'image']
                    );
                    return $result['secure_url'];
                })
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
            $result = $this->cloudinary()->uploadApi()->upload(
                $request->file('thumbnail')->getRealPath(),
                ['folder' => 'portfolio/projects', 'resource_type' => 'image']
            );
            $data['thumbnail_path'] = $result['secure_url'];
        }

        if ($request->hasFile('gallery')) {
            $data['gallery'] = collect($request->file('gallery'))
                ->map(function ($file) {
                    $result = $this->cloudinary()->uploadApi()->upload(
                        $file->getRealPath(),
                        ['folder' => 'portfolio/projects', 'resource_type' => 'image']
                    );
                    return $result['secure_url'];
                })
                ->values()
                ->all();
        }

        $project->update($data);
        return response()->json($project->fresh());
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Deleted']);
    }

    private function validateData(Request $request): array
    {
        $data = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'category'    => ['required', 'string', 'max:255'],
            'summary'     => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'tools'       => ['nullable'],
            'key_results' => ['nullable'],
            'project_url' => ['nullable', 'string', 'max:255'],
            'featured'    => ['nullable'],
            'order'       => ['nullable', 'integer'],
            'thumbnail'   => ['nullable', 'image', 'max:4096'],
            'gallery'     => ['nullable', 'array'],
            'gallery.*'   => ['image', 'max:4096'],
        ]);

        foreach (['tools', 'key_results'] as $field) {
            if (isset($data[$field]) && is_string($data[$field])) {
                $decoded = json_decode($data[$field], true);
                $data[$field] = is_array($decoded)
                    ? $decoded
                    : array_filter(array_map('trim', explode("\n", $data[$field])));
            }
        }

        $data['featured'] = filter_var($request->input('featured'), FILTER_VALIDATE_BOOLEAN);

        unset($data['gallery']);

        return $data;
    }

    private function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $i = 1;

        while (
            Project::where('slug', $slug)
                ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $base . '-' . (++$i);
        }

        return $slug;
    }
}