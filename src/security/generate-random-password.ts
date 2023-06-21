const generateRandomPassword = (length: number = 12) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const password = [];
  for (let i = 0; i < length; i++) {
    password.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }
  return password.join('');
};

export default generateRandomPassword;
