<!-- 自定义果冻动画组件 -->
<template>
  <div class="test-panel">
    <h2>自定义果冻动画</h2>
    <animation-list
      ref="animationListRef"
      :first-show="firstShow"
      :deep="false"
      animation-type="custom"
      :is-async="isAsync"
      class="animation-container"
    >
      <div v-for="item in items" :key="item.id" class="custom-item" :style="{ backgroundColor: item.color }">
        {{ item.id.split("-")[1] }}
      </div>
    </animation-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import animationList from "../../src/components/animation-list.vue";

/**
 * 组件属性定义
 */
interface Props {
  /** 是否首次展示动画 */
  firstShow: boolean;
  /** 是否异步加载 */
  isAsync: boolean;
  /** 列表项目 */
  items: any[];
}

const props = defineProps<Props>();

// 组件引用
const animationListRef = ref<InstanceType<typeof animationList> | null>(null);

/**
 * 暴露事件和方法
 */
defineExpose({
  /**
   * 初始化动画钩子
   * @param hooks 钩子函数对象
   */
  initHooks(hooks: any) {
    if (animationListRef.value) {
      animationListRef.value.initHooks(hooks);
    }
  },
  
  /**
   * 触发动画
   */
  animationCall() {
    if (animationListRef.value) {
      animationListRef.value.animationCall();
    }
  }
});
</script>

<style scoped>
.test-panel h2 {
  margin-top: 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  color: #333;
}

.animation-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

/* 自定义果冻动画样式 */
.custom-item {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: bold;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 自定义果冻动画 */
:deep(.__ls-custom) {
  animation: __ls-jelly ease 0.8s !important;
}

@keyframes __ls-jelly {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  25% {
    opacity: 0.6;
    transform: scale(1.1);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.9);
  }
  70% {
    opacity: 0.9;
    transform: scale(1.05);
  }
  85% {
    opacity: 1;
    transform: scale(0.97);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style> 