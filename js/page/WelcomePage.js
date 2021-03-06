import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import NavigatorUtil from '../util/NavigatorUtil';
import ThemeDao from '../expand/dao/ThemeDao';
import SplashScreen from 'react-native-splash-screen';

class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        new ThemeDao().getTheme().then((data) => {
            this.theme = data;
        })
        this.timer = setTimeout(() => {
            SplashScreen.hide();
            NavigatorUtil.resetToHomePage({
                theme: this.theme,
                navigation: this.props.navigation
            })
        }, 500);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return null;
    }
    
}

export default WelcomePage;