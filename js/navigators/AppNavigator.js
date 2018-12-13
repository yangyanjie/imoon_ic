import { createStackNavigator, createAppContainer } from "react-navigation";
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/my/MyPage';
import RepositoryDetail from '../page/RepositoryDetail';

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
    RepositoryDetail: {
        screen: RepositoryDetail
    },
},{
    defaultNavigationOptions: {
        header:null
    }
})
export const AppNavigator =  createAppContainer(StackNavigator);