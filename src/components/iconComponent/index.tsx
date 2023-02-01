// 封装通用icon
import { computed, defineComponent } from "vue"
import styles from '@/components/css/icon.module.less'
export default defineComponent({
  props: {
    iconName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: ''
    }
  },

  setup(props) {
    const iconClassName = computed(() => {
      return `#${props.iconName}`
    })

    const svgClass = computed(() => {
      if (props.className) {
        return `${styles.svgIcon} ${props.className}`
      }
      return `${styles.svgIcon}`
    })

    return {
      iconClassName,
      svgClass
    }
  },

  render(props) {
    const { iconClassName, svgClass } = this
    return (
      <>
        <svg class={svgClass} aria-hidden="true" font-size={props.fontSize} >
          <use xlinkHref={iconClassName} fill={props.color} />
        </svg>
      </>
    )
  }
})