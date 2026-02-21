import { StyleSheet, TextInput, View } from 'react-native';



export default function HomeScreen() {
  return (
    

      <View style={{flex:1, padding:25,backgroundColor:"#111425"}}>
        <View style={{backgroundColor:"#3F4158", borderRadius:25}}>
          <TextInput style={{color:"white",left:20}} placeholder="Pretražite pesmu ..." placeholderTextColor={"#787996"}></TextInput>
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
  }
});

