<!-- 日志面板组件 -->
<template>
  <div class="log-panel">
    <h3>动画事件日志</h3>
    <div class="log-actions">
      <button class="btn btn-danger" @click="onClearClick">清除日志</button>
    </div>
    <div class="log-container">
      <div v-for="(log, index) in logs" :key="index" class="log-item">
        <span class="log-time">{{ log.time }}</span>
        <span :class="'log-type log-type-' + log.type">{{ log.type }}</span>
        <span class="log-message">{{ log.message }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * 日志条目接口
 */
export interface LogEntry {
  time: string;
  type: string;
  message: string;
}

/**
 * 组件属性定义
 */
interface Props {
  /** 日志列表 */
  logs: LogEntry[];
}

const props = defineProps<Props>();

// 定义事件
const emit = defineEmits<{
  (e: 'clear'): void;
}>();

/**
 * 清除日志按钮点击
 */
function onClearClick() {
  emit('clear');
}
</script>

<style scoped>
/* 日志面板样式 */
.log-panel {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.log-panel h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.log-actions {
  margin-bottom: 15px;
}

.log-container {
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
  background-color: #f9f9f9;
}

.log-item {
  padding: 8px 10px;
  border-bottom: 1px solid #eee;
  font-family: monospace;
}

.log-time {
  color: #777;
  margin-right: 10px;
}

.log-type {
  display: inline-block;
  width: 60px;
  text-align: center;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 0.85em;
  margin-right: 10px;
}

.log-type-start {
  background-color: #4caf50;
  color: white;
}

.log-type-update {
  background-color: #2196f3;
  color: white;
}

.log-type-end {
  background-color: #f44336;
  color: white;
}

.log-type-action {
  background-color: #ff9800;
  color: white;
}

.log-type-info {
  background-color: #9e9e9e;
  color: white;
}

.log-message {
  color: #333;
}

.btn {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-danger {
  background-color: #f44336;
  color: white;
}

.btn-danger:hover {
  background-color: #d32f2f;
}
</style> 