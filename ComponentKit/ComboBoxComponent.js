/**
 * ComboBoxComponent
 * Created by zcgong on 2016/2/21.
 */
"use strict";
import React,{
    Component,
    View,
    Text,
    Image,
    TouchableOpacity,
    Picker,
    Platform
} from 'react-native';

const ImageIcon = require('../../../../assets/images/tabbar_ico/hq.png');
var items = [];
class ComboBoxComponent extends Component {
    // 默认属性
    static defaultProps = {
        data:[],
        rowStyle:{},
        selectRow:'',
        title:''
    };

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectTitle:'',
            display:false
        };
    }
    _selectComboData(title:String){
        this.setState({
           selectTitle:title,
           display:false
        });
    }

    renderComboView(data:Array){
        if (this.state.display){
            let len = data.length;
            for (var idx = 0; idx < len; idx ++ ){
                items[idx] = (
                    <Picker.Item  label={data[idx]} value={data[idx]}/>
                );
            }
            if (Platform.OS === 'android') {
                return(
                    <Picker style={{flexDirection:'column',borderWidth:1,borderColor: 'black'}} mode="dropdown">
                        {items}
                    </Picker>
                );
            } else if (Platform.OS === 'ios') {
                return(
                    <Picker style={{flexDirection:'column',borderWidth:1,borderColor: 'black',width:200}}
                            onValueChange={this._selectComboData.bind(this)}
                            selectedValue={this.state.title}>
                        {items}
                    </Picker>
                );
            }

        }
    }
    _showComboView(){
        this.setState({
            display:!this.state.display
        });
    }
    // 渲染
    render() {

        return (
            <View>
                <Text>{this.props.title}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text>{this.state.selectTitle}</Text>
                    <TouchableOpacity onPress={this._showComboView.bind(this)}>
                        <Image source={ImageIcon} />
                    </TouchableOpacity>
                </View>
                {this.renderComboView(this.props.data)}
            </View>
        );
    }

}

export default ComboBoxComponent;
