import * as SecureStore from 'expo-secure-store';

const authDeviceStorage = {
    async saveItem(key: string, value: string) {
        try {
          await SecureStore.setItemAsync(key, value);
        } catch (e: unknown) {
            if(e instanceof Error){
                console.log('Add SecoreStorage Error: ' + e.message);
            }
        }
    },
    async deleteItem(key: string) {
        try {
          await SecureStore.deleteItemAsync(key);
        } catch (e: unknown) {
            if(e instanceof Error){
                console.log('Remove SecoreStorage Error: ' + e.message);
            }
        }
    },
    async getItem(key: string) {
        try {
          const res = await SecureStore.getItemAsync(key);
          return res;
        } catch (e: unknown) {
            if(e instanceof Error){
                console.log('Get SecoreStorage Error: ' + e.message);
            }
        }
    },
};

export default authDeviceStorage;