import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

class MyPage extends Component {
    render() {
        return (
            <View >
                <Text>MyPage</Text>
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

export default MyPage;