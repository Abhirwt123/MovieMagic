import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { getFavMovie } from '../Redux/AppSlice';

const YourComponent = () => {
  const [data, setData] = useState(null);
  const dispatch=useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const dataRef = ref(db, 'MoviData/CGouUDLjvJcoxGhCujSRdO33PR43/data');
      
      try {
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    dispatch(getFavMovie(data))
  }, []);
};

export default YourComponent;
