<?php

namespace App\Http\Actions\Book;

use App\Http\Actions\ActionInterface;
use App\Repositories\Book\Repository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DeleteAction implements ActionInterface
{

    protected Repository $bookRepository;

    public function __construct(Repository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function handle($request) : array
    {
        if(!$request->input('id')){
            return ['message' => 'id param required', 'status' => 400];
        }

        $book = $this->bookRepository->find($request->input('id'));
        if(!$book){
            return ['message' => 'Book not found', 'status' => 404];
        }

        try{
            DB::transaction(function () use ($book){
                $book->authors()->detach();
                $imagePath = 'public/images/' . basename($book->image);
                Storage::delete($imagePath);
                $book->delete();
            });

            return ['message' => 'Book deleted success!', 'status' => 201];

        } catch (\Exception $ex){
            return ["message" => $ex->getMessage(), "status" => 400];
        }
    }
}