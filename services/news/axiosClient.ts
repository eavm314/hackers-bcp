"use server"
import axios from 'axios';

const baseURL = process.env.NEWS_URL; // Replace with your desired URL
const apiKey = process.env.NEWS_API_KEY; // Replace with your desired API key

const newsClient = axios.create({
  baseURL,
  headers: {
    'x-api-key': apiKey,
  }
});

export default newsClient;