import UI from './modules/UI';

import './styles.css';

import { firebaseConfig } from './config/firebaseConfig';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Auth
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
    addBookButtonElement.removeAttribute('hidden');

    signInButtonElement.setAttribute('hidden', 'true');
    signInNoticeElement.setAttribute('hidden', 'true');
  } else {
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');
    addBookButtonElement.setAttribute('hidden', 'true');

    signInButtonElement.removeAttribute('hidden');
    signInNoticeElement.removeAttribute('hidden');
  }
};

// Firestore
const addBookToFirestore = async (book) => {
  const currentUserUID = getAuth().currentUser.uid;
  try {
    const docRef = await addDoc(collection(db, `${currentUserUID}`), {
      title: book.title,
      author: book.author,
      pages: book.pages,
      isRead: book.isRead,
    });
  } catch (error) {
    console.error('Error adding book: ', error);
  }
};

// Helpers
const getProfilePicUrl = () => {
  return getAuth().currentUser.photoURL || '/assets/profile_placeholder.png';
};

const getUserName = () => {
  return getAuth().currentUser.displayName;
};
const signInNoticeElement = document.querySelector('#sign-in-notice');
const addBookButtonElement = document.querySelector('#add-new-book');
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

const newBookButton = document.querySelector('#add-new-book');
const closeFormButton = document.querySelector('#close--form--button');
const addBookButton = document.querySelector('#add-book');

newBookButton.addEventListener('click', ui.handleNewBookClick);
closeFormButton.addEventListener('click', ui.handleCloseFormClick);
addBookButton.addEventListener('click', (e) => {
  ui.handleAddBook(e);
});

export { addBookToFirestore };
