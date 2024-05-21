import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert, Button, Platform } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { URL_APP } from '@env'

export default function Subscribe() {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('')
      const [tel, setTel] = useState('')
      const [password, setPassword] = useState('')
      const [nascimento, setNascimento] = useState(new Date())
     
      const [show, setShow] = useState(false);
  

      const navigation = useNavigation()

    const createAUser = async() => {

        if(name === ''){
            Alert.alert('ATENÇÃO', 'O campo nome é obrigátorio!')
            return;
        }

        if(email === ''){
            Alert.alert('ATENÇÃO', 'O campo email é obrigátorio!')
            return;
        }

        if(tel === ''){
            Alert.alert('ATENÇÃO', 'O campo telefone é obrigátorio!')
            return;
        }

        if(password === ''){
            Alert.alert('ATENÇÃO', 'O campo senha é obrigátorio!')
            return;
        }



       const dataUser = {
        name: name, 
        email: email,
        tel: tel,
        nascimento: nascimento,
        password: password,
        permission: true
       }


       const response = await axios.post(`${URL_APP}/caduser`, dataUser)

      if(response.data.success === true){
        Alert.alert('SUCESSO', 'Usuário criado com sucesso!')
        navigation.navigate('Login')

      }else {
        Alert.alert('Aviso', response.data.message)
        return;

      }
    }

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || nascimento;
      setShow(Platform.OS === 'ios');
      setNascimento(currentDate);
    };
  
    const showDatepicker = () => {
      setShow(true);
    };

    
 
    console.log(nascimento)


  return (
    <View style={styles.container}>
     <View style={{flex: 1, width: '100%'}}>
      <ImageBackground 
      source={require('../../assets/23478.jpg')}
      style={styles.img}
      blurRadius={6}
      resizeMode='cover'
      >

        <Text style={{color: '#fff', fontSize: 32, marginTop: 110,textShadowColor: '#000', textShadowRadius: 12}}>Gym
        
        
         Fitness</Text>
      </ImageBackground>
     </View>
     <View style={styles.cardSubscribe}>
        <TextInput 
        style={styles.input}
        placeholder='Nome'
        onChangeText={setName}
        value={name}
        />

        <TextInput 
         style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        onChangeText={setEmail}
        value={email}
        />
        

        <TextInput
         style={styles.input} 
        placeholder='(00) 0000-0000'
        keyboardType='number-pad'
        onChangeText={setTel}
        value={tel}
        />

      
       <View style={{width: '100%', flexDirection: 'row', padding: 14, backgroundColor: '#fff', borderRadius: 8}}>
       <Button onPress={showDatepicker} title="Data de nascimento" />
      {show && (
        <DateTimePicker
        
          testID="dateTimePicker"
          value={nascimento}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

       </View>
        <TextInput 
        style={styles.input} 
        placeholder='senha'
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        />


        <TouchableOpacity style={styles.btn} onPress={createAUser}>
            <Text style={styles.textBtn}>Criar Conta</Text>
        </TouchableOpacity>
     </View>
    </View>
  )
}