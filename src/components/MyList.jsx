import React, { useEffect } from 'react';
import { getFirestore, collection, onSnapshot, query } from 'firebase/firestore';
import { auth } from '../Firebase/Firebase';

const MyList = () => {
  useEffect(() => {
    const getDataFromBase = async () => {
      const db = getFirestore();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const q = query(collection(db, `MoviData/${userId}/data`));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("lk");
        });
        return () => unsubscribe();
      }
    };
    getDataFromBase();
  }, []);

  return (
    <div>
      {/* Render your data here if needed */}
    </div>
  );
};

export default MyList;
