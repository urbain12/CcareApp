import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground,
    Dimensions,
    StatusBar,
    Button
} from "react-native";

import axios from 'axios';
import utils from "axios/lib/utils.js";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from '@expo/vector-icons/Entypo';
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

const SendCase = ({ navigation }) => {
    const [symptoms, setsymptoms] = useState('')
    const [cType, setcType] = useState('')
    const [Message, setMessage] = useState({})
    const [Image, setImage] = useState(null)
    const [myID, setMyID] = useState('')
    const [breeder, setbreeder] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        async function setInfo() {

            const id = await AsyncStorage.getItem('user_id')
            setMyID(id)
            axios.get(`https://e807-105-178-42-215.eu.ngrok.io/GetbreederbyId/${id}`).then((res) => {
                setbreeder(res.data[0])
            })
                .catch(err => {
                    console.log(err)
                })

        }

        setInfo()

    }, [])

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const postObj = JSON.stringify({
            'user': myID,
            'Message': Message,
            'symptoms': symptoms,
            'cattleType': cType,
            'Sector': breeder.Sector,
         
          })
      
       
        console.log(postObj)

        // let my_token =  await AsyncStorage.getItem('token')

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            // Authorization: `Token ${my_token}`,
        };

        axios.post('https://e807-105-178-42-215.eu.ngrok.io/CreateCase/', postObj).then((res) => {
            console.log(res.status)
            alert("Sent successfull")
            navigation.navigate('Home')
        })
        .then((res) => {
          console.log(res)
        })
        .catch(err => {
            alert(err)
        })

        setTimeout(() => {
            setLoading(false)
        }, 5000)

    }


    const renderHeader = () => {

        return (

            <View style={{ width: windowWidth, backgroundColor: '#E9A800', height: windowHeight / 8, flexDirection: 'row' }}>
                <StatusBar backgroundColor='#E9A800' barStyle="light-content" />

                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: '25%', alignItems: 'center', justifyContent: 'center', marginTop: '8%' }}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', marginTop: '8%', flexDirection: 'row' }}>


                    <Text style={{ color: 'white', fontSize: 18, fontWeight: "bold" }}>Send New Case</Text>
                </View>
                <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: '8%' }}>

                </View>

            </View>
        );
    }


    function renderTrade() {

        return (
            <View
                style={{
                    marginTop: 20,
                    marginHorizontal: 20,
                    padding: 20,
                    borderRadius: 20,
                    backgroundColor: "#fff",
                    ...styles.shadow,
                }}
            >
                <View>
                    <TouchableOpacity activeOpacity={1}>

                        <View >
                            <Picker
                                mode='dropdown'
                                style={{
                                    marginTop: 10,
                                    width: '85%',
                                    alignSelf: 'center'
                                }}
                                selectedValue={symptoms}
                                onValueChange={(val) => { setsymptoms(val) }}
                            >
                                <Picker.Item label="Select Symptoms" value="Select Symptoms" />
                                <Picker.Item label="High fever" value="High fever" />
                                <Picker.Item value="Abortion" label="Abortion" />
                                <Picker.Item value="Diarrhoea" label="Diarrhoea" />
                                <Picker.Item value="Vomitting blood" label="Vomitting blood" />
                                <Picker.Item value="Loose appetit" label="Loose appetit" />
                                <Picker.Item value="Excessive Bleeding" label="Excessive Bleeding" />
                                <Picker.Item value="Swelling brain" label="Swelling brain" />
                                <Picker.Item value="Ocular disease" label="Ocular disease" />
                                <Picker.Item value="Gum bleeding" label="Gum bleeding" />
                                <Picker.Item value="Nose bleeding" label="Nose bleeding" />
                                <Picker.Item value="Weakness" label="Weakness" />

                            </Picker>
                        </View>
                        <View >
                            <Picker
                                mode='dropdown'
                                style={{
                                    marginTop: 10,
                                    width: '85%',
                                    alignSelf: 'center'
                                }}
                                selectedValue={cType}
                                onValueChange={(val) => { setcType(val) }}
                            >
                                <Picker.Item label="Select Cattle Type" value="SelectCattle Type" />
                                <Picker.Item value="Inka zikamwa" label="Inka zikamwa" />
                                <Picker.Item value="Inka zidakamwa" label="Inka zidakamwa" />
                                <Picker.Item value="Ishashi" label="Ishashi" />
                                <Picker.Item value="Ikimasa" label="Ikimasa" />
                                <Picker.Item value="Inyana" label="Inyana" />
                            </Picker>
                        </View>
                        <View style={styles.action}>
                            <TextInput
                                numberOfLines={5}
                                multiline={true}
                                placeholder="Explain case!"
                                placeholderTextColor="#7d7d7d"
                                style={{ borderRadius: 10, width: '90%', height: 100, margin: 20, padding: 20, color: "black", backgroundColor: "#f5f6fb" }}
                                onChangeText={(val) => { setMessage(val) }}
                            />
                        </View>

                        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Button title="Pick a picture" onPress={pickImage} />
                        </View> */}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ marginTop: 20 }} onPress={(e) => { handleSubmit(e) }}>

                    <View style={{ backgroundColor: "#80B539", width: "100%", alignItems: "center", borderRadius: 10, justifyContent: "center", paddingBottom: 10, paddingTop: 10 }}>
                        {loading ? (
                            <ActivityIndicator size='large' color='white' style={{ marginTop: 10 }} />
                        ) :
                            (
                                <Text style={{ color: "white", marginTop: 10, fontSize: 20, fontWeight: "bold" }}>Send</Text>
                            )}

                    </View>


                </TouchableOpacity>
            </View>
        );
    }

    function renderTransactionHistory() { }

    return (
        <View style={{ flex: 1 }}>
            <View>
                {renderHeader()}
            </View>


            <ScrollView>
                <View style={{ flex: 1, paddingBottom: 10 }}>

                    {renderTrade()}
                    {renderTransactionHistory()}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        borderBottomWidth: 0.3,
        marginTop: 20,
        marginBottom: 20,
        paddingLeft: 5,
        color: '#05375a',
    },
});

export default SendCase;
