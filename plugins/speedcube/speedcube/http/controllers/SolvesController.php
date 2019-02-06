<?php

namespace Speedcube\Speedcube\Http\Controllers;

use ApplicationException;
use Auth;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Models\Solve;

class SolvesController extends ApiController
{
    /**
     * Complete a solve.
     *
     * @return Response
     */
    public function complete()
    {
        try {
            $user = Auth::getUser();

            $data = input();
            $abort = array_get($data, 'abort', false);
            $config = array_get($data, 'config', []);
            $scrambleId = array_get($data, 'scrambleId', 0);
            $solution = array_get($data, 'solution', '');

            // throw an error if the scramble has already been solved
            if (Solve::notPending()->where('scramble_id', $scrambleId)->exists()) {
                throw new ApplicationException("Duplicate solve submitted for scramble #{$scrambleId}");
            }

            // find the scramble being solved
            $scramble = Scramble::findOrFail($scrambleId);

            // find or instantiate the solve
            $solve = $user
                ? $scramble->solves()->where('user_id', $user->id)->firstOrFail()
                : new Solve(['scramble_id' => $scramble->id]);

            // cache the solve configuration
            $solve->config = $config;

            // abort or complete the solve
            if ($abort) {
                $solve->abort($solution);
            } else {
                $solve->complete($solution);
            }

            return $this->success([
                'solve' => $solve->toArray(),
            ]);
        }

        // unknown error
        catch (Exception $err) {
            return $this->failed($err);
        }
    }

    /**
     * Find a solve.
     *
     * @return Response
     */
    public function find($id)
    {
        try {
            $solve = Solve::withUserSummary()
                ->with('scramble')
                ->findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return $this->failed('not_found');
        }

        return $this->success([
            'solve' => $solve,
        ]);
    }

    /**
     * Get a highlighted solve.
     *
     * @return Response
     */
    public function highlighted()
    {
        $solve = Solve::withUserSummary()
            ->with('scramble')
            ->puzzle('3x3')
            ->fastest()
            ->first();

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
            $take = min(50, array_key_exists('take', $data) ? (int) $data['take'] : 10);

            //
            // base query
            //
            $query = Solve::completed()
                ->select([
                    'average_speed',
                    'created_at',
                    'id',
                    'moves',
                    'time',
                    'user_id',
                ])
                ->limit($take)
                ->withUserSummary();

            //
            // size
            //
            if (array_key_exists('puzzle', $data)) {
                $query->puzzle($data['puzzle']);
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
