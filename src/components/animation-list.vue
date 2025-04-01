<template>
  <div :class="CSS_CLASSES.CONTAINER" ref="animationListRef">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import type { StateDataType, HookType } from "../types";
import { ANIMATION_TYPE, getOnTransitionEvent, CSS_CLASSES } from "../utils";
import { onBeforeMount, onDeactivated, reactive, ref, nextTick } from "vue";
import "../styles/animation.css";

/**
 * 组件属性接口
 * @interface PropsType
 */
interface PropsType {
  /** 默认是否渲染动画 */
  firstShow?: boolean;
  /** 是否深层动画 */
  deep?: boolean;
  /** 默认动画类型 */
  animationType?: ANIMATION_TYPE;
  /** 是否异步 */
  isAsync?: boolean;
  /** 排除动画的标签属性 */
  excludeTags?: string[];
}

// 获取动画回调函数名（只需计算一次）
const animationEventName = getOnTransitionEvent();
// 当前元素引用
const animationListRef = ref<HTMLElement | null>(null);
// 状态数据
const stateData: StateDataType = reactive({
  _$Hooks: {}, // 生命周期
  elChildren: [], // 子元素集
});

// 组件属性默认值
const props = withDefaults(defineProps<PropsType>(), {
  firstShow: true,
  deep: false,
  animationType: ANIMATION_TYPE.RIGHT_LEFT,
  isAsync: true,
  excludeTags: () => [],
});

// MutationObserver实例
let observer: MutationObserver | null = null;

onBeforeMount(() => {
  // 初始化Hooks
  initHooks();
});

nextTick(() => {
  // 判断是否刚进入调用动画(默认调用)
  if (props.firstShow) {
    animationCall();
  }

  // 如果启用异步模式，监听子元素变化
  if (props.isAsync && animationListRef.value) {
    // 监听子元素变化
    observer = new MutationObserver(() => {
      animationCall();
      // 只触发一次
      cleanupObserver();
    });

    // 配置观察选项
    observer.observe(animationListRef.value, { childList: true });
  }
});

// 清除状态
onDeactivated(cleanupObserver);

/**
 * 清理MutationObserver
 */
function cleanupObserver(): void {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

/**
 * 触发动画函数
 * 初始化元素并开始动画序列
 */
function animationCall(): void {
  if (!animationListRef.value) return;

  // 初始化
  stateData.elChildren = [];

  // 获取动画元素
  takeElChildren(animationListRef.value.children, props.deep);

  if (stateData.elChildren.length > 0) {
    callHooks("start");
    // 开始动画
    callAnima(0, stateData.elChildren);
  }
}

/**
 * 获取需要动画的元素
 * @param {HTMLCollection} els 子元素集
 * @param {boolean} deep 是否深入查找子元素
 */
function takeElChildren(els: HTMLCollection, deep: boolean): void {
  if (els.length === 0) return;

  const elements = Array.from(els);

  if (deep) {
    for (const el of elements) {
      // 检查元素是否有排除标签
      const tagAttr = (el as HTMLElement).getAttribute("tag");
      const shouldExclude = tagAttr && props.excludeTags.includes(tagAttr);

      if (shouldExclude) {
        // 跳过添加动画类，但仍然处理子元素
        if (el.children && el.children.length > 0) {
          takeElChildren(el.children, deep);
        }
      } else if (el.children && el.children.length > 0) {
        takeElChildren(el.children, deep);
      } else {
        el.classList.add(CSS_CLASSES.INIT);
        stateData.elChildren.push(el);
      }
    }
  } else {
    for (const el of elements) {
      // 检查元素是否有排除标签
      const tagAttr = (el as HTMLElement).getAttribute("tag");
      const shouldExclude = tagAttr && props.excludeTags.includes(tagAttr);

      if (!shouldExclude) {
        el.classList.add(CSS_CLASSES.INIT);
        stateData.elChildren.push(el);
      }
    }
  }
}

/**
 * 开始动画
 * @param {number} listIndex 当前动画元素索引
 * @param {Array<HTMLElement | Element>} list 动画元素集合
 */
function callAnima(listIndex: number, list: Array<HTMLElement | Element>): void {
  if (listIndex > list.length - 1) {
    callHooks("end");
    return;
  }

  const el = list[listIndex];
  callHooks("update", { index: listIndex, el });

  // 避免处理非DOM元素
  if (!(el instanceof HTMLElement)) {
    callAnima(listIndex + 1, list);
    return;
  }

  const animationClass = CSS_CLASSES.getAnimationClass(props.animationType);
  // 声明一个备用计时器
  let fallbackTimer: number | null = null;

  // 处理动画结束事件
  const handleAnimationEnd = function (event: Event): void {
    // 确保事件是从当前元素触发的
    if (event.target === el) {
      // 清除备用计时器
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }

      // 移除监听器，避免内存泄漏
      el.removeEventListener(animationEventName, handleAnimationEnd);
      // 移除动画和初始化类
      el.classList.remove(CSS_CLASSES.INIT);
      el.classList.remove(animationClass);
      delete el.dataset.animating;

      // 使用requestAnimationFrame确保DOM更新完成后再继续下一个元素动画
      requestAnimationFrame(() => {
        // 直接调用下一个动画，无需额外延迟
        callAnima(listIndex + 1, list);
      });
    }
  };

  // 添加事件监听
  el.addEventListener(animationEventName, handleAnimationEnd);

  // 将元素标记为正在进行动画
  el.dataset.animating = "true";

  // 使用requestAnimationFrame确保CSS类的添加被分离，以触发转换
  requestAnimationFrame(() => {
    // 再次使用requestAnimationFrame确保浏览器有足够时间处理初始状态
    requestAnimationFrame(() => {
      // 添加动画类 - 这会触发动画
      el.classList.add(animationClass);

      // 设置备用计时器，确保即使事件不触发也能继续
      fallbackTimer = window.setTimeout(() => {
        // 如果元素还在动画中（事件没有触发）
        if (el.dataset.animating === "true") {
          // 手动触发结束逻辑
          el.removeEventListener(animationEventName, handleAnimationEnd);
          el.classList.remove(CSS_CLASSES.INIT);
          el.classList.remove(animationClass);
          delete el.dataset.animating;
          // 继续下一个元素
          requestAnimationFrame(() => {
            callAnima(listIndex + 1, list);
          });
        }
      }, 500); // 给动画足够的时间完成
    });
  });
}

/**
 * 初始化Hook生命周期函数
 * @param {HookType} hook 生命周期钩子对象
 */
function initHooks(hook?: HookType): void {
  const defaultHooks = {
    start: () => {},
    update: () => {},
    end: () => {},
  };

  stateData._$Hooks = Object.assign(defaultHooks, hook || {});
}

/**
 * 触发生命周期钩子
 * @param {string} event 触发的钩子名称
 * @param {any} params 携带的参数
 */
function callHooks(event: string, params?: any): void {
  const hook = stateData._$Hooks as Record<string, Function>;
  if (hook[event]) {
    hook[event](params);
  }
}

// 暴露给外部的方法
defineExpose({
  initHooks,
  animationCall,
});
</script>
