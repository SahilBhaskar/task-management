<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index()
    {
        return Task::where('user_id', auth()->id())->get();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'status' => 'required|string',
            'priority' => 'required|integer|min:1|max:10000', 
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors()->first(), 422);
        }

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description, 
            'due_date' => $request->due_date,
            'status' => $request->status,
            'priority' => $request->priority,
            'user_id' => auth()->id(),
        ]);
        
        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
         $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'status' => 'required|string',
            'priority' => 'required|integer|min:1|max:10000', 
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors()->first(), 422);
        }

        $task->update($request->all());

        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}
