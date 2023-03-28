const otpGenrator = require("otp-generator");

const OTP = otpGenrator.generate(6, {
    upperCaseAlphabet: false,
    specialChars: false,
    lowerCaseAlphabet: false,
});

module.exports= OTP; 