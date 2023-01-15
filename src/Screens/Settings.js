import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    ScrollView,
    TextInput,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5, FontAwesome, Feather, Ionicons, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/context';
import axios from 'axios';




const Settings = ({ navigation }) => {
    const [Breeder, setBreeder] = useState('')
    const format = (amount) => {
        return Number(amount)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')

    };

    useEffect(() => {
        async function setInfo() {

            const id = await AsyncStorage.getItem('user_id')
            axios.get(`https://1dfa-41-186-143-119.eu.ngrok.io/GetbreederbyId/${id}`).then((res) => {
                setBreeder(res.data[0])
            }).catch(err => {
                console.log(err)
            })

        }

        setInfo()

    }, [])

    const context = React.useContext(AuthContext)
    return (
        <>
            <StatusBar backgroundColor="#00bcd4" translucent={false} hidden={false} barStyle="dark-content" />
            <View style={{
                height: 100,
                paddingTop: 20,
                backgroundColor: '#2863A4',
                justifyContent: "center",
                ...styles.shadow
            }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "60%", alignItems: "flex-start", }}>
                        <Text style={[styles.Title, { color: "#fff", marginTop: 20, fontSize: 25, fontWeight: "bold" }]}>Profile</Text>
                    </View>

                </View>
            </View>


            <ScrollView>
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Guide")}>
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 5,marginHorizontal:20 }}>
                        <View style={{ width: "75%", marginLeft: -15, marginTop: 5 }}>
                            <Text style={styles.Title}>Names</Text>
                            <Text style={styles.Texties}>{Breeder && Breeder.FirstName} {Breeder && Breeder.LastName}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Guide")}>
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 5,marginHorizontal:20 }}>
                        <View style={{ width: "75%", marginLeft: -15, marginTop: 5 }}>
                            <Text style={styles.Title}>Email</Text>
                            <Text style={styles.Texties}>{Breeder && Breeder.email}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Guide")}>
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 5,marginHorizontal:20 }}>
                        <View style={{ width: "75%", marginLeft: -15, marginTop: 5 }}>
                            <Text style={styles.Title}>Phone number</Text>
                            <Text style={styles.Texties}>{Breeder && Breeder.phone}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Guide")}>
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 5,marginHorizontal:20 }}>
                        <View style={{ width: "85%", marginLeft: -15, marginTop: 5 }}>
                            <Text style={styles.Title}>Address</Text>
                            <Text style={styles.Texties}>{Breeder && Breeder.Province}, {Breeder && Breeder.District}, {Breeder && Breeder.Sector}, {Breeder && Breeder.Cell}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container} >
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 5 }}>

                        <View style={{ width: "15%", alignItems: "center", marginTop: 10 }}>
                            <MaterialCommunityIcons name="onepassword" size={30} color="#adb5bd" />
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")} style={{ width: "75%", marginLeft: -15, marginTop: 5 }}>
                            <Text style={styles.Title}>Change Password</Text>
                        </TouchableOpacity>

                        <View style={{ width: "10%", alignItems: "center", marginTop: 10 }}>
                            <MaterialIcons name="keyboard-arrow-right" size={30} color="#adb5bd" />
                        </View>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.container, { marginBottom: 50,backgroundColor:"#80B539" }]}
                    onPress={() => context.signOut()}
                >
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 5 }}>

                        <View style={{ width: "15%", alignItems: "center", marginTop: 10 }}>
                            <AntDesign name="logout" size={30} color="red" />
                        </View>

                        <View style={{ width: "85%", marginLeft: -15,justifyContent:"center" }}>
                            <Text style={[styles.Title,{color:"white"}]}>Sohoka</Text>
                        </View>

                    </View>
                </TouchableOpacity>

            </ScrollView>

            <View style={{ backgroundColor: "#2863A4", height: 90, flexDirection: "row", alignItems: "center", shadowColor: '#999', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 2, shadowRadius: 5, elevation: 5, }}>



                <TouchableOpacity style={{ marginLeft: "0%", width: "30%", justifyContent: "center", alignItems: "center" }}
                    onPress={() => navigation.navigate("Home")}
                >

                    <FontAwesome name="home" size={35} color="#fff" />
                </TouchableOpacity>


                <TouchableOpacity style={{ marginLeft: "0%", justifyContent: "center", alignItems: "center", width: "40%" }}
                    onPress={() => navigation.navigate("SendCase")}>

                    <FontAwesome name="send" size={30} color="white" />
                </TouchableOpacity>


                <TouchableOpacity style={{ marginLeft: "0%", justifyContent: "center", alignItems: "center", width: "30%" }}
                    onPress={() => navigation.navigate("Settings")}>

                    <FontAwesome5 name="user-cog" size={30} color="#80B539" />
                </TouchableOpacity>
            </View>
        </>
    );
};


export default Settings;

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#e0e0e0",
        height: 70,
        width: "92%",
        marginHorizontal: 15,
        marginTop: 25,
        borderRadius: 10,

    },
    Title: {

        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 15,
        marginTop: 10,
        color: "#05375a"
    },
    Texties: {

        fontSize: 14,
        fontWeight: "normal",
        marginHorizontal: 15,
        color: "#05375a",
        marginTop: 1,

    },
    shadow: {
        shadowColor: "#707070",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
    },
    Tab: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginLeft: 12,
        height: 50,
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        shadowColor: "#707070",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.5,
        // shadowRadius: 4.65,

        // elevation: 8,
    },
    textInput: {

        borderRadius: 10,
        alignSelf: 'center',
        height: 55,
        width: "90%",
        marginTop: 10,
        textAlign: "left",
        padding: 10,
        flex: 1,
        borderBottomWidth: 1
    }

})