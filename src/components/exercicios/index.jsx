import { View, Text, TouchableOpacity, Platform, TextInput, FlatList, StyleSheet, Modal, ScrollView, Alert } from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { URL_APP } from '@env'

import { AuthContext } from '../../contexts/Auth';

export default function Exercicios() {
  const [selectedValue, setSelectedValue] = useState("");
  const [title, setTitle] = useState('');
  const [observacao, setObservacao] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [dados, setDados] = useState([]);
  const bottomSheet = useRef(null);
  const { dataUser } = useContext(AuthContext);

  const handleExpandBottomSheet = () => {
    bottomSheet.current?.expand();
  };

  const handlePickerSelect = (value) => {
    setSelectedValue(value);
    setDiaSemana(value);
    setPickerVisible(false);
  };

  useEffect(() => {
    handleReadExercicios();
  }, []);

  const handleReadExercicios = async () => {
    try {
      const response = await axios.get(`${URL_APP}/lerexerciciosuser/?id_user=${dataUser.data.id}`);
      console.log(response.data['data']);
      setDados(response.data['data']);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCadExercicio = async () => {
    const idUser = dataUser.data.id;
    if(selectedValue === ''){
      Alert.alert('Alerta', 'selecione o dia da semana!')
      return;
    }
    const dadosExercicio = {
      title,
      reps: Number(reps),
      sets: Number(sets),
      observacao,
      weight: Number(weight),
      diaSemana,
      id_user: idUser
    };

    try {
      const response = await axios.post(`${URL_APP}/criarecercicios/?id_user=${idUser}`, dadosExercicio);
      Alert.alert('Sucesso!', response.data.message);
      handleReadExercicios();
      bottomSheet.current?.close();
      setTitle('');
      setReps('');
      setSets('');
      setObservacao('');
      setWeight('');
      setDiaSemana('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteExercicio = async (id_exercicio) => {
    console.log(id_exercicio);
    try {
      const response = await axios.delete(`${URL_APP}/deleteexercicio/?id_exercicio=${id_exercicio}`);
      console.log(response.data);
      handleReadExercicios();
    } catch (error) {
      console.log(error);
    }
  };

  const pickerData = [
    { label: "Segunda", value: "segunda" },
    { label: "Terça", value: "Terça" },
    { label: "Quarta", value: "quarta" },
    { label: "Quinta", value: "quinta" },
    { label: "Sexta", value: "sexta" },
    { label: "Sábado", value: "sabado" },
    { label: "Domingo", value: "domingo" },
  ];

  return (
    <View style={{ flex: 3.5, width: '100%' }}>
      <TouchableOpacity onPress={handleExpandBottomSheet} style={styles.fab}>
        <View>
          <Text style={styles.fabText}>+</Text>
        </View>
      </TouchableOpacity>

      {dados.length !== 0 ? (
        <View style={{ flex:1, padding: 18 }}>
          <Text>Meus treinos</Text>
          <FlatList
          contentContainerStyle={{paddingBottom: 40}}
          showsVerticalScrollIndicator={false}
            data={dados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ flex:1, gap: 15, marginTop: 15 }}>
              <TouchableOpacity>
              <View style={styles.exerciseCard}>
                  <View style={{alignItems: 'center', justifyContent: 'space-between'}}>
                    <View>
                    <Text style={styles.titleCard}>{item.title}</Text>
                     <View style={{flexDirection:'row', alignItems: 'center', gap: 8}}>
                     <Text style={styles.titleCard}>Series: {item.sets}  |</Text>
                    <Text style={styles.titleCard}>Repetições: {item.reps}</Text>
                     </View>
                    </View>
                     <View style={{backgroundColor: '#e9603e', width: 90, alignItems: 'center', top: 10, borderRadius: 4}}>
                     <Text style={styles.titleCard}>{item.diaSemana}</Text>
                      </View>
                  </View>
                  <View>
                    <TouchableOpacity 
                     style={{bottom: 18, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', padding: 4, borderRadius: 50}}
                    onPress={() => handleDeleteExercicio(item.id)}>
                      <Ionicons name='trash-bin' size={24} color="#e9603e"/>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={{ padding: 18 }}>
          <Text>Você ainda não possui exercícios cadastrados</Text>
        </View>
      )}

      <BottomSheet
        containerStyle={{ shadowColor: '#ccc', zIndex: 10 }}
        ref={bottomSheet}
        snapPoints={[0.001, Platform.OS === 'ios' ? '180%' : '140%']}
      >
        <ScrollView>
          <BottomSheetView style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row', gap: 4, padding: 4 }}>
              <Ionicons name="barbell" size={22} />
              <Text style={{ fontSize: 20 }}>Criar Exercício</Text>
            </View>

            <View style={{ marginTop: 10, gap: 8 }}>
              <TextInput
                style={styles.input}
                placeholder="Nome do exercício"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Séries"
                keyboardType='numeric'
                value={sets}
                onChangeText={setSets}
              />
              <TextInput
                style={styles.input}
                placeholder="Repetições"
                keyboardType='numeric'
                value={reps}
                onChangeText={setReps}
              />
              <TextInput
                style={styles.input}
                placeholder="Peso"
                keyboardType='numeric'
                value={weight}
                onChangeText={setWeight}
              />

              <Text style={styles.label}>Escolha o dia da semana:</Text>
              <TouchableOpacity style={styles.picker} onPress={() => setPickerVisible(true)}>
                <Text>{selectedValue}</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="Observação"
                value={observacao}
                onChangeText={setObservacao}
              />

              <TouchableOpacity style={styles.addButton} onPress={handleCadExercicio}>
                <Text style={styles.addButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </ScrollView>
      </BottomSheet>

      <Modal visible={isPickerVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {pickerData.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => handlePickerSelect(item.value)}
                  style={styles.modalItem}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setPickerVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    backgroundColor: '#e9603e',
    width: 70,
    height: 70,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 10,
    justifyContent: 'center',
    borderRadius: 50,
    zIndex: 9
  },
  fabText: {
    fontSize: 32,
    color: '#fff'
  },
  exerciseCard: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    backgroundColor: '#111111',
    borderRadius: 8,
    padding: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  selectedValue: {
    marginTop: 16,
    fontSize: 18,
  },
  addButton: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#e9603e'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 19
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  modalItemText: {
    fontSize: 18
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center'
  },
  closeButtonText: {
    color: '#e9603e',
    fontSize: 18
  },
  titleCard: {
    color: '#fff'
  }
});
