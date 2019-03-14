<?php namespace Bedard\AnalyticsExtension\Traits;

use ApplicationException;
use Exception;
use RainLab\GoogleAnalytics\Classes\Analytics;

trait DataTrait {

    /**
     * Renders the widget
     */
    public function render()
    {
        try {
            $this->renderData();
        }
        catch (Exception $ex) {
            $this->vars['error'] = $ex->getMessage();
        }

        return $this->makePartial('widget');
    }

    /**
     * Loads the analytics data
     */
    protected function loadData()
    {
        if (!$days = $this->property('days'))
            throw new ApplicationException(trans('bedard.analyticsextension::lang.errors.invalid_days').$days);

        if (!$dimension = $this->property('dimension'))
            throw new ApplicationException(trans('bedard.analyticsextension::lang.errors.invalid_dimension').$dimension);

        if (!$metric = $this->property('metric'))
            throw new ApplicationException(trans('bedard.analyticsextension::lang.errors.invalid_metric').$metric);

        $obj = Analytics::instance();
        return $obj->service->data_ga->get(
            $obj->viewId,
            $days.'daysAgo',
            'today',
            $metric,
            ['dimensions' => $dimension, 'sort' => '-'.$metric]
        );
    }

}