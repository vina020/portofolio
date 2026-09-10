<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;

class ProfileController extends Controller
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

    public function show()
    {
        return response()->json(Profile::first());
    }

    public function update(Request $request)
    {
        $profile = Profile::first() ?? new Profile();

        $data = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'tagline'      => ['nullable', 'string', 'max:255'],
            'about'        => ['nullable', 'string'],
            'vision'       => ['nullable', 'string'],
            'mission'      => ['nullable', 'string'],
            'email'        => ['nullable', 'email'],
            'phone'        => ['nullable', 'string', 'max:50'],
            'location'     => ['nullable', 'string', 'max:255'],
            'linkedin_url' => ['nullable', 'string', 'max:255'],
            'github_url'   => ['nullable', 'string', 'max:255'],
            'instagram_url'=> ['nullable', 'string', 'max:255'],
            'tiktok_url'   => ['nullable', 'string', 'max:255'],
            'photo'        => ['nullable', 'image', 'max:4096'],
            'cv'           => ['nullable', 'mimes:pdf', 'max:10240'],
        ]);

        if ($request->hasFile('photo')) {
            $result = $this->cloudinary()->uploadApi()->upload(
                $request->file('photo')->getRealPath(),
                ['folder' => 'portfolio/profile', 'resource_type' => 'image']
            );
            $data['photo_path'] = $result['secure_url'];
        }

        if ($request->hasFile('cv')) {
            $result = $this->cloudinary()->uploadApi()->upload(
                $request->file('cv')->getRealPath(),
                ['folder' => 'portfolio/profile', 'resource_type' => 'raw']
            );
            $data['cv_path'] = $result['secure_url'];
        }

        unset($data['photo'], $data['cv']);

        $profile->fill($data);
        $profile->save();

        return response()->json($profile->fresh());
    }
}