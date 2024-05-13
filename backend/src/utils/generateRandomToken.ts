import crypto from 'crypto';
function generateVerificationToken() {
    return crypto.randomBytes(20).toString('hex');
}
export default generateVerificationToken;