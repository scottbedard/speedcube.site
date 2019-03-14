<?php namespace Bedard\AnalyticsExtension\ReportWidgets;

use Backend\Classes\ReportWidgetBase;

/**
 * Google Analytics custom bar chart
 */
class BarChart extends ReportWidgetBase
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
                'title'             => 'bedard.analyticsextension::lang.barchart.widget_title',
                'default'           => 'Bar Chart',
                'type'              => 'string',
                'validationPattern' => '^.+$',
                'validationMessage' => 'bedard.analyticsextension::lang.barchart.widget_title_required'
            ],
            'dimension' => [
                'title'             => 'bedard.analyticsextension::lang.barchart.dimension',
                'type'              => 'string',
                'validationPattern' => '^ga:[a-zA-Z]+$',
                'validationMessage' => 'bedard.analyticsextension::lang.barchart.invalid_dimension'
            ],
            'metric' => [
                'title'             => 'bedard.analyticsextension::lang.barchart.metric',
                'default'           => 'ga:visits',
                'type'              => 'string',
                'validationPattern' => '^ga:[a-zA-Z]+$',
                'validationMessage' => 'bedard.analyticsextension::lang.barchart.invalid_metric'
            ],
            'reportHeight' => [
                'title'             => 'bedard.analyticsextension::lang.barchart.chart_height',
                'default'           => '200',
                'type'              => 'string',
                'validationPattern' => '^[0-9]+$',
                'validationMessage' => 'bedard.analyticsextension::lang.barchart.invalid_chart_height'
            ],
            'legendAsTable' => [
                'title'             => 'bedard.analyticsextension::lang.barchart.legend_as_table',
                'type'              => 'checkbox',
                'default'           => 1
            ],
            'days' => [
                'title'             => 'bedard.analyticsextension::lang.barchart.days_to_display',
                'default'           => '30',
                'type'              => 'string',
                'validationPattern' => '^[0-9]+$'
            ],
            'number' => [
                'title'             => 'bedard.analyticsextension::lang.barchart.results_to_display',
                'default'           => '10',
                'type'              => 'string',
                'validationPattern' => '^[0-9]+$',
                'description'       => 'bedard.analyticsextension::lang.barchart.zero_displays_all'
            ],
            'description' => [
                'title'             => ''
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

        $this->vars['total'] = $data->getTotalsForAllResults()[$this->property('metric')];
    }

}