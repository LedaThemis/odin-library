import UI from './modules/UI';

import './styles.css';

import { firebaseConfig } from './config/firebaseConfig';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import Book from './modules/Book';
import { async } from '@firebase/util';

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

    readBooksFromFirestore().then((books) => appendBooks(books));
  } else {
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');
    addBookButtonElement.setAttribute('hidden', 'true');

    signInButtonElement.removeAttribute('hidden');
    signInNoticeElement.removeAttribute('hidden');
  }
};

// UI
const appendBook = ({ id, book }) => {
  const { title, author, pages, isRead } = book;
  const bookObject = new Book(title, author, pages, isRead);
  ui.library.appendBook(bookObject, id);
  ui.update();
};

const appendBooks = (books) => {
  for (let i = 0; i < books.length; i++) {
    appendBook(books[i]);
  }
};

// Firestore
const addBookToFirestore = async (book) => {
  const currentUserUID = `${getAuth().currentUser.uid}`;
  try {
    const docRef = await addDoc(collection(db, currentUserUID), {
      title: book.title,
      author: book.author,
      pages: book.pages,
      isRead: book.isRead,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding book: ', error);
  }
};

const readBooksFromFirestore = async () => {
  const resultArray = [];

  const currentUserUID = `${getAuth().currentUser.uid}`;
  const querySnapshot = await getDocs(collection(db, currentUserUID));
  querySnapshot.forEach((doc) => {
    const { title, author, pages, isRead } = doc.data();
    console.log(`${doc.id} => ${title}, ${author}, ${pages}, ${isRead}`);
    resultArray.push({ id: doc.id, book: doc.data() });
  });

  return resultArray;
};

const removeBookFromFirestore = async (bookID) => {
  const currentUserUID = `${getAuth().currentUser.uid}`;

  await deleteDoc(doc(db, currentUserUID, bookID));
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

export { addBookToFirestore, removeBookFromFirestore };
