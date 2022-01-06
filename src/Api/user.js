import fireBase from 'firebase';
export   const token = 'pk.eyJ1IjoicXVhbnRyYW44IiwiYSI6ImNreGZtczRyczFvMHMydG1mbXdtcTN4b2sifQ.YXqnq8nI8SXYgE-Y7a0ThQ';
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
