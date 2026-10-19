import NetInfo from "@react-native-community/netinfo";
import { get_data, outer_store } from "../store/store";

let loaded_zustand_s_is_sactive = outer_store.getState().set_is_sactive_zus;
let loaded_zustand_s_is_connected = outer_store.getState().set_is_connected_zus;

async function check_server() {
  try {
    let controller = new AbortController();
    setTimeout(() => {
      controller.abort();
    }, 5000);
    //ako razvijaš server u produkciju ovde stavi port konkretnije tačnu ip adresu od servera koji SADRŽI sve podatke tj koji je glavnni a ne od NGINX ili APACHE-A !
    // MADA u sustini mozes i od nginx/apache
    await fetch("https://gtube-server.duckdns.org/", {
      signal: controller.signal,
    });
    console.log("server aktivan");
    loaded_zustand_s_is_sactive(true);
  } catch (error) {
    console.log(`sazvano u network_service: ${error}`);
    if (outer_store.getState().is_connected) loaded_zustand_s_is_sactive(false);
  }
}

export async function listeners() {
  if (!globalThis.loaded_interval) {
    await check_server();
    setInterval(check_server, 30000);
    NetInfo.addEventListener((state) => {
      loaded_zustand_s_is_connected(state.isInternetReachable);
    });

    globalThis.loaded_interval = true;
  }
}

export async function co_worker_main(result) {
  await listeners();

  try {
    await get_data(result);
    console.log("sdfsdf");
  } catch (error) {
    console.log(error);
    loaded_zustand_s_is_sactive(false);
  }
}
