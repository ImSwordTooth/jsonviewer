## json-viewer
适用于 React 的 json 查看组件。
### [Demo](https://imswordtooth.github.io/)

### 1. 安装
```shell
npm i @swordtooth/json-viewer
```

### 2. 引入
```javascript
import JSONViewer from '@swordtooth/json-viewer'
```

### 3. 使用
```javascript
<JSONViewer
	//...
/>
```

#### props 列表
| 名称                   | 类型         | 默认值                           | 说明                       |
|----------------------|------------|-------------------------------|--------------------------|
| json                 | `String`   | 无默认值，必填项                      | 数据源，要求是 **json 字符串**     |
| width                | `String`   | `100%`                        | json 块的宽度                |
| height               | `String`   | 无默认值，不填则默认全部展示，不会出现滚动条        | json 块的最大高度，超过该值会展示滚动条   |
| isShowLineNumber     | `Boolean`  | `true`                        | 是否显示行号                   |
| canCollapse          | `Boolean`  | `true`                        | 是否开启折叠功能，复杂类型的字段才会出现折叠按钮 |
| isShowCopy           | `Boolean`  | `true`                        | 是否显示复制按钮，点击后可复制 json     |
| onCopy               | `Function` | 无默认值，如果开启了 `isShowCopy`，则为必填项 | 点击复制按钮的回调函数，参数为 json 对象  |
| isShowFooter         | `Boolean`  | `true`                        | 是否开启 Footer              |
| isEmptyObjectOneLine | `Boolean`  | `false`                       | 空对象或者空数组是否显示在一行，会影响最终的行数 |






