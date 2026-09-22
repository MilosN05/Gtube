import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Image, View } from "react-native";
import {
  co_worker_main,
  listeners,
} from "../../online_access_check/network_service";
import { setupAudio } from "../../setupAudio";
import { outer_store } from "../../store/store";

let loaded_zustand_dsong = outer_store.getState().set_downloaded_zus;
let loaded_zustand_s_is_sactive = outer_store.getState().set_is_active_zus;
let loaded_zustand_s_is_connected = outer_store.getState().set_is_connected_zus;
let loaded_zustand_s_info_data = outer_store.getState().set_info_data_zus;

let { online_access, is_connected, is_sactive, info_data } =
  outer_store.getState();

async function is_logged() {
  let result = await SecureStore.getItemAsync("info_nalog");

  if (!result) router.push("signin");
  else {
    let state = await NetInfo.fetch();

    let meta_data_songs = JSON.parse(
      await AsyncStorage.getItem("meta_data_songs"),
    );

    loaded_zustand_dsong(meta_data_songs);
    loaded_zustand_s_info_data(JSON.parse(result));
    // console.log("sdfsdfsdf");

    if (state.isInternetReachable == false) {
      loaded_zustand_s_is_connected(false);
      loaded_zustand_s_is_sactive(null);
      listeners();
    } else await co_worker_main(result);

    router.push("/(home)/main");
  }
}
export default function splashscreen() {
  setupAudio();
  setTimeout(() => {
    is_logged();
  }, 4000);
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        backgroundColor: "#F99E69",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/9mapL.png")}
        style={{ width: 200, height: 200 }}
      ></Image>
    </View>
  );
}
