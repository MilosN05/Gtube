import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from "expo-image-picker";
import { router } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from '../UserContext';



export default function profile() {

  const {info_data, set_info_data} = useUser()
  const parsed_data = JSON.parse(info_data)

  const [image, set_image] = useState(null)

  useEffect(()=> {
    if (image)
      upload_image()
  }, [image])

  async function choose_image() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      quality:0.7
    })

    if (!result.canceled) {
        set_image(result)
        

}
  }

  async function upload_image() {
    const form_data = new FormData()
    
      form_data.append("slika_file", {
        uri: image.assets[0].uri,
        type:image.assets[0].mimeType,
        name:image.assets[0].fileName
      })

      form_data.append("Email", parsed_data.Email)
      form_data.append("Ime", parsed_data.Ime)

      let response = await fetch("http://192.168.0.14:8000/unosProfilne/", {
        method:"POST",
        body:form_data,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      if (!response.ok) {
        Alert.alert("Neuspelo objavljivanje na server, pokušajte ponovo !")
        return
      }

      let response_json = await response.json()

      if (response.error) {
        Alert.alert(response.error)
        return
      }
      console.log(response_json)
      set_info_data(JSON.stringify({...parsed_data, Profilna: response_json.Profilna}))
    
    
  }

  return (
    <View style={{width:"100%",height:"100%", backgroundColor:"#111425", padding:20, gap:30}}>
      {/* <View style={{borderBottomLeftRadius:230, borderBottomRightRadius:230, backgroundColor:"gray", height:"40%"}}></View>
      <View style={{height:"60%"}}></View> */}
      <View style={{display:"flex", flexDirection:"row",  alignItems:"center",  justifyContent:"space-between"}}>
        <TouchableOpacity onPress={()=> {router.back()}}>
          <Ionicons name="arrow-back-outline" size={40} color={"white"}></Ionicons>
        </TouchableOpacity>
        <View style={{ display:"flex",alignItems:"center"}}>
          <Text style={{fontFamily:"Montserrat", color:"white", fontSize:20}}>Uredi Profil</Text>
        </View>
        <View style={{width:40, height:40}}></View>

      </View>

      <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <TouchableOpacity onPress={()=>choose_image()}>
          <Image source={{uri:`http://192.168.0.14:8000/media/${parsed_data?.Profilna}`}} style={{width:130, height:130,color:"white", borderRadius:300}}/>
        </TouchableOpacity>
        
      </View>


      <View style={{backgroundColor:"#3F4158", padding:20, borderRadius:10, gap:15}}>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottomColor:"#5b5b6a", borderBottomWidth:1}}>
          <Text style={{fontFamily:"Montserrat", color:"#787996", fontSize:18}}>Ime</Text>
          <Text style={{fontFamily:"Montserrat", color:"white", fontSize:15}}>{parsed_data?.Ime}</Text>
        </View>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottomColor:"#5b5b6a", borderBottomWidth:1}}>
          <Text style={{fontFamily:"Montserrat", color:"#787996", fontSize:18}}>Telefon</Text>
          <Text style={{fontFamily:"Montserrat", color:"white", fontSize:15}}>+{parsed_data?.Telefon}</Text>
        </View>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottomColor:"#5b5b6a", borderBottomWidth:1}}>
          <Text style={{fontFamily:"Montserrat", color:"#787996", fontSize:18}}>Email</Text>
          <Text style={{fontFamily:"Montserrat", color:"white", fontSize:15}}>{parsed_data?.Email}</Text>
        </View>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottomColor:"#5b5b6a", borderBottomWidth:1}}>
          <Text style={{fontFamily:"Montserrat", color:"#787996", fontSize:18}}>Datum Rođenja</Text>
          <Text style={{fontFamily:"Montserrat", color:"white", fontSize:15}}>{parsed_data?.DatumR}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={()=> {
        SecureStore.deleteItemAsync("info_nalog")
        router.push("signin")
      }}>
        <View style={{borderRadius:10, width:"100%", display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"white", padding:10, flexDirection:"row", gap:10}}>
          <Ionicons name="log-out-outline" size={20} color={"red"}></Ionicons>
          
          <Text style={{fontFamily:"Montserrat", fontSize:18, color:"red"}}>Odjavi Se</Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}
