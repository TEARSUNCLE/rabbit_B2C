import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { Carousel } from "ant-design-vue"
import { getBannerListApi, getcategoryListApi, getHotGoodsApi, getNewGoodsApi } from "@/api/dashboard"
import { RightOutlined } from "@ant-design/icons-vue"
import styles from '@/components/css/main.module.less'

export default defineComponent({

  setup() {
    const bannerList = ref<any[]>([])
    const categoryList = ref<any[]>([])
    const newGoodsList = ref<any[]>([]) // 新鲜好物
    const hotGoodsList = ref<any[]>([]) // 人气推荐
    const carouselRef = ref()
    const curLayerId = ref()

    const curHeight = ref()   // 当前页面高度

    const isShowLayer = ref<boolean>(false)

    const getBanner = async () => {
      const { data } = await getBannerListApi()
      if (data.code == 1) {
        bannerList.value = data.result
      }
    }

    const getcategory = async () => {
      const { data } = await getcategoryListApi()
      if (data.code == 1) {
        categoryList.value = data.result
      }
    }

    const getNewGoods = async () => {
      const { data } = await getNewGoodsApi()
      if (data.code == 1) {
        newGoodsList.value = data.result
      }
    }

    const getHotGoods = async () => {
      const { data } = await getHotGoodsApi()
      if (data.code == 1) {
        hotGoodsList.value = data.result
      }
    }

    const changeBanner = (type: string) => {
      if (type === 'prev') {
        carouselRef.value.prev()
      } else {
        carouselRef.value.next()
      }
    }

    const layerEnter = (id: string) => {
      curLayerId.value = id
      isShowLayer.value = true
    }
    const layerLeave = () => {
      isShowLayer.value = false
    }

    const handleScroll = () => {
      window.addEventListener('scroll', () => {
        // 350
        if (window.scrollY) curHeight.value = window.scrollY
      })
    }

    watch(() => curHeight.value, (newVal) => {
      if (newVal >= 350) {
       getHotGoods.
      }
    })

    onMounted(() => {
      getBanner()
      getcategory()
      getNewGoods()
      handleScroll()
    })

    onBeforeUnmount(() => {
      // 离开组件移除监听事件
      window.removeEventListener('scroll', () => { })
    })

    return {
      bannerList,
      changeBanner,
      carouselRef,
      categoryList,
      layerEnter,
      curLayerId,
      isShowLayer,
      layerLeave,
      newGoodsList,
      hotGoodsList,
    }
  },

  render() {
    const {
      bannerList,
      changeBanner,
      categoryList,
      layerEnter,
      curLayerId,
      isShowLayer,
      layerLeave,
      newGoodsList,
      hotGoodsList
    } = this
    return (
      <div class={styles.main}>
        <div class={styles.homeEntry}>
          <div class={`container`}>
            <ul class={styles.banner}>
              {/* 轮播图 */}
              <Carousel autoplay ref={'carouselRef'}>
                {bannerList && bannerList.map(item => {
                  return <div>
                    <img src={item.imgUrl} alt="" />
                  </div>
                })}
              </Carousel>

              <img
                src="/images/arrow-left.png"
                alt=""
                width={44}
                class={`${styles.arrowLeft} hand`}
                onClick={() => changeBanner('prev')} />
              <img
                src="/images/arrow-right.png"
                alt=""
                width={44}
                class={`${styles.arrowRight} hand`}
                onClick={() => changeBanner('next')} />

              <div class={styles.homeCategory} onMouseleave={() => layerLeave()}>
                <div class={styles.menu}>
                  <ul>
                    {categoryList && categoryList.map(item => {
                      return <li key={item.id} class={styles.categoryItem} onMouseenter={() => layerEnter(item.id)}>
                        <a href="#" class={`fs16 c-fff mr4`}>{item.name}</a>
                        {item.children && item.children.slice(0, 2).map(key => {
                          return <a href="#" class={`fs14 c-fff mr4`}>{key.name}</a>
                        })}
                      </li>
                    })}
                  </ul>
                </div>

                {isShowLayer && <div class={styles.homeLayer}>
                  <h1 class={`fs20 f400 pt24 pb24`}>分类推荐
                    <span class={`fs16 c-666 ml5`}>根据您的购买或浏览记录推荐</span>
                  </h1>
                  <div class={`flexBox flexWrap2`}>
                    {categoryList && categoryList.map(item => {
                      return <ul class={`flexBox flexWrap2`}>
                        {item.goods && item.id === curLayerId && item.goods.map(key => {
                          return <li class={`${styles.homeLayerLi} flexBox aiCenter pl10 hand`}>
                            <img src={key.picture} alt="" width={95} height={95} class={`mr10`} />
                            <div class={styles.homeLayerLiDiv}>
                              <p class={`fs16 c-666 twoLine`}>{key.name}</p>
                              <p class={`oneLine c-999`}>{key.desc}</p>
                              <p class={`fs22 price`}><i class={`fs16 price`}>￥</i>{key.price}</p>
                            </div>
                          </li>
                        })}
                      </ul>
                    })}
                  </div>
                </div>
                }
              </div>

              {/* 新鲜好物 */}
              <div class={styles.newGoods}>
                <div class={`pt35 pb35 flexWrap`}>
                  <h1 class={`fs32 ml6 f400`}>新鲜好物
                    <span class={`fs16 c-999 ml20`}>新鲜出炉 品质靠谱</span>
                  </h1>
                  <p class={`fs16 pr4 c-999 defaultA hand`}>查看全部 <RightOutlined /> </p>
                </div>

                <ul class={`${styles.newGoodsUl} mb20 flexWrap`}>
                  {newGoodsList && newGoodsList.map(item => {
                    return <li class={`${styles.newGoodsLi} hand box-hover`}>
                      <img src={item.picture} alt="" width={306} height={306} />
                      <p class={`oneLine fs22 pt12 pr30 pb0 pl30`}>{item.name}</p>
                      <p class={`fs22 price textCenter`}><i class={`fs16 price`}>￥</i>{item.price}</p>
                    </li>
                  })}
                </ul>
              </div>

              <div class={styles.newGoods}>
                <h1 class={`fs32 ml6 f400 pt35 pb35`}>人气推荐
                  <span class={`fs16 c-999 ml20`}>人气爆款 不容错过</span>
                </h1>

                <ul class={`${styles.newGoodsUl} mb20 flexWrap`}>
                  {hotGoodsList && hotGoodsList.map(item => {
                    return <li class={`${styles.newGoodsLi} hand box-hover textCenter`}>
                      <img src={item.picture} alt="" width={306} height={306} />
                      <p class={`oneLine fs22 pt12 pr30 pb0 pl30`}>{item.title}</p>
                      <p class={`fs18 c-999 pt5`}>{item.alt}</p>
                    </li>
                  })}
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </div>
    )
  }
})