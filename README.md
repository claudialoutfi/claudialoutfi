# claudialoutfi

## Installation

```
git clone https://github.com/claudialoutfi/claudialoutfi.git
cd claudialoutfi
npm install
npm install -g bower gulp coffee-script forever
bower install
cp .env.sample .env
```

## Production

Compile source code (required before running application)

```
MINIFY=true gulp compile
```

Runs application using coffee

```
coffee server.coffee
```

## Environment variables

The `.env.sample` contains a sample configuration of the environment variables.

```
ENV              # Environment (development, staging or production)
PORT             # Port the application will listen on (example: 8080)
GA_TRACKING_CODE # Google Analytics tracking code
```
