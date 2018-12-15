<?php

namespace Speedcube\Speedcube\Classes;

use Speedcube\Speedcube\Classes\Utils;
use Speedcube\Speedcube\Models\Scramble;

class Cube
{
    /**
     * Count the number of intersecting turns.
     * 
     * @param  string   $turns
     * @return int
     */
    public static function countTurns(string $turns)
    {
        $parsedTurns = self::parseTurns(self::removeTimestamps($turns));

        $intersections = [
            'U' => ['B', 'R', 'F', 'L'],
            'L' => ['U', 'F', 'D', 'B'],
            'F' => ['U', 'R', 'D', 'L'],
            'R' => ['U', 'B', 'D', 'F'],
            'B' => ['U', 'L', 'D', 'B'],
            'D' => ['F', 'R', 'B', 'L'],
        ];

        $result = 0;
        $previousTarget = '';

        foreach ($parsedTurns as $turn) {
            if (in_array($turn['target'], ['X', 'Y', 'Z'])) {
                continue;
            }

            if ($previousTarget !== $turn['target']) {
                $previousTarget = $turn['target'];

                $result += 1;
            }
        }

        return $result;
    }

    /**
     * Parse a turn.
     * 
     * @param  string   $turns
     * @return Array
     */
    public static function parseTurns(string $turns)
    {
        $cubePath = base_path('themes/site/node_modules/bedard-cube/cli.js');
        $turnsArg = escapeshellarg($turns);

        $result = exec("node {$cubePath} parse {$turnsArg}");

        return json_decode($result, true);
    }

    /**
     * Remove time data and events from a set of turns.
     * 
     * @param  string   $turns
     * @return string
     */
    public static function removeTimestamps(string $turns)
    {
        return trim(preg_replace('/\d+\:|\d+\#[a-zA-Z]+/', '', $turns));
    }

    /**
     * Reverse a scramble.
     * 
     * @param  string   $turns
     * @return string
     */
    public static function reverseScramble(string $turns)
    {
        return implode(' ', array_map(function($turn) {
            if (Utils::endsWith($turn, '2')) return $turn;
            if (Utils::endsWith($turn, '-')) return str_replace('-', '', $turn);
            return $turn . '-';
        }, array_reverse(explode(' ', $turns))));
    }

    /**
     * Test a scramble solution.
     * 
     * @param  \Speedcube\Speedcube\Models\Scramble $scramble
     * @param  string                               $turns
     * @return boolean
     */
    public static function testSolution(Scramble $scramble, string $solution)
    {
        $cubePath = base_path('themes/site/node_modules/bedard-cube/cli.js');
        $sizeArg = escapeshellarg($scramble->cube_size);
        $stateArg = escapeshellarg($scramble->scrambled_state);
        $solutionArg = escapeshellarg(self::removeTimestamps($solution));

        return exec("node {$cubePath} test {$sizeArg} {$stateArg} {$solutionArg}") === '1';
    }
}
