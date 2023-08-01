<?php

namespace App\Repositories\Author;

use App\Models\Author;
use App\Repositories\RepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Interfaces\ModelInterface;

class Repository implements RepositoryInterface
{
    public function find(int $id): ?Author
    {
        return Author::find($id);
    }

    public function list($request): LengthAwarePaginator
    {
        $query = Author::query()->select('id', 'first_name', 'last_name', 'middle_name', 'created_at');

        if ($request->has('sortBy') && in_array($request->input('sortBy'), ['ASC', 'DESC'])
        && $request->has('sort') && in_array($request->input('sort'), Author::AUTHOR_FILTERS)) {
            $sortBy = $request->input('sortBy');
            $sort = $request->input('sort');
            $query->orderBy($sort, $sortBy);
        }

        if ($request->has('search') && $request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(function (Builder $q) use ($searchTerm) {
                $q->where('last_name', 'like', "%$searchTerm%")
                    ->orWhere('first_name', 'like', "%$searchTerm%");
            });
        }

        return $query->paginate(15);
    }

    public function create($request): Author
    {
        return Author::create(
            [
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'middle_name' => $request->input('middle_name')
            ]
        );
    }

    public function update(ModelInterface $model, $request): ModelInterface
    {
        $model->update($request->all());
        return $model;
    }

    public function findInArray($array)
    {
        return Author::whereIn('id', $array)->get();
    }
}