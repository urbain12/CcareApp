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
import { useRoute } from '@react-navigation/native';




const FullCase = (props) => {

    const Message1 = props.route.params.Message
    const Symptoms = props.route.params.Symptoms
    const cat = props.route.params.cType
    const replied = props.route.params.Reply

    const context = React.useContext(AuthContext)

    return (
        <>
            <StatusBar backgroundColor="#E9A800" translucent={false} hidden={false} barStyle="dark-content" />
            <View style={{
                height: 100,
                paddingTop: 20,
                flexDirection: "row",
                backgroundColor: '#E9A800',
                justifyContent: "center",
                ...styles.shadow
            }}>

                <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>


                    <Text style={{ color: 'white', fontSize: 18,fontWeight:"bold" }}>Full Case</Text>
                </View>
                <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

                </View>

            </View>


            <ScrollView>

                <View style={styles.container}>
                    <View style={{ marginTop: 2, flexDirection: "row" }}>

                        <View style={{ marginTop: 2, marginLeft: 5 }}>
                            <Text style={styles.Title}>Case Description</Text>
                            <Text style={styles.Texties}>{Message1}</Text>
                            <Text style={styles.Title}>Symptoms</Text>
                            <Text style={styles.Texties}>{Symptoms}</Text>
                            <Text style={styles.Title}>Cattle Type</Text>
                            <Text style={styles.Texties}>{cat}</Text>
                            <Text style={[styles.Title,{justifyContent:"center",marginTop:20}]}>REPLY</Text>
                            <Text style={[styles.Texties,{fontSize:20,marginBottom: 25}]}>{replied}</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>



        </>
    );
};


export default FullCase;

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#e0e0e0",
        width: "92%",
        marginHorizontal: 15,
        marginTop: 25,
        marginBottom: 25,
        borderRadius: 20,

    },
    Title: {

        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 15,
        marginTop: 10,
        color: "#05375a"
    },
    Texties: {

        fontSize: 12,
        fontWeight: "500",
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