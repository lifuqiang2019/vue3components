import type { PropType } from 'vue'

export const iconProps = {
  /**
   * 图标大小
   */
  size: {
    type: [Number, String] as PropType<number | string>,
    default: undefined
  },
  /**
   * 图标颜色
   */
  color: {
    type: String,
    default: undefined
  },
  /**
   * 是否旋转动画
   */
  spin: {
    type: Boolean,
    default: false
  }
}

export interface IconProps {
  /**
   * 图标大小
   */
  size?: number | string
  /**
   * 图标颜色
   */
  color?: string
  /**
   * 是否旋转动画
   */
  spin?: boolean
}

