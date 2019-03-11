<?php

namespace Speedcube\Speedcube\Http\Controllers;

use Exception;
use Speedcube\Speedcube\Classes\ApiController;
use Speedcube\Speedcube\Models\PersonalRecord;

class RecordsController extends ApiController
{
    /**
     * Fetch user records.
     *
     * @return Response
     */
    public function index()
    {
        $pageSize = 20;

        try {
            $data = input();
            $puzzle = strtolower(array_get($data, 'puzzle', '3x3'));

            // count the number of records for this puzzle
            $total = PersonalRecord::puzzle($puzzle)->count();
            $lastPage = ceil($total / $pageSize);

            $page = min($lastPage, max(1, (int) array_get($data, 'page', 1)));

            // get the personal records and order them by time
            $records = PersonalRecord::puzzle($puzzle)
                ->joinSolve()
                ->select(
                    'speedcube_speedcube_personal_records.id',
                    'speedcube_speedcube_personal_records.solve_id',
                    'speedcube_speedcube_personal_records.user_id'
                )
                ->with([
                    'solve' => function ($solve) {
                        $solve->select('created_at', 'id', 'moves', 'time');
                    },
                    'user' => function ($user) {
                        $user->select('id', 'name', 'username');
                    },
                ])
                ->orderBy('speedcube_speedcube_solves.time', 'asc')
                ->skip(($page - 1) * $pageSize)
                ->take($pageSize)
                ->get();

            return $this->success([
                'pagination' => [
                    'current_page' => $page,
                    'last_page'    => $lastPage,
                    'page_size'    => $pageSize,
                    'total'        => $total,
                ],
                'puzzle'  => $puzzle,
                'records' => $records,
            ]);
        } catch (Exception $err) {
            return $this->failed($err);
        }
    }
}
