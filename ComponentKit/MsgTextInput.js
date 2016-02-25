/**
 * MsgTextInput
 * Created by zcgong on 16/2/19.
 */
"use strict";
import React,{
    Component,
    View,
    Text,
    TextInput
} from 'react-native';


class MsgTextInput extends Component {
    // 默认属性
    static defaultProps = {
        title:'',
        discription:'',
        placeholder:'',
        defaultValue:'',
        style:{},
        titleStyle:{},
        discriptionStyle:{}
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
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={this.props.titleStyle}>{this.props.title}</Text>
                <TextInput defautValue={this.props.defaultValue}
                           placeholder={this.placeholder}
                           style={this.props.style}
                />
                <Text style={this.props.discriptionStyle}>{this.props.discription}</Text>
            </View>
        );
    }

}

export default MsgTextInput;