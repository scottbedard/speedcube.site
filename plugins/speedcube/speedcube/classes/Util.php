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
     * Convert a number of milliseconds to a human-readable time format.
     *
     * @param mixed $value
     *
     * @return string
     */
    public static function formatTime($value)
    {
        $value = (int) $value;

        $ms = str_pad(floor(($value % 1000) / 10), 2, '0', STR_PAD_LEFT);
        $seconds = str_pad(floor(($value / 1000) % 60), 2, '0', STR_PAD_LEFT);
        $minutes = floor($value / 60000);

        return "{$minutes}:{$seconds}.{$ms}";
    }

    /**
     * Format time and trim leading zeros.
     *
     * @param mixed $value
     *
     * @return string
     */
    public static function formatShortTime($value)
    {
        if ($value === 0) {
            return '0.00';
        }

        return preg_replace('/^[0:]*/', '', self::formatTime($value));
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