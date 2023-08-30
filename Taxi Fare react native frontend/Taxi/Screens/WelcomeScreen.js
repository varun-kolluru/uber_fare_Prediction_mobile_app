import { Text,View,StyleSheet,Pressable,ImageBackground,SafeAreaView } from "react-native";

const WelcomeScreen=({navigation})=>{
    return (
        <View>
            <ImageBackground resizeMode={'strech'} style={{height: '100%', width: '100%' }} source={require('../assets/Taxi_home2.jpg')}>
             <Text style={styles.Header}>Welcome to Taxi Fare Pretictor</Text>   
             <Pressable onPress={() => navigation.navigate('ML Prediction Screen')} style={styles.button}><Text style={styles.buttontxt}>Let's GO</Text></Pressable>
            </ImageBackground>
            
        </View>
    );
}

const styles = StyleSheet.create({
    Header: {
      margin:50,
      fontSize:30,
      textAlign:"center",
      fontWeight:'500',
      top: 120,
      backgroundColor:"rgba(255,255,255,0.70)"
    },
    button: {
      height:50,
      width:250,
      left:90,
      borderRadius:30,
      alignItems:'center',
      marginBottom:80,
      top: 200,
      backgroundColor:"rgba(255,255,255,0.70)"
    },
    buttontxt:{
      fontSize:25,
      fontWeight:'bold'
    }
  });

export default WelcomeScreen;

/*<Pressable onPress={() => navigation.navigate('My PGs')} style={styles.button}><Text style={styles.buttontext}>Owner</Text></Pressable>
<Pressable onPress={() => navigation.navigate('Guest')} style={styles.button}><Text style={styles.buttontext}>Guest</Text></Pressable>

    blur:{
      top:620,
      left:28,
      height:74,
      width:125,
      backgroundColor:"rgba(0,0,0,1)"
    }*/