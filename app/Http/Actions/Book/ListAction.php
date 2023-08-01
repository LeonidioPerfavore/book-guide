<?php

namespace App\Http\Actions\Book;

use App\Http\Actions\ActionInterface;
use App\Repositories\Book\Repository;

class ListAction implements ActionInterface
{
    protected Repository $bookRepository;

    public function __construct(Repository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function handle($request) : array
    {
        $authors = $this->bookRepository->list($request);

        return ['data' => $authors, 'status' => 200];
    }
}