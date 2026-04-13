import { Ionicons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export function player() {


    let [vrednost, setVrednost] = useState(0)
    return (
      
       <LinearGradient
      colors={["#68493C", "#32202E", "#111425"]}
  locations={[0, 0.15, 1]}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
  style={{ flex: 1, padding:25, display:"flex"}}

      >
      <View style={{height:"40%", display:"flex", gap:40}}>
        <View style={{display:"flex", justifyContent:"space-between", alignItems:"center",  flexDirection:"row", marginTop:10}}>
         
          <TouchableOpacity><Ionicons name="chevron-back-outline" size={32} color={"white"} onPress={()=> {router.back()}}></Ionicons></TouchableOpacity>
          <TouchableOpacity><Ionicons name="options-outline"  size={32} color={"white"}></Ionicons></TouchableOpacity>
        </View>
        <View style={{display:"flex", alignItems:"center"}}>
          {/* <View style={{backgroundColor:"#442C33", display:"flex", alignItems:"center", borderRadius:10, paddingTop:7,paddingBottom:7}}> */}
            <LinearGradient
            colors={["#FFB86B", "#571c2b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{borderRadius: 10, paddingLeft:5, paddingRight:5,paddingTop:7,paddingBottom:7}}
            >
            <LinearGradient
              colors={[ "#F99E69","#ED7C6B", "#D8486E"]}
        
                // Start at top-left
                      start={{ x: 0, y: 0 }}
                locations={[0, 0.35, 0.8]}
                // End at bottom-right
                end={{ x: 1, y: 1 }}
        
                style={{width:"230", height:"230", borderRadius:10}}/>
          </LinearGradient>
        </View>
      </View>
      <View style={{height:"60%"}}>
        <View style={{display:"flex", justifyContent:"center", alignItems:"center", paddingTop:20}}>
          <Text style={{fontFamily:"MontserratBold", color:"white", fontSize:20}}>Lorem ipsum Dolor</Text>
          <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontFamily:"Montserrat", color:"gray"}}>The Artist Name</Text>
            <Text style={{fontFamily:"Montserrat", color:"gray"}}>Album Title</Text>
          </View>
        </View>
        <View style={{ paddingTop:50}}>
          <View style={{flexDirection:"row", display:"flex", justifyContent:"space-between"}}>
            <TouchableOpacity><Ionicons name="heart-outline"size={30} color={"white"}></Ionicons></TouchableOpacity>
            <TouchableOpacity><Ionicons name="volume-high-outline" size={30} color={"white"}></Ionicons></TouchableOpacity>
          </View>
          <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
           <LinearGradient
        colors={["#ff5c8a", "#ff9f43"]}
        start={{ x: 0, y: 0}}
        end={{ x: 1, y: 0 }}
        style={styles.gradientTrack}
      />
      <View style={{width:90*vrednost.toString(), backgroundColor:"black"}}></View>

        <Slider
          style={styles.slider}
          onValueChange={setVrednost}
          minimumValue={0}
          maximumValue={1}
          thumbImage={require("../../assets/images/dotSlider32.png")}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="white"
          >


          </Slider>
      </View>
      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <Text style={{fontFamily:"Montserrat", color:"white", fontSize:15}}>0:00</Text>
        <Text style={{fontFamily:"Montserrat", color:"white", fontSize:15}}>3:25</Text>

      </View>

      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:35, alignItems:"center"}}>
        <TouchableOpacity><Ionicons name="reload-outline" color={"white"} size={30}></Ionicons></TouchableOpacity>
        <TouchableOpacity><Ionicons name="play-back-outline" color={"white"} size={30}></Ionicons></TouchableOpacity>
        <TouchableOpacity>
        <LinearGradient 
        colors={["#FA9C6A", "#E2636F"]}
            
        style={{borderRadius:999, padding:20}}>
          <Ionicons name="pause" color={"white"} size={30}></Ionicons>
        </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity><Ionicons name="play-forward-outline" color={"white"} size={30}></Ionicons></TouchableOpacity>
        <TouchableOpacity><Ionicons name="shuffle-outline" color={"white"} size={30}></Ionicons></TouchableOpacity>
      </View>
          
      </View>
      
      <View style={{display:"flex",justifyContent:"center", alignItems:"center", paddingTop:50}}>
        <TouchableOpacity style={{display:"flex",justifyContent:"center", alignItems:"center",}}>
        <Ionicons name="chevron-up" color={"white"} size={32}></Ionicons>
        <Text style={{fontFamily:"Montserrat", color:"white"}}>Lyrics</Text>
        </TouchableOpacity>
      </View>
      
      </View>
      </LinearGradient>
      

    )
  
}

export default player

const THUMB_SIZE = 24;
const TRACK_HEIGHT = 4;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: THUMB_SIZE, // slider height = thumb size
    justifyContent: "center",
  },
  gradientTrack: {
    height: 7,
    borderRadius:5,
    width: "90%",
    position: "absolute",
  },
  slider: {
    width: "100%",
    height: 50, // slider height = thumb size
  },
});