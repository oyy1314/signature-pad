## 下载

使用 `npm` 下载:

```
npm i signature-pad
```

使用 `yarn`:

```
yarn add signature-pad
```

## 快速开始

```javascript
import { createApp } from 'vue';
import signaturePad from 'signature-pad'
import 'signature-pad/lib/signature-pad.css'

const app = createApp()
app.use(signaturePad)
```

```vue
<template>
  <signature :show="true" @confirm="confirm" />
</template>

<script setup>
const confirm = data => {
  let img = document.createElement('img')
  img.src = data
}
</script>
```

注意: Vant Signature 依赖 vant 组件的 Popup, Button, 请自行引入

## 属性

|参数|说明|类型|默认值|
|:---|:---|:---|:---|
|line-width|线条的宽度|Number|3|
|stroke-style|绘图笔触颜色|String|’#000’|
|type|图片格式|String|‘png’|
|show|popup是否显示|Boolean|false|

## 事件

|字段|说明|回调参数|
|:---|:---|:---|
|confirm|点击采用按钮触发事件回调函数|签名图片展示的 data URI|
|clear|点击清除按钮触发事件回调函数|无|
|showPopup|弹出Popup|无|
|closePopup|关闭Popup|无|

## 预览

![](https://imagine-1254268680.cos.ap-shanghai.myqcloud.com/saas/preview.png)
