import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

// Validation helpers
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, one number, and one special character
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

export const getPasswordErrors = (password) => {
  const errors = [];
  if (password.length < 8) {
    errors.push("At least 8 characters");
  }
  if (!/\d/.test(password)) {
    errors.push("At least one number");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("At least one special character (!@#$%^&*)");
  }
  return errors;
};

// Sign up with email and password
export const handleSignUp = async (name, email, password) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with name
    await updateProfile(userCredential.user, {
      displayName: name
    });

    // Store user info in localStorage
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: name,
      token: await userCredential.user.getIdToken()
    };
    localStorage.setItem('skillset_user', JSON.stringify(userData));

    return { success: true, user: userCredential.user };
  } catch (error) {
    let errorMessage = "Something went wrong. Please try again.";
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "Account already exists with this email.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "Invalid email address.";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "Password is too weak.";
    }
    
    return { success: false, error: errorMessage };
  }
};

// Sign in with email and password
export const handleSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Store user info in localStorage
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      token: await userCredential.user.getIdToken()
    };
    localStorage.setItem('skillset_user', JSON.stringify(userData));

    return { success: true, user: userCredential.user };
  } catch (error) {
    let errorMessage = "Invalid email or password.";
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = "No account found with this email.";
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = "Invalid email or password.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "Invalid email address.";
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = "This account has been disabled.";
    }
    
    return { success: false, error: errorMessage };
  }
};

// Sign in with Google
export const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Store user info in localStorage
    const userData = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      token: await result.user.getIdToken()
    };
    localStorage.setItem('skillset_user', JSON.stringify(userData));

    return { success: true, user: result.user };
  } catch (error) {
    let errorMessage = "Failed to sign in with Google.";
    
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = "Sign in popup was closed.";
    } else if (error.code === 'auth/cancelled-popup-request') {
      errorMessage = "Sign in was cancelled.";
    }
    
    return { success: false, error: errorMessage };
  }
};

// Send password reset email
export const handlePasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { 
      success: true, 
      message: "If this email exists, a password reset link has been sent." 
    };
  } catch (error) {
    return { 
      success: false, 
      error: "Failed to send reset email. Please try again." 
    };
  }
};

// Sign out
export const handleSignOut = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('skillset_user');
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to sign out." };
  }
};

// Check if user is logged in
export const isUserLoggedIn = () => {
  const userData = localStorage.getItem('skillset_user');
  return userData !== null;
};

// Get current user data
export const getCurrentUser = () => {
  const userData = localStorage.getItem('skillset_user');
  return userData ? JSON.parse(userData) : null;
};

// TODO: Connect to MongoDB backend
// Example API endpoints for future backend integration:
/*
export const signUpWithBackend = async (name, email, password) => {
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('skillset_user', JSON.stringify(data.user));
      localStorage.setItem('skillset_token', data.token);
      return { success: true, user: data.user };
    }
    return { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: "Network error. Please try again." };
  }
};

export const signInWithBackend = async (email, password) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('skillset_user', JSON.stringify(data.user));
      localStorage.setItem('skillset_token', data.token);
      return { success: true, user: data.user };
    }
    return { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: "Network error. Please try again." };
  }
};
*/
