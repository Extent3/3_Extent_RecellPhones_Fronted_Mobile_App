import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
export const apiCall = async ({ method, url, data, callback, setLoading }) => {
    console.log('#######method, url, data: ', method, url, data);
    if (setLoading) setLoading(true);
    // const token = AsyncStorage.getItem("token");
    const token = await AsyncStorage.getItem("token");

    try {
        await axios({
            method,
            url,
            data,
            headers: token && !url.includes("/login")
                ? { Authorization: `Bearer ${token}` }
                : {},
        }).then(response => {
            callback(response)
            console.log('response: ', response);
        });
    } catch (error) {
        console.log("ERROR:", error);
        if (error.response?.status === 401) {

            await AsyncStorage.clear();

            console.log(
                "TOKEN EXPIRED OR INVALID"
            );

            if (callback) {
                callback(error.response);
            }

            return;
        }

        if (error?.response) {
            if (callback) {
                callback(error.response);
            }

            return;
        }

    } finally {
        if (setLoading) setLoading(false);
    }
};

export const Spinner = () => (
    <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#000000" />
    </View>
);

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(255,255,255,0.7)',
        zIndex: 999,
    },
});

