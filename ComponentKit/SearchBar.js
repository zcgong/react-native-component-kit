/**
 * SearchBar
 * Created by zcgong on 16/2/18.
 */
"use strict";
import React,{
    Component,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TextInput
} from 'react-native';
var {width,height} = Dimensions.get('window');
const ImageIcon = require('../../../../assets/images/tabbar_ico/hq.png');


class SearchBar extends Component {
    // 默认属性
    static defaultProps = {
        placeholder:'',


    };

    // 属性类型
    static propTypes = {

    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    // 渲染
    render() {
        return (
                <View style={styles.searchview}>
                    <TextInput placeholder={this.props.placeholder}  placeholderTextColor="#8a8a8a" style={styles.TextInput} />
                </View>

        );
    }

}
const styles = StyleSheet.create({
    searchview:{
        flexDirection:'row',
        height:45,
        backgroundColor:"white",
        alignItems: 'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'black',
        width:width*0.8,
        alignSelf:'center'
    },
    TextInput:{
        width:250,
        height:43,
        alignSelf: 'center',
        justifyContent:'center',
        left:8
    },
});
export default SearchBar;
