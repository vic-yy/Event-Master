import { api } from '../api';

export async function getGroupByTitle(title: string) {
 return await api.get(`/group/getByTitle/${title}`)
}
