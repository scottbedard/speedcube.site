<?php

namespace App\Classes;

use Exception;

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
     * Get timestamp for the first occurrence of an event.
     *
     * @param string $event
     *
     * @return int
     */
    public function getEventTimestamp(string $event)
    {
        foreach ($this->nodes as $node) {
            if ($node['type'] === 'event' && $node['value'] === $event) {
                return $node['time'];
            }
        }

        throw new Exception("Event {$event} not found in solution");
    }

    /**
     * Calculate the idle time by events.
     *
     * @param string $first
     * @param string $second
     *
     * @return int
     */
    public function getIdleTimeByEvent(string $first, string $second = '')
    {
        $time = $this->getTimeBetweenEvents($first, $second);
        $turns = $this->getTurnsByEvent($first, $second);

        return $time - (count($turns) * $this->turnDuration);
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
     * Get the amount of time between two events.
     *
     * @param string $first
     * @param string $second
     *
     * @return int
     */
    public function getTimeBetweenEvents(string $first, string $second)
    {
        return $this->getEventTimestamp($second) - $this->getEventTimestamp($first);
    }

    /**
     * Get all turns.
     *
     * @return array
     */
    public function getTurns()
    {
        $turns = [];

        foreach ($this->nodes as $node) {
            if ($node['type'] === 'turn') {
                array_push($turns, $node);
            }
        }

        return $turns;
    }

    /**
     * Get turns between two events. If the second event is not
     * found, all turns after the first will be returned.
     *
     * @param string $first
     * @param string $second
     *
     * @return array
     */
    public function getTurnsByEvent(string $first, string $second = '')
    {
        $firstFound = false;
        $turns = [];

        foreach ($this->nodes as $node) {
            if ($node['type'] === 'event') {
                if ($node['value'] === $first) {
                    $firstFound = true;
                }

                if ($node['value'] === $second) {
                    break;
                }
            } elseif ($firstFound && $node['type'] === 'turn') {
                array_push($turns, $node);
            }
        }

        return $turns;
    }

    /**
     * Calculate the average turn speed.
     *
     * @param string $first
     * @param string $second
     *
     * @return int
     */
    public function getTurnSpeedByEvent(string $first, string $second = '')
    {
        $time = $this->getTimeBetweenEvents($first, $second);
        $turns = $this->getTurnsByEvent($first, $second);

        return (int) round($time / count($turns));
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
