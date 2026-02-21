import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";



export default function TabLayout() {

  return (
    
      
      <View style={{flex:1}}>
    <Tabs screenOptions={{
      animation:"shift",
     tabBarShowLabel:false,
     tabBarActiveTintColor:"#d2d5da",
     tabBarInactiveTintColor:"#7c7f9e",
      tabBarStyle:{
        backgroundColor:"#111425",
        height:75,
        display:"flex",
        
      },
      tabBarIconStyle: {
        width:40,
        height:40,
        
      },
     tabBarBackground: ()=> (
    <LinearGradient colors={["transparent", "#111425"]} style={styles.gradient} />

     )
    
    }}
    
 >
      <Tabs.Screen name="index" options={{headerShown:false, tabBarIcon:({size, color})=> <Ionicons name="home-outline" size={30} color={color}></Ionicons>}} ></Tabs.Screen>
      <Tabs.Screen name="bookmark" options={{headerShown:false, tabBarIcon:({size, color})=> <Ionicons name="bookmarks-outline" size={30} color={color}></Ionicons>}} ></Tabs.Screen>
      <Tabs.Screen name="search" options={{headerShown:false, tabBarIcon:({size, color})=> <Ionicons name="search-outline" size={30} color={color}></Ionicons>}} ></Tabs.Screen>

      <Tabs.Screen name="upload" options={{headerShown:false, tabBarIcon:({size, color})=> <Ionicons name="cloud-circle-outline" size={30} color={color}></Ionicons>}} ></Tabs.Screen>

    </Tabs>
    </View>
   
  );
}


let styles = StyleSheet.create({
  gradient: {
            position:"absolute",

    zIndex:100,
    bottom:69.8,
    left:0,
    right:0,
    height:60,
    pointerEvents:"none"
  }
})