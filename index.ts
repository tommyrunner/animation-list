/* eslint-disable */
import type { AnimationsType, ObjectType } from './index.d'
// 兼容浏览器-监听animation
function getOnTransitionEvent() {
    let el: HTMLElement = document.createElement('surface'),
        // 利用transition来识别浏览器兼容animationend
        animations: AnimationsType = {
            transition: 'animationend',
            OnTransiTion: 'onAnimationEnd',
            webkittransition: 'weikitanimationend',
            WebkitTransiTion: 'weikitAnimationEnd'
        }

    for (let key in animations) {
        if (el.style[key as any] !== undefined) {
            return animations[key]
        }
    }
}
let animationList = {
    install: function (Vue: any) {
        let callTime = true, // 防止多次触发
            $el: HTMLElement | null = null, // 当前元素
            elChildern: Array<HTMLElement> = [], // 当前元素的子元素
            $deep = false, // 是否深层动画
            _hooks: ObjectType = {},
            $firstNo = true, // 是否刚进入调用动画
            // 默认动画 custom：自定义
            AnimationTypes = ['bottom-top', 'top-bottom', 'right-left', 'left-right', 'small-big', 'big-small', 'custom'],
            animationType = 'right-left', // 默认动画
            _$HooksName = '$animationListHooks', // 抛出hooks
            animationEventName = getOnTransitionEvent() // 获取动画回函数调名
        Vue.mixin({
            methods: {
                // 抛出动画触发函数
                $animationListShow() {
                    if ($el && callTime) {
                        // 不能多次触发
                        callTime = false
                        // 初始化
                        elChildern = []
                        // 获取动画元素
                        takeElChildern(Array.from($el.children), elChildern, $deep)
                        if (elChildern.length > 0) {
                            callHooks('start')
                            // 开始动画
                            callAnima(0, elChildern)
                        }
                    }
                }
            },
            created() {
                // 界面开始初始化数据
                callTime = true
                $el = null
                elChildern = []
                $deep = false
                _hooks = {}
                // 初始化Hooks
                initHooks(this)
            },
            mounted() {
                // 判断是否刚进入调用动画(默认调用)
                !$firstNo &&
                    this.$nextTick(() => {
                        // 启动动画
                        this.$animationListShow()
                    })
            }
        })
        // 浅层
        Vue.directive('list-show', {
            bind(el: HTMLElement, binding: any) {
                getElConfig(el, binding, false)
            },
            update(el: HTMLElement, binding: any) {
                getElConfig(el, binding, false)
            },
            // 兼容vue3.0
            beforeMount(el: HTMLElement, binding: any) {
                getElConfig(el, binding, false)
            },
            beforeUpdate(el: HTMLElement, binding: any) {
                getElConfig(el, binding, false)
            }
        })
        // 深层
        Vue.directive('list-show-deep', {
            bind(el: HTMLElement, binding: any) {
                getElConfig(el, binding, true)
            },
            update(el: HTMLElement, binding: any) {
                getElConfig(el, binding, true)
            },
            // 兼容vue3.0
            beforeMount(el: HTMLElement, binding: any) {
                getElConfig(el, binding, true)
            },
            beforeUpdate(el: HTMLElement, binding: any) {
                getElConfig(el, binding, true)
            }
        })
        /**
         * 获取参数
         * @param {*} el
         * @param {*} binding
         */
        function getElConfig(el: HTMLElement, binding: any, deep: boolean) {
            $el = el
            $deep = deep
            $firstNo = el.getAttribute('first-no') !== null || el.getAttribute('firstNo') !== null
            binding.value && AnimationTypes.includes(binding.value) && (animationType = binding.value)
        }
        /**
         * 开始动画
         * @param {*} listIndex 动画元素的小标
         * @param {*} list 动画元素集合
         * @returns
         */
        function callAnima(listIndex: number, list: Array<HTMLElement>) {
            if (listIndex > list.length - 1) {
                callHooks('end')
                callTime = true
                return
            }
            let el = list[listIndex]
            callHooks('update', { index: listIndex, el })
            animationEventName &&
                el.addEventListener(
                    animationEventName,
                    function evnet() {
                        el.classList.remove('ls-init')
                        el.classList.remove(`ls-${animationType}`)
                        el.removeEventListener(animationEventName, evnet, false) //销毁事件
                        callAnima(++listIndex, list)
                    },
                    false
                )
            el.classList.add(`ls-${animationType}`)
        }

        /**
         * 取出需要动画的元素
         * @param {*} el // 需要动画的元素
         */
        function takeElChildern(els: Array<HTMLElement | Element>, values: Array<HTMLElement | Element>, deep: boolean) {
            if (els.length > 0) {
                if (deep) {
                    for (let el of els) {
                        if (el.children && el.children.length > 0) {
                            takeElChildern(Array.from(el.children), values, deep)
                        } else {
                            el.classList && el.classList.add('ls-init')
                            values.push(el)
                        }
                    }
                } else {
                    for (let el of els) {
                        el.classList && el.classList.add('ls-init')
                        values.push(el)
                    }
                }
            }
        }
        // ---- hooks
        function initHooks($vue: any) {
            if (!$vue[_$HooksName]) _hooks = $vue[_$HooksName] = { start: () => { }, update: () => { }, end: () => { } }
            if (getDataType($vue[_$HooksName]) === 'object') {
                Object.keys($vue[_$HooksName]).forEach((key) => {
                    if (getDataType($vue[_$HooksName][key]) === 'function') {
                        _hooks[key] = $vue[_$HooksName][key]
                    }
                })
            }
        }
        function callHooks(event: string, params?: any) {
            _hooks[event] && _hooks[event](params)
        }
        // ---- utils
        function getDataType(data: ObjectType) {
            return String(Object.prototype.toString.call(data).split(' ')[1].split(']')[0]).toLowerCase()
        }
    }
}
export default animationList
  /* eslint-disable */