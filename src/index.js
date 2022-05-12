import UI from './modules/UI';
import registerHandlers from './helpers/registerHandlers';

import './styles.css';

import { firebaseConfig } from './config/firebaseConfig';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const signIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
};

const signOutUser = () => {
  signOut(getAuth());
};
const initFirebaseAuth = () => {
  onAuthStateChanged(getAuth(), authStateObserver);
};

const authStateObserver = (user) => {
  if (user) {
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();

    userPicElement.src = profilePicUrl;
    userNameElement.textContent = userName;

    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    signInButtonElement.setAttribute('hidden', 'true');
  } else {
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    signInButtonElement.removeAttribute('hidden');
  }
};

// Helpers
const getProfilePicUrl = () => {
  return getAuth().currentUser.photoURL || '/assets/profile_placeholder.png';
};

const getUserName = () => {
  return getAuth().currentUser.displayName;
};

const userNameElement = document.querySelector('#profile--username');
const userPicElement = document.querySelector('#profile--picture');
const signInButtonElement = document.querySelector('#sign-in-button');
const signOutButtonElement = document.querySelector('#sign-out-button');

// Auth
signInButtonElement.addEventListener('click', signIn);
signOutButtonElement.addEventListener('click', signOutUser);

initFirebaseAuth();

// Library UI
const ui = new UI();

registerHandlers(ui, signIn);
