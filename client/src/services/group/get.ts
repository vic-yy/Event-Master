import { api } from '../api';

interface IGetGroup{
    title: string;
}

export async function getGroupByTitle(body: IGetGroup) {
    return await api.get(/group/getGroupByTitle, body)
}
