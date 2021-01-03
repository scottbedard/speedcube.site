<?php

namespace Speedcube\Speedcube\Classes;

class Puzzle
{
    /**
     * Puzzle IDs.
     * 
     * Make sure this stays synced with the frontend copy
     * at client/src/app/utls/puzzle.ts
     */
    CONST IDS = [
        '2x2' => 1,
        '3x3' => 2,
        '4x4' => 3,
        '5x5' => 4,
        'kilominx' => 5,
        'megaminx' => 6,
        'masterminx' => 7,
        'gigaminx' => 8,
    ];

    /**
     * Get a puzzle name from ID.
     *
     * @param int $id
     *
     * @return string
     */
    public static function getName(int $id): string
    {
        return array_search($id, self::IDS) ?: 'unknown';
    }

    /**
     * Get twister id from puzzle id
     */
    public static function getTwisterId(int $puzzleId)
    {
        switch ($puzzleId) {
            case 1: return '2x2';
            case 2: return '3x3';
            case 3: return '4x4';
            case 4: return '5x5';
            case 5: return 'dodecaminx2';
            case 6: return 'dodecaminx3';
            case 7: return 'dodecaminx4';
            case 8: return 'dodecaminx5';
        }

        return null;
    }

    /**
     * Scramble a puzzle.
     */
    public static function scramble(int $puzzleId)
    {
        $twister = base_path('client/node_modules/.bin/twister');

        $puzzle = self::getTwisterId($puzzleId);

        $result = exec("node {$twister} scramble {$puzzle}");

        return \json_decode($result, true);
    }
}