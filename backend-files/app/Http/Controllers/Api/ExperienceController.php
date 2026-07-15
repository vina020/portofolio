<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        return response()->json(
            Experience::orderBy('order')->orderByDesc('id')->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'organization' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:organization,internship,volunteer'],
            'period' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'order' => ['nullable', 'integer'],
        ]);

        $experience = Experience::create($data);

        return response()->json($experience, 201);
    }

    public function update(Request $request, Experience $experience)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'organization' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:organization,internship,volunteer'],
            'period' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'order' => ['nullable', 'integer'],
        ]);

        $experience->update($data);

        return response()->json($experience);
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
