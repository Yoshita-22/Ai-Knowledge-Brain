let accessToken = null;

export const setAccessToken = (token) => {
    
  accessToken = token;
};
console.log("in token,",accessToken)
export const getAccessToken = () => accessToken;