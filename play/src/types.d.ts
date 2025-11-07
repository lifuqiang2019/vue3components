declare module '@vue3-components/components' {
  import type { Plugin } from 'vue'
  import type { Component } from 'vue'
  
  export const VcIcon: Component
  const Vue3Components: Plugin
  export default Vue3Components
}

declare module '@vue3-components/utils' {
  type BEMType = {
    b: () => string
    e: (element: string) => string
    m: (modifier: string) => string
    em: (element: string, modifier: string) => string
    is: (name: string, state?: boolean) => string
  }
  
  export function createBEM(block: string, namespace?: string): BEMType
  export function createNamespace(block: string): BEMType
  export function createNamespaceFn(namespace: string): (block: string) => BEMType
}

