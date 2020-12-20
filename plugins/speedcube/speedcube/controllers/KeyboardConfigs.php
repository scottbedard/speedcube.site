<?php

namespace Speedcube\Speedcube\Controllers;

use Backend\Classes\Controller;
use BackendMenu;
use DB;
use October\Rain\Database\Builder;
use RainLab\User\Models\User;
use Speedcube\Speedcube\Classes\Puzzle;
use Speedcube\Speedcube\Models\KeyboardConfig;

/**
 * Keyboard Configs Back-end Controller
 */
class KeyboardConfigs extends Controller
{
    /**
     * @var string Configuration file for the `FormController` behavior.
     */
    public $formConfig = 'config_form.yaml';

    /**
     * @var array Behaviors that are implemented by this controller.
     */
    public $implement = [
        'Backend.Behaviors.FormController',
        'Backend.Behaviors.ListController',
    ];

    /**
     * @var string Configuration file for the `ListController` behavior.
     */
    public $listConfig = 'config_list.yaml';

    /**
     * @var array Required permissions.
     */
    public $requiredPermissions = [
        'speedcube.speedcube.access_keyboard_configs',
    ];

    /**
     * Construct
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Speedcube.Speedcube', 'speedcube', 'keyboardconfigs');
    }

    /**
     * Index.
     */
    public function index()
    {
        $this->loadScoreboard();

        $this->asExtension('ListController')->index();
    }

    /**
     * List extend query.
     *
     * @param October\Rain\Database\Builder $query
     *
     * @return October\Rain\Database\Builder
     */
    public function listExtendQuery(Builder $query): Builder
    {
        return $query->with('user:id,username');
    }

    /**
     * Load scoreboard.
     *
     * @return void
     */
    protected function loadScoreboard()
    {
        $totals = [];

        KeyboardConfig::select('puzzle_id', DB::raw('count(*) as total'))
            ->groupBy('puzzle_id')
            ->get()
            ->each(function ($result) use (&$totals) {
                $totals[ucfirst(Puzzle::getName($result->puzzle_id))] = $result->total;
            });

        $this->vars['totals'] = $totals;

        $this->vars['users'] = User::count();

        $this->vars['usersWithKeyboardConfigs'] = User::has('keyboardConfigs')->count();
    }
}
