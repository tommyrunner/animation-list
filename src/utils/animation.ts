/**
 * 获取与浏览器兼容的动画结束事件名称
 * @returns {string} 返回浏览器支持的animationend事件名称
 */
export function getOnTransitionEvent(): string {
  // 检查优先使用标准事件名
  if (typeof document === "undefined") {
    return "animationend"; // 服务端渲染兼容
  }

  // 使用更精确的元素类型
  const el = document.createElement("div");

  // 检查动画属性
  const animations: Record<string, string> = {
    animation: "animationend",
    WebkitAnimation: "webkitAnimationEnd",
    MozAnimation: "animationend",
    OAnimation: "oAnimationEnd",
    msAnimation: "MSAnimationEnd",
  };

  // 先尝试使用标准事件
  if ("animation" in el.style) {
    return "animationend";
  }

  // 检测浏览器前缀版本
  for (const key in animations) {
    // 使用in操作符检查style对象中是否存在该属性
    if (key.toLowerCase() in el.style) {
      return animations[key];
    }
  }

  // 最后固定返回标准事件名
  return "animationend";
}

/**
 * 动画类型枚举
 * @enum {string}
 */
export enum ANIMATION_TYPE {
  /** 从下向上的动画 */
  BOTTOM_TOP = "bottom-top",
  /** 从上向下的动画 */
  TOP_BOTTOM = "top-bottom",
  /** 从右到左的动画 */
  RIGHT_LEFT = "right-left",
  /** 从左到右的动画 */
  LEFT_RIGHT = "left-right",
  /** 从小到大的动画 */
  SMALL_BIG = "small-big",
  /** 从大到小的动画 */
  BIG_SMALL = "big-small",
  /** 自定义动画 */
  CUSTOM = "custom",
}

/**
 * CSS类名常量
 * 使用__前缀防止与用户类名冲突
 */
export const CSS_CLASSES = {
  /** 初始化样式类名 */
  INIT: "__ls-init",
  /** 动画前缀 */
  PREFIX: "__ls",
  /** 组件容器类名 */
  CONTAINER: "__animation-list",
  /** 动画类前缀 */
  getAnimationClass: (type: ANIMATION_TYPE): string => `__ls-${type}`,
}
