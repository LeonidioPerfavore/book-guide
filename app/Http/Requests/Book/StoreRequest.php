<?php

namespace App\Http\Requests\Book;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required',
            'publication_date' => 'date',
            'image' => 'required|file|mimes:jpg,png|max:2048',
            'authors' => 'required|string'
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
            'name.required' => 'name is required',
            'short_description.string' => 'short_description must be a string',
            'image.file' => 'image must be a file',
            'image.mimes' => 'image must be in jpg or png format',
            'image.max' => 'image size must not exceed 2MB',
            'authors.required' => 'authors is required',
            'authors.string' => 'authors must be an string',
            'required|array|min:1' => 'Book must have at least 1 author',
            'publication_date|date' => 'publication_date must be in date format: Y:m:d',
        ];
    }
}