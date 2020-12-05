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
}