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
            $config = array_get($data, 'config', '{}');
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

            // fetch the last 5 solves and record average for this puzzle
            $last5 = [];
            $recordAverage = null;
            $recordSingle = null;

            if ($user) {
                $last5 = Solve::completeOrDnf()
                    ->puzzle($scramble->puzzle)
                    ->orderBy('id', 'desc')
                    ->select('id', 'status', 'time')
                    ->where('user_id', $user->id)
                    ->limit(5)
                    ->get();

                $recordAverage = $user
                    ->recordAverages()
                    ->puzzle($scramble->puzzle)
                    ->current()
                    ->with('solves:id,time')
                    ->first();
            }

            return $this->success([
                'last5' => $last5,
                'recordAverage' => $recordAverage,
                'solve' => $solve,
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
                ->completed()
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
            ->completed()
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

    public function random()
    {
        try {
            $solve = Solve::completed()
                ->inRandomOrder()
                ->with('scramble')
                ->withUserSummary()
                ->firstOrFail();

            return $this->success([
                'solve' => $solve,
            ]);
        } catch (Exception $e) {
            return $this->failed($e);
        }
    }

    /**
     * Log a replay being viewed.
     *
     * @return Response
     */
    public function replay($id)
    {
        try {
            $solve = Solve::completed()->findOrFail($id);
            $solve->replay_count += 1;
            $solve->save();

            return $this->success([
                'solve' => $solve,
            ]);
        } catch (Exception $e) {
            return $this->failed($e);
        }
    }
}
