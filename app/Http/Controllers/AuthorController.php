<?php

namespace App\Http\Controllers;

use App\Http\Actions\Author\CreateAction;
use App\Http\Actions\Author\DeleteAction;
use App\Http\Actions\Author\ListAction;
use App\Http\Actions\Author\ShowAction;
use App\Http\Actions\Author\UpdateAction;
use App\Http\Requests\Author\FilterRequest;
use App\Http\Requests\Author\StoreUpdateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /** Get Authors List with search & filters  **/
    public function index(FilterRequest $request, ListAction $action): JsonResponse
    {
        $list = $action->handle($request);

        return response()->json(['list' => $list['data']], $list['status']);
    }

    /** Get one Author by id **/
    public function show($id, ShowAction $action): JsonResponse
    {
        $show = $action->handle($id);

        return response()->json(['author' => $show['author'], 'message' => $show['message']], $show['status']);
    }

    /** Create Author **/
    public function store(StoreUpdateRequest $request, CreateAction $action): JsonResponse
    {
       $create = $action->handle($request);

       return response()->json(['message' => $create['message'], 'author' => $create['author']], $create['status']);
    }

    /** Update Author **/
    public function update(StoreUpdateRequest $request, UpdateAction $action): JsonResponse
    {
        $update = $action->handle($request);

        return response()->json(['message' => $update['message']], $update['status']);
    }

    /** Delete Author **/
    public function destroy(Request $request, DeleteAction $action): JsonResponse
    {
        $delete = $action->handle($request);

        return response()->json(['message' => $delete['message']], $delete['status']);
    }
}