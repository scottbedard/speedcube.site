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
     * Execute a command
     */
    public static function exec(string $cmd)
    {
        $twister = base_path('client/node_modules/.bin/twister');

        return exec("node {$twister} {$cmd}");
    }

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
        $puzzleArg = escapeshellarg($puzzle);
        $turnsArg = escapeshellarg($turns);

        $output = $turns
            ? self::exec("scramble {$puzzleArg} -t {$turnsArg}")
            : self::exec("scramble {$puzzleArg}");

        return json_decode($output, true);
    }

    /**
     * Test that a scramble is solved by a solution.
     */
    public static function test(string $puzzle, string $scramble, string $solution)
    {
        $puzzleArg = escapeshellarg($puzzle);
        $algorithmArg = escapeshellarg("{$scramble} {$solution}");
        
        $output = self::exec("apply {$puzzleArg} {$algorithmArg}");

        $data = json_decode($output, true);

        return $data['solved'];
    }
}