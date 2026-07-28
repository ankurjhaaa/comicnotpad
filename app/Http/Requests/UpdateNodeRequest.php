<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateNodeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:50'],
            'meta' => ['nullable', 'array'],
            'is_trashed' => ['sometimes', 'boolean'],
        ];
    }
}
