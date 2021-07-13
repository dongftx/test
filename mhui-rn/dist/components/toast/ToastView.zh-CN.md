## ToastView

### 基本信息

| 基本信息   |                                           |
| --------- | ----------------------------------------- |
| 中文名称   |  Toast弹窗                                |
| 位置      | `miot/ui/ToastView`                      |
| SDK_Level | `SDK_10042`                                |
| 注意事项  | 由开发者控制持续时间                             |

### 使用方法

```jsx
  componentDidMount(){
      setTimeout(() => {
          this.setState(() => ({ visible: false }));
        }, 2000);
  }

  <ToastView
  visible={this.state.visible}
  delay={0} 
  keyboardAvoiding={false}
  annimation={true}
  text={'加载成功'}
  />
```

### 参数

| 属性               | 类型                               | 说明                              | 默认值       |
| ----------------- | ---------------------------------  | -------------------------------- | ----------- |
|position           | <code>number</code>               |位置                                 |`-86`    |
|delay              | <code>number</code>               |显示前的延迟时间                       |`0`      |
|visible            | <code>boolean</code>              |可见性                               |`false`|
|animation          | <code>boolean</code>              |是否有动画效果                          |`false` |
|hideOnPress        | <code>boolean</code>              |点击是否消失                           |`true`     |
|keyboardAvoiding   | <code>boolean</code>              |是否跟随键盘移动                        |`true` |
|text               | <code>Text</code>                 |文字                                 |`null`         |
 