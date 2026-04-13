import Checkbox from "expo-checkbox";
import { Image } from "expo-image";

import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Button, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function signIn() {
    const [isChecked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);

    return (
    

        <LinearGradient
                          colors={[ "#F99E69","#ED7C6B", "#D8486E"]}
                    
                            start={{ x: 0, y: 0 }}
                            locations={[0, 0.35, 0.8]}
                            end={{ x: 1, y: 1 }}
                    
                            style={{height:"100%",  backgroundColor:"green", borderBottomRightRadius:60, zIndex:333}}>


        
            <View style={{flex:1, display:"flex", justifyContent:"flex-end"}}>
             <LinearGradient
                colors={[ "transparent","rgba(0,0,0,0.2)"]}
                style={{
                position: "absolute",   // 👈 important
                bottom: "45%",          // 👈 aligns with top of white view
                borderRadius:20,
                left: 0,
                right: 0,
                height: 60,             // small = shadow effect
                zIndex: 1,
                }}
  />

                <Modal visible={visible} animationType="slide" transparent={true} >
                    <View style={{flex:1 ,padding: 20, display:"flex",  backgroundColor:"transparent", gap:20, justifyContent:"center", alignItems:"center"}}>
                        <View style={{backgroundColor:"white", padding:50, borderRadius:30, display:"flex",  elevation:50, gap:20}}>
                    <View style={{}}>
                        <Text style={{fontFamily:"Montserrat", letterSpacing:2}} >
                        {"Kreatora ovog dela (Milos N.) tj. mene\nje izuzetno mrzelo da ovde dorađujem povratak šifre. Biće jednog dana dodato."}
                        </Text>
                    </View>


                    <Button title="Zatvori" onPress={() => setVisible(false)} />
                        </View>
                    </View>
                </Modal>

                <View style={{height:"50%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <View>
                        <Image source={require("../../assets/images/currentLogo.png")} style={{width:250, height:250}}></Image>
                    </View>
                </View>
                <View style={{height:"50%", backgroundColor:"white", borderTopLeftRadius:37, borderTopRightRadius:37, zIndex:5}}>
                    <SafeAreaView style={{paddingTop:25,paddingBottom:25, paddingLeft:35, paddingRight:35,  height:"100%", gap:30}}>
                        <View style={{ height:"43%", display:"flex", justifyContent:"space-between"}}>
                        <View style={{}}>
                            <Text style={{fontFamily:"Montserrat", fontSize:16}}>Email Adresa</Text>
                            <TextInput placeholder="nekoNesto123@gmail.com" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0}}></TextInput>
                            <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
                        </View>
                        <View>
                            <TextInput placeholder="Šifra" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0}} secureTextEntry></TextInput>
                            <View style={{ backgroundColor:"rgba(61, 65, 62, 0.13)",height:2, borderRadius:20}}></View>
                        </View>
                    </View>
                        <View style={{flexDirection:"row", display:"flex", justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row", gap:8}}>
                            <Checkbox  value={isChecked} color={isChecked ? "green":undefined} onValueChange={()=>setChecked(!isChecked)} ></Checkbox>
                            <Text style={{fontFamily:"Montserrat"}}>Zapamti me</Text>
                            </View>
                            <TouchableOpacity onPress={()=>{setVisible(!visible)}}>
                                
                                <Text style={{fontFamily:"Montserrat"}} >Zaboravljena Šifra?</Text></TouchableOpacity>
                        </View>
                        <View style={{display:"flex", justifyContent:"space-between", height:"30%"}}>
                            <View style={{backgroundColor:"#EC786B", height:"60", display:"flex", justifyContent:'center', alignItems:"center", borderRadius:10}}>
                                
                                <TouchableOpacity><Text style={{fontFamily:"MontserratBold", color:"white"}}>ULOGUJ SE</Text></TouchableOpacity>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", display:"flex"}}>
                                <Text style={{fontFamily:"Montserrat"}}>Nemate nalog?</Text>
                                <TouchableOpacity><Text style={{fontFamily:"MontserratBold", color:"#EC786B"}}> REGISTRUJ SE</Text></TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            </View>
        </LinearGradient>
    // </View>
    )
}

