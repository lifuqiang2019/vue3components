import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(component: T): SFCWithInstall<T> {
  const comp = component as SFCWithInstall<T>

  comp.install = (app: App) => {
    const name = (component as any).name
    if (name) {
      app.component(name, component as any)
    }
  }

  return comp
}

