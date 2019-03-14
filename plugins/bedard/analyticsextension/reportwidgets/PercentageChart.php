<?php namespace Bedard\AnalyticsExtension\ReportWidgets;

use Backend\Classes\ReportWidgetBase;

/**
 * Google Analytics custom percentage chart
 */
class PercentageChart extends ReportWidgetBase
{
    use \Bedard\AnalyticsExtension\Traits\DataTrait;

    /**
     * Define widget properties
     * @return  array
     */
    public function defineProperties()
    {
        return [
            'title' => [
                'title'             => 'bedard.analyticsextension::lang.percentage.widget_title',
                'default'           => 'Percentage Chart',
                'type'              => 'string',
                'validationPattern' => '^.+$',
                'validationMessage' => 'bedard.analyticsextension::lang.percentage.title_required'
            ],
            'dimension' => [
                'title'             => 'bedard.analyticsextension::lang.percentage.dimension',
                'type'              => 'string',
                'validationPattern' => '^ga:[a-zA-Z]+$',
                'validationMessage' => 'bedard.analyticsextension::lang.percentage.invalid_dimension'
            ],
            'metric' => [
                'title'             => 'bedard.analyticsextension::lang.percentage.metric',
                'default'           => 'ga:visits',
                'type'              => 'string',
                'validationPattern' => '^ga:[a-zA-Z]+$',
                'validationMessage' => 'bedard.analyticsextension::lang.percentage.invalid_metric'
            ],
            'dimensionLabel' => [
                'title'             => 'bedard.analyticsextension::lang.percentage.dimension_label',
                'type'              => 'string'
            ],
            'metricLabel' => [
                'title'             => 'bedard.analyticsextension::lang.percentage.metric_label',
                'type'              => 'string',
                'default'           => 'Visits'
            ],
            'days' => [
                'title'             => 'bedard.analyticsextension::lang.percentage.days_to_display',
                'default'           => '30',
                'type'              => 'string',
                'validationPattern' => '^[0-9]+$'
            ],
            'number' => [
                'title'             => 'bedard.analyticsextension::lang.percentage.results_to_display',
                'default'           => '10',
                'type'              => 'string',
                'validationPattern' => '^[0-9]+$',
                'description'       => 'bedard.analyticsextension::lang.percentage.zero_displays_all'
            ]
        ];
    }

    /**
     * Render the widget data
     */
    protected function renderData()
    {
        $data = $this->loadData();

        $rows = $data->getRows() ?: [];
        $number = $this->property('number') ?: 0;
        $this->vars['rows'] = $number > 0
            ? array_slice($rows, 0, $number)
            : $data->getRows();

        $total = 0;
        foreach ($rows as $row)
            $total += $row[1];

        $this->vars['total'] = $total;
    }
}