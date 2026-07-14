import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Slider from '@react-native-community/slider'
import { AudioPro, AudioProContentType, AudioProState, useAudioPro } from 'react-native-audio-pro'
import { load_shuffled, play_next, play_previous, setTracks } from '../../setupAudio'


async function get_data(funkcija) {
  try {
    const response = await fetch("http://192.168.1.68:8000/nasumicniZapisi/",
      {
      method:"POST",
      body: new URLSearchParams(
        {brojSnimaka:10, idSnimka:1}
      ).toString(),
      headers:{"Content-Type":"application/x-www-form-urlencoded"}})
  
    // console.log(response)
  if (!response.ok) {
    throw new Error(`HTTP greska ! Status: ${response.status}`)
  }

  const data = await response.json()
  // data.artwork = "http://192.168.1.68:8000"+data.artwork
  // data.url= "http://192.168.1.68:8000"+data.url
  // data.url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"


  data.forEach((data)=> {
    data.artwork = "http://192.168.1.68:8000"+data.artwork
    data.url= "http://192.168.1.68:8000"+data.url
  })
    // console.log(data)

  funkcija(data)

  setTracks(data)

  
  // AudioPro.pause()
  }

  catch (error) {
    console.log("Fetch neuspesan !: ",error)
  }
}

function to_seconds(ms) {
  let sekunde=Math.trunc(Math.trunc(ms%60000) / 1000)
  let minute = Math.trunc(ms/60000)
  return sekunde>=10 ? `${minute}:${sekunde}`:`${minute}:0${sekunde}`
}

export function player() {
    
    const { state, position, duration, playingTrack, playbackSpeed, volume, error } = useAudioPro();
    let [vrednost, setVrednost] = useState(0)
    let [podaci, ucitaj_podatke] = useState({})
    // console.log(playingTrack)
    useEffect(()=> {

      
      AudioPro.configure({
      contentType: AudioProContentType.MUSIC,
      debug: __DEV__,
    });
      get_data(ucitaj_podatke)


    },[])

    useEffect(()=> {
      if (podaci[0] && playingTrack && podaci[0].id!=playingTrack.id)
        AudioPro.play(podaci[0])

      else if (!playingTrack && podaci[0]) 
        AudioPro.play(podaci[0])
    },[podaci])


    useEffect(()=> {
      if (playingTrack)
        switch_song()
    }, [playingTrack]) 




    const opacity = useRef(new Animated.Value(1)).current;
    
    const toggleIcon = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    };




    const opacity2 = useRef(new Animated.Value(1)).current;
    async function switch_song() {
        Animated.timing(opacity2, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            // setCurrentSong(newSong);

            Animated.timing(opacity2, {
                toValue: 1, 
                duration: 150,
                useNativeDriver: true,
            }).start();
        });
    }

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
         
          <TouchableOpacity onPress={()=> {router.back()}}><Ionicons name="chevron-back-outline" size={32} color={"white"} ></Ionicons></TouchableOpacity>
          <TouchableOpacity onPress={()=>{}}><Ionicons name="options-outline"  size={32} color={"white"}></Ionicons></TouchableOpacity>
        </View>
        <View style={{display:"flex", alignItems:"center"}}>
          {/* <View style={{backgroundColor:"#442C33", display:"flex", alignItems:"center", borderRadius:10, paddingTop:7,paddingBottom:7}}> */}
            {/* <LinearGradient
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
          </LinearGradient> */}
        <Animated.View style={{ opacity:opacity2 }}>
          {/* url pesme ce ici */}
          <Image 
          source={{uri: `${playingTrack?.artwork}`}}
          style={{width:230,height:230, borderRadius:10}}
          
          ></Image>
          </Animated.View>
        </View>
      </View>
      
      <View style={{height:"60%"}}>
        <Animated.View style={{ opacity:opacity2 }}><View style={{display:"flex", justifyContent:"center", alignItems:"center", paddingTop:20}}>
          <Text style={{fontFamily:"MontserratBold", color:"white", fontSize:20, textAlign:"center"}}>{playingTrack?.title}</Text>
          <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontFamily:"Montserrat", color:"gray"}}>{playingTrack?.artist}</Text>
            {/* <Text style={{fontFamily:"Montserrat", color:"gray"}}>Album Title</Text> */}
            
          </View>
    
        </View></Animated.View>
        
        
        <View style={{ paddingTop:50}}>
          <View style={{flexDirection:"row", display:"flex", justifyContent:"space-between"}}>
            <TouchableOpacity onPress={()=>{}}><Ionicons name="heart-outline"size={30} color={"white"}></Ionicons></TouchableOpacity>
            <TouchableOpacity onPress={()=>{}}><Ionicons name="volume-high-outline" size={30} color={"white"}></Ionicons></TouchableOpacity>
          </View>
          {/* <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}> */}
           {/* <LinearGradient
        colors={["#ff5c8a", "#ff9f43"]}
        start={{ x: 0, y: 0}}
        end={{ x: 1, y: 0 }}
        style={styles.gradientTrack}
      />
      <View style={{width:90*vrednost.toString(), backgroundColor:"black"}}></View>

        <Slider
          style={styles.slider}
          onValueChange={AudioPro.seekTo}
          minimumValue={0}
          value={position}
          maximumValue={duration}
          thumbImage={require("../../assets/images/dotSlider32.png")}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="white"
          >


          </Slider> */}
        {/* <View style={styles.sliderContainer}>
        Gray background
        <View style={styles.backgroundTrack} /> */}

          {/* Loaded amount
         <LinearGradient
            colors={["#ff5c8a", "#ff9f43"]}
            start={{ x: 0, y: 0}}
            end={{ x: 1, y: 0 }}
      // style={[
      //     styles.loadedTrack,
      //     {
      //     width: `${(position / duration) * 100}%`
      //     }
      // ]}
        style={{...styles.loadedTrack, width:`${(position / duration) * 100}%`}}
        
    />  */}

    {/* Actual slider */}
    <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={AudioPro.seekTo}
        minimumTrackTintColor="#ff9f43"
        maximumTrackTintColor="gray"
        thumbTintColor="white"
    />

    
{/* </View> */}
      {/* </View> */}
      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <Text style={{fontFamily:"Montserrat", color:"white", fontSize:15}}>{to_seconds(position)}</Text>
        <Text style={{fontFamily:"Montserrat", color:"white", fontSize:15}}>{to_seconds(duration)}</Text>

      </View>
        
      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:35, alignItems:"center"}}>
        <TouchableOpacity onPress={()=>{AudioPro.seekTo(0)}} ><Ionicons name="reload-outline" color={"white"} size={30} ></Ionicons></TouchableOpacity>
        <TouchableOpacity onPress={()=>{play_previous()}}><Ionicons name="play-back-outline" color={"white"} size={30} ></Ionicons></TouchableOpacity>
        <LinearGradient 
        colors={["#FA9C6A", "#E2636F"]}
            
        style={{borderRadius:999, padding:20}}>
        <Animated.View style={{ opacity }}>
          <Ionicons name={AudioPro.getState()==AudioProState.PLAYING ? `pause`:"play"} color={"white"} size={30} onPress={()=> {
            
            toggleIcon()
            if (AudioPro.getState()==AudioProState.PLAYING)
              AudioPro.pause()
            else {
              AudioPro.resume()
            }
          }}></Ionicons>  
        </Animated.View>
        </LinearGradient>
        <TouchableOpacity onPress={()=>play_next()}><Ionicons name="play-forward-outline" color={"white"} size={30} ></Ionicons></TouchableOpacity>
        <TouchableOpacity onPress={()=>{load_shuffled(true)}}><Ionicons name="shuffle-outline" color={"white"} size={30}></Ionicons></TouchableOpacity>
      </View>
          
      </View>
      
      <View style={{display:"flex",justifyContent:"center", alignItems:"center", paddingTop:50}}>
        <TouchableOpacity style={{display:"flex",justifyContent:"center", alignItems:"center",}} onPress={()=>{}}>
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

// const styles = StyleSheet.create({
//   container: {
//     width: 300,
//     height: THUMB_SIZE, // slider height = thumb size
//     justifyContent: "center",
//   },
//   gradientTrack: {
//     height: 7,
//     borderRadius:5,
//     width: "90%",
//     position: "absolute",
//   },
//   slider: {
//     width: "100%",
//     height: 50, // slider height = thumb size
//   },
// });

const styles = StyleSheet.create({
    sliderContainer: {
        height: 50,
        justifyContent: "center",
        padding:0,
        
    },

    backgroundTrack: {
        position: "absolute",
        height: 8,
        backgroundColor: "#555",
        width:"100%",
        borderRadius: 2,
        padding:0,
        // marginLeft:10,
        // marginRight:10
        left:10,
        right:10

    },

    loadedTrack: {
        position: "absolute",
        height: 8,
        // width:"94%",
        borderRadius: 2,
        padding: 0,
        left:10
        // marginLeft:10,
        // marginRight:10
    },

    slider: {
        width: "100%",
        height: 60,
        
    }
});