import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, View } from 'react-native';

export default function uploadF() {
  return (
    <LinearGradient
          colors={["#68493C", "#32202E", "#111425"]}
      locations={[0, 0.15, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1, display:"flex",display:"flex",alignItems:"center",padding:30, gap:50,paddingTop:70}}
    
          >
    {/* // <View style={{backgroundColor:"#111425", flex:1, display:"flex",  alignItems:"center", padding:30, gap:50}}> */}
        <View style={{ gap:18, height:"30%", width:"100%"}}>
            <Text style={{color:"white", fontFamily:"MontserratBold", fontSize:40}}>Uploaduj svoj Audio Zapis</Text>
            <Text style={{color:"gray", fontFamily:"Montserrat", fontSize:20}}>Dovoljno je da unesete samo youtube link.</Text>
        </View>
        <View style={{height:"60%", width:"100%", display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Image source={require("../../assets/images/musicAudio.png")} style={{width:250, height:250}}></Image>
        <TouchableOpacity style={{backgroundColor:"#3F4158", padding:20, width:"100%",display:"flex",justifyContent:"center",alignItems:"center", borderRadius:10}}><Text style={{color:"#787996", fontFamily:"MontserratBold", fontSize:20}}>Unesi Link</Text></TouchableOpacity>
        </View>
    </LinearGradient>
    /* // </View> */
  )
}
