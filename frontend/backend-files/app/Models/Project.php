<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'slug', 'category', 'summary', 'description',
        'tools', 'key_results', 'thumbnail_path', 'gallery',
        'project_url', 'featured', 'order',
    ];

    protected $casts = [
        'tools' => 'array',
        'key_results' => 'array',
        'gallery' => 'array',
        'featured' => 'boolean',
    ];

    protected $appends = ['thumbnail_url', 'gallery_urls'];

    public function getThumbnailUrlAttribute(): ?string
    {
        return $this->thumbnail_path ? asset('storage/' . $this->thumbnail_path) : null;
    }

    public function getGalleryUrlsAttribute(): array
    {
        return collect($this->gallery ?? [])
            ->map(fn ($path) => asset('storage/' . $path))
            ->values()
            ->all();
    }
}
