<?php namespace Bedard\AnalyticsExtension;

use System\Classes\PluginBase;

/**
 * AnalyticsExtension Plugin Information File
 */
class Plugin extends PluginBase
{
    /**
     * @var array   Require the RainLab.GoogleAnalytics plugin
     */
    public $require = ['RainLab.GoogleAnalytics'];
    
    /**
     * Returns information about this plugin.
     *
     * @return  array
     */
    public function pluginDetails()
    {
        return [
            'name'        => 'Analytics Extension',
            'description' => 'bedard.analyticsextension::lang.strings.plugin_description',
            'author'      => 'Scott Bedard',
            'icon'        => 'icon-bar-chart',
            'homepage'    => 'https://github.com/scottbedard/analyticsextension'
        ];
    }

    /**
     * Returns the extra report widgets.
     * 
     * @return  array
     */
    public function registerReportWidgets()
    {
        return [
            'Bedard\AnalyticsExtension\ReportWidgets\BarChart' => [
                'label'   => 'bedard.analyticsextension::lang.strings.barchart_label',
                'context' => 'dashboard'
            ],
            'Bedard\AnalyticsExtension\ReportWidgets\PercentageChart' => [
                'label'   => 'bedard.analyticsextension::lang.strings.percentage_label',
                'context' => 'dashboard'
            ],
            'Bedard\AnalyticsExtension\ReportWidgets\PieChart' => [
                'label'   => 'bedard.analyticsextension::lang.strings.piechart_label',
                'context' => 'dashboard'
            ]
        ];
    }
}
