import { makeAutoObservable } from "mobx";
import StoreService from "../services/StoreService";

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    async getAll() {
        try {
            const response = await StoreService.getAll()
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getOne(path: string) {
        try {
            const response = await StoreService.getOne(path);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async create(path: string, formData: FormData) {
        try {
            await StoreService.create(path, formData);
        } catch (error) {
            console.log(error);
        }
    }

    async edit(path: string, formData: FormData) {
        try {
            await StoreService.edit(path, formData);
        } catch (error) {
            console.log(error);
        }
    }

    async delete(path: string) {
        try {
            await StoreService.delete(path);
        } catch (error) {
            console.log(error);
        }
    }

}