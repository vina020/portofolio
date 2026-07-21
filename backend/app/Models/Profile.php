<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name', 'tagline', 'about', 'vision', 'mission',
        'email', 'phone', 'location', 'linkedin_url', 'github_url',
        'photo_path', 'cv_path',
        'instagram_url', 'tiktok_url',
    ];

    protected $appends = ['photo_url', 'cv_url'];

    public function getPhotoUrlAttribute(): ?string
    {
        return $this->photo_path ? asset('storage/' . $this->photo_path) : null;
    }

    public function getCvUrlAttribute(): ?string
    {
        return $this->cv_path ? asset('storage/' . $this->cv_path) : null;
    }
}
