import { Alert } from "react-native";
import { create } from "zustand";

export const outer_store = create((set) => ({
  // Ime: null,
  info_data: null,
  Bookmark: {},
  downloaded_info: null,
  is_connected: false,
  is_sactive: null,
  online_access: false,

  set_bookmark_zus: (new_bookmark) => set({ Bookmark: new_bookmark }),
  set_info_data_zus: (new_info_data) => set({ info_data: new_info_data }),
  // set_ime_zus: (new_ime) => set({ Ime: new_ime }),
  set_downloaded_zus: (new_downloaded) =>
    set({ downloaded_info: new_downloaded }),
  set_online_access_zus: (new_status) => set({ online_access: new_status }),
  set_is_connected_zus: (new_status) =>
    set((state) => {
      if (state.online_access == false && new_status && state.is_sactive) {
        get_data(JSON.strinigify(state.info_data));
      }
      return {
        is_connected: new_status,
        online_access: new_status && state.is_sactive,
      };
    }),
  set_is_sactive_zus: (new_status) =>
    set((state) => {
      if (state.online_access == false && new_status && state.is_connected) {
        get_data(JSON.stringify(state.info_data));
      }
      return {
        is_sactive: new_status,
        online_access: new_status && state.is_connected,
      };
    }),
}));

let loaded_zustand_sbookmark = outer_store.getState().set_bookmark_zus;
let loaded_zustand_s_info_data = outer_store.getState().set_info_data_zus;

export async function get_data(result) {
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

  let received_json = await response.json();

  //   loaded_zustand_sime(received_json.Ime);
  loaded_zustand_sbookmark(received_json.Bookmark);
  loaded_zustand_s_info_data(received_json);
}
