import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 182,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
       
        paddingBottom: 45,
        backgroundColor: '#1a1a1a',
        
     
    },

    cardHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 27,
        paddingRight: 27
    },

    text: {
        color: '#fff',
        fontSize: 22
    }
})