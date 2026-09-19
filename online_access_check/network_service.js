import NetInfo from "@react-native-community/netinfo";
import { get_data, outer_store } from "../store/store";

let loaded_zustand_s_is_sactive = outer_store.getState().set_is_sactive_zus;
let loaded_zustand_s_is_connected = outer_store.getState().set_is_connected_zus;

async function check_server() {
  try {
    let controller = new AbortController();
    setTimeout(() => {
      controller.abort();
    }, 1500);

    await fetch("http://192.168.0.22:8000/", {
      signal: controller.signal,
    });

    loaded_zustand_s_is_sactive(true);
  } catch (error) {
    console.log(error);
    loaded_zustand_s_is_sactive(false);
  }
}

async function listeners() {
  if (!globalThis.loaded_interval) {
    check_server();
    setInterval(check_server, 30000);
    NetInfo.addEventListener((state) => {
      loaded_zustand_s_is_connected(state.isInternetReachable);
    });

    globalThis.loaded_interval = true;
  }
}

export async function co_worker_main(result) {
  listeners();

  try {
    await get_data(result);
  } catch (error) {
    console.log(error);
    loaded_zustand_s_is_sactive(false);
  }
}
