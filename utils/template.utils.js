// USER TEMPLATES
exports.signup =
    `Hi <b>#var</b>, <br><br>This is your OTP <b>#var</b> for <b>Account Registration</b >,
    <br>Your OTP valid only for <b>15 minutes</b>.`

exports.forgotPass =
    `Hi <b>#var</b>, <br><br>This is your OTP <b>#var</b> for <b>Verify Your Forgot Password</b >,
    <br>Your OTP valid only for <b>15 minutes</b>.`

exports.login =
    `Hi <b>#var</b>, <br><br>This is your OTP <b>#var</b> for <b>Verify Login</b >,
    <br>Your OTP valid only for <b>15 minutes</b>.`

exports.resend =
    `Hi <b>#var</b>, <br><br>This is your OTP <b>#var</b>,
    <br>Your OTP valid only for <b>15 minutes</b>.`

exports.update =
    `Hi <b>#var</b>, <br><br>This is your OTP <b>#var</b> for <b>Update Email or Mobile Number</b >,
    <br>Your OTP valid only for <b>15 minutes</b>.`


// APPOINTMENT TEMPLATES
exports.booked =
    `Hi <b>#var</b>, <br><br>Your Appointment has been successfully booked with <b>Dr. #var</b>.
    <br>This is your appointment ID: <b>#var</b>,
    <br>Your appointment has been Schedule on <b>#var</b> at <b>#var</b> to <b>#var</b>`

exports.schedule =
    `Hi <b>#var</b>, <br><br>Your Appointment will be start in 15 minutes.
    <br>Please Join given link before 5 minute.
    <br><b>Link</b>: #var
    <br><br>By <b>Xyla</b>.`