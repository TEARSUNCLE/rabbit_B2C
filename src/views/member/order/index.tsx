import { defineComponent, onMounted, ref } from "vue"
import SideNav from "@/layout/components/SideNav"
import styles from './css/index.module.less'
import { Tabs } from "ant-design-vue"
import { getOrderListApi } from "@/api/member"
import { orderList } from "@/mock/commonData"
import { orderStatus, payType } from "@/types/mock"
import { ClockCircleOutlined } from "@ant-design/icons-vue"

export default defineComponent({

  setup() {
    const orerList = ref()
    const statusList = ref([
      { title: '全部订单', key: 0 },
      { title: '待付款', key: 1 },
      { title: '代发货', key: 2 },
      { title: '待收货', key: 3 },
      { title: '待评价', key: 4 },
      { title: '已完成', key: 5 },
      { title: '已取消', key: 6 },
    ])

    const getOrderList = async () => {
      const params = {
        page: 1,
        pageSize: 5,
        orderState: 0
      }
      const { data } = await getOrderListApi(params)
      if (data.code == 1) {
        orerList.value = data.result
      }
    }

    onMounted(async () => {
      // await getOrderList()
    })

    return {
      statusList
    }
  },

  render() {
    const { statusList } = this
    return (
      <>
        <div class={styles.orderBox}>
          <SideNav v-slots={{
            content: () => (
              <>
                <div class='memberOrder bg-ff pl20 pr20'>
                  <nav>
                    <Tabs defaultActiveKey="1">
                      {statusList && statusList.map(item => {
                        return <Tabs.TabPane
                          tab={item.title}
                          key={item.key}
                        >
                        </Tabs.TabPane>
                      })}
                    </Tabs>
                  </nav>
                  <div class='orderList'>
                    <div class=''>
                      {orderList && orderList.map(item => {
                        return <div class='orderItem mb20'>
                          <div class='head pl20 pr20'>
                            <span class='mr20'>下单时间: {item.createTime}</span>
                            <span>订单编号: {item.id}</span>
                            {item.orderState === 6 ?
                              <a href="javascript:;" class='c-999'>删除</a> :
                              <p><ClockCircleOutlined class={'mr3'} />付款截止: {item.payLatestTime}</p>
                            }
                          </div>
                          <div class='body'>
                            {item.skus && item.skus.map(key => {
                              return <div class='flexBox'>
                                <div class='goodsInfo flexBox'>
                                  <a href="javascript:;" class='img'>
                                    <img src={key.image} alt="" width={70} height={70} />
                                  </a>
                                  <div class='info'>
                                    <p class='twoLine'>{key.name}</p>
                                    <p class='c-999 fs12 mt5'>{key.attrsText}</p>
                                  </div>
                                  <div class='Price textCenter'>{'￥' + key.realPay}</div>
                                  <div class='count textCenter'>{'x' + key.quantity}</div>
                                  <div>

                                  </div>
                                </div>
                                <div class='state textCenter'>
                                  <p>{orderStatus[item.orderState] || '-'}</p>
                                  {item.orderState === 4 && <p class='pt10 rating'>评价商品</p>}
                                </div>
                                <div class='amount textCenter'>
                                  <p class='price'>{'￥' + item.payMoney}</p>
                                  <p class='pt10'>({'含运费:' + ' ￥' + item.postFee})</p>
                                  <p class='pt10'>{payType[item.payType] || '-'}</p>
                                </div>
                                <div class='action textCenter'>
                                  {item.orderState === 1 && <a href="javascript:;" class='block nowPay fs14 c-fff'>立即付款</a>}
                                  {[1, 2, 4, 6].includes(item.orderState) && <a href="javascript:;" class='block pt10 defaultA'>查看详情</a>}
                                  {item.orderState === 1 && <a href="javascript:;" class='block pt10 defaultA'>取消订单</a>}
                                  {item.orderState === 2 || item.orderState === 4 && <a href="javascript:;" class='block pt10 defaultA'>再次购买</a>}
                                  {item.orderState === 4 && <a href="javascript:;" class='block pt10 defaultA'>申请售后</a>}
                                </div>
                              </div>
                            })}
                          </div>
                        </div>
                      })}
                    </div>
                  </div>
                </div>
              </>
            )
          }}></SideNav>
        </div>
      </>
    )
  }
})