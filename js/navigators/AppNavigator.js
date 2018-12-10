import { createStackNavigator, createAppContainer } from "react-navigation";
import HomePage from '../page/HomePage';
const StackNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
      },
})
export const AppNavigator =  createAppContainer(StackNavigator);