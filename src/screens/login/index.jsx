import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { styles } from './style'
import { AuthContext } from '../../contexts/Auth'


export default function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
      const navigation = useNavigation()
     const { login } = useContext(AuthContext)


    

    const handleHome  = async () => {
        
        const response = await login({ email: email, password: password})

        if(response === true){
          setEmail('')
            setPassword('')
            navigation.navigate('Main')
            
        }else {
            Alert.alert('Falha ao Logar', 'Verifique suas credenciais!')
            setEmail('')
            setPassword('')
            navigation.navigate('Login')
          
        }
    }


    const handleSubscribe = () => {
        navigation.navigate('Subscribe')
    }
  return (
    <View style={styles.constainer}>
       <View style={styles.cardImg}>
        <Image 
        style={styles}
        source={require("../../assets/2150321809.jpg")} 
        resizeMode='cover'

        />
        <Text style={{
            position: 'absolute',
            top: 180,
            left: 110, 
            color: '#fff',
            fontSize: 28
            }}>Gym Fitness</Text>
       </View>

       <View style={styles.form}>
         <View style={styles.cardForm}>
            <TextInput 
            style={styles.input}
            placeholder='Digite seu email'
            onChangeText={setEmail}
            value={email}
            />

            <TextInput 
            style={styles.input}
            placeholder='Digite sua senha'
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            />


            <TouchableOpacity style={styles.btn} onPress={handleHome}>
                <Text style={styles.textBtn}>login</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text>Não possui cadastro?  </Text>
                <TouchableOpacity onPress={handleSubscribe}>
                <Text style={{textDecorationLine: 'underline', color: 'blue'}}>Criar agora!</Text>
                </TouchableOpacity>
           
            </View>
         </View>

       </View>
    </View>
  )
}