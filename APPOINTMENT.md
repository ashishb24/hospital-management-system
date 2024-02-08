# _API Index_

- [01. Create User Appointment](#01-create-user-appointment)
- [02. User All Appointments [auth]](#02-user-all-appointments-auth)
- [03. User Previously Booked Appointments [auth]](#03-user-previously-booked-appointments-auth)
- [04. User Future Booking Appointments [auth]](#04-user-future-booking-appointments-auth)
- [05. Cancel User Appointment [auth]](#05-cancel-user-appointment-auth)
- [06. Update User Appointments [auth]](#06-update-user-appointments-auth)

# _API End Point_

**Route**: `localhost:3000/api/v1`

# _Environments Variable for Postman_

(**Note** : _**Set this Environments Variable to your postman**_)

**url** => `localhost:3000/api/v1`

**token** => `"...Your Token"`

# _API Reference_

## 01. Create User Appointment

**Route:**
`/appointment/register`

**Method:**
`POST`

**Request payload:**

```json
{
  "time": "morning",
  "date": "2022-09-7"
}
```

- `time` and `date` is required.
- After successful register, the api would send a verification code to the email or mobile number.
- If user try to booked appointment on same time or date then it gives message "Slot is Already Booked Please Try Another Available Slot."

**Sample response:**

```json
{
  "status": 201,
  "message": "Created Successfully Appointment id has been successfully sent to       Johndoe2023@gmail.com",
  "response": {}
}
```

## 02. User All Appointments [auth]

**Route:**
`/appointment/fetch`

**Method:**
`GET`

- This API used token of the user.
- This API can decode token and fetch user all details.

**Sample response:**

```json
{
  "status": 200,
  "message": "Appointment fetch Successfully",
  "response": {
    "appointment": [
      {
        "_id": "630f25bea8103d8e35e1fb2a",
        "user": "630f2438a8103d8e35e1fb12",
        "bookingId": "Hz1fzMGO-oCCyVZuI-BPTnPh52-LWqmRX",
        "start": "9:30",
        "end": "10:30",
        "appointmentDate": "2022-09-06T18:30:00.000Z",
        "meet_link": "https://meet.google.com/fky-wofh-hfa",
        "isCancelled": false,
        "isBooked": true,
        "isNewPatient": true,
        "isDeleted": false,
        "createdAt": "2022-08-31T09:11:29.405Z",
        "updatedAt": "2022-08-31T09:11:29.405Z",
        "__v": 0
      }
    ]
  }
}
```

## 03. User Previously Booked Appointments [auth]

**Route:**
`/appointment/previous`

**Method:**
`GET`

- This API can decode token and fetch user future booking appointments.
- If it doesn't find any previously booked appointment then it gives blank response.

**Sample response:**

```json
{
  "status": 200,
  "message": "Appointment fetch Successfully",
  "response": {
    "appointment": []
  }
}
```

## 04. User Future Booking Appointments [auth]

**Route:**
`/appointment/future`

**Method:**
`GET`

- This API can decode token and fetch user booking appointments for the future
- If it doesn't find any previously booked appointment then it gives blank response.

**Sample response:**

```json
{
  "status": 200,
  "message": "Appointment fetch Successfully",
  "response": {
    "appointment": [
      {
        "_id": "630f25bea8103d8e35e1fb2a",
        "user": "630f2438a8103d8e35e1fb12",
        "bookingId": "Hz1fzMGO-oCCyVZuI-BPTnPh52-LWqmRX",
        "start": "9:30",
        "end": "10:30",
        "appointmentDate": "2022-09-06T18:30:00.000Z"
      }
    ]
  }
}
```

## 05. Cancel User Appointment [auth]

**Route:**
`/appointment/cancel`

**Method:**
`PATCH`

- This API can pass `id` in the url and Params.
- After passing the correct `id` it cancel the user appointment and pass message as "Appointment Cancelled Successfully" .
- If the passing `id` is not matched then it shows message as "Appointment Not Found."

**Request payload:**

```Query Params
            id    630e2db2a9876cf5c9a075ee
```

**Sample response:**

```json
{
  "status": 200,
  "message": "Appointment Cancelled Successfully.",
  "response": {}
}
```

## 06. Update User Appointments [auth]

**Route:**
`/appointment/update`

**Method:**
`PATCH`

**Request payload:**

```json
{
  "id": "630f25bea8103d8e35e1fb2a",
  "time": "evening",
  "date": "2022-09-08"
}
```

- `id`, `time` and `date` is required.
- This API also require the token of the user.
- If the passing `time` and `date` is not available(i.e. Holiday, Previous date or time) or
  booked then it shows message as "Slot is Already Booked Please Try Another Available Slot".
- If the slot is available then it passes message "Appointment Updated Successfully".

**Sample response:**

```json
{
  "status": 200,
  "message": "Appointment Updated Successfully.",
  "response": {}
}
```
