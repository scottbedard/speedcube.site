<?php

namespace App\Classes;

class Solution
{
    /**
     * Parsed solution string pieces.
     * 
     * @var array
     */
    protected $nodes;

    /**
     * Raw solution string.
     *
     * @var string
     */
    protected $solution;

    /**
     * Number of milliseconds each turn takes to execute.
     *
     * @var int
     */
    protected $turnDuration;

    /**
     * Construct
     */
    function __construct(string $solution, int $turnDuration = 0)
    {
        $this->setSolution($solution);

        $this->turnDuration = $turnDuration;
    }

    /**
     * Get solution nodes.
     *
     * @return array
     */
    public function getNodes()
    {
        return $this->nodes;
    }

    /**
     * Parse a solution string.
     *
     * @param string $solution
     *
     * @return array
     */
    public static function parse(string $solution)
    {
        return array_map(function ($node) {
            // turns = timestamp:value
            $turnDelimeter = strpos($node, ':');

            if ($turnDelimeter) {
                return [
                    'time' => (int) substr($node, 0, $turnDelimeter),
                    'type' => 'turn',
                    'value' => substr($node, $turnDelimeter + 1),
                ];
            }

            // events = timestamp#value
            $eventDelimeter = strpos($node, '#');

            if ($eventDelimeter) {
                return [
                    'time' => (int) substr($node, 0, $eventDelimeter),
                    'type' => 'event',
                    'value' => substr($node, $eventDelimeter + 1),
                ];
            }
            
            return [
                'time' => 0,
                'type' => 'unknown',
                'value' => '',
            ];
        }, array_filter(explode(' ', $solution)));
    }

    /**
     * Set solution.
     *
     * @param string $solution
     */
    public function setSolution(string $solution)
    {
        $this->solution = $solution;

        $this->nodes = self::parse($solution);
    }
}
