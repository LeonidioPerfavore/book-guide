<?php

namespace App\Repositories;

use App\Models\Interfaces\ModelInterface;

interface RepositoryInterface
{
    public function find(int $id);

    public function list($request);

    public function create($request);

    public function update(ModelInterface $model, $request);
}