<?php

namespace App\Http\Controllers;

use App\Http\Actions\Book\ListAction;
use App\Http\Actions\Book\DeleteAction;
use App\Http\Actions\Book\ShowAction;
use App\Http\Actions\Book\UpdateAction;
use App\Http\Actions\Book\CreateAction;
use App\Http\Requests\Book\FilterRequest;
use App\Http\Requests\Book\StoreRequest;
use App\Http\Requests\Book\UpdateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /** Get Books List with search & filters  **/
    public function index(FilterRequest $request, ListAction $action): JsonResponse
    {
        $list = $action->handle($request);

        return response()->json(['list' => $list['data']], $list['status']);
    }

    /** Get one Book by id **/
    public function show($id, ShowAction $action): JsonResponse
    {
        $show = $action->handle($id);

        return response()->json(['book' => $show['book'], 'message' => $show['message']], $show['status']);
    }

    /** Create Book **/
    public function store(StoreRequest $request, CreateAction $action): JsonResponse
    {
        $create = $action->handle($request);

        return response()->json(['message' => $create['message'], 'book' => $create['book']], $create['status']);
    }

    /** Update Book **/
    public function update(UpdateRequest $request, UpdateAction $action): JsonResponse
    {
        $update = $action->handle($request);

        return response()->json(['message' => $update['message'], 'book' => $update['book']], $update['status']);
    }

    /** Delete Book **/
    public function destroy(Request $request, DeleteAction $action): JsonResponse
    {
        $delete = $action->handle($request);

        return response()->json(['message' => $delete['message']], $delete['status']);
    }
}