/*
 * 源码来自https://github.com/hugohua/react-native-demo，有点小修改
 */

'use strict';

import React,{
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    ScrollView,

} from 'react-native';

import {Router,
    Route,
    Schema,
    Animations,
    TabBar,
    Actions,
} from 'react-native-router-flux';

import TimerMixin from 'react-timer-mixin';

import Platform from 'Platform';
import NewsServiec from '../../../services/NewsService';

import framework from "../../../lib/framework";

//获取可视窗口的宽高
var { width, height, scale } = Dimensions.get('window');

var itemHeight = height*0.25,
    picFormat = '_1080x260xzq75.jpg';


module.exports = React.createClass({

    mixins: [TimerMixin],

    //默认值
    getDefaultProps() {
        return {
            width: width,
            indicatorColor: '#ffffff',
            inactiveIndicatorColor: '#ffffff',
            timer : 3000,
            api : 'http://192.168.62.34/index.js',//'http://ald.taobao.com/recommend.htm?appId=lb-tms-1261576-40550',
            dataSource : []
        }
    },

    //初始化用于状态转换的值
    getInitialState() {
        return {
            currentX: 0,
            activePage: 0,
            scrolling:false
        }
    },

    processData(errCode, errMsg, resultData, totalCount, pageCount){
        this.setState({
            dataSource: resultData
        });
        this.start();
    },

    //拉取投放的数据
    fetchData() {
        //var me = this;
        //fetch(me.props.api)
        //    .then((response) => response.json())
        //    .then((responseData) => {
        //        me.setState({
        //            dataSource: responseData.data
        //        });
        //  })
        //  .done(function(){
        //    me.start();
        //  });
        //framework.service.request("informationService","getAppBannerList",this.processData.bind(this));
        //NewsServiec.getBannerList()
        //    .then((result)=> {
        //        this.setState({
        //            dataSource:result
        //        });
        //        //this.start();
        //    })
        //    .catch((err)=> {
        //        console.log(
        //            'error',
        //            err.errCode + ":" + err.errMsg
        //        );
        //    });
    },

    start(){

        var scrollView = this.refs.scrollView;
        var length = this.props.dataSource.length;

        this.timer = this.setInterval(function(){

            var activePage;

            if( (this.state.activePage + 1)  >= length){
                activePage = 0;
            }else{
                activePage = this.state.activePage + 1;
            }

            var currentX = this.props.width * activePage;
            scrollView.scrollResponderScrollTo(currentX, 0);

            this.setState({
                currentX: currentX,
                activePage: activePage
            });

        }, this.props.timer)
    },

    componentDidMount() {
       //// this.fetchData();
    },

    componentDidUpdate(){
        if(!this.state.scrolling){
            if(this.props.dataSource.length>0) {
                this.start();
                this.setState({scrolling: true});
            }
        }
    },


    //TODO 开始滚动时清除timer
    _onScrollBegin(event) {
        this.clearInterval(this.timer);
    },

    _onScrollEnd() {

    },

    getImage:function(url): string{
        // return ('http://p0.meituan.net/200.120/deal/667c7aa92a0c04779e266bbfa7d77c64316233.jpg');
        //if (url.search('http:') === -1) {
        //    return ('https:' + url);
        //}else{
            return (url);
        //}
    },
    //渲染单个图片
    renderItems(data) {
        var weakself = this;
        return data.map(function(item,i){
            var imgurl = weakself.getImage(item.imgUrl);
            return(
                <TouchableHighlight onPress={i%2 ==0 ? Actions.TestViewmodal :Actions.TestView}>
                <Image key={i} style={{width: width,height:itemHeight,resizeMode:"stretch"}} source={{uri: imgurl}}/>
                </TouchableHighlight>
            );
        })
    },
    render() {
        var data = this.props.dataSource;
        return (
            <View style={styles.container}>
                <ScrollView
                    ref='scrollView'
                    contentContainerStyle={styles.container}
                    automaticallyAdjustContentInsets={false}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={this.onAnimationEnd}
                    bounces={false}>
                    {this.renderItems(data)}
                </ScrollView>
                {this.renderPageIndicator()}
            </View>
            );
    },

    renderPageIndicator() {
        var indicators = [],
            style;

        for (var i=0; i< this.props.dataSource.length; i++) {
            style = i === this.state.activePage ? { color: this.props.indicatorColor,opacity : 1 } : { color: this.props.inactiveIndicatorColor,opacity : 0.3 };
            indicators.push(<Text key={i} style={[style, {fontSize: 32}]}>&bull;</Text>)
        }
        return (
            <View style={styles.pageIndicator}>
            {indicators}
            </View>
        )
    },

    onAnimationEnd(e) {

        if (Platform.OS === 'android') {
            var scrollView = this.refs.scrollView;
            var activePage = Math.round(e.nativeEvent.contentOffset.x / width);
            this.setState({
                currentX: activePage*width,
                activePage: activePage
            });
            scrollView.scrollResponderScrollTo(activePage*width, 0);
        } else if (Platform.OS === 'ios') {
            var activePage = e.nativeEvent.contentOffset.x / this.props.width;
            this.setState({
                currentX: e.nativeEvent.contentOffset.x,
                activePage: activePage
            });
        }




    }
});

var styles = StyleSheet.create({
    container: {
        //flex: 1,
        height:height*0.25,
    },

    pageIndicator: {
        position : 'absolute',
        backgroundColor : 'transparent',
        left : 12,
        bottom : -10,
        flexDirection: 'row'
    }
});
