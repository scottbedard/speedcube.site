# [speedcube.site](https://speedcube.site)

[![Uptime](https://img.shields.io/uptimerobot/ratio/7/m781868813-fbc9defa79cd3ab6d0c548ef.svg?style=flat)](https://uptimerobot.com/dashboard.php#781868813)
[![Master Build](https://img.shields.io/circleci/project/github/scottbedard/speedcube.site/master.svg?label=master)](https://circleci.com/gh/scottbedard/speedcube.site/tree/master)
[![Dev Build](https://img.shields.io/circleci/project/github/scottbedard/speedcube.site/dev.svg?label=dev)](https://circleci.com/gh/scottbedard/speedcube.site/tree/dev)
[![Coverage](https://img.shields.io/codecov/c/github/scottbedard/speedcube.site/master.svg)](https://codecov.io/gh/scottbedard/speedcube.site)
[![Dependencies](https://img.shields.io/david/scottbedard/speedcube.site.svg?path=themes%2Fsite&style=flat)](https://david-dm.org/scottbedard/speedcube.site?path=themes%2Fsite)
[![Dev dependencies](https://img.shields.io/david/dev/scottbedard/speedcube.site.svg?path=themes%2Fsite)](https://david-dm.org/scottbedard/speedcube.site?path=themes%2Fsite&type=dev)

## Inspiration and project goals

Several years ago, the excellent [hi-games.net](http://hi-games.net/) was created by Ryan Heise. This site was a lot of fun, and many talented speed cubers were using it. Unfortunately though, the site didn't age well. [The web moved away from Java applets](https://blogs.oracle.com/java-platform-group/moving-to-a-plugin-free-web), which effectively killed all Java or Flash based gaming sites.

That's where this project begins though. Our goal is to be a platform that works in any modern browser. We currently support timed solving, customization, replays, and in depth stats. We hope to someday host tournaments, provide memorization games, and so much more.

## Setting up a local environment

If you're familiar with [Laravel](https://laravel.com) or [Vue](https://vuejs.org), you're going to feel right at home. The recommended backend is a [Laravel Homestead](https://laravel.com/docs/homestead) box, but any environment that supports both PHP and Node should be fine.

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

Our application is built with [October CMS](https://octobercms.com), their documentation will be helpful when in the backend. If you're looking to get started on the frontend, use our [`/components`](https://speedcube.site/components) route as a sandbox.

## Badges

We support [shields.io endpoint badges](https://shields.io/endpoint). To demonstrate how they work, here are the current site records.

[![2x2 single](https://img.shields.io/endpoint.svg?url=https://speedcube.site/shields/single/2x2)](https://speedcube.site/shields/single/2x2/replay)
[![3x3 single](https://img.shields.io/endpoint.svg?url=https://speedcube.site/shields/single/3x3)](https://speedcube.site/shields/single/3x3/replay)
[![4x4 single](https://img.shields.io/endpoint.svg?url=https://speedcube.site/shields/single/4x4)](https://speedcube.site/shields/single/4x4/replay)
[![5x5 single](https://img.shields.io/endpoint.svg?url=https://speedcube.site/shields/single/5x5)](https://speedcube.site/shields/single/5x5/replay)

To generate a badge, use the following URLs

```
https://img.shields.io/endpoint.svg?url=https://speedcube.site/shields/single/{puzzle}
https://img.shields.io/endpoint.svg?url=https://speedcube.site/shields/average/{puzzle}
```

Use the following URL to link to a replay for the single solve.

```
https://speedcube.site/shields/single/{puzzle}/replay
```
