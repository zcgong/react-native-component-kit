'use strict';

var React = require('react-native');
var {
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableHighlight,
    View,
    ViewPagerAndroid,
    Dimensions,
    } = React;

import {Router,
    Route,
    Schema,
    Animations,
    TabBar,
    Actions,
} from 'react-native-router-flux';

var { width, height, scale } = Dimensions.get('window');
import TimerMixin from 'react-timer-mixin';

var CloverSlider = React.createClass({

    mixins: [TimerMixin],

    getInitialState: function() {
        return {
            currentX: 0,
            activePage: 0,
            animationsAreEnabled: true,
            scrolling:false
        };
    },

    getDefaultProps() {
        return {
            width: width,
            indicatorColor: '#ffffff',
            inactiveIndicatorColor: '#ffffff',
            timer : 3000,
            dataSource:[]
        }
    },


    start(){

        var viewPage = this.refs.viewPage;
        var length = this.props.dataSource.length;

        this.timer = this.setInterval(function(){
            var activePage;
            if( (this.state.activePage + 1)  >= length){
                activePage = 0;
            }else{
                activePage = this.state.activePage + 1;
            }
            viewPage.setPage(activePage);
            this.setState({
                activePage: activePage
            });
        }, this.props.timer)
    },

    componentWillMount() {

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


    getImage:function(url): string{
            return (url);
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

    onPageScroll(e){
        this.setState({
            activePage: e.nativeEvent.position
        });
    },

    render: function() {
        var weakself = this;
        var pages = [];
        var imagedata = this.props.dataSource;
        if(imagedata) {
            imagedata.map(function (item, i) {
                var imgurl = weakself.getImage(item.imgUrl);
                pages.push(
                    <View key={i} style={styles.container} collapsable={false}>
                        <TouchableHighlight onPress={i%2 ==0 ? Actions.TestViewmodal :Actions.TestView}>
                            <Image
                            style={styles.image}
                            source={{uri: imgurl}}/>
                        </TouchableHighlight>
                    </View>
                );
            })
        }
        return (
            <View style={styles.container}>
                <ViewPagerAndroid
                    ref="viewPage"
                    style={styles.viewPager}
                    onPageScroll={this.onPageScroll}
                    initialPage={0}>
                    {pages}
                </ViewPagerAndroid>
                {this.renderPageIndicator()}
            </View>
        );
    },
});

var styles = StyleSheet.create({

    container: {
        height:height*0.25,
        backgroundColor: 'white',
    },

    image: {
        width: width,
        height: height*0.25,
        resizeMode:"stretch",
    },

    viewPager: {
        flex: 1,
    },

    pageIndicator: {
        position : 'absolute',
        backgroundColor : 'transparent',
        left : 12,
        bottom : -10,
        flexDirection: 'row'
    }
});

module.exports = CloverSlider;