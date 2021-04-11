<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class BaseModel extends Model
{
    /**
     * Attributes to hash before saving.
     *
     * @var array
     */
    public $hashable = [];

    /**
     * Attributes to remove before saving.
     *
     * @var array
     */
    public $purgeable = [];

    /**
     * Validation rules.
     *
     * @var array
     */
    public $rules = [];

    /**
     * Validate the model before saving.
     *
     * @var boolean
     */
    protected $validation = true;

    /**
     * Boot.
     *
     * @return void
     */
    protected static function booted()
    {
        static::saving(function ($model) {
            if ($model->validation) {
                $model->validate();
            }

            $model->purge();
            $model->hash();
        });
    }

    /**
     * Save model without validation.
     */
    public function forceSave()
    {
        $this->validation = false;

        $this->save();

        $this->validation = true;
    }

    /**
     * Hash attributes.
     *
     * @return void
     */
    public function hash()
    {
        foreach ($this->hashable as $field) {
            if ($this->isDirty($field)) {
                $this->setAttribute($field, Hash::make($this->getAttribute($field)));
            }
        }
    }

    /**
     * Purge attributes.
     *
     * @return void
     */
    public function purge()
    {
        $this->attributes = array_diff_key($this->attributes, array_flip($this->purgeable));
    }

    /**
     * Validate the model.
     *
     * @return void
     */
    public function validate()
    {
        $validator = Validator::make(
            $this->validationAttributes(),
            $this->validationRules()
        );

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    /**
     * Process validation attributes.
     *
     * @return array
     */
    public function validationAttributes()
    {
        $attrs = [];
        $dirty = array_keys($this->getDirty());

        foreach ($this->attributes as $key => $value) {
            // skip hashable fields that have not changed
            if (in_array($key, $this->hashable) && !in_array($key, $dirty)) {
                continue;
            }

            $attrs[$key] = $value;
        }

        return $attrs;
    }

    /**
     * Process validation rules.
     *
     * @return array
     */
    public function validationRules()
    {
        $processed = [];

        foreach ($this->rules as $field => $rules) {
            $processed[$field] = [];

            foreach ($rules as $rule) {
                // required_create
                if ($rule === 'required_create') {
                    !$this->exists && array_push($processed[$field], 'required');
                }

                // required_update
                elseif ($rule === 'required_update') {
                    $this->exists && array_push($processed[$field], 'required');
                }

                // required_with_update
                elseif (Str::startsWith($rule, 'required_with_update:')) {
                    $this->exists && array_push($processed[$field], str_replace('required_with_update:', 'required_with:', $rule));
                }

                // unique:table
                elseif (Str::startsWith($rule, 'unique')) {
                    !$this->exists && array_push($processed[$field], $this->validationUnique($rule, $field));
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
     * Process validation unique rule.
     *
     * @param string $definition
     * @param string $fieldName
     *
     * @return string
     */
    protected function validationUnique($definition, $fieldName)
    {
        list($table, $column, $except, $idColumn) = array_pad(explode(',', $definition), 4, null);

        $table = 'unique:' . $this->getTable();
        $column = $column ?: $fieldName;
        $except = $except ?: $this->getKey();
        $idColumn = $idColumn ?: $this->getKeyName();

        return implode(',', [$table, $column, $except, $idColumn]);
    }
}
