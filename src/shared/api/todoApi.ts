import { ITodo } from '@/src/entities/todo/model/ITodo';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000'; 

export const todoApi = {
  async fetchAll(): Promise<ITodo[]> {
    const res = await axios.get(`${API_URL}/todos`);
    return res.data;
  },
  async create(todo: ITodo): Promise<ITodo> {
    const res = await axios.post(`${API_URL}/todos`, todo);
    return res.data;
  },
  async update(id: string, todo: Partial<ITodo>): Promise<ITodo> {
    const res = await axios.put(`${API_URL}/todos/${id}`, todo);
    return res.data;
  },
  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/todos/${id}`);
  },
};