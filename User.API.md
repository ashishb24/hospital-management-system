# _API Index_

- [01. User Register](#01-user-register)
- [02. Verify user](#02-verify-user)
- [03. Forgot password](#03-forgot-password)
- [04. Verify forgot password](#04-verify-forgot-password)
- [05. Login](#05-login)
- [06. Login 2FA verify](#06-login-2fa-verify)
- [07. Resend code](#07-resend-code)
- [08. User profile [auth]](#08-user-profile-auth)
- [09. Patch user profile [auth]](#09-patch-user-profile-auth)
- [10. Send code for patch user email or mobile number [auth]](#10-send-code-for-patch-user-email-or-mobile-number-auth)
- [11. Patch user email or mobile number [auth]](#11-patch-user-email-or-mobile-number-auth)
- [12. Deactivate Account [auth]](#12-deactivate-account-auth)
- [13. Change password [auth]](#13-change-password-auth)
- [14. Modify account's active state [auth]](#14-modify-accounts-active-state-auth)
- [15. Resend account activation/rest password email [auth]](#15-resend-account-activation-rest-password-email-auth)
- [16. Logout [auth]](#16-logout-auth)

# _API End Point_

**Route**: `localhost:3000/api/v1`

# _Postman Collection_

~ _**https://www.getpostman.com/collections/78f60a849f5f7a905897**_

# _Environments Variable for Postman_

(**Note** : _**Set this Environments Variable to your postman**_)

**url** => `localhost:3000/api/v1`

**token** => `"...Your Token"`

# _API Reference_

## 01. User Register

**Route:**
`/user/register`

**Method:**
`POST`

**Request payload:**

```json
{
  "name": "Mohin",
  "email": "mohinsheikh2011@gmail.com",
  "password": "user123",
  "confirmPass": "user123",
  "gender": "male",
  "mobileNumber": "8830186746",
  "dob": "2000-05-25"
}
```

- `password` is required.
- `email` `mobile_number` and `age` is required.
- After successful register, the api would send a verification code to the email or
  mobile number.

**Sample response:**

```json
{
  "status": 201,
  "message": "User created successfully. Registration code has been sent via email.",
  "response": {}
}
```

## 02. Verify user

**Route:**
`/user/register/verify`

**Method:**
`POST`

**Request payload:**

```json
{
  "email": "mohinsheikh2011@gmail.com",
  "otp": "030581"
}
```

- `email` and `otp` is required.
- After matching otp, The user can verify itself successfully.

**Sample response:**

```json
{
  "status": 200,
  "message": "User Verified Successfully!",
  "response": {}
}
```

## 03. Forgot password

**Route:**
`/user/password/forgot`

**Method:**
`POST`

**Request payload:**

```json
{
  "email": "mohinsheikh2011@gmail.com"
}
```

- `email` is required.
- After matching email, The otp has been sent to the user given email.

**Sample response:**

```json
{
  "status": 200,
  "message": "Registration code has been sent to mohinsheikh2011@gmail.com",
  "response": {}
}
```

## 04. Verify forgot password

**Route:**
`/user/password/forgot/verify`

**Method:**
`POST`

**Request payload:**

```json
{
  "email": "mohinsheikh2011@gmail.com",
  "otp": "907577",
  "newPassword": "user1234",
  "confirmPassword": "user1234"
}
```

- `email`, `otp`, `newPassword` and `confirmPassword`is required.
- using this service user can change password by verifying details.

**Sample response:**

```json
{
  "status": 200,
  "message": "Your password change Successfully.",
  "response": {}
}
```

## 05. Login

**Route:**
`/user/login`

**Method:**
`POST`

**Request payload:**

```json
{
  "email": "mohinsheikh2011@gmail.com",
  "password": "user123"
}
```

- `email`, and `password` is required.
- When user try to log in the registration code was sent the user email.

**Sample response:**

```json
{
  "status": 200,
  "message": "Registration code has been sent to mohinsheikh2011@gmail.com",
  "response": {}
}
```

## 06. Login 2FA verify

**Route:**
`/user/login/verify`

**Method:**
`POST`

**Request payload:**

```json
{
  "email": "mohinsheikh2011@gmail.com",
  "otp": "069135"
}
```

- `email`, and `otp` is required.
- After sending mail the otp received and this service called and new token has been generated.

**Sample response:**

```json
{
  "status": 200,
  "message": "User Token has been generated Successfully.",
  "response": {
    "token": "ey...eQJFm816eOFXNvkHLP_tyEy2hB6d6BFQOqPH9lLSquawk"
  }
}
```

## 07. Resend code

**Route:**
`/user/resend`

**Method:**
`POST`

**Request payload:**

```json
{
  "email": "mohinsheikh2011@gmail.com"
}
```

- `email` is required.
- If user not receive mail so user can call this api for send mail again.

**Sample response:**

```json
{
  "status": 200,
  "message": "Registration code has been sent to mohinsheikh2011@gmail.com",
  "response": {}
}
```

## 08. User profile [auth]

**Route:**
`/user/profile`

**Method:**
`GET`

- This API can decode token anf fetch user detail.

**Sample response:**

```json
{
  "status": 200,
  "message": "Success.",
  "response": {
    "_id": "6313a39960747e504a85af1c",
    "name": "mohin",
    "email": "mohinsheikh2011@gmail.com",
    "mobileNumber": "8830186746",
    "gender": "male",
    "role": "user",
    "dob": "2000-05-25T00:00:00.000Z",
    "age": 22
  }
}
```

## 09. Patch user profile [auth]

**Route:**
`/user/update`

**Method:**
`PATCH`

**Request payload:**

```json
{
  "name": "mohin",
  "dob": "2000-05-25",
  "gender": "male"
}
```

- Only `name` and `age` can be updated using this service.

**Sample response:**

```json
{
  "status": 200,
  "message": "User Updated Successfully.",
  "response": {}
}
```

## 10. Send code for patch user email or mobile number [auth]

**Route:**
`/user/update/security`

**Method:**
`POST`

**Request payload:** `Not Required`

- Using this service the `verification code` is sent to the user registered email.

**Sample response:**

```json
{
  "status": 200,
  "message": "Verification code has been sent to mohin.s@broadstairs.in",
  "response": {}
}
```

## 11. Patch user email or mobile number [auth]

**Route:**
`/user/update/security/verify`

**Method:**
`PATCH`

**Request payload:**

```json
{
  "otp": "951240",
  "mobileNumber": "+917746983502"
}
```

- `verification OTP` and `mobileNumber` or `email` is required.

**Sample response:**

```json
{
  "status": 200,
  "message": "User Updated Successfully.",
  "response": {}
}
```

## 12. Deactivate Account [auth]

**Route:**
`/user/delete`

**Method:**
`DELETE`

**Sample response:**

```json
{
  "status": 200,
  "message": "Account Has Been Deactivated Successfully.",
  "response": {}
}
```
