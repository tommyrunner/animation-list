# animation-list

## 简介

![https://img-blog.csdnimg.cn/e7208f78e2a8455090da6bfebd23e41a.gif#pic_center](https://img-blog.csdnimg.cn/e7208f78e2a8455090da6bfebd23e41a.gif#pic_center)

> + animation-list 基于vue列表动画插件，支持vue3.0
> + 支持每个元素的动画监听(start,update,end)

## 引用

+ 安装

```shell
npm i animation-list
```

+ 例子

```vue
<template>
  <AnimationList ref="animationListRef">
    <div class="item" v-for="item in 8" :key="item">{{ item }}</div>
  </AnimationList>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import AnimationList from 'animation-list/AnimationList.vue'
const animationListRef = ref<InstanceType<typeof AnimationList>>()
onMounted(() => {
  animationListRef.value?.initHooks({
    end: () => {
        console.log('动画结束')
        animationListRef.value?.animationCall() // 重新触发动画
    }
  })
})
</script>

<style  scoped>
.animation-list {
  overflow: hidden;
}
</style>

```

## 参数

### 属性

| 参数          | 默认值                    | 备注             |
| ------------- | ------------------------- | ---------------- |
| firstShow     | true                      | 默认是否渲染动画 |
| deep          | false                     | 是否深层查找     |
| animationType | ANIMATION_TYPE.RIGHT_LEFT | 默认从右到左动画 |



### ANIMATION_TYPE默认动画

| key        | 动画       | 效果       | 备注               |
| ---------- | ---------- | ---------- | ------------------ |
| BOTTOM_TOP | bottom-top | 从下向上   |                    |
| TOP_BOTTOM | top-bottom | 从上向下   |                    |
| RIGHT_LEFT | right-left | 从右到左   | 默认               |
| LEFT_RIGHT | left-right | 从左到右   |                    |
| SAMLL_BIG  | small-big  | 从小到大   |                    |
| BIG_SMALL  | big-small  | 从大到小   |                    |
| CUSTOM     | custom     | 自定义动画 | 根据例子自定义动画 |

## 异步渲染流程

```js
// 1.设置属性取消默认渲染动画 firstShow
// 2.获取数据后重新触发
import { onMounted, ref,nextTick } from 'vue'
setTimeout(() => {
    // 获取数据
    nextTick(() => {
        animationListRef.value?.animationCall()
    })
}, 1500)
```

## 自定义动画

```vue
<template>
<AnimationList ref="animationListRef" :animationType="ANIMATION_TYPE.CUSTOM">
    <div class="item" v-for="item in 8" :key="item">{{ item }}</div>
    </AnimationList>
</template>
<script lang="ts" setup>
    import AnimationList from 'animation-list/AnimationList.vue'
    import { ANIMATION_TYPE } from "animation-list/uitls";

</script>

<style  scoped>
    .animation-list {
        overflow: hidden;
    }
    /** 自定义动画部分(必须) **/
    .ls-custom {
        display: block;
        opacity: 1 !important;
        animation: ls-custom ease 0.26s !important;
    }
    @keyframes ls-custom {
        0% {
            opacity: 0;
            transform: scale(1.6);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

</style>
```

> + 在 style 样式加入
>   + ls-custom 初始化
>   + ls-custom 动画开始
>   + keyframes 动画

## hooks生命周期

```js
animationListRef.value?.initHooks({
    start:()=>{},
    update:(params: { index: number; el: HTMLElement | Element }) => {},
    end:()=>{}
})
```

## 附
+ 1.x.x  - vue2 相关文档，请以该版本的 README 为准

+ 2.x.x - vue3

  
