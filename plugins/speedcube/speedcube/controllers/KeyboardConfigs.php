<?php

namespace Speedcube\Speedcube\Controllers;

use Backend\Classes\Controller;
use BackendMenu;

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
}
