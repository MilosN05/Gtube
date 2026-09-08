import { useLocalSearchParams } from 'expo-router'
import { createContext, useContext, useEffect, useState } from 'react'
import { View } from 'react-native'


const UserContext = createContext()

export function Context({children, style}) {
    
    const [info_data, set_info_data ] = useState(null)
    const params = useLocalSearchParams()
    useEffect(()=> {
     
      set_info_data(params.info_data)
    }, [])
    return (
      <UserContext value={{info_data, set_info_data}}>
        <View style={{...style}}>
            {children}
        </View>
      </UserContext>
    )
  
}

export default UserContext
export const useUser =  ()=>  useContext(UserContext)