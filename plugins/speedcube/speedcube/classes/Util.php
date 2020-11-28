<?php

namespace Speedcube\Speedcube\Classes;

use Illuminate\Database\Eloquent\Model;

class Util
{
    /**
     * Camel case keys recursively.
     *
     * @param array $arr
     *
     * @return array
     */
    public static function camelCaseKeysRecursive(array $arr)
    {
        return self::keyByRecursive($arr, function ($value, $key) {
            return camel_case($key);
        });
    }

    /**
     * Test if a value is JSON
     *
     * @param any
     *
     * @return boolean
     */
    public static function isJson($val)
    {
        return is_string($val) && json_decode($val) !== null;
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
    public static function snakeCaseKeysRecursive(array $arr)
    {
        return self::keyByRecursive($arr, function ($value, $key) {
            return snake_case($key);
        });
    }
}