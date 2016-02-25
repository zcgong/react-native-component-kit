/**
 * BottomInputToolBar
 * Created by zcgong on 16/2/22.
 */
"use strict";
import React,{
    Component,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated
} from 'react-native';


class BottomInputToolBar extends Component {
    // 默认属性
    static defaultProps = {
        visible:false
    };

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }
    // 渲染
    render() {
        return (
            <View style={{flexDirection:'row',height:45,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black'}}>
                <Text>评论</Text>
                <TextInput placeholder="评论" style={{width: 250,height:35,borderWidth:1,borderColor: 'black',borderRadius:5,alignSelf:'center'}}/>
                <TouchableOpacity>
                    <Text>表情</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>发布</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

export default BottomInputToolBar;