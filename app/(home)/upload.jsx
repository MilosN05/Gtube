import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Button, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function uploadF() {

  const [visible, setVisible] = useState(false);
  const [link, setLink] = useState("");
  return (
    <LinearGradient
          colors={["#68493C", "#32202E", "#111425"]}
      locations={[0, 0.15, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1, display:"flex",display:"flex",alignItems:"center",padding:30, gap:50,paddingTop:70}}
    
          >
    {/* // <View style={{backgroundColor:"#111425", flex:1, display:"flex",  alignItems:"center", padding:30, gap:50}}> */}
    

    <Modal visible={visible} animationType="slide" transparent={true} >
                        <View style={{flex:1 ,padding: 20, display:"flex",  backgroundColor:"transparent", gap:20, justifyContent:"center", alignItems:"center"}}>
                            <View style={{backgroundColor:"#171b2f", padding:50, borderRadius:30, display:"flex",  elevation:50, gap:20, width:"100%", height:"40%", justifyContent:"center", alignItems:"center"}}>
                        {/* <View style={{}}>
                            <Text style={{fontFamily:"Montserrat", letterSpacing:2}} >
                            {"Kreatora ovog dela (Milos N.) tj. mene\nje izuzetno mrzelo da ovde dorađujem povratak šifre. Biće jednog dana dodato."}
                            </Text>
                        </View> */}
    
                        <View style={{backgroundColor:"#3F4158", borderRadius:25, flexDirection:"row", width:"100%" }}>
                          <TextInput style={{color:"white",left:20, fontFamily:"MontserratItalic", fontSize:15, zIndex:3}} 
                          placeholder="https://youtu.be/..." 
                          value={link}
                          placeholderTextColor={"#787996"}
                          onSubmitEditing={(text)=>{
                            link = text.nativeEvent.text;
                            if (link.startsWith("https://youtu.be")) {

                              socket = new  WebSocket("ws://192.168.101.128:8000/objavaSnimaka/")
                              socket.addEventListener("open", (event)=> {
                                socket.send(JSON.stringify({link: link}))
                              })

                              socket.addEventListener("message", (event)=> {
                                console.log(event.data)
                              })
                            
                            }
                            setLink("")

                          }}
                          ></TextInput>
                        </View>
                        <Button title="Zatvori" onPress={() => setVisible(false)} />
                            </View>
                        </View>
                    </Modal>
        <View style={{ gap:18, height:"30%", width:"100%"}}>
            <Text style={{color:"white", fontFamily:"MontserratBold", fontSize:40}}>Uploaduj svoj Audio Zapis</Text>
            <Text style={{color:"gray", fontFamily:"Montserrat", fontSize:20}}>Dovoljno je da unesete samo youtube link.</Text>
        </View>
        <View style={{height:"60%", width:"100%", display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Image source={require("../../assets/images/musicAudio2.png")} style={{width:230, height:230}}></Image>
        <TouchableOpacity 
        onPress={()=>setVisible(!visible)}
        style={{backgroundColor:"#3F4158", padding:20, width:"100%",display:"flex",justifyContent:"center",alignItems:"center", borderRadius:10}}>
          <Text style={{color:"#787996", fontFamily:"MontserratBold", fontSize:20}}>Unesi Link</Text></TouchableOpacity>
        </View>
    </LinearGradient>
    /* // </View> */
  )
}
