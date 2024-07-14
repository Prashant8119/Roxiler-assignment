// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export const fetchTransactions = (month, page = 1, perPage = 10, search = '') => {
//   return axios.get(`${API_URL}/transactions`, {
//     params: { month, page, perPage, search },
//   });
// };

// export const fetchStatistics = (month) => {
//   return axios.get(`${API_URL}/statistics`, { params: { month } });
// };


/*

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchTransactions = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`, { params: { month } });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const fetchStatistics = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics`, { params: { month } });
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return null;
  }
};

*/ 


import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchTransactions = async (month, page = 1, perPage = 10, search = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`, {
      params: { month, page, perPage, search }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const fetchStatistics = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics`, {
      params: { month }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};