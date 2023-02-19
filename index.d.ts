export interface HookType {
    start?: Function
    update?: Function
    end?: Function
}

export interface StateDataType {
    _$Hooks: HookType
    elChildern: Array<HTMLElement | Element>
}