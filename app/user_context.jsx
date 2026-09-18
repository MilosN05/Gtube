import NetInfo from "@react-native-community/netinfo";
import { useLocalSearchParams } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { outer_store } from "../store/store";

const UserContext = createContext();

export function Context({ children, style }) {
  const [info_data, set_info_data] = useState(null);
  const [is_connected, set_is_connected] = useState(false);
  const [is_sactive, set_isactive] = useState(false);
  const [online_access, set_online_ac] = useState(false);

  const params = useLocalSearchParams();
  // console.log(params)

  async function get_data(result) {
    let response = await fetch("http://94.189.212.58:8000/nalog/", {
      method: "POST",
      body: result,
    });

    if (!response.ok) {
      Alert.alert("Nešto nije kako treba, restartuje aplikaciju !");
      return;
    }

    if (response.error) {
      Alert.alert(response.error);
      return;
    }
    let loaded_zustand_sid = outer_store.getState().set_info_data_zus;
    let loaded_zustand_sime = outer_store.getState().set_ime_zus;

    let received_json = await response.json();

    loaded_zustand_sime(received_json.Ime);
    loaded_zustand_sid(received_json.Bookmark);
    set_info_data(JSON.stringify(received_json));
  }

  //funkcija koja proverava da li je uspostavljena veza sa internetom, ne koristimo je trenutno
  async function check_connection() {
    let state = await NetInfo.refresh();

    if (state.isInternetReachable) {
      let response = await fetch("http://192.168.0.22:8000/nalog/", {
        method: "POST",
        body: info_data,
      });

      // if (!response.ok) {
      //     Alert.alert("Nešto nije kako treba, restartuje aplikaciju !")
      //     return
      // }

      if (response.error) {
        Alert.alert(response.error);
        return;
      }

      set_info_data(JSON.stringify(await response.json()));
    }

    set_is_connected(state.isInternetReachable);
  }

  useEffect(() => {
    //inicijalizacija provere rada servera
    let interval = setInterval(async () => {
      try {
        let controller = new AbortController();
        setTimeout(() => {
          controller.abort();
        }, 1500);

        await fetch("http://192.168.0.22:8000/", {
          signal: controller.signal,
        });

        set_isactive(true);
      } catch {
        set_isactive(false);
      }
    }, 30000);

    //incijalizacija provere povezanosti sa internet-om
    const remove_listener = NetInfo.addEventListener((state) => {
      set_is_connected(state.isInternetReachable);
    });

    //Učitavanje podataka iz  (reg)/index.jsx
    set_info_data(params.info_data);
    set_is_connected(eval(params.is_connected));
    set_isactive(eval(params.is_sactive));

    return () => {
      remove_listener();
      clearInterval(interval);
    };
  }, []);

  console.log(`S:${is_sactive} IC:${is_connected}`);
  useEffect(() => {
    ///Ideja je da je moguće imati online pristup AKO I SAMO AKO JE SERVER DOSTUPAN I KLIJENT IMA VEZU SA INTERNETOM !
    set_online_ac(is_connected && is_sactive);
    // let loaded_set_online_access_zus = outer_store.getState().set_online_access_zus;
    // loaded_set_online_access_zus(is_connected && is_sactive);

    if (is_connected && is_sactive) get_data(params.info_data);

    // console.log(`ONLINE: ${online_access}`)
  }, [is_sactive, is_connected]);
  return (
    <UserContext value={{ info_data, set_info_data }}>
      <View style={{ ...style }}>{children}</View>
    </UserContext>
  );
}

export default UserContext;
export const useUser = () => useContext(UserContext);
