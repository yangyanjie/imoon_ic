import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

class TrendingPage extends Component {
    render() {
        return (
            <View >
                <Text>TrendingPage</Text>
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

export default TrendingPage;