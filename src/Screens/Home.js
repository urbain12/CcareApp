import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    LogBox,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5, FontAwesome, Ionicons, Entypo, AntDesign, MaterialIcons, Feather,Foundation } from "@expo/vector-icons";
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';


const Home = (props) => {
    const [Breeder, setBreeder] = useState('')
    const [responses, setResponses] = useState([])


    React.useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        async function setInfo() {

            const id = await AsyncStorage.getItem('user_id')
            axios.get(`https://e807-105-178-42-215.eu.ngrok.io/GetbreederbyId/${id}`).then((res) => {
                setBreeder(res.data[0])
                console.log(res.data[0])
            }).catch(err => {
                console.log(err)
            })
            axios.get(`https://e807-105-178-42-215.eu.ngrok.io/Casebyid/${id}`).then((res) => {
                setResponses(res.data)
            }).catch(err => {
                console.log(err)
            })

        }

        setInterval(() => {
            setInfo()
        }, 500)

    }, [])



    return (
        <>
            <StatusBar backgroundColor="#E9A800" translucent={false} hidden={false} barStyle="dark-content" />
            <View style={{
                height: "25%",
                paddingTop: 40,
                backgroundColor: '#E9A800',
                ...styles.shadow
            }}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={{ width: "20%", alignItems: "center" }}>
                        <Image style={{ height: 50, width: 50, borderRadius: 30 }} source={require('../Image/Logo.png')} />
                    </TouchableOpacity>

                    <View style={{ width: "50%", alignItems: "flex-start" }}>
                        <Text style={[styles.Title, { color: "#fff", fontSize: 22 }]}>{Breeder && Breeder.FirstName} {Breeder && Breeder.LastName}</Text>
                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate("Tips")} style={{ justifyContent: "center", alignItems: "flex-end", width: "25%",marginTop:-10 }}>
                    <Foundation name="lightbulb" size={38} color="white" />
                    <Text style={{color:"white",fontWeight:"500",fontSize:9,marginRight:6}}>Tips</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.Logo}>

                    <View >
                        <Text style={styles.content}>Case List</Text>
                    </View>
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} >

                    {JSON.stringify(responses) !== 'null' && JSON.stringify(responses) !== '[]' ? (
                        responses.map(response => {
                            return (
                                <>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('FullCase', { 'Message': response.Message, 'Symptoms': response.symptoms, 'cType': response.cattleType, 'Reply': response.reply, }) }} style={{ backgroundColor: "#023047", height: 100, width: 350, flexDirection: "row", marginTop: 20, marginHorizontal: 15, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                        <View style={{ justifyContent: "center", width: "65%", marginHorizontal: 20, }}>
                                            <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>{response.cattleType}</Text>
                                            <Text style={{ fontSize: 14, color: 'white', fontWeight: '500' }}>{response.send_at}</Text>
                                        </View>
                                        <View style={{ justifyContent: "center", alignItems: "flex-end", width: "20%" }}>
                                            <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
                                        </View>
                                    </TouchableOpacity>
                                </>
                            )
                        })
                    ) : (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>No case</Text>
                        </View>
                    )}


                </ScrollView>

            </View>

            <View style={{ backgroundColor: "#E9A800", height: 90, flexDirection: "row", alignItems: "center", shadowColor: '#999', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 2, shadowRadius: 5, elevation: 5, }}>



                <TouchableOpacity style={{ marginLeft: "0%", width: "30%", justifyContent: "center", alignItems: "center" }}
                    onPress={() => props.navigation.navigate("Home")}
                >

                    <FontAwesome name="home" size={35} color="#B47601" />
                </TouchableOpacity>


                <TouchableOpacity style={{ marginLeft: "0%", justifyContent: "center", alignItems: "center", width: "40%" }}
                    onPress={() => props.navigation.navigate("SendCase")}>

                    <FontAwesome name="send" size={30} color="white" />
                </TouchableOpacity>


                <TouchableOpacity style={{ marginLeft: "0%", justifyContent: "center", alignItems: "center", width: "30%" }}
                    onPress={() => props.navigation.navigate("Settings")}>

                    <FontAwesome5 name="user-cog" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </>
    );
};


export default Home;

const styles = StyleSheet.create({

    container: {
        flex: 1,


    },
    Title: {

        fontSize: 14,
        fontWeight: "bold",
        marginHorizontal: 4,
        marginTop: 10,
        color: "#05375a"
    },
    content: {

        fontSize: 30,
        fontWeight: "800",
        color: "#fff"
    },
    Texties: {

        fontSize: 12,
        fontWeight: "normal",
        marginHorizontal: 15,
        color: "#f4a261",
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
    },
    Logo: {
        backgroundColor: "#D38C03",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: "100%",
        height: "20%",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#707070",
        marginTop: -40,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 8,
    },

})
