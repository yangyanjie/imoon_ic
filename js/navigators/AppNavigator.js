import { createStackNavigator, createAppContainer } from "react-navigation";
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import RepositoryDetail from '../page/RepositoryDetail'
import SearchPage from '../page/SearchPage'
import FavoritePage from '../page/FavoritePage'
import WebViewPage from '../page/WebViewPage'
import CustomKeyPage from '../page/my/CustomKeyPage'
import CustomTheme from '../page/my/CustomTheme'
import MyPage from '../page/my/MyPage'
import SortKeyPagePage from '../page/my/SortKeyPagePage'
import AboutMePage from '../page/about/AboutMePage'
import AboutPage from '../page/about/AboutPage'

const StackNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage
    },
    HomePage: {
        screen: HomePage
    },
    RepositoryDetail: {
        screen: RepositoryDetail
    },
    SearchPage: {
        screen: SearchPage
    },
    CustomKeyPage: {
        screen: CustomKeyPage
    },
    FavoritePage: {
        screen: FavoritePage
    },
    WebViewPage: {
        screen: WebViewPage
    },
    CustomTheme: {
        screen: CustomTheme
    },
    MyPage: {
        screen: MyPage
    },
    SortKeyPagePage: {
        screen: SortKeyPagePage
    },
    AboutMePage: {
        screen: AboutMePage
    },
    AboutPage: {
        screen: AboutPage
    }
},{
    defaultNavigationOptions: {
        header:null
    }
})
export const AppNavigator =  createAppContainer(StackNavigator);