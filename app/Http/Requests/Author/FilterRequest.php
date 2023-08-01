<?php

namespace App\Http\Requests\Author;

use App\Models\Author;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class FilterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'sort' => ['nullable', Rule::in(Author::AUTHOR_FILTERS)],
            'sortBy' => ['nullable', Rule::in(['ASC', 'DESC'])],
            'perPage' => 'nullable|integer',
            'search' => 'nullable|string|not_regex:/^\s+$/',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $validator->errors(),
        ], 422));
    }

    public function messages(): array
    {
        return [
            'sort.in' => 'The sort field must be either "first_name" or "last_name" "created_at".',
            'sortBy.in' => 'The sortBy field must be either "ASC" or "DESC".',
            'perPage.integer' => 'The perPage field must be an integer.',
            'search.not_regex' => 'The search field cannot contain only spaces.',
        ];
    }
}