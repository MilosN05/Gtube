import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function profile() {
  return (
    <View style={{width:"100%",height:"100%", backgroundColor:"#1A1F3A", padding:20, gap:30}}>
      {/* <View style={{borderBottomLeftRadius:230, borderBottomRightRadius:230, backgroundColor:"gray", height:"40%"}}></View>
      <View style={{height:"60%"}}></View> */}
      <View style={{display:"flex", flexDirection:"row",  alignItems:"center",  justifyContent:"space-between"}}>
        <TouchableOpacity onPress={()=> {router.back()}}>
          <Ionicons name="arrow-back-outline" size={40} color={"white"} ></Ionicons>
        </TouchableOpacity>
        <View style={{ display:"flex",alignItems:"center"}}>
          <Text style={{fontFamily:"Montserrat", color:"white", fontSize:20}}>Uredi Profil</Text>
        </View>
        <View style={{width:40, height:40}}></View>

      </View>

      <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <TouchableOpacity>
          <Image source={require("../../assets/images/user.png")} style={{width:130, height:130,color:"white"}}/>
        </TouchableOpacity>
        
      </View>


      <View style={{backgroundColor:"#3F4158", padding:20, borderRadius:10, gap:15}}>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottomColor:"#5b5b6a", borderBottomWidth:1}}>
          <Text style={{fontFamily:"Montserrat", color:"#787996", fontSize:18}}>Ime</Text>
          <Text style={{fontFamily:"Montserrat", color:"white", fontSize:15}}>Miloš Ninković</Text>
        </View>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottomColor:"#5b5b6a", borderBottomWidth:1}}>
          <Text style={{fontFamily:"Montserrat", color:"#787996", fontSize:18}}>Telefon</Text>
          <Text style={{fontFamily:"Montserrat", color:"white", fontSize:15}}>+381 062-103-2443</Text>
        </View>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottomColor:"#5b5b6a", borderBottomWidth:1}}>
          <Text style={{fontFamily:"Montserrat", color:"#787996", fontSize:18}}>Email</Text>
          <Text style={{fontFamily:"Montserrat", color:"white", fontSize:15}}>ninkovicmilos148@gmail.com</Text>
        </View>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottomColor:"#5b5b6a", borderBottomWidth:1}}>
          <Text style={{fontFamily:"Montserrat", color:"#787996", fontSize:18}}>Username</Text>
          <Text style={{fontFamily:"Montserrat", color:"white", fontSize:15}}>Giga</Text>
        </View>
      </View>

      <TouchableOpacity>
        <View style={{borderRadius:10, width:"100%", display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"white", padding:10, flexDirection:"row", gap:10}}>
          <Ionicons name="log-out-outline" size={20} color={"red"}></Ionicons>
          
          <Text style={{fontFamily:"Montserrat", fontSize:18, color:"red"}}>Odjavi Se</Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}
