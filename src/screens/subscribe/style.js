import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#1a1a1a',
      
    },

    cardSubscribe: {
        width: '100%',
        flex: 2,
        padding: 18,
        bottom: 2,
        gap: 20,
        paddingTop: 20,
        backgroundColor: '#1a1a1a'
    },

    input: {
        padding: 20,
        backgroundColor: '#ccc',
        borderRadius: 8
    },

    btn: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#e9603e',
        borderRadius: 8
    },

    textBtn: {
        fontSize: 18,
        color: '#fff'
    },

    img: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})