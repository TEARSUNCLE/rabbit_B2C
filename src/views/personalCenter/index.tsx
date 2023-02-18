import { defineComponent, onMounted } from "vue"
import SideNav from "@/layout/components/SideNav"
import styles from './css/index.module.less'
import useStore from "@/store"
import { RightOutlined } from "@ant-design/icons-vue"
import { getCollectApi } from "@/api/personalCenter"
import { collectList, footPrintList } from "@/mock"

export default defineComponent({
  setup() {
    const { user } = useStore()

    const getCollect = async () => {
      const params = {
        page: 1,
        pageSize: 5,
        collectType: 1
      }
      const { data } = await getCollectApi(params)
      if (data.code == 1) { }
    }

    onMounted(async () => {
      // await getCollect()
    })

    return {
      user,
    }
  },

  render() {
    const { user } = this
    return (
      <>
        <div class={styles.personalBox}>
          <SideNav v-slots={{
            content: () => (
              <>
                <div class='memberHome'>
                  <div class='homeOverview flexBox'>
                    <div class='userMeta flexBox aiCenter'>
                      <img src={user.userInfo.avatar} alt="" class='ml60' width={85} height={85} />
                      <h4 class='pl26 fs18 f400 c-fff'>{user.userInfo.account}</h4>
                    </div>
                    <div class='item flexBox flexAroundX aiCenter'>
                      <a href="javascript:;" class='textCenter'>
                        <span>
                          <svg-icon iconName={`icon-huiyuan`} color={`#fff`} fontSize={32} />
                        </span>
                        <p class='fs16 c-fff mt5'>会员中心</p>
                      </a>
                      <a href="javascript:;" class='textCenter'>
                        <span>
                          <svg-icon iconName={`icon-shezhi`} color={`#fff`} fontSize={32} />
                        </span>
                        <p class='fs16 c-fff mt5'>安全设置</p>
                      </a>
                      <a href="javascript:;" class='textCenter'>
                        <span>
                          <svg-icon iconName={`icon-ditu_dingwei_o`} color={`#fff`} fontSize={32} />
                        </span>
                        <p class='fs16 c-fff mt5'>地址管理</p>
                      </a>
                    </div>
                  </div>

                  <div class='homePanel bg-ff mt20 pl20 pr20'>
                    <header class='flexWrap'>
                      <h4 class='fs22 f400'>我的收藏</h4>
                      <a href="javascript:;" class={`fs16 pr4 c-999 defaultA hand block`}>
                        <span>查看全部</span>
                        <RightOutlined />
                      </a>
                    </header>
                    <div class='goodList mt20 flexWrap'>
                      {collectList && collectList.map(item => {
                        return <a href="javascript:;" class='goodsItem block textCenter'>
                          <img src={item.src} alt="" width={160} height={160} />
                          <p class='fs16 pt10 oneLine'>{item.title}</p>
                          <p class='c-999 pt5'>{item.desc}</p>
                          <p class='fs20 price pt5'>{'￥' + item.price}</p>
                        </a>
                      })}
                    </div>
                  </div>

                  <div class='homePanel bg-ff mt20 pl20 pr20'>
                    <header class='flexWrap'>
                      <h4 class='fs22 f400'>我的足迹</h4>
                      <a href="javascript:;" class={`fs16 pr4 c-999 defaultA hand block`}>
                        <span>查看全部</span>
                        <RightOutlined />
                      </a>
                    </header>
                    <div class='goodList mt20 flexWrap'>
                      {footPrintList && footPrintList.map(item => {
                        return <a href="javascript:;" class='goodsItem block textCenter'>
                          <img src={item.src} alt="" width={160} height={160} />
                          <p class='fs16 pt10 oneLine'>{item.title}</p>
                          <p class='c-999 pt5'>{item.desc}</p>
                          <p class='fs20 price pt5'>{'￥' + item.price}</p>
                        </a>
                      })}
                    </div>
                  </div>

                  <div class='goodsRelevant bg-ff mt20 pl20 pr20'>
                    <header class={`flexBox aiCenter`}>
                      <svg-icon iconName={`icon-xihuan`} fontSize={23} className={`mr5`} />
                      <h4 class='fs20 f400'>猜你喜欢</h4>
                    </header>
                  </div>
                </div>
              </>
            )
          }}>
          </SideNav>
        </div>
      </>
    )
  }
})