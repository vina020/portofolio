<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return response()->json(
            Skill::orderBy('category')->orderBy('order')->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
        ]);

        $skill = Skill::create($data);

        return response()->json($skill, 201);
    }

    public function update(Request $request, Skill $skill)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
        ]);

        $skill->update($data);

        return response()->json($skill);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
