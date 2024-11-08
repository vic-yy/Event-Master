import { api } from '../api';

export async function getGroupByTitle(title: string) {
 return await api.get(`/group/getByTitle/${title}`)
}


export interface IGroup {
  id: number;
  title: string;
  description: string;
}

export const getGroups = async () => {
  const response = await api.get<IGroup[]>('/group/getAll');
  return response.data;
};
