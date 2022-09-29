import jwt_decode from 'jwt-decode';

export const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const decodedToken = jwt_decode(token);

  if (decodedToken.Role === 'Admin') return true;
  return false;
};
