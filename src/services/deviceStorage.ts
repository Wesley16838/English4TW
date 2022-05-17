import AsyncStorage from "@react-native-async-storage/async-storage";

const deviceStorage = {
    async saveItem(key: string, value: string) {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (e: unknown) {
            if(e instanceof Error){
                console.log('AsyncStorage Error: ' + e.message);
            }
        }
      }
};

export default deviceStorage;