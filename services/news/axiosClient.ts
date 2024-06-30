import axios from "axios";

import { apiKey, baseURL } from "../instances";

const newsClient = axios.create({
  baseURL,
  headers: {
    "x-api-key": apiKey,
  },
});

export default newsClient;
