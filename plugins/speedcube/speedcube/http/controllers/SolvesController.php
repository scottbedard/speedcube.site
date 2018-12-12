<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Auth;
use Exception;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Scramble;
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
        try {
            $data = input();
            $config = array_key_exists('config', $data) ? $data['config'] : [];
            $solution = array_key_exists('solution', $data) ? $data['solution'] : '';

            $user = Auth::getUser();

            // find the scramble being solved
            $scramble = Scramble::find($data['scrambleId']);

            // find or create a solve for this scramble
            $solve = $user
                ? $scramble->solves()->where('user_id', $user->id)->firstOrFail()
                : new Solve(['scramble_id' => $scramble->id]);

            // complete the solve
            $solve->config = $config;

            $solve->complete($solution);

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
