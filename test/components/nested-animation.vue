<!-- 深层嵌套动画组件 -->
<template>
  <div class="test-panel">
    <h2>深层嵌套动画测试</h2>
    <animation-list
      ref="animationListRef"
      :first-show="firstShow"
      :deep="true"
      :animation-type="animationType"
      :is-async="isAsync"
      :exclude-tags="['subgroup-title']"
      class="animation-container"
    >
      <div v-for="group in nestedItems" :key="group.id" class="group">
        <h3 tag="subgroup-title">{{ group.title }}</h3>
        <div class="nested-items">
          <template v-for="item in group.items" :key="item.id">
            <!-- 子分组标题 -->
            <div v-if="item.id.startsWith('subgroup-')" class="subgroup-title" tag="subgroup-title">
              {{ item.text }}
            </div>
            <!-- 普通项目 -->
            <div v-else class="nested-item" :style="{ backgroundColor: item.color }">
              {{ item.id.split("-").slice(-1)[0] }}
            </div>
          </template>
        </div>
      </div>
    </animation-list>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import animationList from "../../src/components/animation-list.vue";

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
  /** 嵌套列表项目 */
  nestedItems: any[];
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
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

/* 嵌套项目样式 */
.group {
  margin-bottom: 25px;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.group h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ddd;
}

.nested-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.subgroup-title {
  width: 100%;
  padding: 8px 0;
  margin: 8px 0 4px 0;
  font-weight: bold;
  font-size: 14px;
  color: #444;
  border-bottom: 1px solid #eee;
}

.nested-item {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-weight: bold;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
