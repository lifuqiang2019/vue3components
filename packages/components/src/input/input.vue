<template>
  <div :class="classes" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <!-- prefix slot -->
    <span v-if="hasPrefix" :class="bem.e('prefix')">
      <slot name="prefix"></slot>
      <i v-if="prefixIcon" :class="prefixIcon"></i>
    </span>
    
    <!-- input or textarea -->
    <input
      v-if="!isTextarea"
      ref="inputRef"
      :class="bem.e('inner')"
      v-bind="attrs"
      :type="passwordToggleable ? (passwordVisible ? 'text' : 'password') : type"
      :value="modelValueParsed"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :autocomplete="autocomplete"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
    
    <textarea
      v-else
      ref="textareaRef"
      :class="bem.e('inner')"
      v-bind="attrs"
      :value="modelValueParsed"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :autocomplete="autocomplete"
      :rows="rows"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    ></textarea>
    
    <!-- suffix slot -->
    <span v-if="hasSuffix" :class="bem.e('suffix')">
      <i v-if="showClear" class="vc-icon-circle-close" @click="handleClear"></i>
      <i
        v-if="showPasswordIcon"
        :class="passwordVisible ? 'vc-icon-view' : 'vc-icon-hide'"
        @click="togglePassword"
      ></i>
      <slot name="suffix"></slot>
      <i v-if="suffixIcon" :class="suffixIcon"></i>
    </span>
    
    <!-- prepend slot -->
    <div v-if="$slots.prepend" :class="bem.e('group-prepend')">
      <slot name="prepend"></slot>
    </div>
    
    <!-- append slot -->
    <div v-if="$slots.append" :class="bem.e('group-append')">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useAttrs, useSlots, nextTick, watch } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import { inputProps, type InputEmits } from './types'

const bem = createNamespace('input')

defineOptions({
  name: 'VcInput',
  inheritAttrs: false
})

const props = defineProps(inputProps)

const emit = defineEmits<InputEmits>()

const attrs = useAttrs()
const slots = useSlots()

const inputRef = ref<HTMLInputElement>()
const textareaRef = ref<HTMLTextAreaElement>()
const focused = ref(false)
const passwordVisible = ref(false)
const hovering = ref(false)

const isHoverEnabled = computed(() => !props.disabled && !props.readonly)
const isTextarea = computed(() => props.type === 'textarea')
const passwordToggleable = computed(() => props.showPassword && props.type === 'password')

const modelValueParsed = computed(() => {
  const value = props.modelValue
  return value === undefined || value === null ? '' : value
})

const isEmptyValue = (value: unknown) => value === '' || value === null || value === undefined

const showClear = computed(() => props.clearable && isHoverEnabled.value && hovering.value && !isEmptyValue(props.modelValue))
const showPasswordIcon = computed(() => passwordToggleable.value && isHoverEnabled.value && !isEmptyValue(props.modelValue))

const hasPrefix = computed(() => Boolean(slots.prefix) || Boolean(props.prefixIcon))
const hasSuffix = computed(() => Boolean(slots.suffix) || Boolean(props.suffixIcon) || showClear.value || showPasswordIcon.value)
const hasGroup = computed(() => Boolean(slots.prepend) || Boolean(slots.append))

const classes = computed(() => {
  const cls: Array<string | Record<string, boolean>> = [bem.b()]
  if (props.size && props.size !== 'default') {
    cls.push(bem.m(props.size))
  }
  cls.push({
    [bem.is('disabled')]: props.disabled,
    [bem.is('focused')]: focused.value,
    [bem.m('group')]: hasGroup.value,
    [bem.m('prefix')]: hasPrefix.value,
    [bem.m('suffix')]: hasSuffix.value
  })
  return cls
})

watch([() => props.disabled, () => props.readonly], ([disabled, readonly]) => {
  if (disabled || readonly) {
    hovering.value = false
  }
})

watch(passwordToggleable, value => {
  if (!value) {
    passwordVisible.value = false
  }
})

const resolveEmitValue = (value: string): string | number => {
  if (props.type === 'number' && !isTextarea.value) {
    return value === '' ? '' : Number(value)
  }
  return value
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  const emitValue = resolveEmitValue(target.value)
  emit('update:modelValue', emitValue)
  emit('input', emitValue)
}

const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  focused.value = false
  emit('blur', event)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  const emitValue = resolveEmitValue(target.value)
  emit('change', emitValue)
}

const handleClear = () => {
  const emitValue = resolveEmitValue('')
  emit('update:modelValue', emitValue)
  emit('clear')
  emit('input', emitValue)
  emit('change', emitValue)
  nextTick(() => {
    focus()
  })
}

const togglePassword = () => {
  if (!passwordToggleable.value) return
  passwordVisible.value = !passwordVisible.value
  focus()
}

const focus = async () => {
  await nextTick()
  if (isTextarea.value) {
    textareaRef.value?.focus()
  } else {
    inputRef.value?.focus()
  }
}

const blur = () => {
  if (isTextarea.value) {
    textareaRef.value?.blur()
  } else {
    inputRef.value?.blur()
  }
}

const handleMouseEnter = () => {
  if (isHoverEnabled.value) {
    hovering.value = true
  }
}

const handleMouseLeave = () => {
  hovering.value = false
}

defineExpose({
  focus,
  blur
})
</script>

<style lang="scss">
@import "../styles/mixin.scss";
@import "../styles/common/var.scss";

@include b(input) {
  position: relative;
  font-size: $--input-font-size;
  display: inline-block;
  width: 100%;
  
  @include e(inner) {
    -webkit-appearance: none;
    background-color: $--input-background-color;
    background-image: none;
    border-radius: $--input-border-radius;
    border: $--input-border;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: $--input-height;
    line-height: $--input-height;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    
    &:hover {
      border-color: $--input-hover-border;
    }
    
    &:focus {
      outline: none;
      border-color: $--input-focus-border;
    }
    
    &::placeholder {
      color: $--input-placeholder-color;
    }
  }
  
  textarea.vc-input__inner {
    padding: 5px 15px;
    line-height: 1.5;
    height: auto;
    resize: vertical;
  }
  
  @include e(prefix) {
    position: absolute;
    top: 0;
    height: 100%;
    color: $--input-icon-color;
    text-align: center;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    left: 5px;
    
    i {
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  
  @include e(suffix) {
    position: absolute;
    top: 0;
    height: 100%;
    color: $--input-icon-color;
    text-align: center;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    right: 5px;
    
    i {
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  
  @include m(prefix) {
    .vc-input__inner {
      padding-left: 30px;
    }
  }
  
  @include m(suffix) {
    .vc-input__inner {
      padding-right: 30px;
    }
  }
  
  @include when(disabled) {
    .vc-input__inner {
      background-color: $--input-disabled-fill;
      border-color: $--input-disabled-border;
      color: $--input-disabled-color;
      cursor: not-allowed;
      
      &::placeholder {
        color: $--input-disabled-color;
      }
    }
  }
  
  @include m(medium) {
    font-size: 14px;
    
    .vc-input__inner {
      height: 36px;
      line-height: 36px;
    }
  }
  
  @include m(small) {
    font-size: 13px;
    
    .vc-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
  
  @include m(mini) {
    font-size: 12px;
    
    .vc-input__inner {
      height: 28px;
      line-height: 28px;
    }
  }
}

@include b(input-group) {
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
  > .vc-input__inner {
    vertical-align: middle;
    display: table-cell;
  }
  
  @include e(append) {
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: $--input-border;
    border-radius: $--input-border-radius;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    
    &:focus {
      outline: none;
    }
  }
  
  @include e(prepend) {
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: $--input-border;
    border-radius: $--input-border-radius;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    
    &:focus {
      outline: none;
    }
  }
}
</style>

