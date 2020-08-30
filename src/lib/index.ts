import crypto from 'crypto';

/**
 * This function will return true on a valid shopify application proxy request.
 * @param parsedQueryString An object containing the complete query string.
 * @param shopifySecret The shopify secret for your app.
 * @param nonShopifyQueryParamKeys An array of keys to not use to create the signature. This is helpful if you have additional params added after shopify creates them.
 * @returns boolean
 */
const verifyAppProxyHmac = (
    parsedQueryString: Record<string, string | string[]>,
    shopifySecret: string,
    nonShopifyQueryParamKeys?: string[]
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
        .filter(
            (key) =>
                !nonShopifyQueryParamKeys ||
                !nonShopifyQueryParamKeys.includes(key)
        )
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
