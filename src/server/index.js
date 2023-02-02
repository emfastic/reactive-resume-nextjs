// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  child,
  update,
  push,
  onValue,
  remove,
} from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvSSmSRY1YXynd-gjdfBC-fi-nqzn5GKo",
  authDomain: "reactive-resume-bde21.firebaseapp.com",
  projectId: "reactive-resume-bde21",
  storageBucket: "reactive-resume-bde21.appspot.com",
  messagingSenderId: "784369660175",
  appId: "1:784369660175:web:c42eca650d6f39b20e4e7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
const db = getDatabase(app);

// Get database reference
const dbRef = ref(db);

// Initialize auth on firebase app
const auth = getAuth(app);

// Initialize google auth instance
const provider = new GoogleAuthProvider();

/* create new user instance in database */
function writeUserData(user) {
  set(ref(db, "users/" + user.uid), {
    email: user.email,
  });
}

/* used to verify valid domain to restrict users to BC community */
function validateBCEmail(email) {
  return email.split("@")[1] === "bc.edu";
}

/* returns exists if user has account, new user if account was created, invalid email if domain doesn't match */
function handleSignIn() {
  signInWithPopup(auth, provider).then((result) => {
    // The signed-in user info.
    const user = result.user;

    onValue(child(dbRef, `users/${user.uid}`), (snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else if (validateBCEmail(user.email)) {
        writeUserData(user);
        return snapshot.val();
      }
      return null;
    });
  });
}

/* Update the user's profile to contain a first name, last name, phone number, alt email, and website to be used on resume */
function updateProfile(firstName, lastName, phoneNumber, email, website) {
  // Get current user
  const user = auth.currentUser;

  // If a user is logged in update the profile, else log no user
  if (user) {
    update(ref(db, `users/${user.uid}`), {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      website: website,
    });
  } else {
    console.log("no current user");
  }
}

/* used to generate keyed database items (experiences, education) to prevent nesting based on same organization name */
function updateKeyedObjectSection(objArray, endpoint) {
  // Iterate through each item in the object array, generate a new key, and set item object for that key
  // Push object to the given endpoint
  objArray.forEach((item) => {
    push(ref(db, `users/${auth.currentUser.uid}/${endpoint}`), item);
  });
}

/* used to update skills section */
function updateStandardObjectSection(array, endpoint) {
  // Iterate through each item in array add to given endpoint
  array.forEach((item) => {
    update(ref(db, `users/${auth.currentUser.uid}/${endpoint}`), item);
  });
}

function updateExperience(endpoint, key, item) {
  update(ref(db, `users/${auth.currentUser.uid}/${endpoint}/${key}`), item);
}

function removeData(endpoint, key) {
  remove(ref(db, `users/${auth.currentUser.uid}/${endpoint}/${key}`));
}

export {
  handleSignIn,
  updateProfile,
  updateKeyedObjectSection,
  updateStandardObjectSection,
  updateExperience,
  auth,
  provider,
  validateBCEmail,
  writeUserData,
  dbRef,
  removeData,
};
