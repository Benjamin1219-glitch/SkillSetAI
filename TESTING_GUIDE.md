# 🧪 Quick Testing Guide

## Test the Authentication System

Your server is running at: **http://localhost:5173**

---

## ✅ Test 1: Sign Up (New Account)

1. Click **"Get Started"** button on homepage
2. Modal opens → Click **"Don't have an account? Sign up"**
3. Fill in the form:
   ```
   Full Name: John Doe
   Email: test123@example.com
   Password: Test@123
   Confirm Password: Test@123
   ```
4. Click **"Sign Up"** button
5. **Expected:**
   - Button shows "Creating Account..." with spinner
   - Toast appears: ✅ "Account created successfully!"
   - Modal closes after 2 seconds
   - Check browser console: user data logged
   - Check localStorage: `skillset_user` key exists

---

## ✅ Test 2: Sign In (Existing Account)

1. Open modal again
2. Make sure you're on **Sign In** tab
3. Enter the credentials you just created:
   ```
   Email: test123@example.com
   Password: Test@123
   ```
4. Click **"Sign In"** button
5. **Expected:**
   - Button shows "Signing In..." with spinner
   - Toast appears: ✅ "Signed in successfully!"
   - Modal closes
   - Session stored in localStorage

---

## ✅ Test 3: Google Sign-In 🔥

1. Open modal
2. Scroll down to "Or continue with"
3. Click **"Google"** button
4. **Expected:**
   - Google popup opens
   - Select your Google account
   - Popup closes
   - Toast appears: ✅ "Signed in with Google successfully!"
   - Modal closes
   - User data stored in localStorage

---

## ✅ Test 4: Validation Errors

### Test Weak Password:
1. Open sign-up form
2. Enter:
   ```
   Password: weak
   ```
3. **Expected:** Red error text appears:
   - "At least 8 characters, At least one number, At least one special character"

### Test Password Mismatch:
1. Enter:
   ```
   Password: Test@123
   Confirm Password: Test@456
   ```
2. **Expected:** Red error: "Passwords do not match"

### Test Invalid Email:
1. Enter:
   ```
   Email: notanemail
   ```
2. **Expected:** Red error: "Please enter a valid email address"

### Test Existing Email:
1. Try signing up with same email twice
2. **Expected:** Toast error: 🚫 "Account already exists with this email"

---

## ✅ Test 5: Forgot Password

1. On Sign In form, click **"Forgot Password?"** link
2. New modal appears
3. Enter email:
   ```
   Email: test123@example.com
   ```
4. Click **"Send Reset Link"**
5. **Expected:**
   - Button shows "Sending..." with spinner
   - Toast appears: "If this email exists, a password reset link has been sent"
   - Check your email inbox for Firebase reset link
   - Click link to reset password

---

## ✅ Test 6: Already Logged In

1. Sign in successfully (session stored)
2. Try opening modal again
3. **Expected:**
   - Toast appears: "You are already logged in!"
   - Modal closes immediately

---

## ✅ Test 7: Logout (Dashboard)

1. After signing in, check localStorage:
   ```javascript
   localStorage.getItem('skillset_user')
   ```
2. Create logout button in Navbar or visit `/dashboard` (placeholder)
3. Click logout
4. **Expected:**
   - Toast: "Logged out successfully!"
   - localStorage cleared
   - Redirected to homepage

---

## ✅ Test 8: Session Persistence

1. Sign in successfully
2. **Refresh the page** (F5)
3. Open browser DevTools → Application → Local Storage
4. **Expected:**
   - `skillset_user` key still exists
   - User data intact
   - If you try to open modal, it says "already logged in"

---

## ✅ Test 9: Mobile Responsive

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone or Galaxy
4. Test sign-up form
5. **Expected:**
   - Modal fits screen
   - Inputs are touch-friendly
   - Keyboard doesn't push UI off-screen
   - Toast appears correctly

---

## ✅ Test 10: Error Handling

### Test Network Error:
1. Turn off WiFi or disconnect internet
2. Try to sign in
3. **Expected:** Toast error: 🚫 "Something went wrong. Please try again."

### Test Invalid Credentials:
1. Sign in with wrong password
2. **Expected:** Toast error: 🚫 "Invalid email or password"

---

## 🔍 Debug Checklist

If something doesn't work:

1. **Check Console** (F12 → Console tab)
   - Any Firebase errors?
   - Any React errors?

2. **Check Network** (F12 → Network tab)
   - Firebase API calls happening?
   - Status codes 200 or 400?

3. **Check localStorage** (F12 → Application → Local Storage)
   - `skillset_user` key exists?
   - Valid JSON data?

4. **Check Firebase Console**
   - Go to: https://console.firebase.google.com
   - Check Authentication → Users
   - See registered users?

---

## 📊 What to Look For

### ✅ Success Indicators:
- Green toast notifications
- Modal closes smoothly
- localStorage has user data
- No console errors
- Firebase Console shows new user

### 🚫 Error Indicators:
- Red toast notifications
- Red borders on input fields
- Error text below inputs
- Console errors
- Modal stays open

---

## 🎯 Key Test Cases

| Test | Input | Expected Result |
|------|-------|----------------|
| Valid Sign Up | `test@test.com`, `Test@123` | ✅ Account created |
| Duplicate Email | Same email twice | 🚫 "Account already exists" |
| Weak Password | `weak` | 🚫 Validation error |
| Invalid Email | `notanemail` | 🚫 "Invalid email" |
| Password Mismatch | Different passwords | 🚫 "Passwords do not match" |
| Valid Sign In | Correct credentials | ✅ Signed in |
| Wrong Password | `wrong@123` | 🚫 "Invalid email or password" |
| Google OAuth | Click Google button | ✅ Google popup → Signed in |
| Forgot Password | Valid email | ⚠️ Reset link sent |
| Already Logged In | Open modal when logged in | ✅ Auto-close with toast |

---

## 🚀 Quick Commands

### View localStorage:
```javascript
// In browser console
localStorage.getItem('skillset_user')
```

### Clear Session (Manual Logout):
```javascript
// In browser console
localStorage.removeItem('skillset_user')
```

### Check if Logged In:
```javascript
// In browser console
localStorage.getItem('skillset_user') !== null
```

---

## 📱 Mobile Testing Tips

1. **iOS Safari:**
   - Open in private/incognito mode
   - Test keyboard behavior
   - Check input focus

2. **Android Chrome:**
   - Test form auto-fill
   - Check toast positioning
   - Test Google sign-in popup

---

## 🎉 You're All Set!

The authentication system is **fully functional** and ready for testing.

**Next:** Try creating an account and explore the dashboard placeholder!

---

**Happy Testing! 🚀**
