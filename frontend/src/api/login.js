import axios from 'axios';

export const loginUser = async (email, password) => {
  const response = await axios.post('http://localhost:8000/api/token/', {
    email,
    password
  });
  return response.data;
};