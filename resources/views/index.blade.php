<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Speedcube.site</title>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap" rel="stylesheet">

    @unless ($local)
      @foreach ($manifest['src/main.ts']['css'] as $stylesheet)
        <link href="/dist/{{ $stylesheet }}" rel="stylesheet">
      @endforeach
    @endunless

    <script>
      window.context = {!! $context !!}
    </script>
  </head>
  <body class="bg-gray-100 font-sans text-gray-800 text-lg dark:bg-gray-900 dark:text-gray-100">
    <div
      class="flex flex-col min-h-screen"
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
