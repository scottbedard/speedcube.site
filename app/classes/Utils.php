<?php

namespace App\Classes;
use Illuminate\Support\Str;

class Utils
{
    /**
     * Camel case keys recursively.
     *
     * @param array $arr
     *
     * @return array
     */
    public static function camelKeysRecursive(array $arr)
    {
        return self::keyByRecursive($arr, function ($value, $key) {
            return Str::camel($key);
        });
    }

    /**
     * Apply a function to array keys recursively.
     *
     * @param array $arr
     * @param function $fn
     *
     * @return array
     */
    public static function keyByRecursive(array $arr, $fn)
    {
        return collect($arr)
            ->keyBy(function ($value, $key) use ($fn) {
                return $fn($value, $key);
            })
            ->map(function ($item) use ($fn) {
                if (is_array($item)) {
                    return self::keyByRecursive($item, $fn);
                } elseif ($item instanceof Model) {
                    return self::keyByRecursive($item->toArray(), $fn);
                }

                return $item;
            })
            ->toArray();
    }

    /**
     * Snake case keys recursively.
     *
     * @param array $arr
     *
     * @return array
     */
    public static function snakeKeysRecursive(array $arr)
    {
        return self::keyByRecursive($arr, function ($value, $key) {
            return Str::snake($key);
        });
    }
}