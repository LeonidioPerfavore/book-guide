<?php

namespace App\Http\Actions\Author;

use App\Http\Actions\ActionInterface;
use App\Repositories\Author\Repository;

class ListAction implements ActionInterface
{
    protected Repository $authorRepository;

    public function __construct(Repository $authorRepository)
    {
        $this->authorRepository = $authorRepository;
    }

    public function handle($request) : array
    {
        $authors = $this->authorRepository->list($request);

        return ['data' => $authors, 'status' => 200];
    }
}