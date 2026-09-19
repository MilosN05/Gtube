import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { secure_fetch } from "../../scripts/secure_fetch";
import { outer_store } from "../../store/store";

export default function profile() {
  const [image, set_image] = useState(null);
  const [refresh, set_refresh] = useState(false);
  // const { info_data, set_info_data, online_access } = useUser();

  let online_access = outer_store((state) => state.online_access);
  let info_data = outer_store((state) => state.info_data);

  // useEffect(()=> {
  //   set_refresh(true)
  //   set_refresh(false)

  //   console.log(`33   ${is_connected} ${typeof(is_connected)}`)
  // }, [is_connected])

  useEffect(() => {
    if (image) upload_image();
  }, [image]);

  async function choose_image() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      set_image(result);
    }
  }

  async function upload_image() {
    if (!online_access) return;

    const form_data = new FormData();

    form_data.append("slika_file", {
      uri: image.assets[0].uri,
      type: image.assets[0].mimeType,
      name: image.assets[0].fileName,
    });

    form_data.append("Email", info_data.Email);
    form_data.append("Ime", info_data.Ime);

    let response = await secure_fetch(
      "http://192.168.0.22:8000/unosProfilne/",
      {
        method: "POST",
        body: form_data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response == -9999) return;
    if (!response.ok) {
      Alert.alert("Neuspelo objavljivanje na server, pokušajte ponovo !");
      return;
    }

    let response_json = await response.json();

    if (response.error) {
      Alert.alert(response.error);
      return;
    }
    console.log(response_json);
    set_info_data(
      JSON.stringify({ ...info_data, Profilna: response_json.Profilna }),
    );
  }

  return !online_access ? (
    <View style={{ flex: 1, display: "flex", alignItems: "center" }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          top: 150,
        }}
      >
        <Image
          source={require("../../assets/images/connection3.png")}
          style={{ width: 150, height: 150 }}
        />
        <View style={{ width: "70%", display: "flex", gap: 20 }}>
          <Text
            style={{
              fontFamily: "Montserrat",
              color: "black",
              fontSize: 23,
              textAlign: "center",
            }}
          >
            Ups, Nema Veze Sa Internetom
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat",
              color: "gray",
              fontSize: 14,
              textAlign: "center",
              letterSpacing: 1,
              lineHeight: 20,
            }}
          >
            Proverite da li je uključen WIFI ili mobilni podaci i onda pokušajte
            ponovo
          </Text>
        </View>
        {/* <TouchableOpacity onPress={()=> {
          check_connection()
        }}>
          <View style={{backgroundColor:"#df2e2e", borderRadius:30, paddingTop:10, paddingBottom:10, paddingLeft:30, paddingRight:30}}> 
            <Text style={{color:"white",fontFamily:"MontserratBold",  fontSize:18, textAlign:"center"}}>POKUŠAJ PONOVO</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  ) : (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#111425",
        padding: 20,
        gap: 30,
      }}
    >
      {/* <View style={{borderBottomLeftRadius:230, borderBottomRightRadius:230, backgroundColor:"gray", height:"40%"}}></View>
      <View style={{height:"60%"}}></View> */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={40}
            color={"white"}
          ></Ionicons>
        </TouchableOpacity>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text
            style={{ fontFamily: "Montserrat", color: "white", fontSize: 20 }}
          >
            Uredi Profil
          </Text>
        </View>
        <View style={{ width: 40, height: 40 }}></View>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => choose_image()}>
          <Image
            source={{
              uri: `http://192.168.0.22:8000/media/${info_data?.Profilna}`,
            }}
            style={{
              width: 130,
              height: 130,
              color: "white",
              borderRadius: 300,
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "#3F4158",
          padding: 20,
          borderRadius: 10,
          gap: 15,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "#5b5b6a",
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{ fontFamily: "Montserrat", color: "#787996", fontSize: 18 }}
          >
            Ime
          </Text>
          <Text
            style={{ fontFamily: "Montserrat", color: "white", fontSize: 15 }}
          >
            {info_data?.Ime}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "#5b5b6a",
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{ fontFamily: "Montserrat", color: "#787996", fontSize: 18 }}
          >
            Telefon
          </Text>
          <Text
            style={{ fontFamily: "Montserrat", color: "white", fontSize: 15 }}
          >
            +{info_data?.Telefon}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "#5b5b6a",
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{ fontFamily: "Montserrat", color: "#787996", fontSize: 18 }}
          >
            Email
          </Text>
          <Text
            style={{ fontFamily: "Montserrat", color: "white", fontSize: 15 }}
          >
            {info_data?.Email}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "#5b5b6a",
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{ fontFamily: "Montserrat", color: "#787996", fontSize: 18 }}
          >
            Datum Rođenja
          </Text>
          <Text
            style={{ fontFamily: "Montserrat", color: "white", fontSize: 15 }}
          >
            {info_data?.DatumR}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          SecureStore.deleteItemAsync("info_nalog");
          router.push("signin");
        }}
      >
        <View
          style={{
            borderRadius: 10,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Ionicons name="log-out-outline" size={20} color={"red"}></Ionicons>

          <Text
            style={{ fontFamily: "Montserrat", fontSize: 18, color: "red" }}
          >
            Odjavi Se
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
