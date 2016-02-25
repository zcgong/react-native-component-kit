/**
 *
 * Created by zcgong on 16/2/17.
 */
"use strict";
import React,{
    Component,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,

} from 'react-native';


class TextInputWithTitle extends Component {
    // 默认属性
    static defaultProps = {
        title:'',
        placeholder:'',
        placeholderTextColor:'black',
        defaultValue:''
    };

    // 属性类型
    static propTypes = {
        title:React.PropTypes.string.isRequired,
        placeholder:React.PropTypes.string.isRequired,
        placeholderTextColor:React.PropTypes.string.isRequired

    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            userName:'',
            passWord:'',
            isLogin:false
        };
    }

    _onPress(){
        Actions.ForgetPasswordController({title:'找回密码'});
    }
    // 渲染
    render() {
        return (
            <View style={[{flexDirection:'row'},this.props.style]}>
                <Text style={this.props.textStyle}>{this.props.title}</Text>
                <TextInput style={this.props.textinputStyle}
                           placeholder={this.props.placeholder}
                           placeholderTextColor={this.props.placeholderTextColor}
                           defaultValue={this.props.defaultValue}/>
            </View>
        );
    }
}

export default TextInputWithTitle;
