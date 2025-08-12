// We are using the jwt-decode library to decode the token
import { jwtDecode } from 'jwt-decode';

// This function checks if a user is logged in by looking for a token
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

// This function gets the user's role from the decoded token
export const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.user.role;
    } catch (error) {
      console.error("Invalid token");
      return null;
    }
  }
  return null;
};

// This function handles logging the user out
export const logout = () => {
  localStorage.removeItem('token');
};