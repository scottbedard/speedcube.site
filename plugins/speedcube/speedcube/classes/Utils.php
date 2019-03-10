<?php

namespace Speedcube\Speedcube\Classes;

class Utils
{
    /**
     * Deeply camel case the keys of an array.
     *
     * @param  {Array} arr
     *
     * @return {Array}
     */
    public static function camelCaseKeys(array $arr)
    {
        $result = [];

        foreach ($arr as $key => $val) {
            $result[camel_case($key)] = is_array($val)
                ? self::camelCaseKeys($val)
                : $val;
        }

        return $result;
    }

    /**
     * Test if a string ends with another string.
     *
     * @param string $haystack
     * @param needle $needle
     *
     * @return bool
     */
    public static function endsWith($haystack, $needle)
    {
        $length = strlen($needle);

        if ($length == 0) {
            return true;
        }

        return substr($haystack, -$length) === $needle;
    }

    /**
     * Convert a number of milliseconds to a human-readable time format.
     *
     * @param int $value
     *
     * @return string
     */
    public static function formatTime(int $value)
    {
        $ms = floor((int) str_pad($value % 1000, 3, '0', STR_PAD_LEFT) / 10);
        $seconds = str_pad(floor(($value / 1000) % 60), 2, '0', STR_PAD_LEFT);
        $minutes = floor($value / 60000);

        return "{$minutes}:{$seconds}.{$ms}";
    }

    /**
     * Test if a string is JSON.
     *
     * @param {string} $source
     *
     * @return {boolean}
     */
    public static function isJson($source)
    {
        return is_string($source) && json_decode($source) !== null;
    }
}
