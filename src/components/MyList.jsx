import React from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const AddDummyData = () => {
  const addDummyData = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (currentUser) {
      const userId = currentUser.uid;
      const database = getDatabase();
      const userRef = ref(database, `users/${userId}/data`);
      
      try {
        // Dummy data to be added
        const dummyData = {
          name: 'Avbhishek Rawt',
          email: 'john@example.com',
          age: 30
        };

        // Set the dummy data for the user
        await set(userRef, dummyData);

        console.log('Dummy data added successfully.');
      } catch (error) {
        console.error('Error adding dummy data:', error);
      }
    } else {
      console.log('No user logged in.');
    }
  };

  return (
    <button className='text-white' onClick={addDummyData}>Add Dummy Data</button>
  );
};

export default AddDummyData;
