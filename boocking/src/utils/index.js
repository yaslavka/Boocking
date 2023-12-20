
export const getAccessToken = () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken === null) {
      return undefined;
    }
    return accessToken;
  } catch (error) {
    return undefined;
  }
};

export const setAccessToken = (accessToken) => {
  localStorage.setItem('access_token', accessToken);
};


export const declOfNum = (number, titles) => {
  number = Math.abs(number);
  if (Number.isInteger(number)) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
            number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }
  return titles[1];
};
export const isValidUsername = (username) => {
  const usernameValidation = /^[A-Za-z0-9]+$/;
  return usernameValidation.test(username);
};
export const isValidPassword = (password) => {
  const passwordValidation = /^.{6,}$/;
  return passwordValidation.test(password);
};
export const isValidEmail = (email) => {
  const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const isValidPhone = (number) => {
  const numberValidation = /^\d+$/;
  return numberValidation.test(number);
};
