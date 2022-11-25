<template>
  <div class="animation-list" ref="animationListRef">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import type { StateDataType, HookType } from "./index.d";
import { ANIMATION_TYPE } from "./index.d";
import { getOnTransitionEvent } from "./uitls";
import { onBeforeMount, onMounted, reactive, ref, nextTick } from "vue";
import "./index.css";
interface PropsType {
  firstShow?: boolean; // 默认是否渲染动画
  deep?: boolean; // 是否深层动画
  animationType?: ANIMATION_TYPE; // 默认动画
}
let animationEventName = getOnTransitionEvent(); // 获取动画回函数调名
const animationListRef = ref(); // 当前元素
const stateData: StateDataType = reactive({
  _$Hooks: {}, // 生命周期
  elChildern: [], // 子元素集
});
const props = withDefaults(defineProps<PropsType>(), {
  firstShow: true,
  deep: false,
  animationType: ANIMATION_TYPE.RIGHT_LEFT,
});
onBeforeMount(() => {
  // 初始化Hooks
  initHooks();
});
onMounted(() => {
  // 判断是否刚进入调用动画(默认调用)
  nextTick(() => {
    props.firstShow && animationCall();
  });
});
// 抛出动画触发函数
function animationCall() {
  if (animationListRef.value) {
    // 初始化
    stateData.elChildern = [];
    // 获取动画元素
    takeElChildern(animationListRef.value.children, props.deep);
    if (stateData.elChildern.length > 0) {
      callHooks("start");
      // 开始动画
      callAnima(0, stateData.elChildern);
    }
  }
}
/**
 * 获取元素
 * @param els 子元素集
 * @param deep 是否深入
 */
function takeElChildern(els: Array<HTMLElement | Element>, deep: boolean) {
  if (els.length > 0) {
    if (deep) {
      for (let el of els) {
        if (el.children && el.children.length > 0) {
          takeElChildern(Array.from(el.children), deep);
        } else {
          el.classList.add("ls-init");
          stateData.elChildern.push(el);
        }
      }
    } else {
      for (let el of els) {
        el.classList.add("ls-init");
        stateData.elChildern.push(el);
      }
    }
  }
}
/**
 * 开始动画
 * @param {*} listIndex 动画元素的小标
 * @param {*} list 动画元素集合
 * @returns
 */
function callAnima(listIndex: number, list: Array<HTMLElement | Element>) {
  if (listIndex > list.length - 1) {
    callHooks("end");
    return;
  }
  let el = list[listIndex];
  callHooks("update", { index: listIndex, el });
  animationEventName &&
    el.addEventListener(
      animationEventName,
      function evnet() {
        el.classList.remove("ls-init");
        el.classList.remove(`ls-${props.animationType}`);
        el.removeEventListener(animationEventName, evnet, false); //销毁事件
        callAnima(++listIndex, list);
      },
      false
    );
  el.classList.add(`ls-${props.animationType}`);
}
/**
 * 初始化hook
 * @param hook
 */
function initHooks(hook?: HookType) {
  stateData._$Hooks = Object.assign({ start: () => {}, update: () => {}, end: () => {} }, hook);
}
/**
 * 触发hook
 * @param event 触发key
 * @param params 携带参数
 */
function callHooks(event: string, params?: any) {
  let hook: any = stateData._$Hooks;
  hook[event] && hook[event](params);
}
defineExpose({
  initHooks,
  animationCall,
});
</script>
