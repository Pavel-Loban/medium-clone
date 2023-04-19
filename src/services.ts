import axios from 'axios';




const BASE_URL = 'https://conduit.productionready.io'


export const instance = axios.create({
  baseURL: `${BASE_URL}`,
});


instance.interceptors.request.use((config) => {


  const JWTToken = localStorage.getItem('tokenConduit');

  if (JWTToken) {
  config.headers.Authorization = `Token ${localStorage.getItem('tokenConduit')}`;
}else{
}

  return config;
});


