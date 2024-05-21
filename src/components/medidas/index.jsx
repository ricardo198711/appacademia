import { View, Text, ScrollView, Modal, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './style'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios';
import { AuthContext } from '../../contexts/Auth';
import { URL_APP } from '@env'
export default function Medidas() {

   const [peso, setPeso] = useState('');
   const [altura, setAltura] = useState('');
  const [existMedida, setExistMedida] = useState(true)
  const [pesoDb, setPesoDb] = useState('')
  const [alturaDb, setAlturaDb] = useState('')
   const { dataUser } = useContext(AuthContext)

    
   const imc = Number(pesoDb) / (Number(alturaDb) * Number(alturaDb));
   
   

   
  


   const cadMedidas = async () => {
       const med = {
        peso: Number(peso),
        altura: Number(altura),
        id_user: dataUser.data.id
       }
       try {
          const response = await axios.post(`${URL_APP}/createmedidas`, med, {
            headers: {
              'Content-Type': 'application/json'
            }
          })

          console.log(response.data.message)
          buscarmedidas()
       } catch (error) {
        console.log(error)
       }
   }

   const idDoUsuario = dataUser.data.id

   

   useEffect(() => {
    buscarmedidas()
   }, [existMedida])

   const buscarmedidas = async () => {
    try {
     const response = await axios.get(`${URL_APP}/buscarmedidas/?id_user=${idDoUsuario}`)

     setExistMedida(response.data.success)
     if(response.data.success !== false){
      setAlturaDb(response.data['data'][0].altura)
      setPesoDb(response.data['data'][0].peso)
     }
    } catch (error) {
     console.log(error)
    }
 }


  
  return (
    <View style={styles.container}>
      
    <ScrollView style={{flex: 2}}>
      <View style={{padding: 14}}>
      <Text>Meus dados</Text>
      </View>
    <View style={styles.card}>
      
       
       <View style={styles.cards}>
       <Ionicons name="body" size={22}/>
        <Text style={styles.textCard}>{pesoDb} Kg</Text>
       </View>

       <View style={styles.cards}>
       <Ionicons name="arrow-up" size={22}/>
        <Text style={styles.textCard}>{alturaDb}</Text>
       </View>

       <View style={styles.imc}>
      
        <Text style={styles.textCard}>IMC: {imc.toFixed()}</Text>
        <Text style={{textAlign: 'center', padding: 4}}>
          Lembrando que o IMC pode não necessariamente se referir ao nivel de gordura caso você possua massa muscular
        </Text>
       </View>
      </View>
     
    </ScrollView>
    
    {!existMedida &&
    <Modal
    transparent={true}
   
    >
      <View  style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
       <View style={{width: '80%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', padding: 40, height: 400, borderRadius: 8, elevation: 5}}>
        <Text>Dados Pessoais</Text>

       <View style={{marginTop: 10}}>
        <Text>Qual sua Altura?</Text>
       <TextInput 
       style={{width: '100%', borderWidth: 1, padding: 8, marginTop: 10, borderRadius: 8}}
       placeholder='kg'
       keyboardType='decimal-pad'
       onChangeText={setAltura}
       />
       </View>

      <View style={{marginTop: 10}}>
      <Text>Qual o seu peso?</Text>
      <TextInput 
       style={{width: '100%', borderWidth: 1, padding: 8, marginTop: 10, borderRadius: 8, }}
       placeholder='Altura'
       keyboardType='decimal-pad'
       onChangeText={setPeso}
       
       />
      </View>

      <View style={{width: '100%', marginTop: 10}}>
        <TouchableOpacity 
        onPress={cadMedidas}
        style={{width: '100%', alignItems: 'center', borderWidth: 1, padding: 10, borderRadius: 8}}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>
      </View>
       </View>
      </View>
    </Modal>

    }

    
    </View>
  )
}