import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/header'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/Auth'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { URL_APP } from '@env'


export default function Profile() {
 
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const { dataUser } = useContext(AuthContext)


  const [inicial, setInicial] = useState('')
   
  useEffect(() => {
    const handleMedidas = async() => {
      try {
         const response = await axios.get(`${URL_APP}/buscarmedidas/?id_user=${dataUser.data.id}`)
         setPeso(response.data['data'][0].peso)
         setAltura(response.data['data'][0].altura)
         
      } catch (error) {
        console.log(error)
      }
  }
  handleMedidas()
  }, [])
 const navigation = useNavigation()
  const handleLogoutApp = () => {
    navigation.navigate('Login')
  }


  useEffect(() => {
    function getInitials(name) {
      // Dividir o nome completo em partes
      const nameParts = name.trim().split(' ');
    
      // Se houver apenas um nome, retornamos a primeira letra duas vezes
      if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase() + nameParts[0].charAt(0).toUpperCase();
      }
    
      // Pegar a primeira parte (primeiro nome) e a última parte (último nome)
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];
    
      // Obter as iniciais do primeiro e último nome, convertendo para maiúsculas
      const firstInitial = firstName.charAt(0).toUpperCase();
      const lastInitial = lastName.charAt(0).toUpperCase();
    
      // Retornar as iniciais concatenadas
      return firstInitial + lastInitial;
    }
    
    // Exemplos de uso
    setInicial(getInitials(dataUser.data.name))
   }, [])
  
  return (
    <View style={{flex: 1}}>
        <Header />
      <View style={styles.cardProfile}>
       <View style={styles.perfilImgLt}>
       <Text style={{fontSize: 24, color: "#fff"}}>{inicial}</Text>
       </View>
      </View>

      <ScrollView style={{flexDirection: 'column', padding: 15, gap: 8, marginBottom: 4}}>
        <View style={styles.logout}>
        <Ionicons name="person" size={22}/>
          <Text>{dataUser.data.name}</Text>
        </View>
        <View style={styles.logout}>
        <Ionicons name="mail" size={22}/>
          <Text>{dataUser.data.email}</Text>
        </View>
        <View style={styles.logout}>
        <Ionicons name="calendar" size={22}/>
          <Text>19/16/1998</Text>
        </View>
        <View style={styles.logout}>
          <Text>Altura: {altura}</Text>
        </View>
        <View style={styles.logout}>
          <Text>Peso Atual: {peso}</Text>
        </View>

      <TouchableOpacity onPress={handleLogoutApp}>
      <View style={[styles.logout, styles.corLogou]}>
        <Text>Sair do app</Text>
      </View>
      </TouchableOpacity>
      </ScrollView>
    </View>
  )
}