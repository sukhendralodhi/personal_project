# Difference between Authenticationa and Authorization

## Authentication
- Verifies who are you
- Happens first
- Uses username/password, JWT,OTP, etc
- Returns user identity
- Exmplae: Login

## Authorization
- Verifies what you can do
- Happens after authentication
- Uses roles, permission, plocies, etc
- Return access rights
- Example: Access Admin Dashboard

### Authentication (Who are you?)
When a user logs in:

```javascript
POST /login
{
  "email": "user@gmail.com",
  "password": "password123"
}
```

```javascript
const user = await User.findOne({ email });

const isMatch = await bcrypt.compare(
  password,
  user.password
);
```
