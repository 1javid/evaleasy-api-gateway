# EvalEasy API Gateway

This project is an API Gateway for the EvalEasy application. It uses Express.js and http-proxy-middleware to forward requests to different microservices.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/evaleasy-api-gateway.git
cd evaleasy-api-gateway/api-gateway
```

2. Install the dependencies:

```sh
npm install
```

## Usage

1. Start the API Gateway:

```sh
node server.js
```

2. The API Gateway will be running on `http://127.0.0.1:4000`.

## Proxy Configuration

The API Gateway forwards requests to the following microservices:

- **ms_auth**: `https://auth.smarteval.tech/api/auth`
- **ms_test**: `https://test.smarteval.tech/api/test`
- **ms_assess**: `https://assess.smarteval.tech/api/assess`
- **ms_omr**: `https://omr.smarteval.tech/api/omr`

## Middleware

### CORS

CORS is enabled for all routes using the `cors` middleware.

### Preserve Original URL

A helper middleware `preserveOriginalUrl` is used to reset req.url to the original URL. This ensures that the mounted prefix (e.g., `/api/auth`) is preserved.