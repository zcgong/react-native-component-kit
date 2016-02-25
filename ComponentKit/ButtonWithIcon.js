/**
 * ButtonWithIcon
 * Created by zcgong on 16/2/18.
 */
"use strict";
import React,{
    Component,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';



class ButtonWithIcon extends Component {
    // 默认属性
    static defaultProps = {
        title:'',
        icon:{},
        style:{},
        iconPosition:'row',
        touchEnable:true
    };

    // 属性类型
    static propTypes = {
        title:React.PropTypes.string.isRequired,
        iconPosition:React.PropTypes.string.isRequired,
        style:View.propTypes.style,
        textStyle:Text.propTypes.style,
        touchEnable:React.PropTypes.bool.isRequired,
        onPress:TouchableOpacity.propTypes.onPress,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            activeOpacity:1,
        };
    }

    // 渲染
    render() {
        return (
            <View style={{flex:1}}>
            <TouchableOpacity style={[this.props.style,{alignItems:'center'}]}
                              activeOpacity={this.props.touchEnable?0.5:this.state.activeOpacity}
                              onPress={this.props.onPress}>
                <View style={{flexDirection:this.props.iconPosition}}>
                    <Image source={this.props.icon} />
                    <Text style={[this.props.textStyle,{marginLeft:6}]}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
            </View>
        );
    }

}

export default ButtonWithIcon;