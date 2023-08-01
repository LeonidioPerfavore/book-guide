<?php

namespace App\Http\Actions\Book;

use App\Http\Actions\ActionInterface;
use App\Repositories\Book\Repository;

class ShowAction implements ActionInterface
{
    protected Repository $bookRepository;

    public function __construct(Repository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function handle($id) : array
    {
        if (!$id) {
            return ['message' => 'id param required', 'book' => null, 'status' => 400];
        }

        $book = $this->bookRepository->find($id);
        if (!$book) {
            return ['message' => 'Book not found', 'book' => null, 'status' => 404];
        }

        return ['message' => '', 'book' => $book , 'status' => 200];
    }
}