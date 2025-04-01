<!-- 控制面板组件 -->
<template>
  <div class="control-panel">
    <h3>控制面板</h3>
    <div class="form-group">
      <div class="form-item">
        <label>动画类型：</label>
        <select v-model="currentAnimation" @change="handleAnimationTypeChange">
          <option v-for="(value, key) in animationTypes" :key="key" :value="value">{{ key }}</option>
        </select>
      </div>

      <div class="form-item checkbox">
        <label>
          <input type="checkbox" v-model="firstShowValue" @change="handleFirstShowChange" />
          首次展示动画
        </label>
      </div>

      <div class="form-item checkbox">
        <label>
          <input type="checkbox" v-model="isAsyncValue" @change="handleIsAsyncChange" />
          异步加载
        </label>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn btn-primary" @click="onReplayClick">重放动画</button>
      <button class="btn btn-secondary" @click="onLoadClick">异步加载数据</button>
      <button class="btn btn-secondary" @click="onResetClick">重置数据</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

/**
 * 组件属性定义
 */
interface Props {
  /** 动画类型枚举 */
  animationTypes: Record<string, any>;
  /** 当前选中的动画类型 */
  modelValue: any;
  /** 是否首次展示动画 */
  firstShow: boolean;
  /** 是否异步加载 */
  isAsync: boolean;
}

const props = defineProps<Props>();

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'update:firstShow', value: boolean): void;
  (e: 'update:isAsync', value: boolean): void;
  (e: 'replay'): void;
  (e: 'load'): void;
  (e: 'reset'): void;
}>();

// 内部状态
const currentAnimation = ref(props.modelValue);
const firstShowValue = ref(props.firstShow);
const isAsyncValue = ref(props.isAsync);

// 监听属性变化
watch(() => props.modelValue, (newValue) => {
  currentAnimation.value = newValue;
});

watch(() => props.firstShow, (newValue) => {
  firstShowValue.value = newValue;
});

watch(() => props.isAsync, (newValue) => {
  isAsyncValue.value = newValue;
});

/**
 * 处理动画类型改变
 */
function handleAnimationTypeChange() {
  emit('update:modelValue', currentAnimation.value);
}

/**
 * 处理首次展示动画改变
 */
function handleFirstShowChange() {
  emit('update:firstShow', firstShowValue.value);
}

/**
 * 处理异步加载改变
 */
function handleIsAsyncChange() {
  emit('update:isAsync', isAsyncValue.value);
}

/**
 * 重放动画按钮点击
 */
function onReplayClick() {
  emit('replay');
}

/**
 * 异步加载数据按钮点击
 */
function onLoadClick() {
  emit('load');
}

/**
 * 重置数据按钮点击
 */
function onResetClick() {
  emit('reset');
}
</script>

<style scoped>
/* 控制面板样式 */
.control-panel {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.control-panel h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-item {
  margin-bottom: 15px;
}

.form-item.checkbox {
  display: flex;
  align-items: center;
}

.form-item label {
  display: flex;
  align-items: center;
  font-weight: 500;
}

.form-item select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-top: 5px;
}

.form-item input[type="checkbox"] {
  margin-right: 8px;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #4caf50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-secondary {
  background-color: #2196f3;
  color: white;
}

.btn-secondary:hover {
  background-color: #0b7dda;
}
</style> 