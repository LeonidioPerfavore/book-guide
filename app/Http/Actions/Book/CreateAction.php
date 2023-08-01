<?php

namespace App\Http\Actions\Book;

use App\Http\Actions\ActionInterface;
use App\Repositories\Author\Repository as AuthorRepository;
use App\Repositories\Book\Repository as BookRepository;
use Illuminate\Support\Facades\DB;

class CreateAction implements ActionInterface
{
    protected AuthorRepository $authorRepository;
    protected BookRepository $bookRepository;

    public function __construct(AuthorRepository $authorRepository, BookRepository $bookRepository)
    {
        $this->authorRepository = $authorRepository;
        $this->bookRepository = $bookRepository;
    }

    public function handle($request): array
    {
        $book = null;
        $decode = json_decode($request->input('authors'));

        $authors = $this->authorRepository->findInArray($decode);

        if (count($authors) != count($decode)) {
            return ['message' => 'You are trying to add non-existing authors!', 'book' => $book, 'status' => 400];
        }

        try {
            DB::transaction(function () use ($request, &$book) {
                $book = $this->bookRepository->create($request);
            });

            if ($book) {
                return ['message' => 'Book created success!', 'book' => $book, 'status' => 201];
            } else {
                return ['message' => 'Failed to create book!', 'book' => null, 'status' => 500];
            }

        } catch (\Exception $ex) {
            return ["message" => $ex->getMessage(), 'book' => $book, "status" => 400];
        }
    }
}