import {useState} from 'react';
import axios, {AxiosResponse} from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

class UserData {
  id: string;
  kakaoUserId: string | null;
  nickname: string | null;
}

function AuthSuccess() {
  const [userData, setUserData] = useState('')

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');

  const redirectUri = 'http://localhost:5173/auth/success';

  const apiEndpoint = '/auth/login/kakao';
  const requestBody = {
    redirectUri,
    code,
  };

  api
    .put(apiEndpoint, requestBody)
    .then(({data}: AxiosResponse<UserData>) => {
      console.log('success', data);
      const userDataString = JSON.stringify(data);
      setUserData(userDataString);
    })
    .catch(e => {
      console.error(e);
    })


  return (
    <div>
      <h1>Success</h1>
      <p>Welcome, {userData}</p>
    </div>
  );
}

export default AuthSuccess;
