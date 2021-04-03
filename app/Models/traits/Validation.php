<?php

namespace App\Models\Traits;

use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

trait Validation
{
    /**
     * Boot the validation trait for this model.
     *
     * @return void
     */
    public static function bootValidation()
    {
        if (!property_exists(get_called_class(), 'rules')) {
            throw new Exception(sprintf(
                'You must define a $rules property in %s to use the Validation trait.',
                get_called_class()
            ));
        }

        static::saving(function ($model) {
            $model->validate();
        });
    }

    /**
     * Normalize validation rules
     */
    protected function processValidationRules()
    {
        $processed = [];

        foreach ($this->rules as $field => $rules) {
            $processed[$field] = [];

            foreach ($rules as $rule) {
                // required:create
                if ($rule === 'required:create') {
                    !$this->exists && array_push($processed[$field], 'required');
                }

                // required:update
                elseif ($rule === 'required:update') {
                    $this->exists && array_push($processed[$field], 'required');
                }

                // unique:table
                elseif (Str::startsWith($rule, 'unique:')) {
                    !$this->exists && array_push($processed[$field], $this->processValidationUniqueRule($rule, $field));
                }

                // standard rules
                else {
                    array_push($processed[$field], $rule);   
                }
            }
        }

        return $processed;
    }

    /**
     * Rebuilds the unique validation rule to force for the existing ID
     *
     * @param string $definition
     * @param string $fieldName
     *
     * @return string
     */
    protected function processValidationUniqueRule($definition, $fieldName)
    {
        list($table, $column, $except, $idColumn) = array_pad(explode(',', $definition), 4, null);

        $table = 'unique:' . $this->getTable();
        $column = $column ?: $fieldName;
        $except = $except ?: $this->getKey();
        $idColumn = $idColumn ?: $this->getKeyName();

        return implode(',', [$table, $column, $except, $idColumn]);
    }

    /**
     * Validate the model.
     */
    public function validate()
    {
        $validator = Validator::make(
            $this->attributes,
            $this->processValidationRules()
        );

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
