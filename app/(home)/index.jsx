import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';




export default function HomeScreen() {
  return (
    

      <View style={{flex:1,backgroundColor:"#111425"}}>

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

        <View style={{padding:35, paddingTop:0}}>
        <View style={{backgroundColor:"#3F4158", borderRadius:25, flexDirection:"row" }}>
          <TextInput style={{color:"white",left:20, fontFamily:"MontserratItalic", fontSize:15, zIndex:3}} placeholder="Pretražite pesmu ..." placeholderTextColor={"#787996"}></TextInput>
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
        
       <View>

       </View>
       
       <View>
        <Text style={{fontFamily:"MontserratBold",fontSize:18, color:"white", letterSpacing:4}}>{"\n"}NEDAVNA PUŠTANJA</Text>
        <View style={{display:"flex"}}>
        <ScrollView style={{ paddingTop:15}} contentContainerStyle={{display:"flex", flexDirection:"row",gap:20}} horizontal >

          <View style={{height:"145", width:"140", gap:10}}>
            <TouchableOpacity>
              <LinearGradient
              colors={[ '#f17b5d', '#f02fc2']}
        
                // Start at top-left
                      start={{ x: 0, y: 0 }}
                
                // End at bottom-right
                end={{ x: 1, y: 1 }}
        
                style={{width:"auto",height:"90", borderRadius:10}}/>
            </TouchableOpacity> 
            <View>
            <Text style={{color:"white", fontFamily:"MontserratBold"}}>Album name</Text>
            <Text style={{color:"gray", fontFamily:"Montserrat"}}>Autor</Text>
            </View>
          </View>
          <View style={{height:"145", width:"140", gap:10}}>
            <TouchableOpacity>
              <LinearGradient
              colors={[ '#ffffff', '#7EBEFD']}
        
                // Start at top-left
                      start={{ x: 0, y: 0 }}
                
                // End at bottom-right
                end={{ x: 1, y: 1 }}
        
                style={{width:"auto",height:"90", borderRadius:10}}/>
            </TouchableOpacity> 
            <View>
            <Text style={{color:"white", fontFamily:"MontserratBold"}}>Album name</Text>
            <Text style={{color:"gray", fontFamily:"Montserrat"}}>Autor</Text>
            </View>
          </View>
           <View style={{height:"145", width:"140", gap:10}}>
            <TouchableOpacity>
              <LinearGradient
              colors={[ '#eb39ff', '#9b0faa']}
        
                // Start at top-left
                      start={{ x: 0, y: 0 }}
                
                // End at bottom-right
                end={{ x: 1, y: 1 }}
        
                style={{width:"auto",height:"90", borderRadius:10}}/>
            </TouchableOpacity> 
            <View>
            <Text style={{color:"white", fontFamily:"MontserratBold"}}>Album name</Text>
            <Text style={{color:"gray", fontFamily:"Montserrat"}}>Autor</Text>
            </View>
          </View>
          {/* #E641F7 */}


        </ScrollView>

        <LinearGradient colors={["transparent", "#111425"]}
        start={{ x: 0, y: 0 }}
                
                // End at bottom-right
        end={{ x: 1, y: 1 }} 
        style={styles.gradient} />
        
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

