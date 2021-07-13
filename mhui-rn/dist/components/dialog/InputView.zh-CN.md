## 输入框-InputView

### 基本信息

| 基本信息   |                                           |
| --------- | ----------------------------------------- |
| 中文名称   | 输入框控件                                |
| 描述      |  新版输入框，带一键删除，密码保护，边框高亮      |
| 位置      | `miot/ui/InputView`                      |
| SDK_Level | `SDK_10042`                                |
| 注意事项  | \                                           |

### 使用方法

```jsx
<InputView 
  type={InputView.TYPE.SECURE}
  isCorrect={false}
  style={{marginTop: 12, height :40, width:350}}
  placeholder={'自定义占位字符'}
  defaultValue={'自定义默认值'}
  onChangeText={() => alert('aa')}
  textInputProps={{ autoFocus: true }}
  />
```

#### TYPE(输入框的类型)

| Name      | Type                | Default                            | Description           |
| --------- | ------------------- | ---------------------------------- | --------------------- |
| DELETE    | <code>string</code> | <code>&quot;DELETE&quot;</code>    | 右侧有一键删除          |
| SECURE    | <code>string</code> | <code>&quot;SECURE&quot;</code>    | 右侧有密码遮挡          |
| NONE      | <code>string</code> | <code>&quot;NONE&quot;</code>      | 右侧无图标             |

### 参数

| 属性               | 类型                               | 说明                              | 默认值       |
| ----------------- | ---------------------------------  | -------------------------------- | ----------- |
|type               | <code>TYPE</code>                  |输入框的类型（详见`TYPE`）           |`DELETE`    |
|isCorrect          | <code>boolean</code>               |判断内容是否有误，红色边框警示         |`true`      |
|placeholder        | <code>string</code>                |占位文字                           |`自定义占位字符`|
|defaultValue       | <code>string</code>                |初始默认文字                        |`自定义默认值` |
|onChangeText       | <code>(text: string) => void</code>              | 文字变化回调                       |`null`       |
|textInputProps     | <code>TextInputProps</code>                | 其他 TextInput 支持的属性          |`{ autoFocus: true }` |
|style              | <code>ViewStyle</code>             |输入框的样式                        |`null`         |