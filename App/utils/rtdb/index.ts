import { firebase } from '@react-native-firebase/database';
import Config from 'react-native-config';

export const RTDB = firebase.app().database(Config.FIREBASE_RTDB_URL);
