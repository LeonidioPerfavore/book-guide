<?php

namespace App\Http\Requests\Author;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|min:3',
            'last_name' => 'required|string|min:3',
            'middle_name' => 'string|min:3'
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
            'first_name.required' => 'first_name is required',
            'first_name.string' => 'first_name must be a string',
            'first_name.min' => 'first_name min length: 3',
            'last_name.required' => 'last_name is required',
            'last_name.string' => 'last_name must be a string',
            'last_name.min' => 'last_name min length: 3',
            'middle_name.string' => 'middle_name must be a string',
            'middle_name.min' => 'middle_name min length: 3',
        ];
    }
}