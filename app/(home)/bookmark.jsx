import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { File, Paths } from "expo-file-system";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AudioPro, AudioProState, useAudioPro } from "react-native-audio-pro";
import { secure_fetch } from "../../scripts/secure_fetch";
import { outer_store } from "../../store/store";
import { download_save } from "./main";

async function unlike_song() {
  let id_azapisa = eval(loaded_bookmark[visible_song_options].id);
  // console.log(id_azapisa)
  let response = await secure_fetch(
    `http://192.168.0.22:8000/bookmark/${info_data?.Ime}`,
    {
      method: "POST",
      body: new URLSearchParams({
        idSnimka: id_azapisa,
      }).toString(),
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    },
  );

  if (response == -9999) return;

  if (!response.ok) {
    Alert.alert("Nešto nije u redu sa lajkovanjem pesme !");
    return;
  }
  return await response.text();
}

export default function bookmark() {
  const [visible_song_options, set_visible_song_options] = useState(false);

  let online_access = outer_store((state) => state.online_access);
  let info_data = outer_store((state) => state.info_data);

  const { playingTrack } = useAudioPro();

  // console.log(`OA FROM BOOKMARK: ${online_access}`);
  // console.log(info_data)
  let loaded_zustand_sid = outer_store((state) => state.set_info_data_zus);
  let loaded_bookmark = outer_store((state) => state.Bookmark);

  let loaded_downloaded_md = outer_store((state) => state.downloaded_info);
  let loaded_download_md = outer_store((state) => state.set_downloaded_zus);

  return (
    <View style={{ display: "flex", flex: 1, backgroundColor: "#111425" }}>
      <Modal
        on
        animationType="fade"
        visible={visible_song_options != false}
        transparent
      >
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            onPress={() => set_visible_song_options(false)}
          ></TouchableOpacity>
          <LinearGradient
            style={{
              backgroundColor: "red",
              height: "40%",
              width: "70%",
              borderRadius: 30,
              elevation: 6,
              padding: 20,
            }}
            colors={["#8f2727", "#601c1c", "#111425"]}
            locations={[0, 0.3, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.8 }}
          >
            <View style={{ height: "30%" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={styles.coverShadow}
                  onPress={() => {
                    // play_by_index(index)
                  }}
                >
                  <Image
                    source={{
                      uri: online_access
                        ? `http://192.168.0.22:8000${loaded_bookmark?.[visible_song_options]?.artwork}`
                        : loaded_downloaded_md?.[visible_song_options]?.artwork,
                    }}
                    style={{ width: 64, height: 64, borderRadius: 4 }}
                  ></Image>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{ color: "white", fontFamily: "MontserratBold" }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {online_access
                        ? loaded_bookmark?.[visible_song_options]?.title
                        : loaded_downloaded_md?.[visible_song_options]?.title}
                    </Text>
                    <Text
                      style={{ color: "white", fontFamily: "Montserrat" }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {online_access
                        ? loaded_bookmark?.[visible_song_options]?.artist
                        : loaded_downloaded_md?.[visible_song_options]?.artist}
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                    onPress={() => set_visible_song_options(item.id)}
                  >
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={32}
                      color={"#989797"}
                    ></Ionicons>
                  </TouchableOpacity> */}
                </View>
              </View>
              <View style={{ width: "80%" }}></View>
            </View>

            <View style={{ display: "flex", height: "70%", gap: 10 }}>
              <TouchableOpacity
                onPress={async () => {
                  // info_data.Bookmark[id_azapisa]=false

                  const file_audio = new File(
                    Paths.document,
                    "songs",
                    loaded_bookmark[visible_song_options].title + ".mp3",
                  );
                  const file_thumbnail = new File(
                    Paths.document,
                    "thumbnails",
                    loaded_bookmark[visible_song_options].title + ".png",
                  );

                  if (file_audio.exists) {
                    file_audio.delete();

                    if (!file_audio.exists)
                      console.log(
                        `Uspesno obrisan fajl: ${loaded_bookmark[visible_song_options].title + ".mp3"}`,
                      );
                  }

                  if (file_thumbnail.exists) {
                    file_thumbnail.delete();
                  }

                  if (!file_audio.exists && !file_thumbnail.exists) {
                    // Alert.alert("Uspešno preuzeta pesma.")
                    let meta_data_songs = JSON.parse(
                      await AsyncStorage.getItem("meta_data_songs"),
                    );

                    if (meta_data_songs)
                      delete meta_data_songs[
                        loaded_bookmark[visible_song_options].id
                      ];

                    AsyncStorage.setItem(
                      "meta_data_songs",
                      JSON.stringify(meta_data_songs),
                    );
                    loaded_download_md(meta_data_songs);
                  }
                  // delete loaded_bookmark[visible_song_options];

                  // // console.log(info_data)
                  // loaded_zustand_sid({ ...loaded_bookmark });
                  set_visible_song_options(false);
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 25,
                  }}
                >
                  <Ionicons
                    name="close-outline"
                    size={40}
                    color={"white"}
                  ></Ionicons>
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: 25,
                      color: "white",
                    }}
                  >
                    Izbriši
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  if (!online_access) return;

                  let response_text = await unlike_song();
                  console.log(`CUVANJE: ${response_text}`);

                  if (response_text == -1) {
                    // info_data.Bookmark[visible_song_options]=false

                    const file_audio = new File(
                      Paths.document,
                      "songs",
                      loaded_bookmark[visible_song_options].title + ".mp3",
                    );
                    const file_thumbnail = new File(
                      Paths.document,
                      "thumbnails",
                      loaded_bookmark[visible_song_options].title + ".png",
                    );

                    if (file_audio.exists) {
                      file_audio.delete();

                      if (!file_audio.exists)
                        console.log(
                          `Uspesno obrisan fajl: ${loaded_bookmark[visible_song_options].title + ".mp3"}`,
                        );
                    }

                    if (file_thumbnail.exists) {
                      file_thumbnail.delete();
                    }

                    if (!file_audio.exists && !file_thumbnail.exists) {
                      // Alert.alert("Uspešno preuzeta pesma.")
                      let meta_data_songs = JSON.parse(
                        await AsyncStorage.getItem("meta_data_songs"),
                      );

                      if (meta_data_songs)
                        delete meta_data_songs[
                          loaded_bookmark[visible_song_options].id
                        ];

                      AsyncStorage.setItem(
                        "meta_data_songs",
                        JSON.stringify(meta_data_songs),
                      );
                      loaded_download_md(meta_data_songs);
                    }
                  }
                  delete loaded_bookmark[visible_song_options];

                  loaded_zustand_sid({ ...loaded_bookmark });
                  set_visible_song_options(false);
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 25,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="heart-outline"
                      size={30}
                      color={online_access ? "white" : "gray"}
                    ></Ionicons>
                  </View>
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: 25,
                      color: online_access ? "white" : "gray",
                    }}
                  >
                    Odlajkuj
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
      <LinearGradient
        colors={["#8f2727", "#601c1c", "#111425"]}
        locations={[0, 0.15, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.3 }}
        style={{
          flex: 1,
          display: "flex",
          display: "flex",
          alignItems: "center",
          padding: 30,

          opacity: visible_song_options != false ? 0.4 : 1,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "30%",
            display: "flex",
            gap: 9,
          }}
        >
          <Text
            style={{
              fontFamily: "MontserratBold",
              fontSize: 27,
              color: "white",
            }}
          >
            Lajkovane Pesme
          </Text>
          <Text
            style={{ fontFamily: "Montserrat", fontSize: 20, color: "#989797" }}
          >
            {online_access
              ? Object.keys(loaded_bookmark).length
              : Object.keys(loaded_downloaded_md).length}{" "}
            pesmi
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                if (!online_access) {
                  Alert.alert("Nema internet veze !");
                  return;
                }

                let loaded_bookmark_keys_array = Object.keys(loaded_bookmark);

                let meta_data_songs = JSON.parse(
                  await AsyncStorage.getItem("meta_data_songs"),
                );
                if (!meta_data_songs) meta_data_songs = {};

                for (let i = 0; i < loaded_bookmark_keys_array.length; i++) {
                  let current_id = loaded_bookmark_keys_array[i];

                  if (!loaded_downloaded_md[current_id]) {
                    await download_save(
                      `http://192.168.0.22:8000${loaded_bookmark[current_id].url}`,
                      `http://192.168.0.22:8000${loaded_bookmark[current_id].artwork}`,
                      loaded_bookmark[current_id].title,
                    );

                    const file_audio = new File(
                      Paths.document,
                      "songs",
                      loaded_bookmark[current_id].title + ".mp3",
                    );
                    const file_thumbnail = new File(
                      Paths.document,
                      "thumbnails",
                      loaded_bookmark[current_id].title + ".png",
                    );

                    if (file_audio.exists && file_thumbnail.exists) {
                      // Alert.alert("Uspešno preuzeta pesma.")
                      meta_data_songs[current_id] = {
                        ...loaded_bookmark[current_id],
                        artwork: file_thumbnail.info().uri,
                        url: file_audio.info().uri,
                      };
                    }
                  }
                }
                AsyncStorage.setItem(
                  "meta_data_songs",
                  JSON.stringify(meta_data_songs),
                );
                loaded_download_md(meta_data_songs);
              }}
            >
              <Ionicons
                name="arrow-down-circle-outline"
                size={38}
                color={"#989797"}
              ></Ionicons>
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <TouchableOpacity>
                <Ionicons
                  name="shuffle-sharp"
                  size={38}
                  color={"#989797"}
                ></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    padding: 12,
                    backgroundColor: "#EC786B",
                    borderRadius: 333,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* {console.log(AudioPro. AudioProState.PLAYING)} */}
                  <Ionicons
                    name={
                      AudioPro.getState() != AudioProState.PLAYING
                        ? "play"
                        : "pause"
                    }
                    size={38}
                    color={"white"}
                    onPress={() => {
                      if (
                        playingTrack &&
                        AudioPro.getState() == AudioProState.PAUSED
                      )
                        AudioPro.resume();
                      else if (
                        playingTrack &&
                        AudioPro.getState() == AudioProState.PLAYING
                      )
                        AudioPro.pause();
                      else if (!playingTrack) {
                        let items = Object.values(
                          online_access
                            ? loaded_bookmark
                            : loaded_downloaded_md || {},
                        );
                        if (items.length == 0) return;

                        router.push({
                          pathname: "/(mplay)/audio",
                          params: {
                            id: items[0].id,
                            bookmark_access: true,
                          },
                        });
                      }
                    }}
                  ></Ionicons>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ height: "70%", gap: 23 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              width: "100%",
              backgroundColor: "transparent",
            }}
          >
            <TouchableOpacity
              style={{
                ...styles.coverShadow,
                backgroundColor: "#3F4158",
                width: 64,
                height: 64,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
              }}
              onPress={() => {
                router.navigate("/(home)/main");
                // play_by_index(index)
              }}
            >
              {/* <Image source={{uri:item.artwork}} style={{width:64, height:64, borderRadius:4}}></Image> */}
              {/* <Image source={require("../../assets/images/icon.png")} style={{width:64, height:64, borderRadius:4}}></Image> */}
              <Ionicons
                name="add-outline"
                size={48}
                color={"#989797"}
              ></Ionicons>
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{ color: "white", fontFamily: "MontserratBold" }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Dodaj pesmu
              </Text>
            </View>
          </View>
          <FlatList
            data={Object.values(
              online_access ? loaded_bookmark : loaded_downloaded_md || [],
            )}
            renderItem={({ item, index }) => {
              // let is_current = playingTrack?.id==item.id
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                    borderRadius: 10,
                    width: "100%",
                    backgroundColor:
                      playingTrack && playingTrack.id == item.id
                        ? "#222640"
                        : "transparent",
                    opacity:
                      loaded_downloaded_md &&
                      loaded_downloaded_md[item.id]?.url &&
                      loaded_downloaded_md[item.id]?.artwork
                        ? 1
                        : 0.3,
                  }}
                >
                  <TouchableOpacity
                    style={styles.coverShadow}
                    onPress={() => {
                      // play_by_index(index)

                      router.push({
                        pathname: "/(mplay)/audio",
                        params: {
                          id: item.id,
                          bookmark_access: true,
                        },
                      });
                    }}
                  >
                    <Image
                      source={{
                        uri: online_access
                          ? `http://192.168.0.22:8000${item.artwork}`
                          : item.artwork,
                      }}
                      style={{ width: 64, height: 64, borderRadius: 4 }}
                    ></Image>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ display: "flex", flex: 1 }}>
                      <Text
                        style={{
                          color:
                            playingTrack && playingTrack.id == item.id
                              ? "#EC786B"
                              : "white",
                          fontFamily: "MontserratBold",
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{ color: "white", fontFamily: "Montserrat" }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.artist}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        if (loaded_downloaded_md[item.id])
                          set_visible_song_options(item.id);
                      }}
                    >
                      <Ionicons
                        name="ellipsis-horizontal"
                        size={32}
                        color={"#989797"}
                      ></Ionicons>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            contentContainerStyle={{
              gap: 10,
              display: "flex",
            }}
          ></FlatList>

          {/* Ovde će ići FlatList */}

          {/* <View style={{display:"flex",flexDirection:"row", alignItems:"center",gap:15, width:"100%", backgroundColor: "transparent"}} >
            <TouchableOpacity style={styles.coverShadow} onPress={()=> {
                // play_by_index(index)
              }}>
                {/* <Image source={{uri:item.artwork}} style={{width:64, height:64, borderRadius:4}}></Image> 
                <Image source={require("../../assets/images/icon.png")} style={{width:64, height:64, borderRadius:4}}></Image>

              </TouchableOpacity>
              <View style={{flex:1, display:"flex", justifyContent:"space-between", flexDirection:"row", alignItems:"center"}}>
                <View>
                  <Text style={{color:"white", fontFamily:"MontserratBold", }} numberOfLines={1} ellipsizeMode='tail'>Welcome To Srbija</Text>
                  <Text style={{color:"white", fontFamily:"Montserrat"}} numberOfLines={1} ellipsizeMode='tail'>Beogradski Sindikat</Text>

                </View>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={32} color={"#989797"}></Ionicons>
                </TouchableOpacity>
              </View>
          </View>  


*/}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: 50,
    justifyContent: "center",
    padding: 0,
  },

  backgroundTrack: {
    position: "absolute",
    height: 8,
    backgroundColor: "#555",
    width: "100%",
    borderRadius: 2,
    padding: 0,
    // marginLeft:10,
    // marginRight:10
    left: 10,
    right: 10,
  },

  loadedTrack: {
    position: "absolute",
    height: 8,
    // width:"94%",
    borderRadius: 2,
    padding: 0,
    left: 10,
    // marginLeft:10,
    // marginRight:10
  },

  slider: {
    width: "100%",
    height: 60,
  },
  coverShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,

    // Android
    elevation: 8,
  },
});
