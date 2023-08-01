<?php

namespace App\Models;

use App\Models\Abstracts\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class Author
 * @package App\Models
 * @property integer $id
 * @property string $first_name
 * @property string $last_name
 * @property boolean $middle_name
 * @property string $created_at
 * @property string $updated_at
 */
class Author extends BaseModel
{
    protected $table = 'authors';

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name'
    ];

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'authors_books', 'author_id', 'book_id');
    }

    public const AUTHOR_FILTERS = [
        'first_name', 'last_name', 'created_at'
    ];
}