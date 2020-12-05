<?php

namespace Speedcube\Speedcube\Controllers;

use Backend\Classes\Controller;
use BackendMenu;
use October\Rain\Database\Builder;

/**
 * Configs Back-end Controller
 */
class Configs extends Controller
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
        'speedcube.speedcube.access_configs',
    ];

    /**
     * Construct.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Speedcube.Speedcube', 'speedcube', 'configs');
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
        return $query
            ->with('solvesCount')
            ->with('user');
    }
}
