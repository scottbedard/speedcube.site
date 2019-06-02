# [speedcube.site](https://speedcube.site)

[![Uptime](https://img.shields.io/uptimerobot/ratio/7/m781868813-fbc9defa79cd3ab6d0c548ef.svg?style=flat)](https://uptimerobot.com/dashboard.php#781868813)
[![Master Build](https://img.shields.io/circleci/project/github/scottbedard/speedcube.site/master.svg?label=master)](https://circleci.com/gh/scottbedard/speedcube.site/tree/master)
[![Dev Build](https://img.shields.io/circleci/project/github/scottbedard/speedcube.site/dev.svg?label=dev)](https://circleci.com/gh/scottbedard/speedcube.site/tree/dev)
[![Coverage](https://img.shields.io/codecov/c/github/scottbedard/speedcube.site/master.svg)](https://codecov.io/gh/scottbedard/speedcube.site)
[![Dependencies](https://img.shields.io/david/scottbedard/speedcube.site.svg?path=themes%2Fsite&style=flat)](https://david-dm.org/scottbedard/speedcube.site?path=themes%2Fsite)
[![Dev dependencies](https://img.shields.io/david/dev/scottbedard/speedcube.site.svg?path=themes%2Fsite)](https://david-dm.org/scottbedard/speedcube.site?path=themes%2Fsite&type=dev)

## Inspiration and project goals

Several years ago, the excellent [hi-games.net](http://hi-games.net/) was created by Ryan Heise. This site was a lot of fun, and many talented people were using it. Unfortunately though, it didn't age well. The biggest problem was that [browsers were deprecating applets](https://blogs.oracle.com/java-platform-group/moving-to-a-plugin-free-web). This effectively killed hi-games, and really all java based gaming sites.

That's where this project begins though, with modern browsers we can make something better. Our goal is to be a speed cubing platform that just works. We currently support customizing, timed solves, replays, and in depth stats. We hope to someday host tournaments, provide memorization games, and much more.

## Creating a local environment

If you're familiar with [Laravel](https://laravel.com) or [Vue](https://vuejs.org), you're going to feel right at home. The recommended backend setup is a [Laravel Homestead](https://laravel.com/docs/homestead) box, but any environment that supports both PHP and Node should be fine.

1. Clone this repository, and rename `.env.example` to `.env`
2. Clone [`rainlab-user-api`](https://github.com/vuetober/rainlab-user-api) to `/plugins/vuetober/rainlabuserapi`
3. Execute `composer install` from the root directory
4. Execute `yarn install` from `/themes/site`
5. Build databases with `php artisan october:up`

Once this is done, the following commands will be available from `/themes/site`.

```bash
# build production assets
$ yarn build

# start the development server and watch for changes
$ yarn serve

# run tests
$ yarn test:unit
```

Our application is built with [October CMS](https://octobercms.com), their documentation will be helpful when in the backend.
