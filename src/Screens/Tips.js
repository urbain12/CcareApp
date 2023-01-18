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




const Tips = (props) => {

    const context = React.useContext(AuthContext)

    return (
        <>
            <StatusBar backgroundColor="#00bcd4" translucent={false} hidden={false} barStyle="dark-content" />
            <View style={{
                height: 100,
                paddingTop: 20,
                flexDirection: "row",
                backgroundColor: '#2863A4',
                justifyContent: "center",
                ...styles.shadow
            }}>

                <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>


                    <Text style={{ color: 'white', fontSize: 18,fontWeight:"bold" }}>helpful Infomartion</Text>
                </View>
                <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

                </View>

            </View>


            <ScrollView>

                <View style={styles.container}>
                    <View style={{ marginTop: 2, flexDirection: "row" }}>

                        <View style={{ marginTop: 2, marginLeft: 5 }}>
                            <Text style={styles.Texties}>Rift Valley fever (RVF) is a viral disease that primarily affects domestic animals such as cattle, sheep, and goats. It can also infect humans and other animals, including wild ungulates, camels, and primates. The disease is caused by the Rift Valley fever virus (RVFV), which is transmitted to animals through the bite of infected mosquitoes.</Text>
                            <Text style={styles.Texties} >Symptoms in cattle can include fever, abortion, stillbirths, and the birth of weak or deformed calves. In severe cases, the disease can lead to high mortality rates in young animals. In addition to causing death and illness, RVF can also have a significant economic impact on livestock production, as it can cause abortions and reduced milk and meat production.</Text>
                            <Text style={[styles.Texties,{marginBottom: 25}]}>Preventive measures include vaccination of animals, control of mosquito populations, and protecting livestock from mosquito bites by using insect repellents and screens on barns and sheds.</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>



        </>
    );
};


export default Tips;

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#e0e0e0",
        width: "92%",
        marginHorizontal: 15,
        marginTop: 25,
        marginBottom: 25,
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

        fontSize: 16,
        fontWeight: "500",
        marginHorizontal: 15,
        color: "#05375a",
        marginTop: 10,
        marginBottom: 20,

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