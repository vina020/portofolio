<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $message = Message::create($data);

        return response()->json([
            'message' => 'Pesan kamu sudah terkirim, terima kasih!',
            'data' => $message,
        ], 201);
    }

    public function index()
    {
        return response()->json(
            Message::orderByDesc('created_at')->get()
        );
    }

    public function markRead(Message $message)
    {
        $message->update(['is_read' => true]);

        return response()->json($message);
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
