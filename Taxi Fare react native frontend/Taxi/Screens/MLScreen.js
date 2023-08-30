import { Text,View,StyleSheet,Pressable,ImageBackground,TextInput,ScrollView,KeyboardAvoidingView } from "react-native";
import React, { useState,useEffect } from 'react';
import { Switch } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MLScreen=({navigation})=>{
    const [distance, setdistance] = useState(0);
    const [pred_cost,set_pred_cost] = useState(0);
    const [actual_cost,set_actual_cost]=useState(0);
    const [toggle,settoggle]=useState(true);
    const [mae,setmae]=useState(0);
    const [token,settoken]=useState('');


    const toggleSwitch = () => settoggle(previousState => !previousState);

    useEffect(()=>{
      (async ()=>{
        try{
          const tmp=await AsyncStorage.getItem('token')
          const Data=JSON.parse(tmp);
          settoken(Data);
        }
        catch(e){alert(e)}
      })();
    },[]);

    const handleFormSubmit2 = () => {
      if(actual_cost==0){
          return (alert('Distance cannot be Zero'))}
      else{
        fetch('http://localhost:8080/Api1/save_data', {method: 'POST',headers: {'Content-Type': 'application/json','Authorization': 'Token '+token},body: JSON.stringify({distance:parseFloat(distance),actual_cost:parseFloat(actual_cost),pred_cost:parseFloat(pred_cost)})})
        .then(response => response.json()).then(data => setmae(data)).catch(error => console.error('Error:', error));
      }
  };

    const handleFormSubmit1 = () => {
        if(distance==0){
            return (alert('Distance cannot be Zero'))}
        else{
          fetch('http://localhost:8080/Api1/dist_cal_view', {method: 'POST',headers: {'Content-Type': 'application/json','Authorization': 'Token '+token},body: JSON.stringify({distance:parseFloat(distance)})})
          .then(response => response.json()).then(data => set_pred_cost(data)).catch(error => console.error('Error:', error));
        }
    };
    return (
        <View>
            <ImageBackground resizeMode={'strech'} style={{height: '100%', width: '100%' }} source={require('../assets/Taxi_robot.jpg')}>
                <Text style={styles.Header}>This is Machine Learning predictor model</Text>
                <Text style={styles.description}>This model is build using uber dataset from kaggle and the regression model used is Linear regression and this dataset is US based dataset so the predicted fare will be in USD($)</Text>
                <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
                <ScrollView keyboardDismissMode="on-drag">
                    <Text style={styles.togtxt}>Enable Machine Learning Calculator</Text>
                    <Switch top={15} left={250} trackColor={{false: 'white', true: 'lightgreen'}} thumbColor={toggle ? 'black' : 'white'} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={toggle}/>
                    {toggle &&
                    <>
                    <TextInput style={styles.inputfield} onChangeText={setdistance} placeholder="Enter Distance in KMs" keyboardType='numeric'/>
                    <Pressable style={styles.button} onPress={handleFormSubmit1}><Text style={styles.btntxt}>Submit</Text></Pressable>
                    {pred_cost!==0 && 
                    <>
                    <Text style={styles.inputfield}>Predicted cost is {pred_cost} USD</Text>
                    <Text style={styles.description}>Please enter the actual cost for analysing the accuracy of model afer finishing your ride</Text>
                    <TextInput style={styles.inputfield1} onChangeText={set_actual_cost} placeholder="Enter Actual Cost" keyboardType='numeric'/>
                    <Pressable style={styles.button1} onPress={handleFormSubmit2}><Text style={styles.btntxt1}>Get MAE</Text></Pressable>
                    <Text style={styles.inputfield2}>Mean Absolute Error is {mae}</Text>
                    </>
                    }
                    </>
                    }
                    {!toggle &&
                    <>
                    <Text>Start location:</Text>
                    </>
                    }
                    
                </ScrollView>    
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    togtxt: {
        margin:20,
        fontSize:20,
        textAlign:"center",
        fontWeight:'500',
        top: 70,
        width:200,
        backgroundColor:"rgba(255,255,255,0.80)"
      },
    Header: {
      margin:20,
      fontSize:30,
      textAlign:"center",
      fontWeight:'500',
      top: 60,
      backgroundColor:"rgba(255,255,255,0.70)"
    },
    description:{
        top:50,
        fontSize:15,
        backgroundColor:"rgba(255,255,255,0.80)"  
    },
    inputfield: {
        height:50,
        margin:10,
        marginBottom:30,
        fontSize:20,
        top: 70,
        backgroundColor:'rgba(255,255,255,0.9)'
      },
      button: {
        height:40,
        width:100,
        left:150,
        borderRadius:30,
        alignItems:'center',
        marginBottom:20,
        top: 70,
        backgroundColor:"lightgreen"
      },
      btntxt: {
        fontWeight:'600',
        fontSize:20,
      },
      inputfield1: {
        width:200,
        height:40,
        fontSize:20,
        top: 70,
        left:20,
        backgroundColor:'rgba(255,255,255,0.9)'
      },
      button1: {
        height:30,
        width:120,
        left:225,
        borderRadius:30,
        alignItems:'center',
        backgroundColor:"lightgreen",
        top:35
      },
      btntxt1: {
        fontWeight:'600',
        fontSize:18,
      },
      inputfield2: {
        width:400,
        height:40,
        fontSize:20,
        top: 70,
        left:20,
        backgroundColor:'rgba(255,255,255,0.9)'
      },
  });

export default MLScreen;