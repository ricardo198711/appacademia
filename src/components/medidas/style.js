import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container: {
        padding: 12,
        height: 280
        
    },

    card: {
        alignItems: 'center',
        
        width: '100%',
        flexDirection: 'row',
        width: '100%',
        elevation: 10,
        flexWrap: 'wrap',
        gap: 4
        
    },

    cards: {
        width: '49%',
        borderWidth: 1,
        height: 95,
        borderRadius: 8,
        borderColor: '#ccc',
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
        
    },

    textCard: {
        fontSize: 22
    },
    imc: {
        width: '100%',
        borderWidth: 1,
        height: 95,
        borderRadius: 8,
        borderColor: '#ccc',
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
})