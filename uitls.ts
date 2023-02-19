// 兼容浏览器-监听animation
export function getOnTransitionEvent() {
  let el: HTMLElement = document.createElement("surface"),
    // 利用transition来识别浏览器兼容animationend
    animations: any = {
      transition: "animationend",
      OnTransiTion: "onAnimationEnd",
      webkittransition: "weikitanimationend",
      WebkitTransiTion: "weikitAnimationEnd",
    };

  for (let key in animations) {
    if (el.style[key as any] !== undefined) {
      return animations[key];
    }
  }
}
// 默认动画 custom：自定义
export enum ANIMATION_TYPE {
  BOTTOM_TOP = "bottom-top",
  TOP_BOTTOM = "top-bottom",
  RIGHT_LEFT = "right-left",
  LEFT_RIGHT = "left-right",
  SAMLL_BIG = "small-big",
  BIG_SMALL = "big-small",
  CUSTOM = "custom",
}
