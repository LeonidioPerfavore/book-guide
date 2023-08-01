<?php

namespace App\Http\Actions\Author;

use App\Http\Actions\ActionInterface;
use App\Repositories\Author\Repository;

class ShowAction implements ActionInterface
{
    protected Repository $authorRepository;

    public function __construct(Repository $authorRepository)
    {
        $this->authorRepository = $authorRepository;
    }

    public function handle($id) : array
    {
        if (!$id) {
            return ['message' => 'id param required', 'author' => null, 'status' => 400];
        }

        $author = $this->authorRepository->find($id);
        if (!$author) {
            return ['message' => 'Author not found',  'author' => null, 'status' => 404];
        }

        return ['message' => '',  'author' => $author , 'status' => 200];
    }
}