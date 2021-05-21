<?php

namespace App\Classes;

class Twister
{
    /**
     * Puzzle identifiers
     */
    const identifiers = [
        '2x2' => 2,
        '3x3' => 3,
        '4x4' => 4,
        '5x5' => 5,
    ];

    /**
     * Get puzzle ID from name.
     *
     * @param string $name
     *
     * @return int
     */
    public static function getId(string $name)
    {
        return array_key_exists($name, self::identifiers)
            ? self::identifiers[$name]
            : 0;
    }

    /**
     * Get puzzle name from ID.
     *
     * @param int $id
     *
     * @return string
     */
    public static function getName(int $id)
    {
        $names = array_flip(self::identifiers);

        return array_key_exists($id, $names)
            ? $names[$id]
            : 'unknown';
    }
}