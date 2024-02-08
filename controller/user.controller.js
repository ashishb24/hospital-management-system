let argon2 = require('argon2');  // For Encrypt And Decrypting password
let moment = require('moment');
let userSchema = require('../schema/user.schema');
let { getJWTToken } = require('../security/jwt');
let template = require('../utils/template.utils');
let { mailer } = require('../utils/mail');
let { generateOTP, getAge } = require('../utils/utils');
let { status, message } = require('../validator/utils');
let { getResponseStructure } = require('../constants/response.structure');
let mailTemplate = require("../helper/template.helper");


exports.createUser = async (req, res) => {
    try {
        const user = new userSchema({
            name: req.body.name,
            email: req.body.email,
            password: await argon2.hash(req.body.password), // encrypt user password
            mobileNumber: req.body.mobileNumber,
            gender: req.body.gender,
            dob: req.body.dob,
            age: getAge(req.body.dob),
            otp: generateOTP(),
            
            confirmation_code_expiry: moment().add(15, 'minutes').toDate(),
        
        });
        const findUser = await userSchema.findOne({ $or: [{ email: user.email }, { mobileNumber: user.mobileNumber }] });
        if (findUser) {
            return res
                .status(status.conflict)
                .send(getResponseStructure(status.conflict, "User" + message.alreadyExist));
        }
        const signup = mailTemplate.signup(user.name, user.otp); // generating mail template
        // await mailer(user["email"], "Account Verify", signup); // Sending Mail
        console.log(user.otp);
        await user.save()
            .then(() => {
                return res
                    .status(status.successCreated)
                    .send(getResponseStructure(status.successCreated, "User" + message.otpSend));
            })
            .catch(() => {
                return res
                    .status(status.badRequest)
                    .send(getResponseStructure(status.badRequest, message.badRequest));
            });
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.verify = async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(status.notfound)
                .send(getResponseStructure(status.notfound, "User" + message.notFound));
        }
        if (moment(user["confirmation_code_expiry"]).isBefore(moment())) {
            return res
                .status(status.gone)
                .send(getResponseStructure(status.gone, "User" + message.codeExpire));
        }
        if (user["otp"] === req.body.otp) {
            user.confirmation_code_expiry = '';
            user.otp = '';
            user.status = "verified";
            user.isVerified = true
            await user.save()
                .then(() => {
                    return res
                        .status(status.success)
                        .send(getResponseStructure(status.success, "User" + message.verifiedSuccess));
                }).catch((error) => {
                    return res
                        .status(status.success)
                        .send(getResponseStructure(status.notfound, error.toString()));
                });
        } else {
            return res
                .status(status.notfound)
                .send(getResponseStructure(status.notfound, "User " + message.otpNotMatch));
        }
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.login = async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email, status: 'verified' });
        if (!user) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "user" + message.notFound));
        }
        if (await argon2.verify(user.password, req.body.password)) {
            user.otp = generateOTP();
            user.confirmation_code_expiry = moment().add(15, 'minutes').toDate();
            await user.save();
            const login = mailTemplate.login(user.name, user.otp);
            // await mailer(user["email"], "Login Code Verify", login);
            console.log(user.otp);
            return res
                .status(status.success)
                .send(getResponseStructure(status.success, message.codeSent + user.email));
        }
        return res
            .status(status.success)
            .send(status.notfound, message.notMatchPassword)
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.login2FA = async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email, status: "verified" });
        if (!user) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "User" + message.notFound));
        }
        if (user.otp !== req.body.otp) {
            return res
                .status(status.notfound)
                .send(getResponseStructure(status.notfound, message.otpNotMatch));
        }
        if (moment(user["confirmation_code_expiry"]).isBefore(moment())) {
            return res
                .status(status.gone)
                .send(getResponseStructure(status.gone, "User" + message.codeExpire));
        }
        user.otp = "";
        user.confirmation_code_expiry = "";
        await user.save();
        const generateToken = await getJWTToken({ user });  // Generating Token.
        return res
            .status(status.success)
            .send(getResponseStructure(status.success, "User" + message.tokenGenerateSuccess, { token: generateToken }));
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.resendCode = async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email, status: "verified" });
        if (!user) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "User" + message.notFound));
        }
        user.otp = generateOTP();
        user.confirmation_code_expiry = moment().add(15, 'minutes').toDate();
        await user.save();
        const resend = mailTemplate.resend(user.name, user.otp);
        await mailer(user.email, "RESEND MAIL FOR OTP", resend);
        return res
            .status(status.success)
            .send(getResponseStructure(status.success, message.codeSent + user.email));
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.getProfile = async (req, res) => {
    try {
        // req.user._id ==> Decoded Token Object Value
        const user = await userSchema.findOne({ _id: req.user._id, status: "verified" },
            {
                _id: 1,
                name: 1,
                email: 1,
                mobileNumber: 1,
                gender: 1,
                role: 1,
                dob: 1,
                age: 1
            }
        );
        if (!user) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "User" + message.notFound))
        }
        return res
            .status(status.success)
            .send(getResponseStructure(status.success, message.succeed, user));
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userSchema.findOne({ _id: req.user._id, status: "verified" });
        if (!user) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "User" + message.notFound));
        }
        await userSchema.findOneAndUpdate({ _id: user._id },
            {
                updatedAt: new Date(),
                name: req.body.name,
                dob: req.body.dob,
                gender: req.body.gender,
                age: getAge(req.body.dob)
            })
            .then(() => {
                return res
                    .status(status.success)
                    .send(getResponseStructure(status.success, "User" + message.updateSuccess));
            })
            .catch((err) => {
                return res
                    .status(status.notfound)
                    .send(getResponseStructure(status.notfound, message.notFound))
            })
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.updateMailAndNumber = async (req, res) => {
    try {
        const user = await userSchema.findOne({ _id: req.user._id, status: "verified" });
        if (!user) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "User" + message.notFound));
        }
        user.otp = generateOTP();
        
        user.confirmation_code_expiry = moment().add(15, 'minutes').toDate();
        await user.save();
        const update = mailTemplate.update(user.name, user.otp);
        console.log(user.otp);
        // await mailer(user['email'], "VERIFICATION", update);
        return res
            .status(status.success)
            .send(getResponseStructure(status.success, message.codeSent + user.email));
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.updateMailAndNumberVerify = async (req, res) => {
    try {
        const user = await userSchema.findOne({ _id: req.user._id, status: "verified" });
        if (!user) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "User" + message.notFound));
        }
        if (user.otp !== req.body.otp) {
            return res
                .status(status.notfound)
                .send(getResponseStructure(status.notfound, message.otpNotMatch));
        }
        // Checking the new email or mobile number that we entered is present in database or not.
        const findDuplicate = await userSchema.findOne({
            $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }]
        });
        // If (findDuplicate) is present we throw error called user already exist. 
        if (findDuplicate) {
            return res
                .status(status.conflict)
                .send(getResponseStructure(status.conflict, "User" + message.alreadyExist));
        }
        user.otp = "";
        user.confirmation_code_expiry = "";
        await user.save();
        await userSchema.updateOne({ _id: user._id }, { email: req.body.email, mobileNumber: req.body.mobileNumber })
            .then(() => {
                return res
                    .status(status.success)
                    .send(getResponseStructure(status.success, "User" + message.updateSuccess));
            })
            .catch((err) => {
                return res
                    .status(status.success)
                    .send(getResponseStructure(status.notfound, "User" + message.notFound));
            })
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.deactivate = async (req, res) => {
    try {
        const user = await userSchema.findById({ _id: req.user._id });
        if (!user) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "User" + message.notFound));
        }
        user.isVerified = false;
        user.status = 'not_verified';
        user.isDeleted = true;
        await user.save()
            .then(() => {
                return res
                    .status(status.success)
                    .send(getResponseStructure(status.success, message.deactivatedSuccess));
            })
            .catch((err) => {
                return res
                    .status(status.success)
                    .send(getResponseStructure(status.conflict, err.toString()));
            })
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email, status: "verified" });
        if (!user) {
            return res
                .status(status.notfound)
                .send(getResponseStructure(status.notfound, "User" + message.notFound));
        }
        user.otp = generateOTP();
        user.confirmation_code_expiry = moment().add(15, 'minutes').toDate();
        await user.save();
        console.log(user.otp);
        const forgotPass = mailTemplate.forgotPass(user.name, user.otp);
        // await mailer(user["email"], "FORGOT PASSWORD", forgotPass)
        return res
            .status(status.success)
            .send(getResponseStructure(status.success, message.codeSent + user["email"]));
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.verifyForgotPassword = async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email, status: "verified" });
        if (!user) {
            return res
                .status(status.notfound)
                .send(getResponseStructure(status.notfound, "User" + message.notFound));
        }
        if (moment(user["confirmation_code_expiry"]).isBefore(moment())) {
            return res
                .status(status.gone)
                .send(getResponseStructure(status.gone, message.codeExpire));
        }
        if (user.otp !== req.body.otp) {
            return res
                .status(status.notfound)
                .send(getResponseStructure(status.notfound, message.otpNotMatch));
        }
        if (req.body.newPassword !== req.body.confirmPassword) {
            return res
                .status(status.notfound)
                .send(getResponseStructure(status.notfound, message.notMatchPassword));
        }
        if (await argon2.verify(user["password"], req.body.confirmPassword)) {
            return res
                .status(status.notfound)
                .send(getResponseStructure(status.notfound, message.tryAnotherPassword));
        }
        user.password = await argon2.hash(req.body.confirmPassword);
        user.otp = "";
        user.confirmation_code_expiry = "";
        await user.save()
            .then(() => {
                return res
                    .status(status.success)
                    .send(getResponseStructure(status.success, message.passwordChangeSuccess));
            })
            .catch((err) => {
                return res
                    .status(status.success)
                    .send(getResponseStructure(status.notfound, err.message.toString()));
            })
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

// Currently, not working properly.
exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt"); // Token remove
       console.log("logout Successfully");
        res.redirect("/user/login"); // redirect Login Page.
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};