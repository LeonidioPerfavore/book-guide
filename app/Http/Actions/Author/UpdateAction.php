<?php

namespace App\Http\Actions\Author;

use App\Http\Actions\ActionInterface;
use App\Repositories\Author\Repository;

class UpdateAction implements ActionInterface
{
    protected Repository $authorRepository;

    public function __construct(Repository $authorRepository)
    {
        $this->authorRepository = $authorRepository;
    }

    public function handle($request) : array
    {
        if(!$request->input('id')){
            return ['message' => 'id required', 'status' => 400];
        }

        $author = $this->authorRepository->find($request->input('id'));
        if(!$author){
            return ['message' => 'Author not found', 'status' => 404];
        }

        $this->authorRepository->update($author, $request);

        return ['message' => 'Author updated success!', 'status' => 201];
    }
}