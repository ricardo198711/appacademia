import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Header from '../../components/header'
import Medidas from '../../components/medidas'
import Exercicios from '../../components/exercicios'

export default function HomeScreen() {
  return (
    <View style={{flex: 1}}>
        <Header items={1}/>
      <View style={{width: '100%', alignItems: 'center', bottom: 18}}>
     
      </View>

      <View style={{flex: 1}}>
      <Medidas />
      <Exercicios />
      </View>
    
    </View>
  )
}