import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { request_data } from "./signin";

async function register(ime, email, telefon, datumr,sifra,objekat_r) {
    const response = await fetch("http://192.168.0.14:8000/registracija/", {
        method:"POST",
        body: JSON.stringify({
            Ime:ime,
            Email:email,
            Telefon: telefon,
            DatumR:datumr,
            Sifra: sifra
           

        })

        
    })

    if (!response.ok) {
        objekat_r.error=1
        return
    }


    const result = await response.json()

    
    objekat_r.error = result.error
    
   

    // objekat_r.ime = result.Ime
    // objekat_r.profilna = result.Profilna
    // objekat_r.id = result.id
}




export default function signIn() {

    const [ime, set_ime] = useState("")
    const [email, set_email] = useState("")
    const [telefon, set_telefon] = useState("")
    const [datumr, set_datumr] = useState(new Date())
    const [sifra, set_sifra] = useState("")
    const [pot_sifra,set_psifra] = useState("")
    const [show_picker, set_showp] = useState(false)

    function change_date(event, selectedDate) {
        set_showp(false)
        console.log(`${selectedDate.getFullYear()}-${selectedDate.getDate()}-${selectedDate.getMonth()}`)
        set_datumr(selectedDate)
    }
    
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
                <TextInput placeholder="Miroljub Petrovic" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0}}
                
                onChangeText={(object)=> {
                    if (object.nativeEvent.text.length>11) {
                        Alert.alert("Dužina imena ne sme biti duže od 11 karaktera !")
                        return
                    }

                    set_ime(object.nativeEvent.text)
                }}
                >
                </TextInput>
                <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
            </View>

            <View style={{}}>
                <Text style={{fontFamily:"Montserrat", fontSize:16}}></Text>
                <TextInput placeholder="Email Adresa" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0}}
                onEndEditing={(object)=> {
                    if (object.nativeEvent.text.length<=10|| object.nativeEvent.text.length>40 || !object.nativeEvent.text.includes("@gmail.com")) {
                        Alert.alert("Dužina email-a (trenutno prihvatamo samo Gmail) ne sme biti duže od 40 karaktera !")
                        return
                    }

                    set_email(object.nativeEvent.text)
                }}
                ></TextInput>
                <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
            </View>

            <View style={{}}>
                <Text style={{fontFamily:"Montserrat", fontSize:16}}></Text>
                <TextInput placeholder="Telefon" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0}}
                onEndEditing={(object)=> {
                    if (object.nativeEvent.text.length<12 || !object.nativeEvent.text.includes("381")) {
                        Alert.alert("Broj mora biti u Srbiji (+381) i ne sme imati manje (zajedno sa tim brojem) manje od 12 brojeva !")
                        return
                    }

                    set_telefon(object.nativeEvent.text)
                }}
                ></TextInput>
                <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
            </View>

            <View style={{}}>
                <Text style={{fontFamily:"Montserrat", fontSize:16}}></Text>
                <TextInput placeholder="Datum rođenja" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0}}
                value={`${datumr.getFullYear()}-${datumr.getDate()}-${datumr.getMonth()}`}
                onPress={()=> {
                    set_showp(true)
                }}
                // onEndEditing={(object)=> {
                //     let sp_text = object.nativeEvent.text.split('-')
                //     try {
                //         if (sp_text[0]>3000 || sp_text[0]<1900)
                //             throw new Error("Neodgovarajuca godina")
                //         else if (sp_text[1]>31 || sp_text[1]<1)
                //             throw new Error("Neodgovarajuc dan")
                //         else if (sp_text[2]>12 || sp_text[2]<1)
                //             throw new Error("Neodgovarajuc mesec")
                //     }
                //     catch {
                //         Alert.alert("Datum mora biti u formi `YYYY-DD-MM` !")
                //         return
                //     }
                //     set_datumr(`${datumr.getFullYear()}-${datumr.getDate()}-${datumr.getMonth()}`)
                    
                // }}
                ></TextInput>
                {show_picker &&
                     <DateTimePicker value={datumr} mode="date" display="default" onChange={change_date}> </DateTimePicker>
                }
               
                <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
            </View>

            <View style={{}}>
                <Text style={{fontFamily:"Montserrat", fontSize:16}}></Text>
                <TextInput placeholder="Šifra" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0}} 
                onEndEditing={(object)=> {
                    if (object.nativeEvent.text<3) {
                        Alert.alert("Šifra ne sme biti kraća od tri karaktera !")
                        return
                    }

                    set_sifra(object.nativeEvent.text)


                }}
                secureTextEntry></TextInput>
                <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
            </View>

            <View style={{}}>
                <Text style={{fontFamily:"Montserrat", fontSize:16}}></Text>
                <TextInput placeholder="Potvrda Šifre" style={{fontFamily:"MontserratBold", fontSize:15, paddingLeft:0 }}
                onChangeText={(text)=> {
                   set_psifra(text)
                }}
                secureTextEntry></TextInput>
                <View style={{ backgroundColor:"#EC786B",height:2, borderRadius:20}}></View>
            </View>

            <View style={{display:"flex", justifyContent:"space-evenly", flex:1}}>
                            <View style={{backgroundColor:"#EC786B", height:"60", display:"flex", justifyContent:'center', alignItems:"center", borderRadius:10}}>
                                
                                <TouchableOpacity onPress={async ()=>
                                    {
                                        let answer = {
                                            error:0
                                        }

                                        await register(ime, email, telefon, datumr, sifra, answer)

                                        if (answer.error==1) {
                                            Alert.alert("Nešto nije u redu, pokušajte ponovo !")
                                            return
                                        }
                                        else if (answer.error!=0) {
                                           Alert.alert(answer.error)
                                            return 
                                        }


                                        const info_nalog = JSON.stringify({Sifra: sifra, Email: email })

                                        SecureStore.setItemAsync("info_nalog", info_nalog)

                                        let response = await request_data(info_nalog)
                                        router.push(
                                            {
                                                pathname:"main",
                                                params: {
                                                    info_data: JSON.stringify(response)
                                                }
                                            }
                                        )
                                    }
                                }><Text style={{fontFamily:"MontserratBold", color:"white"}}>REGISTRUJ SE</Text></TouchableOpacity>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", display:"flex"}}>
                                <Text style={{fontFamily:"Montserrat", color:"black"}}>Već imate nalog?</Text>
                                <TouchableOpacity onPress={()=>router.back()}><Text style={{fontFamily:"MontserratBold", color:"#EC786B"}}> ULOGUJ SE</Text></TouchableOpacity>
                            </View>
            </View>
        </View>
    </LinearGradient> 
    )
}

