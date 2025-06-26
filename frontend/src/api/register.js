import axios from 'axios';

export const registerUser = async (email, username, password, password2) => {
  const response = await axios.post('http://localhost:8000/api/register/', {
    email,
    username,
    password,
    password2,
  });
  return response.data;
};
