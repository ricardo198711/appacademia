import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import 'react-native-gesture-handler';
import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/Auth';

export default function App() {
  return (
    <KeyboardAvoidingView style={{flexGrow: 1}}>

      <AuthProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Routes />
      </TouchableWithoutFeedback>
      </AuthProvider>
      <StatusBar style="light" />
     
      </KeyboardAvoidingView>
  );
}

