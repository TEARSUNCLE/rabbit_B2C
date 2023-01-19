import { getcategoryListApi } from "@/api/dashboard"
import { defineComponent, onMounted, ref } from "vue"
import styles from '@/components/css/header.module.less'
import { RouterLink, useRouter } from "vue-router"

export default defineComponent({

  setup() {
    const useImg = ref<boolean>(false)
    const buyNUm = ref(0)
    const categoryList = ref<any[]>([])
    const router = useRouter()

    const curMenuId = ref()
    const showLayer = ref<boolean>(false)

    // 鼠标移入移出
    const mouseenterImg = () => useImg.value = true
    const mouseleaveImg = () => useImg.value = false

    // 菜单的鼠标事件
    const categoryEnter = (id: string) => {
      curMenuId.value = id
      handleMenuList()
      if (id !== '0') showLayer.value = true
    }
    const categoryLeave = () => {
      showLayer.value = false
    }

    const getcategory = async () => {
      const { data } = await getcategoryListApi()
      if (data.code == 1) {
        categoryList.value = [...[{ id: '0', name: '首页' }], ...data.result]
      }
    }

    const handleMenuList = () => {
      if (curMenuId.value !== 0) {
        const list = categoryList.value && categoryList.value.find(item => item.id === curMenuId.value)

        if (list.children && list.children.length >= 4) {
          list.children = list.children.slice(0, 4)
        }
      }
    }

    const categoryClick = (row: { id: string, name: string }) => {
      if (row.id === '0') {
        router.push('/')
      } else {}
    }

    onMounted(() => {
      getcategory()
    })

    return {
      useImg,
      buyNUm,
      categoryList,
      mouseenterImg,
      mouseleaveImg,
      handleMenuList,
      categoryEnter,
      categoryLeave,
      curMenuId,
      showLayer,
      categoryClick,
    }
  },

  render() {
    const {
      useImg,
      buyNUm,
      categoryList,
      mouseenterImg,
      mouseleaveImg,
      categoryEnter,
      categoryLeave,
      curMenuId,
      showLayer,
      categoryClick,
    } = this
    return (
      <>
        <div class={styles.topNav}>
          <div class={`container`}>
            <ul class={styles.menu}>
              <li class={`pl15 pr15`}><a href="#">请先登录</a></li>
              <li class={`pl15 pr15`}><a href="#">免费注册</a></li>
              <li class={`pl15 pr15`}><a href="#">我的订单</a></li>
              <li class={`pl15 pr15`}><a href="#">会员中心</a></li>
              <li class={`pl15 pr15`}><a href="#">帮助中心</a></li>
              <li class={`pl15 pr15`}><a href="#">关于我们</a></li>
              <li class={`pl15 pr15 flexBox aiCenter`} onMouseenter={mouseenterImg} onMouseleave={mouseleaveImg}>
                {!useImg && <img src="/images/phone.png" width={14} alt="" />}
                {useImg && <img src="/images/phone-green.png" width={14} alt="" />}
                <div class={`ml3`}><a href="#">手机版</a></div>
              </li>
            </ul>
          </div>
        </div>

        <div class={`container`}>
          <div class={styles.headerMenu} onMouseleave={categoryLeave}>
            <h1>
              <RouterLink to={'/'}>
                <img src="/images/logo.png" width={200} class={`pb15`} alt="logo" title="小兔鲜儿" />
              </RouterLink>
            </h1>
            <ul class={`flexWrap pl10 pr20 ${styles.menu}`}>
              {categoryList && categoryList.map(item => {
                return <li key={item.id} class={`fs16`}>
                  <a
                    href="#"
                    class={`defaultABottom`}
                    onMouseenter={() => categoryEnter(item.id)}
                    onClick={() => categoryClick(item) }
                  >{item.name}</a>
                </li>
              })}
            </ul>

            <div class={`flexBox aiCenter ${styles.search}`}>
              <img src="/images/magnifier.png" width={20} alt="" />
              <input type="text" placeholder="搜一搜" style={{ border: 'none' }} class={`pl3`} />
            </div>
            <div class={`textCenter ${styles.cart}`}>
              <a href="#">
                <img src="/images/cart.png" width={22} alt="" />
                <span class={`fs12 ${styles.buyNum}`}>{buyNUm}</span>
              </a>
            </div>

            {showLayer && <div class={`${styles.layer} flexBox aiCenter`}>
              <ul class={`flexBox aiCenter pl70 pr70`}>
                {categoryList && categoryList.map(item => {
                  return (item.children && item.id !== 0 && item.id === curMenuId) && item.children.map(goods => {
                    return <li key={goods.id} class={`fs16 textCenter`} style={{ width: '110px' }}>
                      <a href="#" class={`defaultA`}>
                        <img src={goods.picture} alt="" class={`defaultImg`} />
                        <p class={`pt10`}>{goods.name}</p>
                      </a>
                    </li>
                  })
                })}
              </ul>
            </div>
            }
          </div>
        </div>
      </>
    )
  }
})