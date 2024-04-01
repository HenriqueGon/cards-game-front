import axios from "axios";
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  transformRequest: [data => {
    if (!data)
      return data;

    return JSON.stringify(snakecaseKeys(data));
  }],
  transformResponse: [data => {
    if (!data)
      return data;
    return camelcaseKeys(JSON.parse(data));
  }],
});

export default axiosInstance;
