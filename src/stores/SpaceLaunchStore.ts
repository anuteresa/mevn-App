import { defineStore } from 'pinia';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { Slaunch } from '@/components/Slaunch';
import { toast } from 'vue3-toastify'; 


type IsavedIds =
    {
        id: number,
    }

export const useLaunchStore = defineStore('launch', {

    state: () => ({
        allLaunches: [] as Slaunch[],
        savedLaunch: [] as Slaunch[],
        savedLaunchIds: [] as number[],
        baseURL: 'http://localhost:3000' as string,
        httpError: false as boolean,
    }),

    actions: {
        async fetchAllLaunches() {
            try {
                const response = await axios.get(`${this.baseURL}/allLaunch`);
                this.allLaunches = response.data;
            } catch (error) {
                this.errorHandler(error);
            }
        },

        async fetchSavedLaunches() {
            try {
                const response = await axios.get(`${this.baseURL}/getLaunch`);
                this.savedLaunch = response.data;
            } catch (error) {
                this.errorHandler(error);
            }
        },

        async addLaunch(launch_data: Slaunch) {
            try {
                const response = await axios.post(`${this.baseURL}/saveLaunch`, launch_data);
                this.savedLaunch.push(response.data);
                toast.success(response.data.message)             
                
            } catch (error) {
                this.errorHandler(error);
            }
            finally {
                this.fetchSavedLaunches();
                this.fetchsavedIds();
            }
        },

        async deleteLaunch(id: number) {
            try {
                const response = await axios.delete(`${this.baseURL}/removeLaunch/${id}`);
                this.savedLaunch = this.savedLaunch.filter(launch => launch._id !== id);
                toast.success(response.data.message)
                
                
            } catch (error) {
                
                this.errorHandler(error);
                
            }
        },

        async fetchsavedIds() {
            try {
                const response = await axios.get(`${this.baseURL}/savedLaunchId`);
                this.savedLaunchIds = response.data.map((item: IsavedIds) => item.id);
            } catch (error) {
                this.errorHandler(error); 
            }
        },
        
        errorHandler(error: unknown) {
            const err = error as AxiosError;
            if (err.response) {
                const errorMessage = err.response as AxiosResponse;
                if (errorMessage.data.message) {
                    toast.error (`Error: ${errorMessage.data.message}`)
                }
                 else {
                    toast.error ("Something wrong went") 
                } 
            }else{
                toast.error("Error: Request setup issue!"); 
            }
        },

       
        
    }
});