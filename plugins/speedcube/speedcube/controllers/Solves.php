<?php namespace Speedcube\Speedcube\Controllers;

use BackendMenu;
use Backend\Classes\Controller;

/**
 * Solves Back-end Controller
 */
class Solves extends Controller
{
    public $implement = [
        'Backend.Behaviors.FormController',
        'Backend.Behaviors.ListController'
    ];

    public $formConfig = 'config_form.yaml';
    public $listConfig = 'config_list.yaml';

    public $requiredPermissions = [
        'speedcube.speedcube.access_solves',
    ];

    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Speedcube.Speedcube', 'speedcube', 'solves');
    }

    public function listExtendQuery($query)
    {
        $query->with('user');
    }
}
