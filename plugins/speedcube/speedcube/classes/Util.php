<?php

namespace Speedcube\Speedcube\Classes;

class Util
{
    /**
     * Apply a function to array keys recursively.
     *
     * @param array $source
     * @param function $fn
     *
     * @return array
     */
    public static function keyByRecursive(array $source, $fn)
    {
        return collect($source)
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
}