<?php

namespace Speedcube\Speedcube\Classes;

use Speedcube\Speedcube\Models\Scramble;

class Cube
{
    /**
     * Count the number of intersecting turns.
     * 
     * @param  string   $turns
     * @return int
     */
    public static function countTurns()
    {
        return 5;
    }

    /**
     * Remove time data from a set of turns.
     * 
     * @param  string   $turns
     * @return string
     */
    public static function removeTimestamps(string $turns)
    {
        return preg_replace('/\d+\:|!!/', '', $turns);
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
