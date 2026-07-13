import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const dashboardApi = {
  getOverview: async () => {
    const { data } = await api.get('/dashboard/overview');
    return data.data;
  },
  getNetworkHealth: async () => {
    const { data } = await api.get('/dashboard/network-health');
    return data.data;
  },
  getIncidents: async () => {
    const { data } = await api.get('/dashboard/incidents');
    return data.data;
  },
  getAnalytics: async () => {
    const { data } = await api.get('/dashboard/analytics');
    return data.data;
  },
};

export const aiApi = {
  chat: async (message: string) => {
    const { data } = await api.post('/ai/chat', { message });
    return data;
  },
};

export default api;
