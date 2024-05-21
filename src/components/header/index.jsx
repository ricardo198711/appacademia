import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/Auth'


export default function Header({ items }) {

  const { dataUser } = useContext(AuthContext)
  const [inicial, setInicial] = useState('')

    const navigation = useNavigation();
     const handleProfile = () => {
        navigation.navigate('Profile')
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
    <View style={styles.header}>
     {items &&
       <View style={styles.cardHeader}>
       <Text style={styles.text}>Gym Fitness</Text>
  
        <TouchableOpacity onPress={handleProfile}>
        <View style={{width: 40, height: 40, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderRadius: 50}}>
          <Text>{inicial}</Text>
          </View>
        </TouchableOpacity>
       </View>

     }
    </View>
  )
}