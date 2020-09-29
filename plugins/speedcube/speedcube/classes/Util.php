<?php

namespace Speedcube\Speedcube\Classes;

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