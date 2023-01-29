// 组件懒加载
import { useIntersectionObserver } from '@vueuse/core'
import { Ref } from 'vue'

export const componentLazy = (target: Ref<HTMLElement | undefined>, getList: Function) => {
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      stop()
      getList && getList()
    }
  })
}