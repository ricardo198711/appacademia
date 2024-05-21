import axios from "axios";
import { createContext, useState } from "react";
import { URL_APP } from '@env'

const AuthContext = createContext()


function AuthProvider({ children }){

    const [dataUser, setDataUser] = useState([])
         
     const login = async ({email, password}) => {
        const data = {
         email: email,
         password: password
        }
        try {
         const response = await axios.post(URL_APP+'/autenticate', data)
         setDataUser(response.data)
         return response.data.success;

        } catch (error) {
         console.log("Falha ao realizar o login " + error)
        }
     } 
     return (
        <AuthContext.Provider value={{ login, dataUser }}>
         {children}
        </AuthContext.Provider>
     )
}


export { AuthContext, AuthProvider}