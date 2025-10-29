import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(comp: T): SFCWithInstall<T> {
  const component = comp as SFCWithInstall<T>
  
  component.install = (app: App) => {
    const name = (comp as any).name
    if (name) {
      app.component(name, comp as any)
    }
  }
  
  return component
}

