// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC9a52a5e3fa816adeb87ef3d03c1f18dd";
const authToken = "8fc2604809a081893beee6eec46a6b8b";
const verifySid = "VA67c0a2dc56e32d6ff71b706d414b51b1";
const client = require("twilio")(accountSid, authToken);

 
function SendSMS(phoneNumber) {

client.verify.v2
.services(verifySid)
.verifications.create({ to: `+1${phoneNumber}`, channel: "sms" })
.then((verification) => console.log(verification.status))
 
}


function VerifySMS(phoneNumber, code) {
    let res = undefined
    client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to:`+1${phoneNumber}`, code: code })
    .then((verification_check) =>  {
        res = verification_check.valid
    })
    console.log(res)
    return res
}

module.exports = {SendSMS, VerifySMS}