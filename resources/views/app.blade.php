<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="light">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx', "resources/js/pages/{$page['component']}.jsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'WriterOS') }}</title>
        </x-inertia::head>

        <script>
            // Restore theme before paint to prevent flash
            (function() {
                const theme = localStorage.getItem('writeros-theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
            })();
        </script>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
