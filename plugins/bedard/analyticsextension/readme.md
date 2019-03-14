# Analytics Extension
Before installing the Google Analytics Extension plugin, make sure your project already has the  [RainLab Google Analytics](http://octobercms.com/plugin/rainlab-googleanalytics) plugin installed and configured. Once this is done, you're ready to start creating your perfect dashboard. Here are some examples to get you started...

### Bar Charts
Bar charts are great for comparing values against each other. In this example, we'll create a bar chart to show how many users are visiting our site in the 10 most common cities.

| Row                | Value      |
| :----------------- | :--------- |
| Widget Title       | Top Cities |
| Dimension          | ga:city    |
| Metric             | ga:users   |
| Results to display | 10         |

### Pie Charts
Pie charts are useful for displaying the make up of data as a whole. Here we'll create a pie chart comparing the number of returning visitors to first time visitors.

| Row                | Value         |
| :----------------- | :------------ |
| Widget Title       | Visitor Types |
| Dimension          | ga:userType   |
| Metric             | ga:sessions   |

### Percentage Charts
Percentage charts will display the make up of data as a percentage of it's total. In this final example, we'll create a percentage chart to display how much of our website's traffic is coming from various device categories.

| Row                | Value             |
| :----------------- | :---------------- |
| Widget Title       | Device Overview   |
| Dimension          | ga:deviceCategory |
| Metric             | ga:visits         |
| Dimension Label    | Device            |
| Metric Label       | Visits            |

### Google Analytics Documentation
[Click here](https://developers.google.com/analytics/devguides/reporting/core/dimsmets#cats=user,session,traffic_sources,adwords,goal_conversions,platform_or_device,geo_network,system,social_activities,page_tracking,content_grouping,internal_search,site_speed,app_tracking,event_tracking,ecommerce,social_interactions,user_timings,exceptions,content_experiments,custom_variables_or_columns,time,doubleclick_campaign_manager,audience,adsense,channel_grouping,related_products) for a complete list of dimension / metric combinations that may be used with your dashboard widgets.