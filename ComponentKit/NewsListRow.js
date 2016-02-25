/**
 * NewsListRow
 * Created by zcgong on 16/2/18.
 */
"use strict";
import React,{
    Component,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';


class NewsListRow extends Component {
    // 默认属性
    static defaultProps = {
        image:{},
        title:'',
        summary:'',
        date:'',
        readCount:'',
        column:'',
        onPress:()=>{}
    };

    // 属性类型
    static propTypes = {
        image:React.PropTypes.object,
        title:React.PropTypes.string,
        summary:React.PropTypes.string,
        date:React.PropTypes.string,
        readCount:React.PropTypes.number,
        column:React.PropTypes.string,
        onPress:React.PropTypes.func
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
    }

    // 渲染
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} >
                <View style={{flexDirection:'row',height:68}}>
                    {this.props.image?(<Image source={this.props.image} style={styles.row_image}/>):null}
                    <View style={{flexDirection:'column'}}>
                        <Text>{this.props.title}</Text>
                        <Text>{this.props.summary}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Text>{this.props.date}</Text>
                            <Text>{this.props.column}</Text>
                            <Text>{this.props.readCount}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

}
const styles = StyleSheet.create({
    row_image:{
        height:58,
        width:58,
        margin:5
    }
});
export default NewsListRow;