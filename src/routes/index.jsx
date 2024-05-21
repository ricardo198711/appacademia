import { NavigationContainer } from "@react-navigation/native";
import { StackTab } from "./tab-navigation";

export function Routes(){

    return (
        <NavigationContainer>
            <StackTab />
        </NavigationContainer>
    )
}