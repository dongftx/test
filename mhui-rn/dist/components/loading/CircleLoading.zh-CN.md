## 米家电暖器数据统计界面-空页面加载loading
-CircularSlider

### 背景
### 预览
### 基本信息
| 基本信息  |                                         |
| --------- | --------------------------------------- |
| 中文名称  | 米家电暖器数据统计界面-空页面加载                  |
| 描述      | 空页面加载loading |
| 位置      | `miot/ui/loading/CircleLoading` |
| SDK_Level | `10043`                                      |
| 注意事项  | \                                       |
| 存在问题  |  |

### 使用方法
```jsx
import React, { Component } from 'react';
import {
  View, Button
} from 'react-native'
import CircleLoading from 'mhui-rn/dist/components/loading/CircleLoading'

class DialogTest2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    }
    this.ref = React.createRef();
  }

  onTimeout = () => {
    console.log('onTimeout');
  }
  render() {
    // let { messageDialog } = this.props.navigation.state.params;
    const timeout = 30000;

    return (<View style={{ alignItems: 'center', justifyContent: 'center' }}>

      {
        this.state.visible ? <CircleLoading ref={this.ref} radius={50} timeout={timeout} onTimeout={this.onTimeout}/>: null
      }
      <Button title="onClose" onPress={() => {
        this.ref.current.onClose();
      }}></Button>

      <Button title="onStop" onPress={() => {
        this.ref.current.stop();
      }}></Button>
      <Button title="asd" onPress={() => this.setState({
        visible: false,
      })}></Button>
    </View>);
  }
}
```

### 参数
| Param         | Type                                            | Description                                                  |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------ |
|style| <code>ViewStyle</code>|loading样式。需要注意的是loading虽然呈现的是圆，但实际上是正方形图片，你的样式仅应用在图片|
|radius|<code>number</code> | loading圆半径.默认为43 |
|timeout| <code>number</code>|loading的超时时间。默认20000。|
|onTimeout|<code>function</code> | 超时回调函数 |


### 方法
| method         | Description                                                  |
| ------------- | -------------------------------------------- |
|stop| 提前关闭loading动画|
|onClose| 提前关闭loading|
