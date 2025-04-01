<!-- 基本列表动画组件 -->
<template>
  <div class="test-panel">
    <h2>基本列表动画</h2>
    <animation-list ref="animationListRef" :first-show="firstShow" :deep="false" :animation-type="animationType" :is-async="isAsync" class="animation-container">
      <div v-for="item in items" :key="item.id" class="item" :style="{ backgroundColor: item.color }">
        {{ item.id.split("-")[1] }}
      </div>
    </animation-list>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import animationList from "animation-list";

/**
 * 组件属性定义
 */
interface Props {
  /** 动画类型 */
  animationType: any;
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
  },
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

.item {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: bold;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}
</style>
