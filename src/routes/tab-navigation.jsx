import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login";
import { BottomTab } from "./bottom-navigation";
import Subscribe from "../screens/subscribe";

const Stack = createStackNavigator();


export function StackTab(){
    return(
        <Stack.Navigator screenOptions={{ 
            headerShown: false
        }}>
            <Stack.Screen name="Login" 
            
            component={Login} />
            <Stack.Screen name="Subscribe" component={Subscribe} />
            <Stack.Screen name="Main" component={BottomTab} 
            
            options={{
                
                gestureEnabled: false
            }}/>
        </Stack.Navigator>
    )
}