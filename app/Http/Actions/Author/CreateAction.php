<?php

namespace App\Http\Actions\Author;

use App\Http\Actions\ActionInterface;
use App\Repositories\Author\Repository;

class CreateAction implements ActionInterface
{
    protected Repository $authorRepository;

    public function __construct(Repository $authorRepository)
    {
        $this->authorRepository = $authorRepository;
    }

    public function handle($request) : array
    {
        $author = $this->authorRepository->create($request);

        return ['message' => 'Author created success!', 'author' => $author, 'status' => 201];
    }
}