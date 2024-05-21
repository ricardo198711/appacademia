import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardImg: {
        flex: 1,
        width: '100%'

    },
    img: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    
       
    },

    cardForm: {
      width: '100%',
      padding: 30,
      gap: 18
    },
    form: {
        flex: 2,
        width: '100%',
        backgroundColor: '#fff',
        borderTopRightRadius: 22,
        borderTopLeftRadius: 22,
        alignItems: 'center',
        paddingTop: 30,
       
    },

    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 18,
        borderRadius: 8
    },

    btn: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e9603e',
        borderRadius: 8,
        marginTop: 20
    },

    textBtn: {
        color: '#fff',
        fontSize: 21
    }
})