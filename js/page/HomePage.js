import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import FavoritePage from './FavoritePage';
import MyPage from './my/MyPage';
class HomePage extends Component {
    render() {
        return (
            <View >
                <Text>HomePage</Text>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 26,
        width: 26,
    }
});

export default HomePage;

