<?php

namespace App\Http\Actions\Author;

use App\Http\Actions\ActionInterface;
use App\Repositories\Author\Repository;
use Illuminate\Support\Facades\DB;

class DeleteAction implements ActionInterface
{
    protected Repository $authorRepository;

    public function __construct(Repository $authorRepository)
    {
        $this->authorRepository = $authorRepository;
    }

    public function handle($request) : array
    {
        if(!$request->input('id')){
            return ['message' => 'id param required', 'status' => 400];
        }

        $author = $this->authorRepository->find($request->input('id'));
        if(!$author){
            return ['message' => 'Author not found', 'status' => 404];
        }

        try {
            DB::transaction(function () use ($author) {

                $books = $author->books;

                /** Detach the author from the books' relationships with other authors **/
                foreach ($books as $book) {
                    $book->authors()->detach($author->id);
                }

                /**  Delete the books associated with the author **/
                $books->each(function ($book) {
                    $book->delete();
                });

                $author->delete();

            });

            return ['message' => 'Author deleted success!', 'status' => 201];


        } catch (\Exception $ex) {
            return ["message" => $ex->getMessage(), "status" => 400];
        }
    }
}