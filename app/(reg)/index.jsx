import { router } from "expo-router";
import { Image, View } from "react-native";
import { setupAudio } from "../../setupAudio";
export default function splashscreen() {
    setupAudio();
    setTimeout(()=> {
        router.push("main")
    },4000)
    return (
        <View style={{flex:1, display:"flex", backgroundColor:"#F99E69", justifyContent:"center", alignItems:"center"}}>
            <Image source={require("../../assets/images/9mapL.png")} style={{width:200, height:200}}></Image>
        </View> 
    )
}

