<?php

namespace App\Models\Traits;

use Illuminate\Support\Arr;

trait GetJsonValue
{
    /**
     * Get a value from a JSON attribute.
     */
    public function getJsonValue(string $property, string $path, $default = null)
    {
        $arr = json_decode($this[$property], true);

        return Arr::get($arr, $path, $default);
    }
}
