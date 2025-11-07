import { nextTick } from 'vue'
import type { App, DirectiveBinding, ObjectDirective } from 'vue'

type MaybeElement = HTMLElement | SVGElement
type InfiniteScrollHandler = () => void | Promise<void>

interface InfiniteScrollBindingOptions {
  handler: InfiniteScrollHandler
  delay?: number
  distance?: number
  disabled?: boolean
  immediate?: boolean
}

type InfiniteScrollBindingValue = InfiniteScrollHandler | InfiniteScrollBindingOptions

interface InfiniteScrollOptions {
  delay: number
  distance: number
  disabled: boolean
  immediate: boolean
}

interface InfiniteScrollState {
  container: HTMLElement | Window
  handler: InfiniteScrollHandler
  options: InfiniteScrollOptions
  onScroll: () => void
  observer?: MutationObserver
  throttleTimer: number | null
}

const SCOPE = '__vcInfiniteScroll__'
const DEFAULT_OPTIONS: InfiniteScrollOptions = {
  delay: 200,
  distance: 0,
  disabled: false,
  immediate: true
}

const ATTR_DELAY = 'infinite-scroll-delay'
const ATTR_DISTANCE = 'infinite-scroll-distance'
const ATTR_DISABLED = 'infinite-scroll-disabled'
const ATTR_IMMEDIATE = 'infinite-scroll-immediate'

const isFunction = (val: unknown): val is InfiniteScrollHandler => typeof val === 'function'
const isObject = (val: unknown): val is Record<string, any> => val !== null && typeof val === 'object'

const getNumberAttr = (el: MaybeElement, name: string, fallback: number) => {
  const attr = el.getAttribute(name)
  if (attr === null || attr === '') return fallback
  const value = Number(attr)
  return Number.isNaN(value) ? fallback : value
}

const getBooleanAttr = (el: MaybeElement, name: string, fallback: boolean) => {
  const attr = el.getAttribute(name)
  if (attr === null) return fallback
  if (attr === '' || attr === 'true') return true
  if (attr === 'false') return false
  return fallback
}

const resolveHandler = (binding: DirectiveBinding<InfiniteScrollBindingValue>): InfiniteScrollHandler | null => {
  if (isFunction(binding.value)) {
    return binding.value
  }

  if (isObject(binding.value) && isFunction(binding.value.handler)) {
    return binding.value.handler
  }

  return null
}

const resolveOptions = (
  el: MaybeElement,
  binding: DirectiveBinding<InfiniteScrollBindingValue>,
  previous?: InfiniteScrollOptions
): InfiniteScrollOptions => {
  const bindingOptions = isObject(binding.value) ? binding.value : {}

  const delayFromAttr = getNumberAttr(el, ATTR_DELAY, previous?.delay ?? DEFAULT_OPTIONS.delay)
  const distanceFromAttr = getNumberAttr(el, ATTR_DISTANCE, previous?.distance ?? DEFAULT_OPTIONS.distance)
  const disabledFromAttr = getBooleanAttr(el, ATTR_DISABLED, previous?.disabled ?? DEFAULT_OPTIONS.disabled)
  const immediateFromAttr = getBooleanAttr(el, ATTR_IMMEDIATE, previous?.immediate ?? DEFAULT_OPTIONS.immediate)

  const pickNumber = (value: unknown, fallback: number) => (typeof value === 'number' && !Number.isNaN(value) ? value : fallback)
  const pickBoolean = (value: unknown, fallback: boolean) => (typeof value === 'boolean' ? value : fallback)

  return {
    delay: pickNumber(bindingOptions.delay, delayFromAttr),
    distance: pickNumber(bindingOptions.distance, distanceFromAttr),
    disabled: pickBoolean(bindingOptions.disabled, disabledFromAttr),
    immediate: pickBoolean(bindingOptions.immediate, immediateFromAttr)
  }
}

const getScrollContainer = (el: HTMLElement): HTMLElement | Window => {
  let parent: HTMLElement | null = el
  const overflowRE = /(auto|scroll|overlay)/

  while (parent) {
    const overflowY = getComputedStyle(parent).overflowY
    if (overflowRE.test(overflowY)) {
      return parent
    }
    parent = parent.parentElement
  }

  return window
}

const getScrollElement = (container: HTMLElement | Window): HTMLElement => {
  if (container === window) {
    return document.documentElement
  }
  return container as HTMLElement
}

const checkReachBottom = (el: HTMLElement, state: InfiniteScrollState) => {
  if (state.options.disabled) return

  const container = state.container
  const scrollEl = getScrollElement(container)

  const { scrollTop, clientHeight, scrollHeight } = scrollEl

  if (scrollHeight - (scrollTop + clientHeight) <= state.options.distance) {
    state.handler()
  }
}

const createState = (
  el: HTMLElement,
  binding: DirectiveBinding<InfiniteScrollBindingValue>
): InfiniteScrollState | null => {
  const handler = resolveHandler(binding)

  if (!handler) {
    console.warn('[vc-infinite-scroll] Expect function value or object with handler property')
    return null
  }

  const container = getScrollContainer(el)
  const options = resolveOptions(el, binding)

  const state: InfiniteScrollState = {
    container,
    handler,
    options,
    throttleTimer: null,
    onScroll: () => {}
  }

  state.onScroll = () => {
    if (state.options.disabled) return
    if (state.throttleTimer !== null) return

    state.throttleTimer = window.setTimeout(() => {
      state.throttleTimer = null
      checkReachBottom(el, state)
    }, state.options.delay)
  }

  container.addEventListener('scroll', state.onScroll, { passive: true })

  state.observer = new MutationObserver(() => {
    state.onScroll()
  })
  state.observer.observe(el, { childList: true, subtree: true })

  if (state.options.immediate) {
    nextTick(() => {
      checkReachBottom(el, state)
    })
  } else {
    nextTick(() => state.onScroll())
  }

  return state
}

const destroyState = (el: HTMLElement) => {
  const state = (el as any)[SCOPE] as InfiniteScrollState | undefined
  if (!state) return

  state.container.removeEventListener('scroll', state.onScroll)
  state.observer?.disconnect()

  if (state.throttleTimer !== null) {
    window.clearTimeout(state.throttleTimer)
  }

  delete (el as any)[SCOPE]
}

const updateState = (el: HTMLElement, binding: DirectiveBinding<InfiniteScrollBindingValue>) => {
  const state = (el as any)[SCOPE] as InfiniteScrollState | undefined

  if (!state) {
    const newState = createState(el, binding)
    if (newState) {
      ;(el as any)[SCOPE] = newState
    }
    return
  }

  const handler = resolveHandler(binding)
  if (handler) {
    state.handler = handler
  }

  const newOptions = resolveOptions(el, binding, state.options)
  state.options = newOptions

  const newContainer = getScrollContainer(el)
  if (newContainer !== state.container) {
    state.container.removeEventListener('scroll', state.onScroll)
    newContainer.addEventListener('scroll', state.onScroll, { passive: true })
    state.container = newContainer
  }

  if (state.options.immediate) {
    nextTick(() => {
      checkReachBottom(el, state)
    })
  }
}

const InfiniteScrollDirective: ObjectDirective = {
  mounted(el: HTMLElement, binding) {
    const state = createState(el, binding)
    if (state) {
      ;(el as any)[SCOPE] = state
    }
  },
  updated(el: HTMLElement, binding) {
    updateState(el, binding)
  },
  unmounted(el: HTMLElement) {
    destroyState(el)
  }
}

export const VcInfiniteScroll = {
  install(app: App) {
    app.directive('infinite-scroll', InfiniteScrollDirective)
  }
}

export default VcInfiniteScroll

export type { InfiniteScrollBindingOptions }

