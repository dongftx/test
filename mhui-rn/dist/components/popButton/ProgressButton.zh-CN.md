## 弹窗按钮-PopButton

### 基本信息

| 基本信息   |                                           |
| --------- | ----------------------------------------- |
| 中文名称   | 进度条按钮控件                                |
| 描述      | 与PopButton同大小，点击PopButton变为进度条   |
| 位置      | `miot/ui/ProgressButton`                      |
| SDK_Level | `SDK_10044`                                |
| 注意事项  | \                                           |

### 使用方法

```jsx
<ProgressButton
    sizeLevel='small'
    progress={this.state.progress}
    />
```

### 参数

| 属性               | 类型                               | 说明                              | 默认值       |
| ----------------- | ---------------------------------  | -------------------------------- | ----------- |
| sizeLevel         | <code>string</code>                | 按钮的大小：regular, medium, small | `regular`   |
| disabled          | <code>boolean</code>               | 如果设为true，则禁止此组件的一切交互。 | `false`     |
| animated          | <code>boolean</code>               | 是否有动画。                       | `true`      |
| progress          | <code>boolean</code>               | 当前数值 范围0～1。                 | `0`         |
| style             | <code>{width: number; height: number; borderRadius: number}</code> | 自定义按钮样式 |