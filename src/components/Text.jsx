import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { getFavMovie } from '../Redux/AppSlice';
import { auth } from '../Firebase/Firebase';

const YourComponent = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const db = getDatabase();
        const userId = currentUser.uid;
        const dataRef = ref(db, `MovieData/${userId}/data`); // Corrected path to "MovieData"
        try {
          const snapshot = await get(dataRef);
          if (snapshot.exists()) {
            setData(snapshot.val());
            dispatch(getFavMovie(snapshot.val())); // Dispatch action after setting data
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        console.log("No user logged in");
      }
    };

    fetchData();
  }, [dispatch]); // Added dispatch to dependency array


  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default YourComponent;
