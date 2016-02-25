/**
 * Button
 * Created by zcgong on 16/2/17.
 */
"use strict";
import React,{
    Component,
    TouchableOpacity,
    Text,

} from 'react-native';
/**
 * 属性:
 *     title:标题
 *     onPress:点击方法
 *     touchEnable:是否可以点击
 */

class Button extends Component {
    // 默认属性
    static defaultProps = {
        touchEnable:true,
        textStyle:{},
        styles:{},
    };

    // 属性类型
    static propTypes = {
        title:React.PropTypes.string.isRequired,
        onPress:React.PropTypes.func.isRequired,
        touchEnable:React.PropTypes.bool.isRequired,
        textStyle:React.PropTypes.object.isRequired,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            activeOpacity:1
        };
    }

    componentWillMount() {
        //alert(this.props.bgColor);
    }
    render(){
        return(
            <TouchableOpacity style={this.props.styles}
                              onPress={this.props.touchEnable?this.props.onPress:null}
                              activeOpacity={this.props.touchEnable?0.8:this.state.activeOpacity}>
                <Text style={this.props.textStyle}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

export default Button;