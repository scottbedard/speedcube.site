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
        $result = 0;
        $rawTurns = explode(' ', self::removeTimestamps($turns));

        $intersections = [
            'u' => ['b', 'r', 'f', 'l'],
            'l' => ['u', 'f', 'd', 'b'],
            'f' => ['u', 'r', 'd', 'l'],
            'r' => ['u', 'b', 'd', 'f'],
            'b' => ['u', 'l', 'd', 'b'],
            'd' => ['f', 'r', 'b', 'l'],
        ];

        $previousFace = '';

        foreach ($rawTurns as $turn) {
            $parsedTurn = self::parseTurn($turn);

            if ($parsedTurn['whole'] || $previousFace === $parsedTurn['face']) {
                continue;
            }

            $previousFace = $parsedTurn['face'];
            $result += 1;
        }
        
        return $result;
    }

    /**
     * Parse a turn.
     * 
     * @param  string   $turn
     * @return Array
     */
    public static function parseTurn(string $turn)
    {
        preg_match('/^[0-9]+/', $turn, $rawDepth);
        preg_match('/[A-Za-z]/', $turn, $face);

        $face = $face ? strtolower($face[0]) : '';

        return [
            'depth' => $rawDepth ? $rawDepth[0] : 1,
            'face' => $face,
            'double' => Utils::endsWith($turn, '2'),
            'prime' => Utils::endsWith($turn, '-'),
            'whole' => in_array($face, ['x', 'y', 'z']),
        ];
    }

    /**
     * Remove time data from a set of turns.
     * 
     * @param  string   $turns
     * @return string
     */
    public static function removeTimestamps(string $turns)
    {
        return preg_replace('/\d+\:|\d+\#[a-zA-Z]+/', '', $turns);
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
