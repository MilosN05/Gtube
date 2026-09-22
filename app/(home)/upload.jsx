import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { outer_store } from "../../store/store";

export default function uploadF() {
  const [visible, set_visible] = useState(false);
  const [link, set_link] = useState("");
  const [d_progress, u_progress] = useState(0);
  const [current_message, set_message] = useState("");
  const [preuzimanje_u_toku, set_preuzimanje] = useState(false);

  let online_access = outer_store((state) => state.online_access);

  const progressRef = useRef(null);

  useEffect(() => {
    progressRef.current?.animate(d_progress, 300);
  }, [d_progress]);
  //Objasnjenje, useRef čuva vrednost (nonstop) od adrese prvog objekta i to u okviru progressRef.current, stoga
  //Samo sazivamo .animate() nad jednim te istim objektom dodeljivajući mu d_progress vrednost
  //Drugi parametar od .animate() samo označava kojom brzinom će da izanimira pomeranje do odgovarajućeg procenta !
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
          source={require("../../assets/images/connection2.png")}
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
        }} >
          <View style={{backgroundColor:"#df2e2e", borderRadius:30, paddingTop:10, paddingBottom:10, paddingLeft:30, paddingRight:30}}> 
            <Text style={{color:"white",fontFamily:"MontserratBold",  fontSize:18, textAlign:"center"}}>POKUŠAJ PONOVO</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  ) : (
    <View style={{ display: "flex", flex: 1, backgroundColor: "#111425" }}>
      <LinearGradient
        colors={["#68493C", "#32202E", "#111425"]}
        locations={[0, 0.15, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          flex: 1,
          display: "flex",
          display: "flex",
          alignItems: "center",
          padding: 30,
          gap: 50,
          paddingTop: 70,
          opacity: visible ? 0.4 : 1,
        }}
      >
        {/* // <View style={{backgroundColor:"#111425", flex:1, display:"flex",  alignItems:"center", padding:30, gap:50}}> */}

        <Modal visible={visible} animationType="slide" transparent={true}>
          <View
            style={{
              flex: 1,
              padding: 20,
              display: "flex",
              backgroundColor: "transparent",
              gap: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#171b2f",
                padding: 50,
                borderRadius: 30,
                display: "flex",
                elevation: 8,
                gap: 80,
                width: "100%",
                height: "60%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <View style={{}}>
                            <Text style={{fontFamily:"Montserrat", letterSpacing:2}} >
                            {"Kreatora ovog dela (Milos N.) tj. mene\nje izuzetno mrzelo da ovde dorađujem povratak šifre. Biće jednog dana dodato."}
                            </Text>
                        </View> */}
              <AnimatedCircularProgress
                ref={progressRef} //Ovde ref dodeljuje adresu objekta vezan za AnimatedCircularProgress !
                size={120}
                width={15}
                // key={d_progress}
                fill={0}
                tintColor="#00e0ff"
                // onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#3d5875"
              />

              <View
                style={{
                  backgroundColor: "#3F4158",
                  borderRadius: 25,
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <TextInput
                  style={{
                    color: "white",
                    paddingLeft: 20,
                    paddingRight: 20,
                    fontFamily: "MontserratItalic",
                    fontSize: 15,
                    zIndex: 3,
                  }}
                  placeholder="https://youtu.be/..."
                  onChangeText={(text) => set_link(text)}
                  value={link}
                  placeholderTextColor={"#787996"}
                  onSubmitEditing={async (text) => {
                    if (!online_access) {
                      Alert.alert(
                        "Nema aktivne internet konekcije ili server nije dostupan !",
                      );
                      return;
                    }

                    let link_r = text.nativeEvent.text;
                    if (link_r.startsWith("https://youtu.be")) {
                      let messages_that_matter = [
                        "Dodat tekst ...",
                        "Uspešno dodata pesma u bazu !",
                        "Neuspešno pronalaženje teksta ...",
                        "Pronalaženje teksta pesme ...",
                        "Ne može taj link !",
                        "Pesma već postoji u bazi !",
                      ];
                      let socket = new WebSocket(
                        "ws://192.168.0.22:8000/ws/objavaSnimaka/",
                      );

                      set_preuzimanje(true);

                      socket.addEventListener("open", (event) => {
                        socket.send(JSON.stringify({ link: link_r }));
                      });

                      socket.addEventListener("message", (event) => {
                        // console.log(link)
                        let received_response = JSON.parse(event.data);
                        let message = received_response.message;
                        // console.log(event)
                        // console.log(message)
                        if (!messages_that_matter.includes(message)) {
                          const percentage = parseFloat(message);
                          u_progress(percentage);
                        } else {
                          set_message(message);
                          if (received_response.response != undefined) {
                            setTimeout(() => {
                              set_preuzimanje(false);
                              set_message("");
                            }, 2000);
                          }
                        }
                      });
                    }
                    // console.log(d_progress)
                    set_link("");
                    // set_message("")
                  }}
                ></TextInput>
              </View>
              {!preuzimanje_u_toku ? (
                <Button title="Zatvori" onPress={() => set_visible(false)} />
              ) : (
                // <Text style={{fontFamily:"MontserratBold", color:"white", fontSize:17, textAlign:"center"}}>Pesma uspešno dodata u bazu !</Text>

                <Text
                  style={{
                    fontFamily: "MontserratBold",
                    color: "white",
                    fontSize: 17,
                    textAlign: "center",
                  }}
                >
                  {current_message}
                </Text>
              )}
            </View>
          </View>
        </Modal>
        <View style={{ gap: 18, height: "30%", width: "100%" }}>
          <Text
            style={{
              color: "white",
              fontFamily: "MontserratBold",
              fontSize: 40,
            }}
          >
            Uploaduj svoj Audio Zapis
          </Text>
          <Text
            style={{ color: "gray", fontFamily: "Montserrat", fontSize: 20 }}
          >
            Dovoljno je da unesete samo youtube link.
          </Text>
        </View>
        <View
          style={{
            height: "60%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/musicAudio2.png")}
            style={{ width: 230, height: 230 }}
          ></Image>
          <TouchableOpacity
            onPress={() => set_visible(!visible)}
            style={{
              backgroundColor: "#3F4158",
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#787996",
                fontFamily: "MontserratBold",
                fontSize: 20,
              }}
            >
              Unesi Link
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
  /* // </View> */
}
