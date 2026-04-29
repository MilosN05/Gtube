import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function signIn() {

    return (
    <LinearGradient  colors={[ "#F99E69","#ED7C6B", "#D8486E"]}

        start={{ x: 0, y: 0 }}
        locations={[0, 0.35, 0.8]}
        end={{ x: 1, y: 1 }}

        style={{height:"100%",  backgroundColor:"green", zIndex:333}}>
        <View style={{height:"15%", justifyContent:"center",alignItems:"flex-start"}}>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center",  marginLeft:15, gap:20, marginTop:40}}>
                <TouchableOpacity onPress={()=>{router.back()}}>
                    <Ionicons name="arrow-back-circle" size={40} color={"white"} style={{elevation:40}}></Ionicons>
                </TouchableOpacity>
                <Text style={{fontFamily:"MontserratBold", fontSize:20, color:"white"}}>Kreiranje Naloga</Text>
            </View>
            <LinearGradient
                colors={["transparent","rgba(0,0,0,0.2)" ]}
                style={{
                position: "absolute",   
                // bottom: "0%",
                top:"80%",      
                borderRadius:20,
                left: 0,
                right: 0,
                height: 60,             
                zIndex: 1,
                }}
  />
        </View>
        <View style={{height:"85%", backgroundColor:"white", borderTopLeftRadius:37, borderTopRightRadius:37, zIndex:333,paddingTop:55,paddingBottom:25, paddingLeft:35, paddingRight:35, gap:20}}>

            <View style={{}}>
                <Text style={{fontFamily:"Montserrat", fontSize:16}}>Ime</Text>
                <TextInput placeholder="Miroljub Petrovic" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0}}></TextInput>
                <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
            </View>

            <View style={{}}>
                <Text style={{fontFamily:"Montserrat", fontSize:16}}></Text>
                <TextInput placeholder="Email Adresa" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0}}></TextInput>
                <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
            </View>

            <View style={{}}>
                <Text style={{fontFamily:"Montserrat", fontSize:16}}></Text>
                <TextInput placeholder="Telefon" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0}}></TextInput>
                <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
            </View>

            <View style={{}}>
                <Text style={{fontFamily:"Montserrat", fontSize:16}}></Text>
                <TextInput placeholder="Datum rođenja" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0}}></TextInput>
                <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
            </View>

            <View style={{}}>
                <Text style={{fontFamily:"Montserrat", fontSize:16}}></Text>
                <TextInput placeholder="Šifra" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0}} secureTextEntry></TextInput>
                <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
            </View>

            <View style={{}}>
                <Text style={{fontFamily:"Montserrat", fontSize:16}}></Text>
                <TextInput placeholder="Potvrda Šifre" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0 }} secureTextEntry></TextInput>
                <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
            </View>
        </View>
    </LinearGradient> 
    )
}

