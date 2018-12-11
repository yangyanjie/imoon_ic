import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';
import GitHubTrending from 'GitHubTrending';
import NavigationBar from '../common/NavigationBar'
const URL = 'https://github.com/trending/java';
class TrendingPage extends Component {
    constructor(props) {
        super(props);
        //this.trending = new GitHubTrending();
        //console.log(this.trending.fetchTrending)
        this.state = {
            result: ''
        }
    }
    onLoad() {
        new GitHubTrending().fetchTrending(URL).then(result => {
                console.log(result);
                this.setState({
                    result: JSON.stringify(result)
                })
            }).catch(error => {

            })
    }
    render() {
        return (
            <View >
                <NavigationBar
                    title={'GitHubTrending 使用'}
                />
                <Button
                    onPress={this.onLoad}
                    title="加载数据"
                    color="#841584"
                    />
                    <Text>{this.state.text}</Text>
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