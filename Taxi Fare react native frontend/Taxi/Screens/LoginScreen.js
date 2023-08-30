import { useState } from "react";
import { Text,View,StyleSheet,Pressable,ImageBackground, TextInput, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen=({navigation})=>{
    const [un,setun] = useState('');
    const [pass,setpass]=useState('');

    const save_token=async (token)=>{
            try{
              await AsyncStorage.setItem('token',JSON.stringify(token));
              console.log(token)
            }
            catch(e){alert(e)}
          };

    const handlesubmit=()=>{
        fetch('http://localhost/Api1/signin', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({username:un,password:pass})})
        .then(response => response.json())
        .then((data) => {
                         if (data.hasOwnProperty("token")){
                            save_token(data.token);
                            navigation.navigate("Welcome")}
                        else{alert("Bad credentinals")}
                         })
        .catch(error => console.error('Error:', error));
        
    }

    return (
        <View>
            <ImageBackground resizeMode={'strech'} style={{height: '100%', width: '100%' }} source={require('../assets/Taxi_home2.jpg')}>   
             <ScrollView style={styles.box} keyboardDismissMode="on-drag">
                <Text style={styles.h1}>Login</Text>
                <TextInput style={styles.ip1} onChangeText={setun} placeholder="Enter Email"/>
                <TextInput style={styles.ip1} onChangeText={setpass} placeholder="Enter Password" secureTextEntry={true}/>
                <Pressable onPress={handlesubmit} style={styles.subb1}><Text style={styles.subt1}>Submit</Text></Pressable>
                <Text style={styles.des}>Don't had a account yet? <Pressable onPress={() => navigation.navigate('Signup')} width={100}><Text style={{color: 'blue'}}>Create account</Text></Pressable></Text>
             </ScrollView>
            </ImageBackground>
            
        </View>
    );
}

const styles = StyleSheet.create({
    box:{
        backgroundColor:'rgba(255,255,255,0.4)',
        marginHorizontal:50,
        marginVertical:250,
    },
    h1:{
        fontSize:30,
        fontWeight:'bold',
        left:120,
        top:25,
    },
    ip1:{
        top:40,
        height:50,
        fontWeight:'500',
        fontSize:25,
        marginVertical:20,
        backgroundColor:'white'
    },
    subb1:{
        backgroundColor:'lightgreen',
        alignItems:'center',
        height:50,
        width:150,
        left:75,
        top:50,
        borderRadius:10,
    },
    subt1:{
        top:10,
        fontSize:25,
        fontWeight:'600',
    },
    des:{
        top:65,
        fontSize:18,
        fontWeight:'600'
    },
  });

export default LoginScreen;


