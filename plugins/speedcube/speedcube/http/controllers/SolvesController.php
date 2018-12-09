<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Exception;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Solve;

class SolvesController extends ApiController
{
    /**
     * Create a solve.
     * 
     * @return Response
     */
    public function create()
    {
        $data = input();

        try {
            $user = Auth::getUser();
            $config = array_key_exists('config', $data) ? $data['config'] : [];

            $solve = Solve::create([
                'config' => $config,
                'scramble_id' => $data['scrambleId'],
                'solution' => $data['solution'],
                'user_id' => $user ? $user->id : null,
            ]);

            // success
            return $this->success([
                'solve' => $solve->toArray(),
            ]);
        } catch (Exception $e) {
            // failure
            return $this->failed($e);
        }
    }

    /**
     * Find a solve.
     * 
     * @return Response
     */
    public function find($id)
    {
        $solve = Solve::withUserSummary()
            ->with('scramble')
            ->find($id);

        return $this->success([
            'solve' => $solve,
        ]);
    }

    /**
     * Get the fastest solves of all time.
     * 
     * @return Response
     */
    public function index()
    {
        try {
            $data = input();

            //
            // base query
            //
            $query = Solve::rated()
                ->select([
                    'average_speed',
                    'created_at',
                    'cube_size',
                    'id',
                    'moves',
                    'time',
                    'user_id',
                ])
                ->limit(20)
                ->withUserSummary();

            //
            // size
            //
            if (array_key_exists('cubeSize', $data)) {
                $query->size($data['cubeSize']);
            }
            
            //
            // order
            //
            if (array_key_exists('orderBy', $data)) {
                $orderBy = $data['orderBy'];

                if ($orderBy === 'time') {
                    $query->fastest();
                } elseif ($orderBy === 'moves') {
                    $query->fewestMoves();
                } 
            }

            return $this->success([
                'solves' => $query->get(),
            ]);
        } catch (Exception $e) {
            return $this->failed($e);
        }
    }
}
