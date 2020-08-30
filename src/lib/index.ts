import crypto from 'crypto';

/**
 * This function will return true on a valid shopify application proxy request.
 * @param parsedQueryString An object containing the complete query string.
 * @param shopifySecret The shopify secret for your app.
 * @returns boolean
 */
const verifyAppProxyHmac = (
    parsedQueryString: Record<string, string | string[]>,
    shopifySecret: string
): boolean => {
    if (
        !parsedQueryString ||
        typeof parsedQueryString !== 'object' ||
        !shopifySecret
    ) {
        return false;
    }

    const { signature, ...otherQueryParams } = parsedQueryString;

    const input = Object.keys(otherQueryParams)
        .sort()
        .map((key) => {
            const value = otherQueryParams[key];
            return `${key}=${value}`;
        })
        .join('');

    const hash = crypto
        .createHmac('sha256', shopifySecret)
        .update(input)
        .digest('hex');

    return signature === hash;
};

export default verifyAppProxyHmac;
