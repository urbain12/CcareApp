import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    ActivityIndicator,
    View
} from 'react-native';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import Settings from '../Screens/Settings';
import SendCase from '../Screens/SendCase';
import ChangePassword from '../Screens/ChangePassword';
import FullCase from '../Screens/FullCase';
import Tips from '../Screens/Tips';
import { AuthContext } from '../context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';


const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown: false
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});



async function registerForPushNotificationsAsync() {
    let token;
    console.log('token at start', token);
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            Alert.alert(
                "No Notification Permission",
                "please goto setting and on notification permission manual",
                [
                    { text: "cancel", onPress: () => console.log("cancel") },
                    { text: "Allow", onPress: () => Linking.openURL("app-settings:") },
                ],
                { cancelable: false }
            );
            return;
        }
        //    if (finalStatus !== 'granted') {
        //      alert('Failed to get push token for push notification!');
        //      return;
        //    }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

const HomeStackNavigator = (props) => {
    const [netState, setNetState] = useState(false)
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    // checkConnected().then(res => {
    //     setNetState(res)
    // })
    // const [isLoading,setIsLoading]=useState(true);
    const initialState = {
        isLoading: true,
        user_id: '',
        showAlert: true,
        token: null
    }

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    token: action.token,
                    user_id: action.user_id,
                    showAlert: true,
                    isLoading: false
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    token: action.token,
                    user_id: action.user_id,
                    showAlert: true,
                    isLoading: false
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    token: null,
                    user_id: null,
                    showAlert: true,
                    isLoading: false
                };
        }
    }

    const [loginState, dispatch] = React.useReducer(loginReducer, initialState)

    const authContext = useMemo(() => ({
        signIn: async (phone, password) => {
            // setUserToken('kdjf');
            // setIsLoading(false)

            const postObj = JSON.stringify({
                'phone': phone,
                'password': password,
            })
            console.log(postObj)

            // let my_token = localStorage.getItem('token');

            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                "Content-Type": "application/json",
                // Authorization: `Token ${my_token}`,
            };

            await axios.post("https://6599-41-186-143-119.eu.ngrok.io/breeder_login/", postObj)
                .then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        // console.log(res.data)
                        console.log(res.data.code)
                        const items = [['token', JSON.stringify(res.data.token)],
                        ['user_id', JSON.stringify(res.data.user_id)],
                        ['showAlert', 'true'],
                        ['showNotification', 'true']
                        ]
                        AsyncStorage.multiSet(items, () => {
                            console.log('asyncstorage set successfully')
                        });
                        dispatch({
                            type: 'LOGIN',
                            token: JSON.stringify(res.data.token),
                            user_id: JSON.stringify(res.data.user_id),
                            

                        })
                    }
                    else {
                        alert('Invalid phone or password!')
                    }
                }).catch((error) => {
                    if (error.response) {
                        console.log(error);
                        alert('Invalid phone or password!')
                    }
                })


        },
        signOut: async () => {

            try {
                await AsyncStorage.multiRemove(["token", "user_id"]);
            } catch (error) {
                console.log(error)
            }
            dispatch({ type: 'LOGOUT' })
        }
    }))

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
        setTimeout(async () => {
            await schedulePushNotification()
        }, 4000)
        setTimeout(async () => {
            // setIsLoading(false);
            let token;
            let user_id;

            token = null;
            user_id = null;


            try {
                //  await   AsyncStorage.multiRemove(["userToken", "userName", "email", "redirect_page","properties","tenant_info"]);
                const data = await AsyncStorage.multiGet(["token", "user_id"]);
                const new_data = data.map(entry => entry[1]);
                token = new_data[0]
                user_id = new_data[1]

                dispatch({
                    type: 'RETRIEVE_TOKEN',
                    token: token,
                    user_id: user_id,



                })
            } catch (error) {
                console.log(error)
            }

        }, 2000)
        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, [])

    if (netState === true) {
        if (!loaded) {
            return null;
        }
    }

    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='#000' />
            </View>
        )
    }
    else {
        if (loginState.token === null) {
            return (
                <AuthContext.Provider value={authContext}>
                    {/* <NavigationContainer> */}
                        <Stack.Navigator screenOptions={screenOptionStyle} >
                            <Stack.Screen name="Login" component={Login} />
                        </Stack.Navigator>
                    {/* </NavigationContainer> */}
                </AuthContext.Provider>
            )

        }
        return (
            <AuthContext.Provider value={authContext}>
                {/* <NavigationContainer> */}
                    <Stack.Navigator screenOptions={screenOptionStyle} >
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Settings" component={Settings} />
                        <Stack.Screen name="SendCase" component={SendCase} />
                        <Stack.Screen name="ChangePassword" component={ChangePassword} />
                        <Stack.Screen name="FullCase" component={FullCase} />
                        <Stack.Screen name="Tips" component={Tips} />
                    </Stack.Navigator>
                {/* </NavigationContainer> */}
            </AuthContext.Provider>
        );
    }
}


export default HomeStackNavigator;
