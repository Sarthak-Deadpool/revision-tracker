# Authentication APIs

---

# Register User

## Endpoint

```http
POST /api/auth/register
```

## Description

Creates a new user account. After successful registration, the user must verify their email (OTP) before logging in.

## Authentication

Not Required

## Request Body

```json
{
  "name": "Sarthak Arya",
  "email": "sarthak@example.com",
  "password": "Password@123"
}
```

## Validation Rules

### Name

* Required
* Must be a string
* Trim leading and trailing whitespace
* Minimum length: 2 characters
* Maximum length: 50 characters

### Email

* Required
* Must be a string
* Trim whitespace
* Convert to lowercase before storing
* Must be a valid email format
* Must be unique

### Password

* Required
* Must be a string
* Minimum length: 8 characters
* Maximum length: 128 characters
* Must contain at least:

  * One uppercase letter
  * One lowercase letter
  * One number
  * One special character

## Backend Flow

1. Validate request body.
2. Check if the email already exists.
3. Generate a 6-digit OTP.
4. Hash the OTP.
5. Send the OTP to the user's email.
6. Store the OTP with an expiration time.
7. Return a success response.

> **Note:** The user account is created only after successful OTP verification.

## Success Response (201)

```json
{
  "success": true,
  "message": "OTP sent successfully. Please verify your email."
}
```

## Error Responses

| Status Code | Description           |
| ----------- | --------------------- |
| 400         | Validation failed     |
| 409         | Email already exists  |
| 500         | Internal server error |

---

# Login User

## Endpoint

```http
POST /api/auth/login
```

## Description

Authenticates a verified user and creates a login session.

## Authentication

Not Required

## Request Body

```json
{
  "email": "sarthak@example.com",
  "password": "Password@123"
}
```

## Validation Rules

### Email

* Required
* Must be a valid email format

### Password

* Required

## Backend Flow

1. Validate request body.
2. Find the user by email.
3. If the user does not exist, return an invalid credentials response.
4. Check whether the email has been verified.
5. Compare the entered password with the stored bcrypt hash using `bcrypt.compare()`.
6. If the password is correct, generate a JWT.
7. Store the JWT in a secure HTTP-only cookie.
8. Return a success response.

## Success Response (200)

```json
{
  "success": true,
  "message": "Login successful.",
  "user": {
    "_id": "...",
    "name": "Sarthak Arya",
    "email": "sarthak@example.com",
    "avatar": "",
    "streak": 0,
    "longestStreak": 0
  }
}
```

## Error Responses

| Status Code | Description               |
| ----------- | ------------------------- |
| 400         | Validation failed         |
| 401         | Invalid email or password |
| 403         | Email not verified        |
| 500         | Internal server error     |

---

# Logout User

## Endpoint

```http
POST /api/auth/logout
```

## Description

Logs out the currently authenticated user by clearing the authentication cookie.

## Authentication

Required

## Backend Flow

1. Receive the logout request.
2. Clear the HTTP-only authentication cookie.
3. Return a success response.

## Success Response (200)

```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

## Error Responses

| Status Code | Description            |
| ----------- | ---------------------- |
| 401         | User not authenticated |
| 500         | Internal server error  |



# Get Current User

## Endpoint

```http
GET /api/auth/me
```

## Description

Returns the profile of the currently authenticated user.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Backend Flow

1. Read the JWT from the HTTP-only cookie.
2. Verify the JWT.
3. Extract the user ID from the token.
4. Find the user in the database.
5. Return the required profile information.

## Success Response (200)

```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Sarthak Arya",
    "email": "sarthak@example.com",
    "avatar": "",
    "streak": 15,
    "longestStreak": 30
  }
}
```

## Error Responses

| Status Code | Description                   |
| ----------- | ----------------------------- |
| 401         | Unauthorized or invalid token |
| 404         | User not found                |
| 500         | Internal server error         |



# Update Profile

## Endpoint

```http
PUT /api/auth/profile
```

## Description

Updates the profile information of the currently authenticated user.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Request Body

```json
{
  "name": "Sarthak Arya",
  "avatar": "https://your-cloudinary-url.com/avatar.jpg"
}
```

## Editable Fields

| Field         | Editable                       |
| ------------- | ------------------------------ |
| name          | ✅ Yes                          |
| avatar        | ✅ Yes                          |
| email         | ❌ No                           |
| streak        | ❌ No                           |
| longestStreak | ❌ No                           |
| password      | ❌ No (Use Change Password API) |

## Validation Rules

### Name

* Required
* Must be a string
* Trim leading and trailing whitespace
* Minimum length: 2 characters
* Maximum length: 50 characters

### Avatar

* Optional
* Must be a valid image URL

## Backend Flow

1. Verify the JWT from the HTTP-only cookie.
2. Extract the user ID from the token.
3. Validate the request body.
4. Create an update object containing only the allowed fields (`name` and `avatar`).
5. Ignore or reject any unexpected fields.
6. Update the user profile.
7. Return the updated user information.

## Success Response (200)

```json
{
  "success": true,
  "message": "Profile updated successfully.",
  "user": {
    "_id": "...",
    "name": "Sarthak Arya",
    "email": "sarthak@example.com",
    "avatar": "https://your-cloudinary-url.com/avatar.jpg",
    "streak": 15,
    "longestStreak": 30
  }
}
```

## Error Responses

| Status Code | Description           |
| ----------- | --------------------- |
| 400         | Validation failed     |
| 401         | Unauthorized          |
| 404         | User not found        |
| 500         | Internal server error |

## Security Notes

* Only `name` and `avatar` can be updated.
* The backend must never update fields directly from `req.body`.
* Fields such as `email`, `password`, `streak`, and `longestStreak` cannot be modified through this endpoint.


# Change Password

## Endpoint

```http
PUT /api/auth/change-password
```

## Description

Allows an authenticated user to change their account password.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Request Body

```json
{
  "currentPassword": "CurrentPassword@123",
  "newPassword": "NewPassword@123",
  "confirmPassword": "NewPassword@123"
}
```

## Validation Rules

### Current Password

* Required
* Must match the user's existing password

### New Password

* Required
* Minimum 8 characters
* Maximum 128 characters
* Must contain at least one uppercase letter
* Must contain at least one lowercase letter
* Must contain at least one number
* Must contain at least one special character
* Must not be the same as the current password

### Confirm Password

* Required
* Must exactly match the new password

## Backend Flow

1. Verify the JWT from the HTTP-only cookie.
2. Extract the user ID from the token.
3. Find the user in the database.
4. Verify the current password using `bcrypt.compare()`.
5. Validate the new password.
6. Check that the new password and confirm password match.
7. Ensure the new password is different from the current password.
8. Hash the new password using `bcrypt.hash()`.
9. Update the user's password.
10. Save the changes.
11. Return a success response.

## Success Response (200)

```json
{
  "success": true,
  "message": "Password changed successfully."
}
```

## Error Responses

| Status Code | Description                                             |
| ----------- | ------------------------------------------------------- |
| 400         | Current password is incorrect                           |
| 400         | New password and confirm password do not match          |
| 400         | New password cannot be the same as the current password |
| 400         | Password does not meet the required criteria            |
| 401         | Unauthorized                                            |
| 404         | User not found                                          |
| 500         | Internal server error                                   |

## Security Notes

* The current password must always be verified before allowing a password change.
* Passwords must never be stored or transmitted in plain text.
* The new password must be hashed before saving it to the database.
* The API must never return password hashes in the response.
* The authenticated user is identified using the JWT, so the frontend does not need to send the user's email or ID.




# Create Subject

## Endpoint

```http
POST /api/subjects
```

## Description

Creates a new subject for the authenticated user.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Request Body

```json
{
  "name": "DBMS",
  "description": "Database Management System"
}
```

## Validation Rules

### Name

* Required
* Must be a string
* Trim leading and trailing whitespace
* Minimum length: 2 characters
* Maximum length: 100 characters
* Must be unique per user (case-insensitive)

### Description

* Optional
* Must be a string
* Maximum length: 500 characters

## Backend Flow

1. Verify the JWT from the HTTP-only cookie.
2. Extract the user ID from the token.
3. Validate the request body.
4. Check whether a subject with the same name already exists for the authenticated user.
5. If it exists, return an error.
6. Create the subject.
7. Save it to the database.
8. Return the created subject.

## Success Response (201)

```json
{
  "success": true,
  "message": "Subject created successfully.",
  "subject": {
    "_id": "...",
    "name": "DBMS",
    "description": "Database Management System",
    "createdBy": "...",
    "createdAt": "..."
  }
}
```

## Error Responses

| Status Code | Description            |
| ----------- | ---------------------- |
| 400         | Validation failed      |
| 400         | Subject already exists |
| 401         | Unauthorized           |
| 500         | Internal server error  |

## Security Notes

* The authenticated user is identified using the JWT.
* The frontend must not send the `createdBy` field.
* Subject names must be unique for each user.
* Different users can have subjects with the same name.



# Get All Subjects

## Endpoint

```http
GET /api/subjects
```

## Description

Returns a paginated list of subjects belonging to the authenticated user.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Query Parameters

| Parameter | Required | Default     | Description                   |
| --------- | -------- | ----------- | ----------------------------- |
| `page`    | No       | `1`         | Page number                   |
| `limit`   | No       | `10`        | Number of subjects per page   |
| `search`  | No       | -           | Search subjects by name       |
| `sortBy`  | No       | `createdAt` | Sort by `name` or `createdAt` |
| `order`   | No       | `desc`      | Sort order (`asc` or `desc`)  |

### Example Request

```http
GET /api/subjects?page=1&limit=10&search=db&sortBy=name&order=asc
```

## Validation Rules

### Page

* Optional
* Must be a positive integer
* Default: `1`

### Limit

* Optional
* Must be a positive integer
* Maximum: `100`
* Default: `10`

### Search

* Optional
* String
* Performs a case-insensitive search on the subject name

### Sort By

Allowed values:

* `name`
* `createdAt`

Default: `createdAt`

### Order

Allowed values:

* `asc`
* `desc`

Default: `desc`

## Backend Flow

1. Verify the JWT from the HTTP-only cookie.
2. Extract the user ID from the token.
3. Read the query parameters.
4. Filter subjects belonging to the authenticated user.
5. Apply the search filter (if provided).
6. Apply sorting.
7. Apply pagination.
8. Return the paginated result.

## Success Response (200)

```json
{
  "success": true,
  "subjects": [
    {
      "_id": "...",
      "name": "DBMS",
      "description": "Database Management System"
    },
    {
      "_id": "...",
      "name": "Operating System",
      "description": "Operating System Concepts"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalSubjects": 48,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## Error Responses

| Status Code | Description              |
| ----------- | ------------------------ |
| 400         | Invalid query parameters |
| 401         | Unauthorized             |
| 500         | Internal server error    |

## Security Notes

* Only the authenticated user's subjects are returned.
* Pagination is applied to improve performance.
* Search is performed only on the authenticated user's data.
* The API must never return subjects belonging to another user.



# Get Subject by ID

## Endpoint

```http
GET /api/subjects/:subjectId
```

## Description

Returns the details of a specific subject belonging to the authenticated user.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Path Parameters

| Parameter   | Description                  |
| ----------- | ---------------------------- |
| `subjectId` | The unique ID of the subject |

## Backend Flow

1. Verify the JWT.
2. Extract the user ID from the token.
3. Validate the `subjectId`.
4. Find the subject using both:

   * `subjectId`
   * `createdBy = authenticated user`
5. If no subject is found, return **404 Not Found**.
6. Return the subject details.

## Success Response (200)

```json
{
  "success": true,
  "subject": {
    "_id": "...",
    "name": "DBMS",
    "description": "Database Management System",
    "createdAt": "..."
  }
}
```

## Error Responses

| Status Code | Description           |
| ----------- | --------------------- |
| 400         | Invalid subject ID    |
| 401         | Unauthorized          |
| 404         | Subject not found     |
| 500         | Internal server error |

## Security Notes

* A user can access only their own subjects.
* Always filter by both `subjectId` and `createdBy`.
* Never expose whether another user's subject exists.


    # Update Subject

## Endpoint

```http
PUT /api/subjects/:subjectId
```

## Description

Updates the details of a specific subject belonging to the authenticated user.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Path Parameters

| Parameter   | Description                  |
| ----------- | ---------------------------- |
| `subjectId` | The unique ID of the subject |

## Request Body

```json
{
  "name": "Database Management System",
  "description": "Updated subject description"
}
```

## Validation Rules

### Name

* Required
* Must be a string
* Trim leading and trailing whitespace
* Minimum length: 2 characters
* Maximum length: 100 characters
* Must be unique per user (case-insensitive)

### Description

* Optional
* Must be a string
* Maximum length: 500 characters

## Backend Flow

1. Verify the JWT.
2. Extract the user ID from the token.
3. Validate the `subjectId`.
4. Find the subject belonging to the authenticated user.
5. If the subject does not exist, return **404 Not Found**.
6. Check if another subject with the same name already exists for the same user.
7. If a duplicate exists, return **400 Bad Request**.
8. Update the allowed fields (`name` and `description`).
9. Save the updated subject.
10. Return the updated subject.

## Success Response (200)

```json
{
  "success": true,
  "message": "Subject updated successfully.",
  "subject": {
    "_id": "...",
    "name": "Database Management System",
    "description": "Updated subject description"
  }
}
```

## Error Responses

| Status Code | Description                           |
| ----------- | ------------------------------------- |
| 400         | Validation failed                     |
| 400         | Subject with this name already exists |
| 401         | Unauthorized                          |
| 404         | Subject not found                     |
| 500         | Internal server error                 |

## Security Notes

* Only `name` and `description` can be updated.
* A user can update only their own subjects.
* Subject names must remain unique per user.
* Always verify ownership before updating.



# Delete Subject

## Endpoint

```http
DELETE /api/subjects/:subjectId
```

## Description

Deletes a subject belonging to the authenticated user along with all topics associated with that subject.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Path Parameters

| Parameter   | Description                  |
| ----------- | ---------------------------- |
| `subjectId` | The unique ID of the subject |

## Backend Flow

1. Verify the JWT.
2. Extract the user ID from the token.
3. Validate the `subjectId`.
4. Find the subject belonging to the authenticated user.
5. If the subject does not exist, return **404 Not Found**.
6. Delete all topics associated with the subject.
7. Delete the subject.
8. Return a success response.

## Success Response (200)

```json
{
  "success": true,
  "message": "Subject and all associated topics deleted successfully."
}
```

## Error Responses

| Status Code | Description           |
| ----------- | --------------------- |
| 400         | Invalid subject ID    |
| 401         | Unauthorized          |
| 404         | Subject not found     |
| 500         | Internal server error |

## Security Notes

* A user can delete only their own subjects.
* Always verify ownership before deletion.
* Deleting a subject automatically deletes all topics associated with it (cascade delete).
* The API must never delete subjects belonging to another user.


# Create Topic

## Endpoint

```http
POST /api/topics
```

## Description

Creates a new topic under a specific subject for the authenticated user. The backend automatically initializes the revision schedule.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Request Body

```json
{
  "title": "SQL Joins",
  "description": "Learn INNER JOIN, LEFT JOIN, RIGHT JOIN and FULL JOIN.",
  "subjectId": "687d5b9c2a8f5f2c8a1d1234"
}
```

## Validation Rules

### Title

* Required
* Must be a string
* Trim leading and trailing whitespace
* Minimum length: 2 characters
* Maximum length: 100 characters

### Description

* Optional
* Must be a string
* Maximum length: 1000 characters

### Subject ID

* Required
* Must be a valid MongoDB ObjectId
* Must belong to the authenticated user

## Default Values (Backend)

| Field            | Default Value           |
| ---------------- | ----------------------- |
| status           | Pending                 |
| revisionCount    | 0                       |
| lastRevisedAt    | `null`                  |
| nextRevisionDate | Tomorrow                |
| createdAt        | Automatically generated |
| updatedAt        | Automatically generated |

## Business Rules

* The backend verifies that the subject belongs to the authenticated user.
* The frontend must not send `userId`.
* The frontend must not send `status`, `revisionCount`, `lastRevisedAt`, or `nextRevisionDate`.
* The backend automatically schedules the first revision for **tomorrow**.

## Backend Flow

1. Verify the JWT.
2. Extract the user ID from the token.
3. Validate the request body.
4. Verify that the subject exists and belongs to the authenticated user.
5. Create the topic with the default values.
6. Set `nextRevisionDate` to tomorrow.
7. Save the topic.
8. Return the created topic.

## Success Response (201)

```json
{
  "success": true,
  "message": "Topic created successfully.",
  "topic": {
    "_id": "...",
    "title": "SQL Joins",
    "description": "Learn INNER JOIN, LEFT JOIN, RIGHT JOIN and FULL JOIN.",
    "subjectId": "...",
    "status": "Pending",
    "revisionCount": 0,
    "nextRevisionDate": "2026-07-21T00:00:00.000Z",
    "lastRevisedAt": null,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Error Responses

| Status Code | Description           |
| ----------- | --------------------- |
| 400         | Validation failed     |
| 400         | Invalid subject ID    |
| 401         | Unauthorized          |
| 404         | Subject not found     |
| 500         | Internal server error |

## Security Notes

* A topic can only be created inside a subject owned by the authenticated user.
* The backend ignores any user-controlled values for `status`, `revisionCount`, `lastRevisedAt`, or `nextRevisionDate`.
* The revision schedule is managed entirely by the backend.


# Get All Topics

## Endpoint

```http
GET /api/topics
```

## Description

Returns a paginated list of topics belonging to the authenticated user. Supports filtering, searching, and sorting.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Query Parameters

| Parameter   | Required | Default            | Description                                                 |
| ----------- | -------- | ------------------ | ----------------------------------------------------------- |
| `page`      | No       | `1`                | Page number                                                 |
| `limit`     | No       | `10`               | Number of topics per page                                   |
| `search`    | No       | -                  | Search topics by title                                      |
| `subjectId` | No       | -                  | Filter topics by subject                                    |
| `status`    | No       | -                  | Filter by calculated status (`Pending`, `Due`, `Completed`) |
| `sortBy`    | No       | `nextRevisionDate` | Sort by `title`, `createdAt`, or `nextRevisionDate`         |
| `order`     | No       | `asc`              | Sort order (`asc` or `desc`)                                |

### Example Request

```http
GET /api/topics?page=1&limit=10&subjectId=687d5b9c2a8f5f2c8a1d1234&status=Due&search=join&sortBy=nextRevisionDate&order=asc
```

## Backend Flow

1. Verify the JWT.
2. Extract the user ID from the token.
3. Read and validate query parameters.
4. Filter topics belonging to the authenticated user.
5. Apply optional filters (`subjectId`, `search`).
6. Apply sorting.
7. Apply pagination.
8. Calculate the status (`Pending`, `Due`, or `Completed`) for each topic before sending the response.
9. Return the paginated result.

## Success Response (200)

```json
{
  "success": true,
  "topics": [
    {
      "_id": "...",
      "title": "SQL Joins",
      "description": "Learn JOIN operations",
      "subjectId": "...",
      "revisionCount": 1,
      "nextRevisionDate": "2026-07-24T00:00:00.000Z",
      "lastRevisedAt": "2026-07-21T00:00:00.000Z",
      "status": "Completed"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalTopics": 42,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## Error Responses

| Status Code | Description              |
| ----------- | ------------------------ |
| 400         | Invalid query parameters |
| 401         | Unauthorized             |
| 500         | Internal server error    |

## Security Notes

* Only topics belonging to the authenticated user are returned.
* The `status` field is **calculated dynamically** by the backend and is **not stored** in the database.
* Filtering, searching, and pagination are applied only to the authenticated user's data.


# Get Topic by ID

## Endpoint

```http
GET /api/topics/:topicId
```

## Description

Returns the details of a specific topic belonging to the authenticated user.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Path Parameters

| Parameter | Description                |
| --------- | -------------------------- |
| `topicId` | The unique ID of the topic |

## Backend Flow

1. Verify the JWT.
2. Extract the user ID from the token.
3. Validate the `topicId`.
4. Find the topic using both:

   * `topicId`
   * `userId`
5. If the topic does not exist, return **404 Not Found**.
6. Calculate the topic status dynamically.
7. Return the topic details.

## Success Response (200)

```json
{
  "success": true,
  "topic": {
    "_id": "...",
    "title": "SQL Joins",
    "description": "Learn JOIN operations",
    "subjectId": "...",
    "revisionCount": 2,
    "lastRevisedAt": "2026-07-21T10:30:00.000Z",
    "nextRevisionDate": "2026-07-24T10:30:00.000Z",
    "status": "Completed"
  }
}
```

## Error Responses

| Status Code | Description           |
| ----------- | --------------------- |
| 400         | Invalid topic ID      |
| 401         | Unauthorized          |
| 404         | Topic not found       |
| 500         | Internal server error |

## Security Notes

* Users can access only their own topics.
* Status is calculated dynamically and is not stored in the database.
* Always verify ownership before returning topic details.

---

# Update Topic

## Endpoint

```http
PUT /api/topics/:topicId
```

## Description

Updates the details of a specific topic belonging to the authenticated user.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Path Parameters

| Parameter | Description                |
| --------- | -------------------------- |
| `topicId` | The unique ID of the topic |

## Request Body

```json
{
  "title": "Advanced SQL Joins",
  "description": "Updated notes on JOIN operations",
  "subjectId": "687d5b9c2a8f5f2c8a1d1234"
}
```

## Validation Rules

### Title

* Required
* String
* Trim whitespace
* Minimum 2 characters
* Maximum 100 characters

### Description

* Optional
* String
* Maximum 1000 characters

### Subject ID

* Required
* Valid MongoDB ObjectId
* Must belong to the authenticated user

## Backend Flow

1. Verify the JWT.
2. Extract the user ID from the token.
3. Validate the `topicId`.
4. Find the topic belonging to the authenticated user.
5. Verify the new `subjectId` belongs to the authenticated user.
6. Update only the allowed fields (`title`, `description`, `subjectId`).
7. Save the updated topic.
8. Return the updated topic.

## Success Response (200)

```json
{
  "success": true,
  "message": "Topic updated successfully.",
  "topic": {
    "_id": "...",
    "title": "Advanced SQL Joins",
    "description": "Updated notes on JOIN operations",
    "subjectId": "687d5b9c2a8f5f2c8a1d1234"
  }
}
```

## Error Responses

| Status Code | Description           |
| ----------- | --------------------- |
| 400         | Validation failed     |
| 400         | Invalid subject ID    |
| 401         | Unauthorized          |
| 404         | Topic not found       |
| 500         | Internal server error |

## Security Notes

* Only `title`, `description`, and `subjectId` can be updated.
* `revisionCount`, `lastRevisedAt`, `nextRevisionDate`, and `userId` cannot be modified through this API.
* Always verify ownership of both the topic and the target subject.

---

# Delete Topic

## Endpoint

```http
DELETE /api/topics/:topicId
```

## Description

Deletes a topic belonging to the authenticated user.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Path Parameters

| Parameter | Description                |
| --------- | -------------------------- |
| `topicId` | The unique ID of the topic |

## Backend Flow

1. Verify the JWT.
2. Extract the user ID from the token.
3. Validate the `topicId`.
4. Find the topic belonging to the authenticated user.
5. If the topic does not exist, return **404 Not Found**.
6. Delete the topic.
7. Return a success response.

## Success Response (200)

```json
{
  "success": true,
  "message": "Topic deleted successfully."
}
```

## Error Responses

| Status Code | Description           |
| ----------- | --------------------- |
| 400         | Invalid topic ID      |
| 401         | Unauthorized          |
| 404         | Topic not found       |
| 500         | Internal server error |

## Security Notes

* Users can delete only their own topics.
* Always verify ownership before deleting a topic.
* Deleting a topic does not affect other topics or subjects.


# Mark Topic as Revised

## Endpoint

```http
PATCH /api/topics/:topicId/revise
```

## Description

Marks a topic as revised and automatically schedules the next revision according to the spaced repetition schedule.

## Authentication

Required (JWT stored in an HTTP-only cookie)

## Path Parameters

| Parameter | Description                |
| --------- | -------------------------- |
| `topicId` | The unique ID of the topic |

## Revision Schedule

| Revision Count | Next Revision |
| -------------: | ------------- |
|              1 | 1 day         |
|              2 | 3 days        |
|              3 | 7 days        |
|              4 | 15 days       |
|              5 | 30 days       |
|             6+ | 30 days       |

## Backend Flow

1. Verify the JWT.
2. Extract the user ID from the token.
3. Find the topic belonging to the authenticated user.
4. If the topic is not found, return **404 Not Found**.
5. Increment `revisionCount`.
6. Set `lastRevisedAt` to the current date and time.
7. Calculate `nextRevisionDate` based on the updated `revisionCount`.
8. Save the topic.
9. Return the updated topic.

## Success Response (200)

```json
{
  "success": true,
  "message": "Topic marked as revised successfully.",
  "topic": {
    "_id": "...",
    "title": "SQL Joins",
    "revisionCount": 3,
    "lastRevisedAt": "2026-07-20T08:30:00.000Z",
    "nextRevisionDate": "2026-07-27T08:30:00.000Z"
  }
}
```

## Error Responses

| Status Code | Description           |
| ----------- | --------------------- |
| 401         | Unauthorized          |
| 404         | Topic not found       |
| 500         | Internal server error |

## Security Notes

* Only the authenticated user can mark their own topics as revised.
* `revisionCount`, `lastRevisedAt`, and `nextRevisionDate` are managed exclusively by the backend.
* The revision schedule is calculated automatically after incrementing the revision count.
