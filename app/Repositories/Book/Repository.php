<?php

namespace App\Repositories\Book;

use App\Models\Book;
use App\Models\Interfaces\ModelInterface;
use App\Repositories\RepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class Repository implements RepositoryInterface
{
    public function find(int $id)
    {
        $book = Book::where('id', $id)
            ->with(['authors' => function ($query) {
                $query->select('authors.id', 'first_name', 'last_name', 'middle_name');
            }])
            ->select('books.id', 'name', 'short_description', 'publication_date', 'image')
            ->first();

        return $book;
    }

    public function list($request)
    {
        $query = Book::query()->select('books.id', 'books.name', 'books.image', 'books.publication_date', 'books.short_description');

        $query->with([
            'authors' => function ($query) {
                $query->select('authors.id', 'authors.first_name', 'authors.last_name');
            }
        ]);

        if ($request->has('sortBy') && in_array($request->input('sortBy'), ['ASC', 'DESC'])
            && $request->has('sort') && in_array($request->input('sort'), Book::BOOK_FILTERS)) {
            $sortBy = $request->input('sortBy');
            $sort = $request->input('sort');
            $query->orderBy('books.' . $sort, $sortBy);
        }

        if ($request->has('search') && $request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(function (Builder $q) use ($searchTerm) {
                $q->where('books.name', 'like', "%$searchTerm%")
                    ->orWhereHas('authors', function ($q) use ($searchTerm) {
                        $q->where('authors.first_name', 'like', "%$searchTerm%")
                            ->orWhere('authors.last_name', 'like', "%$searchTerm%");
                    });
            });
        }

        return $query->paginate(15);
    }

    public function create($request)
    {
        $imageName = null;
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            Storage::disk('public')->putFileAs('images', $image, $imageName);
        }

        $book = Book::create([
            'name' => $request->input('name'),
            'image' => $imageName,
            'publication_date' => $request->input('publication_date'),
            'short_description' => $request->input('short_description'),
        ]);

        $decode = json_decode($request->input('authors'));

        $book->authors()->attach($decode);

        return Book::with('authors')->find($book->id);
    }

    public function update(ModelInterface $model, $request): ModelInterface
    {
        $data = $request->all();
        if ($request->hasFile('image')) {

            $imagePath = 'public/images/' . basename($model->image);
            Storage::delete($imagePath);

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            Storage::disk('public')->putFileAs('images', $image, $imageName);

        }else{
            $imageName =  $model->image;
        }

        $decode = json_decode($request->input('authors'));
        $data['image'] = $imageName;
        $model->update($data);
        $model->authors()->sync($decode);

        return $model->load('authors');
    }
}