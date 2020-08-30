import verifyAppProxyHmac from '.';
import crypto from 'crypto';

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
});
