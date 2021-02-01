import verifyAppProxyHmac from '.';

describe('verifyAppProxyHmac', () => {
    const TEST_SECRET = 'shppa_sdjkfgsdohslkbsdlvkb';

    it('Should correctly match a signature to its matching secret and query params', () => {
        const matchingSignature =
            '71ff7431e366f84aa0d95cb0a01aeb92c50e8d7597e8ef1a24588929c61a0112';
        const queryParams = {
            signature: matchingSignature,
            test: 'testing123',
            thisIsOnlyATest: 'true'
        };

        expect(verifyAppProxyHmac(queryParams, TEST_SECRET)).toBeTruthy();
    });

    it('Should remove non Shopify Query Params on demand', () => {
        const queryParams = {
            path_prefix: '/apps/yourApp',
            timestamp: '1598813183',
            addressId: '7777',
            signature:
                '3540716d7989d2af41589ad9e48aaa5a8c8425005d97620445f4c4cb4cc19e0a',
            customerId: '12344',
            shop: 'your-shop.myshopify.com'
        };

        expect(
            verifyAppProxyHmac(queryParams, TEST_SECRET, [
                'addressId',
                'customerId'
            ])
        ).toBeTruthy();
    });
});
