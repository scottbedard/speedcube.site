<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Speedcube.site</title>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet">

    @unless ($local)
      @foreach ($manifest['src/main.ts']['css'] as $stylesheet)
        <link href="/dist/{{ $stylesheet }}" rel="stylesheet">
      @endforeach
    @endunless
  </head>
  <body class="bg-gray-100 text-gray-800 min-h-screen dark:bg-gray-900 dark:text-gray-100">
    <div
      class="font-sans"
      id="app"
    ></div>

    @if ($local)
      <script type="module" src="http://localhost:3000/@vite/client"></script>
      <script type="module" src="http://localhost:3000/src/main.ts"></script>
    @else
      <script type="module" src="/dist/{{ $manifest['src/main.ts']['file'] }}"></script>
    @endif
  </body>
</html>
