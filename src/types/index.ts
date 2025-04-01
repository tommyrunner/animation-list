/**
 * 生命周期钩子类型接口
 * @interface HookType
 */
export interface HookType {
    /** 动画开始时的回调函数 */
    start?: Function
    /** 每个元素动画更新时的回调函数 */
    update?: Function
    /** 动画结束时的回调函数 */
    end?: Function
}

/**
 * 组件内部状态数据类型接口
 * @interface StateDataType
 */
export interface StateDataType {
    /** 生命周期钩子对象 */
    _$Hooks: HookType
    /** 要执行动画的元素集合 */
    elChildren: Array<HTMLElement | Element>
}

/**
 * 组件属性类型接口
 * @interface PropsType
 */
export interface PropsType {
    /** 默认是否渲染动画 */
    firstShow?: boolean;
    /** 是否深层动画 */
    deep?: boolean;
    /** 默认动画类型 */
    animationType?: string;
    /** 是否异步 */
    isAsync?: boolean;
    /** 排除动画的标签属性 */
    excludeTags?: string[];
} 