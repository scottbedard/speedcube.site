<?php

namespace App\Classes;

use Exception;

class Twister
{
    /**
     * Puzzles
     */
    const puzzles = [
        '2x2' => [
            'id' => 2,
            'model' => 'cube',
            'options' => [
                'size' => 2,
            ],
        ],
        '3x3' => [
            'id' => 3,
            'model' => 'cube',
            'options' => [
                'size' => 3,
            ],
        ],
        '4x4' => [
            'id' => 4,
            'model' => 'cube',
            'options' => [
                'size' => 4,
            ],
        ],
        '5x5' => [
            'id' => 5,
            'model' => 'cube',
            'options' => [
                'size' => 5,
            ],
        ],
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
        $safeName = strtolower(trim($name));

        return array_key_exists($safeName, self::puzzles)
            ? self::puzzles[$safeName]['id']
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
        if ($id) {
            foreach (self::puzzles as $name => $puzzle) {
                if ($puzzle['id'] === $id) {
                    return $name;
                }
            }
        }

        return 'unknown';
    }

    /**
     * Get constructor options from ID.
     *
     * @param int $id
     *
     * @return string
     */
    public static function getOptionsArg(int $id)
    {
        if ($id) {
            foreach (self::puzzles as $name => $puzzle) {
                if ($puzzle['id'] === $id) {
                    return escapeshellarg(json_encode($puzzle['options']));
                }
            }
        }

        return escapeshellarg(json_encode([]));
    }

    /**
     * Get puzzle argument from ID.
     *
     * @param int $id
     *
     * @return string
     */
    public static function getPuzzleArg(int $id)
    {
        if ($id) {
            foreach (self::puzzles as $name => $puzzle) {
                if ($puzzle['id'] === $id) {
                    return escapeshellarg($puzzle['model']);
                }
            } 
        }

        return 'unknown';
    }

    /**
     * Parse a single turn.
     */
    public static function parse(string $puzzle, string $turn)
    {
        $id = self::getId($puzzle);
        $puzzleArg = self::getPuzzleArg($id);
        $optionsArg = self::getOptionsArg($id);

        $turnArg = escapeshellarg($turn);

        $output = self::exec("parse {$puzzleArg} {$turnArg} --options={$optionsArg}");

        return json_decode($output, true);
    }

    /**
     * Parse multiple turns.
     */
    public static function parseAlgorithm(string $puzzle, string $algorithm)
    {
        $id = self::getId($puzzle);
        $puzzleArg = self::getPuzzleArg($id);
        $optionsArg = self::getOptionsArg($id);

        $algorithmArg = escapeshellarg($algorithm);

        $output = self::exec("parseAlgorithm {$puzzleArg} {$algorithmArg} --options={$optionsArg}");

        return json_decode($output, true);
    }

    /**
     * Scramble a puzzle.
     */
    public static function scramble(string $puzzle, int $turns = 0)
    {
        $id = self::getId($puzzle);
        $puzzleArg = self::getPuzzleArg($id);
        $optionsArg = self::getOptionsArg($id);
        
        $turnsArg = escapeshellarg($turns);

        $output = $turns
            ? self::exec("scramble {$puzzleArg} --options={$optionsArg} --turns={$turnsArg}")
            : self::exec("scramble {$puzzleArg} --options={$optionsArg}");

        return json_decode($output, true);
    }

    /**
     * Test that a scramble is solved by a solution.
     */
    public static function test(string $puzzle, string $scramble, string $solution)
    {
        $id = self::getId($puzzle);
        $puzzleArg = self::getPuzzleArg($id);
        $optionsArg = self::getOptionsArg($id);

        $algorithmArg = escapeshellarg("{$scramble} {$solution}");
        
        $output = self::exec("turn {$puzzleArg} {$algorithmArg} --options={$optionsArg}");

        $data = json_decode($output, true);

        return $data['solved'];
    }
}