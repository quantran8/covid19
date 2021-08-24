import fireBase from 'firebase';

export const firebaseUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = fireBase.auth().currentUser;
      if (user)
        resolve({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
        });
      else reject(new Error('User not found'));
    }, 500);
  });
};
