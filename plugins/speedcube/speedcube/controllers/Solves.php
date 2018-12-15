<?php namespace Speedcube\Speedcube\Controllers;

use BackendMenu;
use Backend\Classes\Controller;
use Carbon\Carbon;
use DB;
use Speedcube\Speedcube\Models\Solve;

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

    public function index()
    {
        $this->loadScoreboard();

        $this->asExtension('ListController')->index();
    }

    public function listExtendQuery($query)
    {
        $query->with('user');
    }

    protected function loadScoreboard()
    {
        // top user this month
        $this->vars['mostSolves']= Solve::completed()
            ->thisMonth()
            ->select('user_id', DB::raw('count(*) as total'))
            ->groupBy('user_id')
            ->orderBy('total', 'desc')
            ->withUserSummary()
            ->remember(30)
            ->first();

        // dnf this month
        $this->vars['dnfThisMonth'] = Solve::dnf()
            ->thisMonth()
            ->remember(30)
            ->count();
    
        // dnf last month
        $this->vars['dnfLastMonth'] = Solve::dnf()
            ->lastMonth()
            ->rememberForever()
            ->count();

        // completed this month
        $this->vars['solvesThisMonth'] = Solve::completed()
            ->thisMonth()
            ->remember(30)
            ->count();
        
        // completed last month
        $this->vars['solvesLastMonth'] = Solve::completed()
            ->lastMonth()
            ->rememberForever()
            ->count();
    }
}
