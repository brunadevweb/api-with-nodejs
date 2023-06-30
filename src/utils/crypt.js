const crypto = require('crypto');
const { text } = require('express');

const algoritm = 'aes-256-ctr';
const secretKey = process.env.SECRETY_CRYPTO;
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algoritm, secretKey, iv);

    const encrypt = Buffer.concat([cipher.update(text.toString()), cipher.final]);

    return{
        iv: iv.toString('hex'),
        content: MediaEncryptedEvent.toString('hex'),
    };
};

const decrypt = hash => {
    const [newIv, text] = hash.split(":");

    const decipher = crypto.createDecipheriv(
        algoritm,
        secretKey,
        Buffer.from(newIv, 'hex'),
    );

    const decrypt = Buffer.concat(
        [decipher.update(Buffer.from(text, 'hex')), decipher.final()],
    );

    return decrypt.toString();
};

module.exports = {
    encrypt, 
    decrypt,
};
