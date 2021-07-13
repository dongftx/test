## 数据统计界面HOC-StatisticsPageWrapper

### 预览


### 基本信息

| 基本信息  |                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 中文名称  | 数据统计界面。                                                                                                                         |
| 描述      | 数据统计界面。 |
| 位置      | `mhui-rn/dist/modules/statistics`                                                                                                                |
| SDK_Level | `SDK_10042`                                                                                                                    |
| 注意事项  | \                                                                                                                              |

### 使用方法

```jsx
      const dataSourceConfig1 = [{
        // key: 0,
        value: 'PM2.5',
        items: [{
          id: 0, type: 'day', value: '日', params: {},
        }, {
          id: 1, type: 'day', value: '日', params: {},
        }, {
          id: 2,
          type: 'day',
          value: '年',
          params: {},
        },
        ],
      },
      {
        value: 'VOC',
        items: [{
          // id: 0,
          type: 'day', value: '日', params: {},
        }, {
          // id: 1,
          type: 'day', value: '月', params: {},
        }, {
          // id: 2,
          type: 'day', value: '年', params: {},
        }],
      },
    ];
 <StatisticsPage chartType="BarChart" showTabs={true} dataSourceConfig={dataSourceConfig1}/>
 
 const dataSourceConfig2 = {
        // key: 0,
        value: 'PM2.5',
        items: [{
          id: 0, type: 'day', value: '日', params: {},
        }, {
          id: 1, type: 'day', value: '日', params: {},
        }, {
          id: 2,
          type: 'day',
          value: '年',
          params: {},
        },
        ],
      },
      {
        value: 'VOC',
        items: [{
          // id: 0,
          type: 'day', value: '日', params: {},
        }, {
          // id: 1,
          type: 'day', value: '月', params: {},
        }, {
          // id: 2,
          type: 'day', value: '年', params: {},
        }],
      };
 <StatisticsPage chartType="BarChart" dataSourceConfig={dataSourceConfig2}/>
```

### 参数
### StatisticsPage
| 属性                  | 类型                                | 说明                                                                                                                          | 默认值|
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -- |
| chartType    | <code>`ChartType`</code> | 图表类型，默认值为BarChart |
| dataSourceConfig    | <code>`MultiTabParamsPropType | SingleTabParamsPropType`</code> | 数据源配置 |
| showTabs    | <code>`boolean`</code> | 是否显示tabs。默认不显示。需要注意的是，如果在dataSourceConfig没有配置Tab选项，就不会显示 |
| showTabs    | <code>`boolean`</code> | 是否显示tabs。默认不显示。需要注意的是，如果在dataSourceConfig没有配置Tab选项，就一定不会显示 |
| titleConfig    | <code>`TitleConfig`</code> | 统计界面title配置 |
| radioGroupConfig    | <code>`RadioGroupConfig`</code> | radioGroups配置 |
| tabsConfig    | <code>`TabsConfig`</code> | tabs配置 |

#### RadioGroupConfig对象配置


| 属性                  | 类型                                | 说明                                                                                                                          | 默认值|
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -- |
| titleColor    | <code>`string | DynamicColor`</code> | 标题颜色（适配黑暗模式）| new DynamicColor('#000000', '#FFFFFF') |
| subtitleColor    | <code>`string | DynamicColor`</code> | 副标题颜色（适配黑暗模式）| new DynamicColor('#999999', '#FFFFFF')|
| titleWithoutData    | <code> string | number</code> | 空数据时标题文字| '--' |
| subtitleWithoutData    | <code> string | number</code> | 空数据时副标题文字| '暂无数据' |
| subtitleWithData    | <code> string | number</code> | 有数据时副标题文字| '电量统计(KW/h)'|

#### TitleConfig对象配置


| 属性                  | 类型                                | 说明                                                                                                                          | 默认值|
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -- |
| separatorLineColor    | <code> `string | DynamicColor`</code> | 分割线颜色（适配黑暗模式）| new DynamicColor('#E5E5E5', '#000000') |
| radioRawTextColor    | <code> `string | DynamicColor`</code> | 日周月按钮未选中时的文本颜色（适配黑暗模式）| new DynamicColor('#666666', 'rgba(255,255,255,0.50)') |
| radioCheckedTextColor    | <code> `string | DynamicColor`</code> | 日周月按钮选中时的文本颜色（适配黑暗模式）|  new DynamicColor('rgba(255,255,255,0.90)', '#FFFFFF') |
| radioRawBackgroundColor    | <code> `string | DynamicColor`</code> | 按钮未选中时背景颜色（适配黑暗模式）| new DynamicColor('#F7F7F7', 'rgba(255,255,255,0.20)')|
| radioCheckedBackgroundColor    | <code> `string | DynamicColor`</code> | 按钮被选中时背景颜色（适配黑暗模式）| new DynamicColor('#FFA626', '#E68E10')|

#### TabsConfig对象配置


| 属性                  | 类型                                | 说明                                                                                                                          | 默认值|
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -- |
| inactiveTabsColor    | <code> `string | DynamicColor`</code> | 处于不活动状态的tabs文字颜色（适配黑暗模式）| new DynamicColor('#000000', 'rgba(255,255,255,0.90)') |
| activeTabColor    | <code> `string | DynamicColor`</code> | 处于活动状态的tab文字颜色（适配黑暗模式）| new DynamicColor('#999999', '#rgba(255,255,255,0.40)') |
