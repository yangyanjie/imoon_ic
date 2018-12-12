import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    RefreshControl,
    DeviceEventEmitter,

} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../util/ViewUtils';
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import BaseComponent from './BaseComponent';
import RepositoryCell from '../common/RepositoryCell';
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository';
import ProjectModel from '../model/ProjectModel';
import FavoriteDao from '../expand/dao/FavoriteDao';
import Utils from '../util/Utils';
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
var dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.state = {
            languages: [],
            theme: this.props.theme,
            customThemeViewVisible: false,
        }
        this.loadLanguage();
    }
    loadLanguage() {
        this.languageDao.fetch().then((languages) => {
            console.log(languages);
            if (languages) {
                this.setState({
                    languages: languages,
                });
            }
        }).catch((error) => {

        });
        
    }
    renderRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => {
                        NavigatorUtil.goToSearchPage(this.props);
                    }}
                >
                    <View style={{padding: 5, marginRight: 8}}>
                        <Image
                            style={{width: 24, height: 24}}
                            source={require('../../res/images/ic_search_white_48pt.png')}
                        />
                    </View>

                </TouchableOpacity>
                {ViewUtils.getMoreButton(() => this.refs.moreMenu.open())}
            </View>
        )
    }
    render() {
        var statusBar = {
            backgroundColor: this.state.theme.themeColor,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar
            title={'最热'}
            statusBar={statusBar}
            style={this.state.theme.styles.navBar}
            rightButton={this.renderRightButton()}
        />
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                ref="scrollableTabView"
                tabBarBackgroundColor={this.state.theme.themeColor}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                      tabStyle={{height: 39}}/>}
            >
                {this.state.languages.map((reuslt, i, arr) => {
                    let language = arr[i];
                    return language.checked ? <PopularTab key={i} tabLabel={language.name} {...this.props}/> : null;
                })}
            </ScrollableTabView> : null;
        return (
            <View style={styles.container}>
                {navigationBar}
                {content}
                
            </View>
        )
    }
    
}

class PopularTab extends BaseComponent {
    constructor(props) {
        super(props);
        this.isFavoriteChanged = false;
        this.state = {
            projectModels: [],
            isLoading: false,
            favoriteKeys: [],
            theme: this.props.theme
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.listener = DeviceEventEmitter.addListener('favoriteChanged_popular', () => {
            this.isFavoriteChanged = true;
        });
        this.loadData();
    }
    onTabSelected(from,to){
        if (to===FLAG_TAB.flag_popularTab&&this.isFavoriteChanged){
            this.isFavoriteChanged=favoriteDao;
            this.getFavoriteKeys();
        }
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        if (this.listener) {
            this.listener.remove();
        }
    }

    onUpdateFavorite() {
        this.getFavoriteKeys();
    }

    /**
     * 更新ProjectItem的Favorite状态
     */
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (let i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
        }
        this.updateState({
            isLoading: false,
            isLoadingFail: false,
            projectModels: projectModels,
        });
    }

    /**
     * 获取本地用户收藏的ProjectItem
     */
    getFavoriteKeys() {
        favoriteDao.getFavoriteKeys().then((keys) => {
            if (keys) {
                this.updateState({favoriteKeys: keys});
            }
            this.flushFavoriteState();
        }).catch((error) => {
            this.flushFavoriteState();
            console.log(error);
        });
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    loadData() {
        this.updateState({
            isLoading: true
        })
        let url = this.genFetchUrl(this.props.tabLabel);
        dataRepository
            .fetchRepository(url)
            .then(result => {
                this.items = result && result.items ? result.items : result ? result : [];
                this.getFavoriteKeys();
                if (result && result.update_date && !Utils.checkDate(result.update_date)) return dataRepository.fetchNetRepository(url);
            })
            .then((items) => {
                if (!items || items.length === 0) return;
                this.items = items;
                this.getFavoriteKeys();
            })
            .catch(error => {
                console.log(error);
                this.updateState({
                    isLoading: false
                });
            })
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderRow(data) {
        const projectModel = data.item;
        return <RepositoryCell
            key={projectModel.item.id}
            projectModel={projectModel}
            theme={this.props.theme}
            onSelect={() => ActionUtils.onSelectRepository({
                projectModel: projectModel,
                flag: FLAG_STORAGE.flag_popular,
                ...this.props,
                onUpdateFavorite: () => this.onUpdateFavorite(),
            })}
            onFavorite={(item, isFavorite) => ActionUtils.onFavorite(favoriteDao, item, isFavorite)}/>


    }

    render() {
        return <View style={styles.container}>
            <FlatList
                data={this.state.projectModels}
                renderItem={(data) => this.renderRow(data)}
                keyExtractor={item => ""+item.item.id}
                refreshControl={
                    <RefreshControl
                        title='Loading...'
                        titleColor={this.props.theme.themeColor}
                        colors={[this.props.theme.themeColor]}
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.loadData()}
                        tintColor={this.props.theme.themeColor}
                    />
                }
            />
        </View>
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

export default PopularPage;

