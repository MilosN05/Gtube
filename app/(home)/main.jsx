import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Modal, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


async function get_data(funkcija, page, search_params) {
  try {
    const response = await fetch(`http://192.168.0.14:8000/${page}/`,
      {
      method:"POST",
      body: new URLSearchParams(
        search_params
      ).toString(),
      headers:{"Content-Type":"application/x-www-form-urlencoded"}})
  
    // console.log(response)
  if (!response.ok) {
    throw new Error(`HTTP greska ! Status: ${response.status}`)
  }

  const data = await response.json()
  // data.artwork = "http://192.168.0.14:8000"+data.artwork
  // data.url= "http://192.168.0.14:8000"+data.url
  // data.url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"


  data.forEach((data)=> {
    data.artwork = "http://192.168.0.14:8000"+data.artwork
    data.url= "http://192.168.0.14:8000"+data.url
  })
    // console.log(data)

  funkcija(data)

  
  // AudioPro.pause()
  }

  catch (error) {
    console.log("Fetch neuspesan !: ",error)
  }
}


export default function HomeScreen() {

  let [u_trendingu, ucitaj_podatke_trending] = useState([])
  let [skorasnji_unosi, ucitaj_podatke_skorasnji_unosi] = useState([])
  let [pretrazivanje, ucitaj_pretrazivanje] = useState(false)
  let [search, set_search] = useState("")
  let [results, set_results] = useState([])
  let [loading, set_loading] = useState(false)
  let [refresh_val, pokreni_refresh] = useState(false)


  function refresh() {
    pokreni_refresh(true)
    setTimeout(()=>
      pokreni_refresh(false)
    ,1000)
  }




  let Dot_loading = ({style, container_style}) =>{
  let scale1 = useRef(new Animated.Value(0.6)).current
  let opacity1 = useRef(new Animated.Value(0.4)).current

  let scale2 = useRef(new Animated.Value(0.6)).current
  let opacity2 = useRef(new Animated.Value(0.4)).current


  let scale3 = useRef(new Animated.Value(0.6)).current
  let opacity3 = useRef(new Animated.Value(0.4)).current



  
  useEffect(()=> {
    
      Animated.sequence(
        [
          
        Animated.parallel(
        [
        Animated.timing(scale1, {
          toValue:1,
          duration:300,
          useNativeDriver:true
        }),

        Animated.timing(opacity1, {
          toValue:1,
          duration:300,
          useNativeDriver:true
        })
        ]
      ),
      Animated.parallel(
        [
        Animated.timing(scale2, {
          toValue:1,
          duration:300,
          useNativeDriver:true
        }),

        Animated.timing(opacity2, {
          toValue:1,
          duration:300,
          useNativeDriver:true
        })
        ]
      ),
      Animated.parallel(
        [
        Animated.timing(scale3, {
          toValue:1,
          duration:300,
          useNativeDriver:true
        }),

        Animated.timing(opacity3, {
          toValue:1,
          duration:300,
          useNativeDriver:true
        })
        ]
      )
        ]
      ).start()
  }, [])


  return <View style={style}>
            <Animated.View style={{...container_style, opacity: opacity1, transform: [ {scale:scale1}]}}></Animated.View>
            <Animated.View style={{...container_style, opacity: opacity2, transform: [ {scale:scale2}]}}></Animated.View>
            <Animated.View style={{...container_style, opacity: opacity3, transform: [ {scale:scale3}]}}></Animated.View>

        </View>
  }


  
  
  


  useEffect(()=> {
        get_data(ucitaj_podatke_trending,"nasumicniZapisi",{brojSnimaka:7, idSnimka:-1})
        get_data(ucitaj_podatke_skorasnji_unosi,"skorasnjiUnosi",{brojSnimaka:7, idSnimka:-1})

      },[])
  return (
    
      
      <View style={{flex: 1,backgroundColor:"#111425"}}>
        <Modal visible={pretrazivanje} animationType="slide">
                <LinearGradient
                  
                  colors={["#24243e","#10102e"]}
        
                  // colors={["#68493C", "#32202E", "#111425"]}
                  // locations={[0,0.6, 0.8,0.9]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={{flex:1,display:"flex", alignItems:"center"}}>
        
        
                <View style={{display:"flex", flexDirection:"row", alignItems:"center" ,width:"100%", height:75,paddingLeft:25,paddingRight:25, gap:10, backgroundColor:"#1b1b3d"}}>
                  <TouchableOpacity onPress={()=> ucitaj_pretrazivanje(false)} style={{zIndex:52}}><Ionicons name="close-outline" size={32} color={"white"} /></TouchableOpacity>
                  {/* <Text style={{fontFamily:"MontserratBold", fontSize:15, color:"white", textAlign:"center", width:"100%", position:"absolute", zIndex:50, bottom:8}}>Queue</Text> */}
                  <View style={{flex:1, height:40, justifyContent:"center", display:"flex" }}>
                    <Ionicons name="search-sharp" style={{position:"absolute", zIndex:50, left:10}} color={"black"} size={20}></Ionicons>

                    <TextInput 
                    placeholder="Šta ti se sluša ?" 
                    style={{backgroundColor:"white",display:"flex",flex:1, borderRadius:5, fontFamily:"Montserrat", zIndex:3, paddingLeft:40,includeFontPadding:false, color:"#302e2e"}}  
                    placeholderTextColor={"#302e2e"} 
                    onChangeText={(text)=>{
                      set_search(text)
                      set_loading(true)

                      setTimeout(()=> {
                        set_loading(false)
                        get_data(set_results,"pretraga", {pretraga:text})
                      },900)
                    }}
                    ></TextInput>
                  </View>
                </View>
        
                <View style={{width:"100%", gap:16, paddingLeft:25, paddingRight:25, backgroundColor:"#10102e", height:"100%", paddingTop:25}}>
                  
                  {search.length==0? 
                  <View style={{display:"font", gap:5}}>
                    <Text style={{fontFamily:"MontserratBold", color:"white"}}>Pusti ono što ti se dopada</Text>
                    <Text style={{fontFamily:"Montserrat", color:"white"}}>Pretraži autore, pesme, podkaste i još.</Text>
                  </View>
                  :
                  loading ?
                  <Dot_loading container_style={{width:30, height:30, borderRadius:25, backgroundColor:"#FFFFFF"}} style={{justifyContent:"center", alignItems:"center",display:"flex", flexDirection:"row", gap:15, height:"100%"}}></Dot_loading>:
                  <FlatList 
                  data={results}
                  renderItem={({item,index})=>
                  (
                    <View style={{display:"flex",flexDirection:"row", alignItems:"center",gap:15, width:"100%"}} >
                      <TouchableOpacity style={styles.coverShadow} onPress={()=> {
                        router.push({pathname:"/(mplay)/audio", params: {id: item.id}})
                      }}>
                        <Image source={{uri:item.artwork}} style={{width:64, height:64, borderRadius:4}}></Image>
                      </TouchableOpacity>
                      <View style={{flex:1}}>
                        <Text style={{color:"white", fontFamily:"MontserratBold", }} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                        <Text style={{color:"white", fontFamily:"Montserrat"}} numberOfLines={1} ellipsizeMode='tail'>{item.artist}</Text>
                      </View>
                    </View>
                  )
                  }

                  contentContainerStyle={{
                  gap:10,
                  display:"flex"
                  }}
                  />
                  }
                  {/* <Text style={{color:"white", fontFamily:"MontserratBold", fontSize:20, includeFontPadding:false}}>Trenutno pušteno</Text>
                   <View style={{display:"flex",flexDirection:"row", alignItems:"center",gap:15, width:"100%" }} >
                      <View style={styles.coverShadow}>
                        <Image source={{uri:playingTrack?.artwork}} style={{width:64, height:64, borderRadius:4}}></Image>
                      </View>
                      <View style={{flex:1}}>
                        <Text style={{color:"#F6C26B", fontFamily:"MontserratBold", }} numberOfLines={1} ellipsizeMode='tail'>{playingTrack?.title}</Text>
                        <Text style={{color:"white", fontFamily:"Montserrat"}} numberOfLines={1} ellipsizeMode='tail'>{playingTrack?.artist}</Text>
                      </View>
                    </View> */}
                </View>
        
        
                <View style={{flex:1,width:"100%", gap:16, paddingLeft:25, paddingRight:25}}>
                  <View style={{flex:1}}>
                    {/* <LinearGradient colors={["#c55d31","transparent"]} 
                      style={{
                      position:"absolute",
                      zIndex: 100,
                      left: 0,
                      top:0,
                      right: 0,
                      height: 70,
                      // pointerEvents: "none"
                      }} /> */}
            
                    <FlatList
                      // data={podaci}
                      renderItem={({item, index}) => {
                        
                        let is_current = playingTrack?.id==item.id
                        return (
                        <View style={{display:"flex",flexDirection:"row", alignItems:"center",gap:15, width:"100%", backgroundColor: is_current ? "rgba(255,255,255,0.08)": "transparent"}} >
                          <TouchableOpacity style={styles.coverShadow} onPress={()=> {
                            router.push({pathname:"/(mplay)/audio", params: {id: item.id}})

                          }}>
                            <Image source={{uri:item.artwork}} style={{width:64, height:64, borderRadius:4}}></Image>
                          </TouchableOpacity>
                          <View style={{flex:1}}>
                            <Text style={{color:"white", fontFamily:"MontserratBold", }} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                            <Text style={{color:"white", fontFamily:"Montserrat"}} numberOfLines={1} ellipsizeMode='tail'>{item.artist}</Text>
                          </View>
                        </View>
                      )}}
        
                      contentContainerStyle={{
                        gap:10,
                        display:"flex"
                      }}
                    >
                      
                      {/* <View style={{paddingLeft:25, paddingRight:25, width:"100%"}}>
                        <Text style={{fontFamily:"MontserratBold", fontSize:25, color:"white"}}>
                          {playingTrack?.lyrics} 
                        </Text>
                      </View> */}
        
                      
                    </FlatList>
        
        {/* 
                    <LinearGradient colors={[ "rgba(111,73,46,0)",
                            "rgba(111,73,46,0.2)",
                            "rgba(111,73,46,0.6)",
                            "#6f492e"]} 
                            style={{
                            position:"absolute",
                            zIndex: 100,
                            left: 0,
                            bottom:0,
                            right: 0,
                            height: 70,
                            // pointerEvents: "none"
                            }} />  */}
                  </View>
                </View>        
                </LinearGradient>
        
        
        </Modal>
        <View style={{height:"35%"}}>
          <LinearGradient
         colors={[
    "#D6A15F",  // warm gold
    "#8B6A45",  // transition brown
    "#1A1F3A",
    "#381c27",  // deep blue transition
    "#111425"   // dark navy
  ]}
  locations={[0.1, 0.35, 0.65,0.2,1]}
  start={{ x: 0.1, y: 0.2 }}
  end={{ x: 0.3, y: 0.8 }}
  style={{
    flex: 1,
    padding: 20
  }}
  
          >
          <View style={{display:"flex", justifyContent:"center",alignItems:"center", height:"100%"}}>
          <Text  style={{fontFamily:"MontserratBold",fontSize:32, color:"white", letterSpacing:2, textAlign:"center"}}>EXPLORE{"\n"}NEW MUSIC</Text>
        <Text  style={{fontFamily:"MontserratRegular",fontSize:12, color:"white", letterSpacing:2, textAlign:"center"}}>
          Lorem ipsum dolor sit amet,{"\n"}conssstetur adipiscing.
          
      </Text>
      </View>
          </LinearGradient>

        </View>

        <View style={{ paddingTop:0}}>
        <View style={{backgroundColor:"#3F4158", borderRadius:25, flexDirection:"row",marginLeft:40, marginRight:40 }}>
          <TextInput style={{color:"white",left:20, fontFamily:"MontserratItalic", fontSize:15, zIndex:3}} placeholder="Pretražite pesmu ..." placeholderTextColor={"#787996"} onPress={()=>ucitaj_pretrazivanje(true)}></TextInput>
          <View style={{borderRadius:3000, width:"auto", zIndex:555, display:"flex",alignItems:"flex-end", position:"absolute"}}>
            <LinearGradient
              colors={['#24243e', '#f17b5d', '#f02fc2']}
        
        // Start at top-left
              start={{ x: 0, y: 0 }}
        
        // End at bottom-right
        end={{ x: 1, y: 1 }}
        
        style={{width:"30",height:"100%"}}>
            </LinearGradient>
          </View>
        </View>


       <View style={{paddingTop:10}}>
        <Text style={{fontFamily:"MontserratBold",fontSize:18, color:"white", letterSpacing:4, marginLeft:25}}>{"\n"}U TRENDINGU</Text>

        <View style={{display:"flex",  width:"100%"}}>
        <FlatList
        style={{ paddingTop:15}} 
        contentContainerStyle={{display:"flex", flexDirection:"row",gap:20,  paddingLeft:25}} 
        horizontal
        showsHorizontalScrollIndicator={false}
        data={u_trendingu} 
        refreshControl={
          <RefreshControl refreshing={refresh_val} onRefresh={refresh}/>

          
          
        }
        renderItem={({item,index})=> 
        (
          <View style={{height:"145", width:"140", gap:10, }}>
            <TouchableOpacity onPress={()=> {                        router.push({pathname:"/(mplay)/audio", params: {id: item.id}})}}>
             
                <Image source={{uri: item.artwork}} style={{borderRadius:10, width:"100%", height:90}}></Image>
            </TouchableOpacity> 
            <View>
            <Text style={{color:"white", fontFamily:"MontserratBold"}} ellipsizeMode="tail" numberOfLines={1}>{item.title}</Text>
            <Text style={{color:"gray", fontFamily:"Montserrat"}} ellipsizeMode="tail" numberOfLines={1}>{item.artist}</Text>
            </View>
          </View>
        )
      }></FlatList>

 
        <LinearGradient
        colors={["transparent", "#111425"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 60
    }}
    pointerEvents="none"
  />
        </View>
        
<Text style={{fontFamily:"MontserratBold",fontSize:18, color:"white", letterSpacing:4, marginTop:5, marginLeft:25}}>{"\n"}NEDAVNA PUŠTANJA</Text>

<View  style={{maxHeight:"41%"}}>
  
    <LinearGradient colors={[ "#111425","transparent"]} 
    style={{
    position: "absolute",
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    pointerEvents: "none"
    }} />

        <FlatList 
        contentContainerStyle={{paddingTop:10, gap:20, paddingLeft:25, paddingBottom:20}}
        data={skorasnji_unosi}
        renderItem={({item, index})=> (
           <View style={{display:"flex", flexDirection:"row"}}>
            <TouchableOpacity onPress={()=> {
              router.push({pathname:"/(mplay)/audio", params: {id: item.id}})

            }}>
            <View style={{height:50, width:70}}>
              <Image source={{uri:item.artwork}} style={{width:"auto",height:"50", borderRadius:10}}/>
            </View>
          </TouchableOpacity>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:1}}>
              <View style={{paddingLeft:20,flex:1}}>
                <Text style={{color:"white", fontFamily:"MontserratBold"}} ellipsizeMode="tail" numberOfLines={1}>{item.title}</Text>
                <Text style={{color:"gray", fontFamily:"Montserrat"}}  ellipsizeMode="tail" numberOfLines={1}>{item.artist}</Text>
              </View>
              <View style={{display:"flex", flexDirection:"row", paddingRight:10}}>
              <TouchableOpacity>
              <Ionicons name="heart-outline" size={32} color={"white"}></Ionicons></TouchableOpacity>

              <TouchableOpacity><Ionicons name="ellipsis-vertical-outline" size={32} color={"white"}></Ionicons></TouchableOpacity>
              </View>

            </View>
          </View>
        )}
        />


{/* 
          <View style={{display:"flex", flexDirection:"row"}}>
            <TouchableOpacity>
            <View style={{height:50, width:70}}>
              <LinearGradient
              colors={[ '#eb39ff', '#9b0faa']}
        
                // Start at top-left
                      start={{ x: 0, y: 0 }}
                
                // End at bottom-right
                end={{ x: 1, y: 1 }}
        
                style={{width:"auto",height:"50", borderRadius:10}}/>
            </View>
          </TouchableOpacity>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:1}}>
              <View style={{paddingLeft:20}}>
                <Text style={{color:"white", fontFamily:"MontserratBold"}}>Album name</Text>
                <Text style={{color:"gray", fontFamily:"Montserrat"}}>Autor</Text>
              </View>
              <View style={{display:"flex", flexDirection:"row", paddingRight:10}}>
              <TouchableOpacity>
              <Ionicons name="heart-outline" size={32} color={"white"}></Ionicons></TouchableOpacity>

              <TouchableOpacity><Ionicons name="ellipsis-vertical-outline" size={32} color={"white"}></Ionicons></TouchableOpacity>
              </View>

            </View>
          </View> */}


{/* 
          <View style={{display:"flex", flexDirection:"row"}}>
            <TouchableOpacity>
            <View style={{height:50, width:70}}>
              <LinearGradient
              colors={[ '#eb39ff', '#9b0faa']}
        
                // Start at top-left
                      start={{ x: 0, y: 0 }}
                
                // End at bottom-right
                end={{ x: 1, y: 1 }}
        
                style={{width:"auto",height:"50", borderRadius:10}}/>
            </View>
          </TouchableOpacity>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:1}}>
              <View style={{paddingLeft:20}}>
                <Text style={{color:"white", fontFamily:"MontserratBold"}}>Album name</Text>
                <Text style={{color:"gray", fontFamily:"Montserrat"}}>Autor</Text>
              </View>
              <View style={{display:"flex", flexDirection:"row", paddingRight:10}}>
              <TouchableOpacity>
              <Ionicons name="heart-outline" size={32} color={"white"}></Ionicons></TouchableOpacity>

              <TouchableOpacity><Ionicons name="ellipsis-vertical-outline" size={32} color={"white"}></Ionicons></TouchableOpacity>
              </View>

            </View>
          </View>
          <View style={{display:"flex", flexDirection:"row"}}>
            <TouchableOpacity>
            <View style={{height:50, width:70}}>
              <LinearGradient
              colors={[ '#eb39ff', '#9b0faa']}
        
                // Start at top-left
                      start={{ x: 0, y: 0 }}
                
                // End at bottom-right
                end={{ x: 1, y: 1 }}
        
                style={{width:"auto",height:"50", borderRadius:10}}/>
            </View>
          </TouchableOpacity>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:1}}>
              <View style={{paddingLeft:20}}>
                <Text style={{color:"white", fontFamily:"MontserratBold"}}>Album name</Text>
                <Text style={{color:"gray", fontFamily:"Montserrat"}}>Autor</Text>
              </View>
              <View style={{display:"flex", flexDirection:"row", paddingRight:10}}>
              <TouchableOpacity>
              <Ionicons name="heart-outline" size={32} color={"white"}></Ionicons></TouchableOpacity>

              <TouchableOpacity><Ionicons name="ellipsis-vertical-outline" size={32} color={"white"}></Ionicons></TouchableOpacity>
              </View>

            </View>
          </View>
          <View style={{display:"flex", flexDirection:"row"}}>
            <TouchableOpacity>
            <View style={{height:50, width:70}}>
              <LinearGradient
              colors={[ '#eb39ff', '#9b0faa']}
        
                // Start at top-left
                      start={{ x: 0, y: 0 }}
                
                // End at bottom-right
                end={{ x: 1, y: 1 }}
        
                style={{width:"auto",height:"50", borderRadius:10}}/>
            </View>
          </TouchableOpacity>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:1}}>
              <View style={{paddingLeft:20}}>
                <Text style={{color:"white", fontFamily:"MontserratBold"}}>Album name</Text>
                <Text style={{color:"gray", fontFamily:"Montserrat"}}>Autor</Text>
              </View>
              <View style={{display:"flex", flexDirection:"row", paddingRight:10}}>
              <TouchableOpacity>
              <Ionicons name="heart-outline" size={32} color={"white"}></Ionicons></TouchableOpacity>

              <TouchableOpacity><Ionicons name="ellipsis-vertical-outline" size={32} color={"white"}></Ionicons></TouchableOpacity>
              </View>

            </View>
          </View>
          <View style={{display:"flex", flexDirection:"row"}}>
            <TouchableOpacity>
            <View style={{height:50, width:70}}>
              <LinearGradient
              colors={[ '#eb39ff', '#9b0faa']}
        
                // Start at top-left
                      start={{ x: 0, y: 0 }}
                
                // End at bottom-right
                end={{ x: 1, y: 1 }}
        
                style={{width:"auto",height:"50", borderRadius:10}}/>
            </View>
          </TouchableOpacity>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:1}}>
              <View style={{paddingLeft:20}}>
                <Text style={{color:"white", fontFamily:"MontserratBold"}}>AlbumM name</Text>
                <Text style={{color:"gray", fontFamily:"Montserrat"}}>Autor</Text>
              </View>
              <View style={{display:"flex", flexDirection:"row", paddingRight:10}}>
              <TouchableOpacity>
              <Ionicons name="heart-outline" size={32} color={"white"}></Ionicons></TouchableOpacity>

              <TouchableOpacity><Ionicons name="ellipsis-vertical-outline" size={32} color={"white"}></Ionicons></TouchableOpacity>
              </View>

            </View>
          </View> */}
           
          
        <LinearGradient colors={[ "transparent","#111425"]} 
            style={{
            position: "absolute",
            zIndex: 100,
            bottom: 0,
            left: 0,
            right: 0,
            height: 20,
            pointerEvents: "none"
            }} />

        
        </View>
       </View>

       
       </View>
      </View>


    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  presjaj: {
  ...StyleSheet.absoluteFillObject
  },
  baza: {
    flex:1,
    backgroundColor:"#0f1427"
  },
   gradient: {
    position:"absolute",

    zIndex:100,
    bottom:69.8,
    left:0,
    right:0,
    height:60,
    pointerEvents:"none"
  }
});

