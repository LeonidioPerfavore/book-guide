<?php

namespace App\Models;

use App\Models\Abstracts\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class Book
 * @package App\Models
 * @property integer $id
 * @property string $name
 * @property string $short_description
 * @property string $image
 * @property string $publication_date
 * @property string $created_at
 * @property string $updated_at
 */
class Book extends BaseModel
{
    protected $table = 'books';

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $fillable = [
        'name',
        'short_description',
        'image',
        'publication_date'
    ];

    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(Author::class, 'authors_books', 'book_id', 'author_id');
    }

    public const BOOK_FILTERS = [
        'name', 'publication_date'
    ];
}