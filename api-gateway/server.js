// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

/**
 * A helper middleware that resets req.url to the original URL.
 * This ensures that the mounted prefix (e.g. /api/auth) is preserved.
 */
const preserveOriginalUrl = (req, res, next) => {
    // req.originalUrl contains the full URL as requested by the client.
    req.url = req.originalUrl;
    next();
};

// Proxy configuration for ms_auth: Preserve /api/auth prefix.
app.use(
    '/api/auth',
    preserveOriginalUrl,
    createProxyMiddleware({
        target: 'https://auth.smarteval.tech',
        changeOrigin: true,
    })
);

// Proxy configuration for ms_test: Preserve /api/test prefix.
app.use(
    '/api/test',
    preserveOriginalUrl,
    createProxyMiddleware({
        target: 'https://test.smarteval.tech',
        changeOrigin: true,
    })
);

// Proxy configuration for ms_assess: Preserve /api/assess prefix.
app.use(
    '/api/assess',
    preserveOriginalUrl,
    createProxyMiddleware({
        target: 'https://assess.smarteval.tech',
        changeOrigin: true,
    })
);

// Proxy configuration for ms_assess: Preserve /api/omr prefix.
app.use(
    '/api/omr',
    preserveOriginalUrl,
    createProxyMiddleware({
        target: 'https://omr.smarteval.tech',
        changeOrigin: true,
    })
);

// Optionally, add a default route
app.get('/', (req, res) => {
    res.send('API Gateway is running.');
});

// Start the gateway on port 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`API Gateway listening on port ${PORT}`);
});