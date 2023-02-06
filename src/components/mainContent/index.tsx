import { defineComponent, onMounted, ref, watch } from "vue"
import { Button, Carousel } from "ant-design-vue"
import { getBannerListApi, getBrandListApi, getcategoryListApi, getHotGoodsApi, getNewGoodsApi } from "@/api/dashboard"
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue"
import { componentLazy } from "@/hooks/componentLazy"
import styles from '@/components/css/main.module.less'

export default defineComponent({

  setup() {
    const bannerList = ref<any[]>([])
    const categoryList = ref<any[]>([])
    // 新鲜好物
    const newGoodsList = ref<any[]>([])
    // 人气推荐
    const hotGoodsList = ref<any[]>([])
    // 品牌推荐
    const brandList = ref<any[]>([])
    const carouselRef = ref()
    const curLayerId = ref()
    const hotGoodsRef = ref()
    const panelRef = ref()

    const curPanel = ref(null)

    const curCarousel = ref(1)

    const isPanelPrev = ref<boolean>(true)
    const isPanelNext = ref<boolean>(false)
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

    // 品牌推荐
    const getBrandList = async (limit = 6) => {
      const { data } = await getBrandListApi({ limit })
      if (data.code == 1) {
        if (limit === 10) {
          // for (let i = 0; i < data.result.length; i += 5) {
          //   brandList.value.push({ id: Math.floor(Math.random() * 100), imgs: data.result.slice(i, i + 5) })
          //   curPanel.value = brandList.value[0].id
          // }
          brandList.value = data.result
          curPanel.value = brandList.value[0].id
        } else {
          categoryList.value.push({
            id: '2367407',
            name: '品牌',
            children: [{
              id: '1991990',
              name: '品牌推荐',
              picture: '',
              children: null,
              goods: null
            }],
            goods: [
              ...data.result
            ]
          })
        }
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

    // 品牌切换
    const changePanel = (type: string) => {
      const el = document.querySelector('.panelBox') as HTMLBodyElement
      if (type === 'next') {
        curCarousel.value += 1
        el.style.transform = `translateX(-${1}00%)`
      } else {
        curCarousel.value -= 1
        el.style.transform = `translateX(-${0}00%)`
      }
    }

    // 组件数据lazy
    componentLazy(hotGoodsRef, getHotGoods)
    componentLazy(panelRef, getBrandList, 10)

    onMounted(() => {
      getBanner()
      getcategory()
      getNewGoods()
    })

    watch(() => categoryList.value, (newVal) => {
      if (newVal.length) getBrandList()
    })
    watch(() => curCarousel.value, (newVal) => {
      if (newVal) {
        newVal === 1 ? isPanelPrev.value = true : isPanelPrev.value = false
        newVal === brandList.value.length / 5 ? isPanelNext.value = true : isPanelNext.value = false
      }
    })

    return {
      bannerList,
      changeBanner,
      carouselRef,
      hotGoodsRef,
      panelRef,
      categoryList,
      layerEnter,
      curLayerId,
      isShowLayer,
      layerLeave,
      newGoodsList,
      hotGoodsList,
      brandList,
      curPanel,
      changePanel,
      isPanelPrev,
      isPanelNext,
      curCarousel,
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
      hotGoodsList,
      brandList,
      // curPanel,
      changePanel,
      isPanelPrev,
      isPanelNext,
      // curCarousel,
    } = this
    return (
      <div class={styles.main}>
        <div class={styles.homeEntry}>
          <div class={`container`}>
            <ul class={styles.banner}>
              {/* 轮播图 */}
              <Carousel autoplay ref={'carouselRef'}>
                {bannerList && bannerList.map(item => {
                  return <li key={item.id}>
                    <img src={item.imgUrl} alt="" />
                  </li>
                })}
              </Carousel>

              <p class={`${styles.arrowLeft} hand flexBox flexcenterX aiCenter`} onClick={() => changeBanner('prev')}>
                <LeftOutlined style={{ fontSize: '16px', color: '#fff' }} />
              </p>
              <p class={`${styles.arrowRight} hand flexBox flexcenterX aiCenter`} onClick={() => changeBanner('next')}>
                <RightOutlined style={{ fontSize: '16px', color: '#fff' }} />
              </p>

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
                          // 品牌推荐
                          return item.name === '品牌' ?
                            <li class={`${styles.homeLayerLi} flexBox pl10 hand`} style={{ height: '178px' }}>
                              <img src={key.picture} alt="" width={120} height={158} class={`mr10 pt17`} />
                              <div class={styles.homeLayerLiDiv}>
                                <p class={`oneLine c-999 pt25`}>{key.place}</p>
                                <p class={`fs16 c-666 twoLine pt8`}>{key.name}</p>
                                <p class={`oneLine c-999 pt8`}>{key.desc}</p>
                              </div>
                            </li>
                            // 正常数据
                            : <li class={`${styles.homeLayerLi} flexBox aiCenter pl10 hand`}>
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
            </ul>
          </div>
        </div>

        {/* 新鲜好物 */}
        <div class={`${styles.newGoods}`}>
          <div class={`container`}>
            <div class={`pt35 pb35 flexWrap`}>
              <h1 class={`fs32 ml6 f400`}>新鲜好物
                <span class={`fs16 c-999 ml20`}>新鲜出炉 品质靠谱</span>
              </h1>
              <p class={`fs16 pr4 c-999 defaultA hand`}>查看全部 <RightOutlined /> </p>
            </div>

            <ul class={`${styles.newGoodsUl} mb20 flexWrap`}>
              {newGoodsList && newGoodsList.map(item => {
                return <li class={`${styles.newGoodsLi} hand box-hover`} >
                  <img src={item.picture} alt="" width={306} height={306} />
                  <p class={`oneLine fs22 pt12 pr30 pb0 pl30`}>{item.name}</p>
                  <p class={`fs22 price textCenter`}><i class={`fs16 price`}>￥</i>{item.price}</p>
                </li>
              })}
            </ul>
          </div>
        </div>

        <div class={`${styles.newGoods}`} ref={`hotGoodsRef`}>
          <div class={`container`}>
            <h1 class={`fs32 ml6 f400 pt35 pb35`}>人气推荐
              <span class={`fs16 c-999 ml20`}>人气爆款 不容错过</span>
            </h1>

            <ul class={`${styles.newGoodsUl} mb20 flexWrap`}>
              {hotGoodsList && hotGoodsList.map(item => {
                return <li class={`${styles.newGoodsLi} hand box-hover textCenter`} style={{ backgroundColor: ' transparent' }}>
                  <img src={item.picture} alt="" width={306} height={306} />
                  <p class={`oneLine fs22 pt12 pr30 pb0 pl30`}>{item.title}</p>
                  <p class={`fs18 c-999 pt5`}>{item.alt}</p>
                </li>
              })}
            </ul>
          </div>
        </div>

        <div class={`${styles.panel} mb20 flexWrap`} ref={`panelRef`}>
          <div class={`container`}>
            <div class={styles.panelBox}>
              <div class={`flexWrap`} >
                <h1 class={`fs32 ml6 f400 pt35 pb35`}>热门品牌
                  <span class={`fs16 c-999 ml20`}>国际经典 品质保证</span>
                </h1>
                <div class={`flexBox`}>
                  <Button
                    icon={<LeftOutlined
                      style={{ width: '12px', height: '13px', color: '#fff' }} />}
                    style={{ width: '20px', height: '20px', backgroundColor: isPanelPrev ? '#ccc' : '#27ba9b' }}
                    class={'flexBox flexcenterX aiCenter mr5'}
                    disabled={isPanelPrev}
                    onClick={() => changePanel('prev')}
                  />
                  <Button
                    icon={<RightOutlined
                      style={{ width: '12px', height: '13px', color: '#fff' }} />}
                    style={{ width: '20px', height: '20px', backgroundColor: isPanelNext ? '#ccc' : '#27ba9b' }}
                    class={'flexBox flexcenterX aiCenter'}
                    disabled={isPanelNext}
                    onClick={() => changePanel('next')}
                  />
                </div>
              </div>

              <ul class={`${styles.panelUl} flexBox mb30 panelBox`}>
                {brandList && brandList.map(key => {
                  return <li key={key.id} class={`${styles.panelLi} hand mr10`}>
                    <img src={key.picture} alt="" width={240} height={305} />
                  </li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
})