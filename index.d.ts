export interface HookType {
    start?: Function
    update?: Function
    end?: Function
}

export interface StateDataType {
    _$Hooks: HookType
    elChildern: Array<HTMLElement | Element>
}
// 默认动画 custom：自定义
export enum ANIMATION_TYPE {
    BOTTOM_TOP = 'bottom-top',
    TOP_BOTTOM = 'top-bottom',
    RIGHT_LEFT = 'right-left',
    LEFT_RIGHT = 'left-right',
    SAMLL_BIG = 'small-big',
    BIG_SMALL = 'big-small',
    CUSTOM = 'custom'
}