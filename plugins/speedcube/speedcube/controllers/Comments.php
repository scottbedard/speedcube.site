<?php namespace Speedcube\Speedcube\Controllers;

use BackendMenu;
use Backend\Classes\Controller;
use Speedcube\Speedcube\Models\Comment;

/**
 * Comments Back-end Controller
 */
class Comments extends Controller
{
    public $implement = [
        'Backend.Behaviors.FormController',
        'Backend.Behaviors.ListController'
    ];

    public $formConfig = 'config_form.yaml';
    public $listConfig = 'config_list.yaml';

    public $requiredPermissions = [
        'speedcube.speedcube.access_comments',
    ];

    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Speedcube.Speedcube', 'speedcube', 'comments');
    }

    public function index()
    {
        $this->loadScoreboard();
        $this->asExtension('ListController')->index();
    }

    public function listExtendQuery($query)
    {
        return $query->withUserSummary();
    }

    protected function loadScoreboard()
    {
        $this->vars['thisMonth'] = Comment::thisMonth()->count();
        $this->vars['lastMonth'] = Comment::lastMonth()->count();
    }
}
