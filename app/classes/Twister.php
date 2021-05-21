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

    /**
     * Scramble a puzzle to a specific depth.
     */
    public static function scramble(string $puzzle, int $turns = 0)
    {
        $bin = base_path('client/node_modules/.bin/twister');

        $json = $turns
            ? exec("node {$bin} scramble {$puzzle} -t {$turns}")
            : exec("node {$bin} scramble {$puzzle}");

        return json_decode($json, true);
    }
}