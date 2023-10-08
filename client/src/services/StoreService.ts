import $api from "../http";
import {AxiosResponse} from 'axios';
import { PostItem } from "../models/PostItem";

export default class TestService {
    static async getAll(): Promise<AxiosResponse<Array<PostItem>>> {
        return $api.get('/post');
    }
    static async getOne(path: string): Promise<AxiosResponse<PostItem>> {
        return $api.get(`/post/${path}`);
    }
    static async create(path: string, formData: FormData): Promise<void> {
        return $api.post(`/post/${path}/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    static async edit(path: string, formData: FormData): Promise<void> {
        return $api.patch(`/post/${path}/edit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    static async delete(path: string): Promise<void> {
        return $api.delete(`/post/${path}/delete`);
    }
}