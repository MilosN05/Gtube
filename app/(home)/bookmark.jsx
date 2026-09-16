import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { outer_store } from '../../store/store';
import { useUser } from '../user_context';

export default function bookmark() {


  const {info_data,online_access} = useUser()
  // const parsed_data = JSON.parse(info_data)
  // console.log(parsed_data)
  let loaded_zustand_sid = outer_store((state)=> state.set_info_data_zus)
  let loaded_bookmark = outer_store((state)=> state.Bookmark)

  return (
    <View style={{display:"flex", flex:1, backgroundColor:"red"}}>
      <LinearGradient
        colors={[ "#8f2727","#601c1c", "#111425"]}
        locations={[0, 0.15, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.3 }}
        style={{ flex: 1, display:"flex",display:"flex",alignItems:"center",padding:30}}
        >
        <View style={{width:"100%", height:"30%", display:"flex", gap:9}}>
          <Text style={{fontFamily:"MontserratBold", fontSize:27, color:"white"}}>Lajkovane Pesme</Text>
          <Text style={{fontFamily:"Montserrat", fontSize:20, color:"#989797"}}>50 pesama</Text>
          <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <TouchableOpacity>
              <Ionicons name="arrow-down-circle-outline" size={38} color={"#989797"}></Ionicons>
            </TouchableOpacity>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", gap:12}}>
              <TouchableOpacity>
                <Ionicons name="shuffle-sharp" size={38} color={"#989797"}></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={{padding:12, backgroundColor:"#D6A15F", borderRadius:333, display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <Ionicons name="play" size={38} color={"white"}></Ionicons>
                </View>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
        <View style={{height:"70%",gap:23}}>
          <View style={{display:"flex",flexDirection:"row", alignItems:"center",gap:15, width:"100%", backgroundColor: "transparent"}} >
            <TouchableOpacity style={{...styles.coverShadow, backgroundColor:"#3F4158", width:64, height:64, display:"flex", justifyContent:"center", alignItems:"center", borderRadius:4}} onPress={()=> {
              router.navigate("/(home)/main")
                // play_by_index(index)
              }}>
                {/* <Image source={{uri:item.artwork}} style={{width:64, height:64, borderRadius:4}}></Image> */}
                {/* <Image source={require("../../assets/images/icon.png")} style={{width:64, height:64, borderRadius:4}}></Image> */}
                <Ionicons name="add-outline" size={48} color={"#989797"}></Ionicons>
              </TouchableOpacity>
              <View style={{flex:1, justifyContent:"center"}}>
                <Text style={{color:"white", fontFamily:"MontserratBold", }} numberOfLines={1} ellipsizeMode='tail'>Dodaj pesmu</Text>
              </View>
          </View> 
          <FlatList
            data={Object.values(loaded_bookmark  || [])}
            renderItem={({item, index}) => {
              
              // let is_current = playingTrack?.id==item.id
              return (
              <View style={{display:"flex",flexDirection:"row", alignItems:"center",gap:15, width:"100%", backgroundColor: "transparent"}} >
            <TouchableOpacity style={styles.coverShadow} onPress={()=> {
                // play_by_index(index)
              }}>
                <Image source={{uri:`http://192.168.0.22:8000${item.artwork}`}} style={{width:64, height:64, borderRadius:4}}></Image>
                {/* <Image source={require("../../assets/images/icon.png")} style={{width:64, height:64, borderRadius:4}}></Image> */}

              </TouchableOpacity>
              <View style={{flex:1, display:"flex", justifyContent:"space-between", flexDirection:"row", alignItems:"center"}}>
                <View style={{display:"flex", flex:1}}>
                  <Text style={{color:"white", fontFamily:"MontserratBold", }} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                  <Text style={{color:"white", fontFamily:"Montserrat"}} numberOfLines={1} ellipsizeMode='tail'>{item.artist}</Text>

                </View>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={32} color={"#989797"}></Ionicons>
                </TouchableOpacity>

              </View>
          </View> 
            )}}

            contentContainerStyle={{
              gap:10,
              display:"flex"
            }}
          >
            
          </FlatList>


          



          {/* Ovde će ići FlatList */}
          
            {/* <View style={{display:"flex",flexDirection:"row", alignItems:"center",gap:15, width:"100%", backgroundColor: "transparent"}} >
            <TouchableOpacity style={styles.coverShadow} onPress={()=> {
                // play_by_index(index)
              }}>
                {/* <Image source={{uri:item.artwork}} style={{width:64, height:64, borderRadius:4}}></Image> 
                <Image source={require("../../assets/images/icon.png")} style={{width:64, height:64, borderRadius:4}}></Image>

              </TouchableOpacity>
              <View style={{flex:1, display:"flex", justifyContent:"space-between", flexDirection:"row", alignItems:"center"}}>
                <View>
                  <Text style={{color:"white", fontFamily:"MontserratBold", }} numberOfLines={1} ellipsizeMode='tail'>Welcome To Srbija</Text>
                  <Text style={{color:"white", fontFamily:"Montserrat"}} numberOfLines={1} ellipsizeMode='tail'>Beogradski Sindikat</Text>

                </View>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={32} color={"#989797"}></Ionicons>
                </TouchableOpacity>
              </View>
          </View>  


*/}

        </View>

        

        </LinearGradient>
    </View>
  )
}

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
        
    },
coverShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,

    // Android
    elevation: 8,
  },
    
});