import NetInfo from "@react-native-community/netinfo"
import { useLocalSearchParams } from 'expo-router'
import { createContext, useContext, useEffect, useState } from 'react'
import { View } from 'react-native'


const UserContext = createContext()



export function Context({children, style}) {
    
    const [info_data, set_info_data ] = useState(null)
    const [is_connected, set_is_connected] = useState(false)
    const [is_sactive, set_isactive] = useState(false)
    const [online_access, set_online_ac] = useState(false)
    
    const params = useLocalSearchParams()


  //funkcija koja proverava da li je uspostavljena veza sa internetom, ne koristimo je trenutno
  async function check_connection() {
    let state = await NetInfo.refresh()

    if (state.isInternetReachable) {

        let response = await fetch("http://192.168.0.22:8000/nalog/", 
        {
            method:"POST",
            body: info_data
        }
        )

        // if (!response.ok) {
        //     Alert.alert("Nešto nije kako treba, restartuje aplikaciju !")
        //     return
        // }

        if (response.error) {
            Alert.alert(response.error)
            return
        }

        set_info_data(JSON.stringify(await response.json()))

        }

        set_is_connected(state.isInternetReachable)
  }

    useEffect(()=> {

      //inicijalizacija provere rada servera
      let interval = setInterval(async ()=> {
        try {
          let controller = new AbortController()
          setTimeout(()=> {
            controller.abort()
          },1500)

          await fetch("http://192.168.0.22:8000/", {
            signal: controller.signal
          })


          set_isactive(true)
        }
        catch {
          set_isactive(false)
        }

      },30000)


      //incijalizacija provere povezanosti sa internet-om
      const remove_listener = NetInfo.addEventListener((state)=> {
        set_is_connected(state.isInternetReachable)
      })

      //Učitavanje podataka iz  (reg)/index.jsx
      set_info_data(params.info_data)
      set_is_connected(eval(params.is_connected))
      set_isactive(eval(params.is_sactive))


      return ()=> {remove_listener();clearInterval(interval)}
    }, [])


    useEffect(() =>{

      ///Ideja je da je moguće imati online pristup AKO I SAMO AKO JE SERVER DOSTUPAN I KLIJENT IMA VEZU SA INTERNETOM !
      set_online_ac(is_connected && is_sactive)
    }, [is_sactive, is_connected])
    return (
      <UserContext value={{info_data, set_info_data, online_access}}>
        <View style={{...style}}>
            {children}
        </View>
      </UserContext>
    )
  
}

export default UserContext
export const useUser =  ()=>  useContext(UserContext)