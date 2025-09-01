import axios from 'axios';

// Criando a instância do axios para conectar com o backend
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API functions
export interface User {
  id: number;
  name: string;
  email: string;
  document: string;
  phone_number: string;
  company_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  document: string;
  phone_number: string;
  company_name: string;
}

export const userApi = {
  // Criar usuário
  create: async (userData: CreateUserData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Listar todos os usuários
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  // Deletar usuário
  delete: async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export default api;