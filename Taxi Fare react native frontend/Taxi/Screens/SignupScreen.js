import { useState } from "react";
import { Text,View,StyleSheet,Pressable,ImageBackground, TextInput, ScrollView } from "react-native";

const SignupScreen=({navigation})=>{
    const [fn,setfn]= useState('');
    const [ln,setln]=useState('');
    const [email,setemail]=useState('');
    const [un,setun] = useState('');
    const [pass,setpass]=useState('');

    const handlesubmit=()=>{
        fetch('http://localhost:8080/Api1/signup', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({username:un,password:pass,fname:fn,lname:ln,email:email})})
        .then(response => response.json())
        .then(data => data==='Registered'?navigation.navigate("Login"):alert([data.username,data.email]))
        .catch(error => console.error('Error:', error))
    }

    return (
        <View>
            <ImageBackground resizeMode={'strech'} style={{height: '100%', width: '100%' }} source={require('../assets/Taxi_home2.jpg')}>  
             <ScrollView style={styles.box} keyboardDismissMode="on-drag">
                <Text style={styles.h1}>Signup</Text>
                <TextInput style={styles.ip1} onChangeText={setfn} placeholder="First Name"/>
                <TextInput style={styles.ip1} onChangeText={setln} placeholder="Last Name" />
                <TextInput style={styles.ip1} onChangeText={setun} placeholder="Username"/>
                <TextInput style={styles.ip1} onChangeText={setemail} placeholder="Email Id"/>
                <TextInput style={styles.ip1} onChangeText={setpass} placeholder="Password" secureTextEntry={true}/>
                <Pressable onPress={handlesubmit} style={styles.subb1}><Text style={styles.subt1}>Submit</Text></Pressable>
                <Text style={styles.des}>Already had a account? <Pressable onPress={() => navigation.navigate('Login')} width={100}><Text style={{color: 'blue'}}>Login account</Text></Pressable></Text>
             </ScrollView>
            </ImageBackground>
            
        </View>
    );
}

const styles = StyleSheet.create({
    box:{
        backgroundColor:'rgba(255,255,255,0.4)',
        marginHorizontal:50,
        marginBottom:175,
        marginTop:50,
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

export default SignupScreen;

