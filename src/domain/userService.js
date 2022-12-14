import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from './firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; //1
import { v4 } from 'uuid';
import { SERVER_URL } from './serverConfig';
import swal from 'sweetalert';

const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    swal(`${err.message}
    
    Please kindly write to mymanga.henry@gmail.com to request for your account to be restored.`);
  }
};

export const registerWithEmailAndPassword = async (email, password, name) => {
  console.log('email: ', email, ' pwd: ', password);
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    res.user.sendEmailVerification().then(() => {
      console.log(
        'A verification email was sent to your address. Please clcik on provided link to confirm your account.'
      );
    });

    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        createUserInDB(res.user, token, name);
      })
      .catch((err) => {
        console.log('error getting auth token');
      });
  } catch (err) {
    console.error(err);
    swal(err.message);
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    swal('Password reset link sent!');
  } catch (err) {
    console.error(err);
    swal(err.message);
  }
};

export const logout = () => {
  auth.signOut();
};

export const createUserInDB = async (user, authToken, name) => {
  console.log('posting request to create user: ', user.email);
  if (user) {
    if (await userExists(user.uid)) {
      console.log('user already exists');
      return;
    }
    const splittedName = name ? name.split(' ') : ['First Name', 'Last Name'];
    const firstname = splittedName[0];
    const lastname = splittedName[1];
    axios
      .post(
        `${SERVER_URL}/user`,
        {
          email: user.email,
          firstname: firstname,
          lastname: lastname,
          id: user.uid,
        },
        {
          headers: {
            AuthToken: authToken,
          },
        }
      )
      .then((response) => {
        console.log('resp: ', response);
      })
      .catch((err) => {
        console.log('err: ', err.response.data);
      });
  }
};

// Disable User
export const disableUser = async (iduser) => {
  try {
    firebase
      .auth()
      .currentUser.getIdToken() //Obtengo en token del usuario actual
      .then((authToken) => {
        axios
          .delete(`${SERVER_URL}/user/${iduser}`, {
            headers: {
              AuthToken: authToken,
            },
          })
          .then((r) => {
            console.log('Se borro con exito', r);
          })
          .catch((e) => {
            console.log(e);
          });
      });
  } catch (error) {
    console.log(error);
  }
};

//Active user
export const activeUser = async (iduser) => {
  try {
    await firebase
      .auth()
      .currentUser.getIdToken() //Obtengo en token del usuario actual
      .then((authToken) => {
        axios
          .put(
            `${SERVER_URL}/undelete/user/${iduser}`,
            {},
            {
              headers: {
                AuthToken: authToken,
              },
            }
          )
          .then((r) => {
            console.log('Se reactivo con exito', r);
          })
          .catch((e) => {
            console.log(e);
          });
      });
  } catch (error) {
    console.log(error);
  }
};

const userExists = async (userId) => {
  console.log('checking if ' + userId + ' exists');
  const response = await fetch(`${SERVER_URL}/user/${userId}`);
  const user = await response.json();
  console.log('userexists responded: ', user.id);
  return user.id === 'undefined';
};

export const fetchUserData = async () => {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return { 'currentUser: ': 'no user logged in right now' };
  console.log('fetching data for user: ', firebaseUser.uid);
  try {
    const response = await fetch(`${SERVER_URL}/user/${firebaseUser.uid}`);
    const user = await response.json();
    if (user.id === undefined) {
      console.log('user not yet created in database, creating now...');
      auth.currentUser
        .getIdToken()
        .then((token) => {
          try {
            createUserInDB(firebaseUser, token, firebaseUser.displayName);
          } catch (error) {
            console.error(error);
            swal(error.message);
          }
        })
        .catch((err) => {
          console.log('error getting auth token');
        });
    }
    return user;
  } catch (error) {
    console.log('error fetching user data: ', error);
  }
};

export const storage = getStorage(app);

export async function uploadFile(file) {
  if (!file) return;
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

export default firebase;
