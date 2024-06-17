import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

// FIXME: tipar env
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const queryClient = new QueryClient();
