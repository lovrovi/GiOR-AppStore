import jwt from 'jsonwebtoken';

export const isAdmin = () => {
  const token = localStorage.getItem('token');
  var decodedToken = jwt.decode(token, { complete: true });

  if (decodedToken.payload.Role === 'Admin') return true;
  return false;
};
