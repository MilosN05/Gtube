import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert, Image, View } from "react-native";
import { setupAudio } from "../../setupAudio";


async function is_logged() {
    let result = await SecureStore.getItemAsync("info_nalog")

    if (!result)
        router.push("signin")
    else {
        let response = await fetch("http://192.168.0.14:8000/nalog/", 
        {
            method:"POST",
            body: result
        }
        )

        if (!response.ok) {
            Alert.alert("Nešto nije kako treba, restartuje aplikaciju !")
            return
        }

        if (response.error) {
            Alert.alert(response.error)
            return
        }

        // console.log(await response.json())
        router.push({
            pathname: "main",
            params: {
                info_data: JSON.stringify(await response.json())
            }
        })
    }
}
export default function splashscreen() {
    setupAudio();
    setTimeout(()=> {
        is_logged()
    },4000)
    return (
        <View style={{flex:1, display:"flex", backgroundColor:"#F99E69", justifyContent:"center", alignItems:"center"}}>
            <Image source={require("../../assets/images/9mapL.png")} style={{width:200, height:200}}></Image>
        </View> 
    )
}

