function EncryptPassword(password) {
    var passwordSaltKey = '11ebf1673f3a4c08813e10851346ba06';
    var passwordSaltIv = 'dcb95b4564cb4667'

    var key = CryptoJS.enc.Utf8.parse(passwordSaltKey);
    var iv = CryptoJS.enc.Utf8.parse(passwordSaltIv);

    var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key, {
        keySize: 256 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    ////console.log(encryptedpassword)
    return encryptedpassword;
}