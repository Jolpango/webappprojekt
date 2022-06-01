import AsyncStorage from '@react-native-async-storage/async-storage';

const storageModel = {
    storeToken: async function storeToken(token: string, email: string) {
        try {
            const tokenAndDate = {
                token: token,
                date: new Date().getTime(),
                email: email
            };
            const jsonValue = JSON.stringify(tokenAndDate);

            await AsyncStorage.setItem('@token', jsonValue);
        } catch (e) {
            // saving error
        }
    },
    readToken: async function readToken(): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem('@token');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    },
    deleteToken: async function deleteToken() {
        await AsyncStorage.removeItem('@token');
    }
};

export default storageModel;