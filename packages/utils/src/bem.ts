/**
 * BEM 命名规范工具
 * Block__Element--Modifier
 */

type BEMType = {
  b: () => string
  e: (element: string) => string
  m: (modifier: string) => string
  em: (element: string, modifier: string) => string
  is: (name: string, state?: boolean) => string
}

/**
 * 创建 BEM 命名函数
 * @param namespace 命名空间，默认 'vc' (vue-components)
 * @param block 块名
 * @returns BEM 工具函数集合
 * 
 * @example
 * const bem = createBEM('button')
 * bem.b() // 'vc-button'
 * bem.e('icon') // 'vc-button__icon'
 * bem.m('primary') // 'vc-button--primary'
 * bem.em('icon', 'large') // 'vc-button__icon--large'
 * bem.is('disabled') // 'is-disabled'
 * bem.is('active', true) // 'is-active'
 * bem.is('active', false) // ''
 */
export function createBEM(block: string, namespace: string = 'vc'): BEMType {
  const _bem = (
    element?: string,
    modifier?: string
  ): string => {
    let cls = `${namespace}-${block}`
    
    if (element) {
      cls += `__${element}`
    }
    
    if (modifier) {
      cls += `--${modifier}`
    }
    
    return cls
  }

  return {
    // Block: vc-button
    b: () => _bem(),
    
    // Element: vc-button__icon
    e: (element: string) => _bem(element),
    
    // Modifier: vc-button--primary
    m: (modifier: string) => _bem(undefined, modifier),
    
    // Element + Modifier: vc-button__icon--large
    em: (element: string, modifier: string) => _bem(element, modifier),
    
    // State: is-disabled, is-active
    is: (name: string, state?: boolean) => {
      if (state === undefined) {
        return `is-${name}`
      }
      return state ? `is-${name}` : ''
    }
  }
}

/**
 * 创建命名空间函数
 * @param namespace 命名空间
 * @returns 返回创建 BEM 的函数
 * 
 * @example
 * const createNamespace = createNamespaceFn('my-ui')
 * const buttonNs = createNamespace('button')
 * buttonNs.b() // 'my-ui-button'
 */
export function createNamespaceFn(namespace: string) {
  return (block: string) => createBEM(block, namespace)
}

/**
 * 默认命名空间创建函数
 */
export const createNamespace = (block: string) => createBEM(block, 'vc')

