<?php namespace Bedard\AnalyticsExtension\ReportWidgets;

use Backend\Classes\ReportWidgetBase;

/**
 * Google Analytics custom pie chart
 */
class PieChart extends ReportWidgetBase
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
                'title'             => 'bedard.analyticsextension::lang.piechart.widget_title',
                'default'           => 'Pie Chart',
                'type'              => 'string',
                'validationPattern' => '^.+$',
                'validationMessage' => 'bedard.analyticsextension::lang.piechart.title_required'
            ],
            'dimension' => [
                'title'             => 'bedard.analyticsextension::lang.piechart.dimension',
                'type'              => 'string',
                'validationPattern' => '^ga:[a-zA-Z]+$',
                'validationMessage' => 'bedard.analyticsextension::lang.piechart.invalid_dimension'
            ],
            'metric' => [
                'title'             => 'bedard.analyticsextension::lang.piechart.metric',
                'default'           => 'ga:visits',
                'type'              => 'string',
                'validationPattern' => '^ga:[a-zA-Z]+$',
                'validationMessage' => 'bedard.analyticsextension::lang.piechart.invalid_metric'
            ],
            'reportSize' => [
                'title'             => 'bedard.analyticsextension::lang.piechart.chart_radius',
                'default'           => '150',
                'type'              => 'string',
                'validationPattern' => '^[0-9]+$',
                'validationMessage' => 'bedard.analyticsextension::lang.piechart.chart_size_invalid'
            ],
            'center' => [
                'title'             => 'bedard.analyticsextension::lang.piechart.center_chart',
                'type'              => 'checkbox'
            ],
            'legendAsTable' => [
                'title'             => 'bedard.analyticsextension::lang.piechart.legend_as_table',
                'type'              => 'checkbox',
                'default'           => 1
            ],
            'displayTotal' => [
                'title'             => 'bedard.analyticsextension::lang.piechart.display_total',
                'type'              => 'checkbox',
                'default'           => 1
            ],
            'days' => [
                'title'             => 'bedard.analyticsextension::lang.piechart.days_to_display',
                'default'           => '30',
                'type'              => 'string',
                'validationPattern' => '^[0-9]+$'
            ],
            'number' => [
                'title'             => 'bedard.analyticsextension::lang.piechart.results_to_display',
                'default'           => '10',
                'type'              => 'string',
                'validationPattern' => '^[0-9]+$',
                'description'       => 'bedard.analyticsextension::lang.piechart.zero_displays_all'
            ],
            'description' => [
                'title'             => 'bedard.analyticsextension::lang.piechart.report_description'
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