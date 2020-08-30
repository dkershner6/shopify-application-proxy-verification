# shopify-application-proxy-verification

Simple function to verify Shopify Application Proxy requests using HMAC

This package has no dependencies and is very tiny.

## Installation

`npm i shopify-application-proxy-verification`

## Usage

```typescript
import verifyAppProxyHmac from 'shopify-application-proxy-verification';

const verifyAppProxyRequest = (req, res, next) => {
    if ((verifyAppProxyHmac(req.query), process.env.SHOPIFY_SECRET)) {
        return next();
    }
    return res.status(403).json({ errorMessage: 'I don\t think so.' });
};
```
