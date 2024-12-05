export const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    return {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    };
  }
  return {};
};