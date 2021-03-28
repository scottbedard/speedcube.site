<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    @unless ($local)
      @foreach ($manifest['src/main.ts']['css'] as $stylesheet)
        <link href="/dist/{{ $stylesheet }}" rel="stylesheet">
      @endforeach
    @endunless
  </head>
  <body>
    <div id="app"></div>
    @if (app()->environment('local'))
      <script type="module" src="http://localhost:3000/@vite/client"></script>
      <script type="module" src="http://localhost:3000/src/main.ts"></script>
    @else
      <script type="module" src="/dist/{{ $manifest['src/main.ts']['file'] }}"></script>
    @endif
  </body>
</html>
