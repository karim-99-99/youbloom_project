import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Fetch all users
export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

// Fetch user by ID
export const fetchDataID = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user details');
  }
};

// Fetch user posts
export const fetchUserPosts = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw new Error('Failed to fetch user posts');
  }
};