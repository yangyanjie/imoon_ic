import { createStackNavigator, createAppContainer } from "react-navigation";
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/my/MyPage';

const StackNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage
    },
    HomePage: {
        screen: HomePage,
    },
    TrendingPage: {
        screen: TrendingPage,
    },
    FavoritePage: {
        screen: FavoritePage,
    },
    MyPage: {
        screen: MyPage,
    },
},{
    defaultNavigationOptions: {
        header:null
    }
})
export const AppNavigator =  createAppContainer(StackNavigator);