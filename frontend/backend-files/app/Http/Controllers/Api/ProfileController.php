<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show()
    {
        $profile = Profile::first();

        return response()->json($profile);
    }

    public function update(Request $request)
    {
        $profile = Profile::first() ?? new Profile();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'tagline' => ['nullable', 'string', 'max:255'],
            'about' => ['nullable', 'string'],
            'vision' => ['nullable', 'string'],
            'mission' => ['nullable', 'string'],
            'email' => ['nullable', 'email'],
            'phone' => ['nullable', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:255'],
            'linkedin_url' => ['nullable', 'string', 'max:255'],
            'github_url' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'image', 'max:4096'],
            'cv' => ['nullable', 'mimes:pdf', 'max:10240'],
        ]);

        if ($request->hasFile('photo')) {
            if ($profile->photo_path) {
                Storage::disk('public')->delete($profile->photo_path);
            }
            $data['photo_path'] = $request->file('photo')->store('profile', 'public');
        }

        if ($request->hasFile('cv')) {
            if ($profile->cv_path) {
                Storage::disk('public')->delete($profile->cv_path);
            }
            $data['cv_path'] = $request->file('cv')->store('profile', 'public');
        }

        unset($data['photo'], $data['cv']);

        $profile->fill($data);
        $profile->save();

        return response()->json($profile->fresh());
    }
}
