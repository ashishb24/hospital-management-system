exports.generateOTP = () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

exports.appointmentId = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 30; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    var str = result;
    var parts = str.match(/.{1,8}/g);
    var new_value = parts.join("-");
    return new_value;
};

exports.hour = (hours) => {
    let hour;
    hours === "9:30" ? hour = 9 : hours === "12:30" ? hour = 12 : hours === "17:30" ? hour = 17 : ""
    return hour;
}

exports.getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}