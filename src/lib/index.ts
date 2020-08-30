import crypto from 'crypto';

const verifyAppProxyHmac = (
    parsedQueryString: Record<string, string | string[]>,
    shopifySecret: string
): boolean => {
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
