import axios from "axios";

const expressClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true,
});

export default expressClient;