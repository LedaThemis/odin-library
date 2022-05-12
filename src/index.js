import UI from './modules/UI';
import registerHandlers from './helpers/registerHandlers';

import './styles.css';

import { firebaseConfig } from './config/firebaseConfig';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ui = new UI();

registerHandlers(ui);
