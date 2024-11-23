import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Declare a variable to hold the exported data
let exportedData = {};

// Fetch data and update exportedData asynchronously
const userID = 1;
const stationID = 1;

const RequestData = ({ setData }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/requestData', {
          params: { userID, stationID },
        });

        // Filter the data you want to export
        exportedData = {
          username: response.data.username,
          userEmail: response.data.userEmail,
          userVisa: response.data.userVisa,
          userWallet: response.data.userWallet,
          targetPower: response.data.targetPower,
          chargePower: response.data.chargePower,
          chargeProcess: response.data.chargeProcess,
          cost: response.data.cost,
          payment: response.data.payment,
        };
        // Pass filtered data to parent
        setData(exportedData);
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [setData]);

  return error ? <p>{error}</p> : <p>Loading data...</p>;
};

// Export the data
export { exportedData };
export default RequestData;
