<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // Replace with your actual frontend domain(s) before deploying.
    // Example: ['https://vinanurainini.com', 'https://www.vinanurainini.com']
    'allowed_origins' => [
        'http://localhost:5173',
        env('FRONTEND_URL', 'http://localhost:5173'),
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
