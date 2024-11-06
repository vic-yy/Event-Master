import { api } from '../api';

export function logout() {
    return api.post('/user/logout');
}
