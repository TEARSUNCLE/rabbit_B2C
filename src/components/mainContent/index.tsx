import { defineComponent, onMounted, reactive, ref, watch } from "vue"
import { Button, Carousel } from "ant-design-vue"
import { getBannerListApi, getBrandListApi, getcategoryListApi, getGoodsListApi, getHotGoodsApi, getNewGoodsApi, getSpecialListApi } from "@/api/dashboard"
import { EyeOutlined, HeartOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons-vue"
import { componentLazy } from "@/hooks/componentLazy"
import styles from '@/components/css/main.module.less'

interface goodsType {
  id: string,
  name: string,
  picture: string,
  saleInfo: string,
  children: [],
  goods: []
}
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
    // 商品列表区
    const goodsList = reactive({
      family: [] as goodsType[],
      food: [] as goodsType[],
      clothes: [] as goodsType[],
      motherBaby: [] as goodsType[]
    })
    // 最新专题
    const specialList = ref<any[]>([])

    const carouselRef = ref()
    const curLayerId = ref()
    const hotGoodsRef = ref()
    const panelRef = ref()
    const goodsListRef = ref()
    const specialRef = ref()
    // 当前轮播图页数
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

    const getGoodsList = async () => {
      const { data } = await getGoodsListApi()
      if (data.code == 1) {
        goodsList.family.push(data.result[0])
        goodsList.food.push(data.result[1])
        goodsList.clothes.push(data.result[2])
        goodsList.motherBaby.push(data.result[3])
      }
    }

    const getSpecialList = async () => {
      const { data } = await getSpecialListApi()
      if (data.code == 1) {
        specialList.value = data.result
      }
    }


    // 品牌推荐
    const getBrandList = async (limit = 6) => {
      const { data } = await getBrandListApi({ limit })
      if (data.code == 1) {
        if (limit === 10) {
          brandList.value = data.result
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
    componentLazy(goodsListRef, getGoodsList)
    componentLazy(specialRef, getSpecialList)

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
      goodsListRef,
      specialRef,
      panelRef,
      categoryList,
      layerEnter,
      curLayerId,
      isShowLayer,
      layerLeave,
      newGoodsList,
      hotGoodsList,
      brandList,
      changePanel,
      isPanelPrev,
      isPanelNext,
      goodsList,
      specialList,
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
      changePanel,
      isPanelPrev,
      isPanelNext,
      goodsList,
      specialList,
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
              <a href="javascript:;" class={`fs16 pr4 c-999 defaultA hand`}>
                <span>查看全部</span>
                <RightOutlined />
              </a>
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

        <div class={`${styles.panel} mb flexWrap`} ref={`panelRef`}>
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

        {/* 居家 */}
        <div class={styles.product} ref={`goodsListRef`}>
          <div class={`container`}>
            <div class={`${styles.head} pt40 pb40`}>
              <div class={`flexWrap`}>
                <h3 class={`fs32 f400 ml6`}>居家</h3>
                <ul class={`flexWrap`}>
                  {goodsList.family && goodsList.family.map(item => {
                    return <li key={item.id} class={`flexWrap mr80`}>
                      {item.children && item.children.slice(0, 4).map(key => {
                        return <a href="Javascript:;" class={`pt2 pb2 pl12 pr12 fs16`}>{key.name}</a>
                      })}
                    </li>
                  })}
                  <a href="javascript:;" class={`fs16 pr4 c-999 defaultA hand block`}>
                    <span>查看全部</span>
                    <RightOutlined />
                  </a>
                </ul>
              </div>
            </div>
            {/* 居家-商品图 */}
            <ul class={styles.goods}>
              {goodsList.family && goodsList.family.map(item => {
                return <li key={item.id} class={`flexBox`}>
                  <div class={styles.leftBox}>
                    <a href="javascript:;" class={`block mr10`}>
                      <img src={item.picture} alt="" />
                      <strong class={`${styles.label} flexBox c-fff fs18 f400`}>
                        <span>{item.name + '馆'}</span>
                        <span>{item.saleInfo}</span>
                      </strong>
                    </a>
                  </div>
                  <ul class={`${styles.goodsList} flexBox flexWrap2`}>
                    {item.goods && item.goods.map(key => {
                      return <li key={key.id} class={`mr10 mb10`}>
                        <div class={`pt10 pb10 pl30 pr30`}>
                          <a href="javascript:;" class={`${styles.goodsA} block`}>
                            <img src={key.picture} alt="" />
                          </a>
                          <p class={`${styles.name} twoLine mt6 pb10 fs16`}>{key.name}</p>
                          <p class={`${styles.desc} oneLine c-666 mt6 fs16`}>{key.desc}</p>
                          <p class={`price mt6 fs20`}>{'￥' + key.price}</p>

                          <div class={`${styles.extra} flexBox flexcenterX`}>
                            <a href="javascript:;" class={`c-fff block mr12 textCenter`}>
                              <span class={`block fs18 mt5 mb3`}>找相似</span>
                              <span>发现更多宝贝 ></span>
                            </a>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </li>
              })}
            </ul>
          </div>
        </div>

        {/* 美食 */}
        <div class={styles.product}>
          <div class={`container`}>
            <div class={`${styles.head} pt40 pb40`}>
              <div class={`flexWrap`}>
                <h3 class={`fs32 f400 ml6`}>美食</h3>
                <ul class={`flexWrap`}>
                  {goodsList.food && goodsList.food.map(item => {
                    return <li key={item.id} class={`flexWrap mr80`}>
                      {item.children && item.children.slice(0, 4).map(key => {
                        return <a href="Javascript:;" class={`pt2 pb2 pl12 pr12 fs16`}>{key.name}</a>
                      })}
                    </li>
                  })}
                  <a href="javascript:;" class={`fs16 pr4 c-999 defaultA hand block`}>
                    <span>查看全部</span>
                    <RightOutlined />
                  </a>
                </ul>
              </div>
            </div>
            {/* 美食-商品图 */}
            <ul class={styles.goods}>
              {goodsList.food && goodsList.food.map(item => {
                return <li key={item.id} class={`flexBox`}>
                  <div class={styles.leftBox}>
                    <a href="javascript:;" class={`block mr10`}>
                      <img src={item.picture} alt="" />
                      <strong class={`${styles.label} flexBox c-fff fs18 f400`}>
                        <span>{item.name + '馆'}</span>
                        <span>{item.saleInfo}</span>
                      </strong>
                    </a>
                  </div>
                  <ul class={`${styles.goodsList} flexBox flexWrap2`}>
                    {item.goods && item.goods.map(key => {
                      return <li key={key.id} class={`mr10 mb10`}>
                        <div class={`pt10 pb10 pl30 pr30`}>
                          <a href="javascript:;" class={`${styles.goodsA} block`}>
                            <img src={key.picture} alt="" />
                          </a>
                          <p class={`${styles.name} twoLine mt6 pb10 fs16`}>{key.name}</p>
                          <p class={`${styles.desc} oneLine c-666 mt6 fs16`}>{key.desc}</p>
                          <p class={`price mt6 fs20`}>{'￥' + key.price}</p>

                          <div class={`${styles.extra} flexBox flexcenterX`}>
                            <a href="javascript:;" class={`c-fff block mr12 textCenter`}>
                              <span class={`block fs18 mt5 mb3`}>找相似</span>
                              <span>发现更多宝贝 ></span>
                            </a>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </li>
              })}
            </ul>
          </div>
        </div>

        {/* 服饰 */}
        <div class={styles.product}>
          <div class={`container`}>
            <div class={`${styles.head} pt40 pb40`}>
              <div class={`flexWrap`}>
                <h3 class={`fs32 f400 ml6`}>服饰</h3>
                <ul class={`flexWrap`}>
                  {goodsList.clothes && goodsList.clothes.map(item => {
                    return <li key={item.id} class={`flexWrap mr80`}>
                      {item.children && item.children.slice(0, 4).map(key => {
                        return <a href="Javascript:;" class={`pt2 pb2 pl12 pr12 fs16`}>{key.name}</a>
                      })}
                    </li>
                  })}
                  <a href="javascript:;" class={`fs16 pr4 c-999 defaultA hand block`}>
                    <span>查看全部</span>
                    <RightOutlined />
                  </a>
                </ul>
              </div>
            </div>
            {/* 服饰-商品图 */}
            <ul class={styles.goods}>
              {goodsList.clothes && goodsList.clothes.map(item => {
                return <li key={item.id} class={`flexBox`}>
                  <div class={styles.leftBox}>
                    <a href="javascript:;" class={`block mr10`}>
                      <img src={item.picture} alt="" />
                      <strong class={`${styles.label} flexBox c-fff fs18 f400`}>
                        <span>{item.name + '馆'}</span>
                        <span>{item.saleInfo}</span>
                      </strong>
                    </a>
                  </div>
                  <ul class={`${styles.goodsList} flexBox flexWrap2`}>
                    {item.goods && item.goods.map(key => {
                      return <li key={key.id} class={`mr10 mb10`}>
                        <div class={`pt10 pb10 pl30 pr30`}>
                          <a href="javascript:;" class={`${styles.goodsA} block`}>
                            <img src={key.picture} alt="" />
                          </a>
                          <p class={`${styles.name} twoLine mt6 pb10 fs16`}>{key.name}</p>
                          <p class={`${styles.desc} oneLine c-666 mt6 fs16`}>{key.desc}</p>
                          <p class={`price mt6 fs20`}>{'￥' + key.price}</p>

                          <div class={`${styles.extra} flexBox flexcenterX`}>
                            <a href="javascript:;" class={`c-fff block mr12 textCenter`}>
                              <span class={`block fs18 mt5 mb3`}>找相似</span>
                              <span>发现更多宝贝 ></span>
                            </a>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </li>
              })}
            </ul>
          </div>
        </div>

        {/* 母婴 */}
        <div class={styles.product}>
          <div class={`container`}>
            <div class={`${styles.head} pt40 pb40`}>
              <div class={`flexWrap`}>
                <h3 class={`fs32 f400 ml6`}>母婴</h3>
                <ul class={`flexWrap`}>
                  {goodsList.motherBaby && goodsList.motherBaby.map(item => {
                    return <li key={item.id} class={`flexWrap mr80`}>
                      {item.children && item.children.slice(0, 4).map(key => {
                        return <a href="Javascript:;" class={`pt2 pb2 pl12 pr12 fs16`}>{key.name}</a>
                      })}
                    </li>
                  })}
                  <a href="javascript:;" class={`fs16 pr4 c-999 defaultA hand block`}>
                    <span>查看全部</span>
                    <RightOutlined />
                  </a>
                </ul>
              </div>
            </div>
            {/* 母婴-商品图 */}
            <ul class={styles.goods}>
              {goodsList.motherBaby && goodsList.motherBaby.map(item => {
                return <li key={item.id} class={`flexBox`}>
                  <div class={styles.leftBox}>
                    <a href="javascript:;" class={`block mr10`}>
                      <img src={item.picture} alt="" />
                      <strong class={`${styles.label} flexBox c-fff fs18 f400`}>
                        <span>{item.name + '馆'}</span>
                        <span>{item.saleInfo}</span>
                      </strong>
                    </a>
                  </div>
                  <ul class={`${styles.goodsList} flexBox flexWrap2`}>
                    {item.goods && item.goods.map(key => {
                      return <li key={key.id} class={`mr10 mb10`}>
                        <div class={`pt10 pb10 pl30 pr30`}>
                          <a href="javascript:;" class={`${styles.goodsA} block`}>
                            <img src={key.picture} alt="" />
                          </a>
                          <p class={`${styles.name} twoLine mt6 pb10 fs16`}>{key.name}</p>
                          <p class={`${styles.desc} oneLine c-666 mt6 fs16`}>{key.desc}</p>
                          <p class={`price mt6 fs20`}>{'￥' + key.price}</p>

                          <div class={`${styles.extra} flexBox flexcenterX`}>
                            <a href="javascript:;" class={`c-fff block mr12 textCenter`}>
                              <span class={`block fs18 mt5 mb3`}>找相似</span>
                              <span>发现更多宝贝 ></span>
                            </a>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </li>
              })}
            </ul>
          </div>
        </div>

        {/* 最新专题 */}
        <div class={styles.special} ref={`specialRef`}>
          <div class={`container`}>
            <div class={`pt40 pb40 flexWrap`}>
              <h3 class={`fs32 ml6 f400`}>最新专题</h3>
              <a href="javascript:;" class={`fs16 pr4 c-999 defaultA hand block`}>
                <span>查看全部</span>
                <RightOutlined />
              </a>
            </div>
            <div class={`${styles.specialList} pb20 flexBox flexBetweenX`}>
              {specialList && specialList.map(item => {
                return <div key={item.id} class={`${styles.specialItem} box-hover`}>
                  <a href="javascript:;" class={`block`}>
                    <img src={item.cover} alt="" />
                    <div>
                      <p class={`${styles.title} pl16`}>
                        <span class={`c-fff fs22 block oneLine`}>{item.title}</span>
                        <span class={`c-999 fs18 block oneLine`}>{item.summary}</span>
                      </p>
                      <p class={`${styles.price} price bg-ff pt4 pr8 pb4 pl7`}>￥{item.lowestPrice}起</p>
                    </div>
                  </a>
                  <div class={`pl20 pr20 pt22 fs16 flexWrap`}>
                    <p>
                      <span>
                        <HeartOutlined
                          style={{ fontSize: '15px', color: '#999', paddingRight: '5px' }} />
                        {item.collectNum}
                      </span>
                      <span
                        class={`pl70`}>
                        <EyeOutlined
                          style={{ fontSize: '15px', color: '#999', paddingRight: '5px' }} />
                        {item.viewNum}
                      </span>
                    </p>
                    <p class={`flexBox aiCenter`}>
                      <svg-icon
                        iconName={`icon-BAI-pinglun`}
                        color={`#999`}
                        className={`pr3`}
                        fontSize={22} />
                      <span>{item.replyNum}</span>
                    </p>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
})