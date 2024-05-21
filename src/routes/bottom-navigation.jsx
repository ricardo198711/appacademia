import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home";
import { Ionicons } from '@expo/vector-icons'
import Profile from "../screens/profile";

const Bottom = createBottomTabNavigator();

export function BottomTab(){

    return (
        <Bottom.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            
        }}
       sceneContainerStyle={{backgroundColor: '#fff'}}
        
        >
            <Bottom.Screen 
            name="HomeScreen"
            component={HomeScreen}
            options={{
               
                tabBarIcon: (({ focused }) => {
                    if(focused){
                        return <Ionicons name="home" size={22} />
                    }

                    return <Ionicons name="home-outline" size={22} />
                })
            }}
            />

            <Bottom.Screen name="Profile" component={Profile} 
             options={{
               
                tabBarIcon: (({ focused }) => {
                    if(focused){
                        return <Ionicons name="person" size={22} />
                    }

                    return <Ionicons name="person-outline" size={22} />
                })
            }}
            />
        </Bottom.Navigator>
    )
}