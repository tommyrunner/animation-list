# animation-list

## 简介

> + animation-list 基于vue，支持vue3.0
> + animation-list 以vue指令方式获取dom中每个子元素（可以获取更深层children），并以动画渲染子元素。

## 引用

+ 安装

```shell
npm i animation-list
```

+ 引用

```js
// 引用animationList
import animationList from "animation-list";
// 引用animationList默认动画
import "animation-list/index.css";
Vue.use(animationList);
```

## 使用

+ 例子

```vue
<template>
  <div class="list" v-list-show="'right-left'">
    <div class="item" v-for="item in 8" :key="item">{{ item }}</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
    };
  }
};
</script>

<style  scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  line-height: 50px;
}
.list .item {
  width: 100px;
  height: 50px;
  border: 1px solid gainsboro;
  margin: 5px;
  box-shadow: 4px 5px 9px gainsboro;
  color: gray;
  border-radius: 4px;
}
</style>

```

> + 只需要在 标签中假如指定  **v-list-show** 即可

## 参数

### 指令

+ v-list-show
  + 浅层获取子元素，动画渲染
+ v-list-show-deep
  + 深层获取子元素，动画渲染

### 默认动画

| 动画       | 效果       | 备注               |
| ---------- | ---------- | ------------------ |
| bottom-top | 从下向上   |                    |
| top-bottom | 从上向下   |                    |
| right-left | 从右到左   | 默认               |
| left-right | 从左到右   |                    |
| small-big  | 从小到大   |                    |
| big-small  | 从大到小   |                    |
| custom     | 自定义动画 | 根据例子自定义动画 |

## 自定义动画

```vue
<template>
<div class="list" v-list-show="'custom'">
    <div class="item" v-for="item in 8" :key="item">{{ item }}</div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {};
        },
    };
</script>

<style  scoped>
    .list {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        line-height: 50px;
    }
    .list .item {
        width: 100px;
        height: 50px;
        border: 1px solid gainsboro;
        margin: 5px;
        box-shadow: 4px 5px 9px gainsboro;
        color: gray;
        border-radius: 4px;
    }
	/** 自定义动画部分(必须) **/
    .ls-custom {
        opacity: 0 !important;
    }
    .ls-custom {
        animation: ls-custom ease 0.38s !important;
    }
    @keyframes ls-custom {
        0% {
            opacity: 0;
            transform: translateY(100%) scale(0.6);
        }
        100% {
            opacity: 1;
            transform: translateY(0%) scale(1);
        }
    }
</style>
```

> + 告诉 v-list-show 自定义 **custom**
> + 在 style 样式加入
>   + ls-custom 初始化
>   + ls-custom 动画开始
>   + keyframes 动画

## hooks生命周期

```js
mounted() {
    this.$animationListHooks.start = () => {
        console.log("动画开始");
    };
    this.$animationListHooks.update = (params) => {
        console.log("动画跳动", params);
    };
    this.$animationListHooks.end = () => {
        console.log("动画结束");
    };
}
```

> 主要函数抛在 **$animationListHooks** 中 

## 附

+ 重新渲染动画

  ```js
  this.$animationListShow()
  ```

  
