<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreNodeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'parent_id' => ['nullable', 'integer', 'exists:nodes,id'],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:folder,page,document,image'],
            'icon' => ['nullable', 'string', 'max:50'],
            'content' => ['nullable', 'string'],
            'meta' => ['nullable', 'array'],
        ];
    }
}
