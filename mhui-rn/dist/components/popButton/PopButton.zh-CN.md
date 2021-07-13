## 弹窗按钮-PopButton

### 基本信息

| 基本信息   |                                           |
| --------- | ----------------------------------------- |
| 中文名称   | 弹窗按钮控件                                |
| 描述      |                                            |
| 位置      | `miot/ui/PopButton`                      |
| SDK_Level | `SDK_10044`                                |
| 注意事项  | \                                           |

### 使用方法

```jsx
<PopButton sizeLevel={'regular'}
    disabled={true}
    title={'regular按钮文字'}
    titleStyle={{color:'#FFFFFF'}}
    backgroundColor={{bgColorNormal: '#32BAC0',
    bgColorPressed: '#25A9AF'}}
    onPress={() => {alert('kaka')}}
    />
```

### 参数

| 属性               | 类型                               | 说明                              | 默认值       |
| ----------------- | ---------------------------------  | -------------------------------- | ----------- |
| sizeLevel         | <code>string</code>                | 按钮的大小：regular, medium, small | `regular`   |
| style             | <code>ViewStyle<code>              | 按钮样式                          | `null`      |
| title             | <code>string</code>                | 按钮标题                          |  `按钮文字`  |
| titleStyle        | <code>object</code>                | 标题样式                          | `regular: {color:'#FFFFFF'}`<br />` medium: {color: '#4C4C4C'}`<br />` small: {color: '#32BAC0'}`|
| titleColor        | <code>string</code>                | 按钮文字颜色|  
| backgroundColor   | <code>object</code>                | 背景颜色                          |  `regular: {`<br />`bgColorNormal: colorBtnGreenNor;`<br />`bgColorPressed: colorBtnGreenPres;`<br />`}`<br /> `medium: {`<br />`bgColorNormal: colorBtnGrayNor; `<br />`bgColorPressed: colorBtnGrayPres;`<br />`}, `<br />`small: {`<br />`bgColorNormal: colorBtnGreenOpaNor;`<br />`bgColorPressed: colorBtnGreenOpaPres;`<br />`}` |
| disabled          | <code>boolean</code>               | 如果设为true，则禁止此组件的一切交互。 | `false`     |
| onLongPress       | <code>function</code>              | 长按时的回调函数                    | `null`      |                          
| onPress           | <code>function</code>              | 点击时的回调函数                    | `null`      |
| allowFontScaling  | <code>boolean</code>               | 字体大小是否按照系统大小改变          | `true`      | 
| colorType         | <code>string</code>                | 按钮的颜色类型,只在regular和medium按钮上使用| `null`  |   