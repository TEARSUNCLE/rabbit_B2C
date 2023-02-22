import { Menu } from "ant-design-vue";
import { defineComponent, ref } from "vue"
import styles from '../css/SideNav.module.less'
import HeaderComponent from "@/components/header"
import FooterComponent from "@/components/footer"
import { useRoute, useRouter } from "vue-router"

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()

    const list = () => {
      const accountList = [
        { title: '个人中心', key: 'member' },
        { title: '消息通知', key: 'notice' },
        { title: '个人信息', key: 'info' },
        { title: '安全设置', key: 'setting' },
        { title: '地址管理', key: 'address' },
        { title: '我的积分', key: 'point' },
        { title: '我的足迹', key: 'footPrint' },
        { title: '邀请有礼', key: 'invite' },
        { title: '幸运抽奖', key: 'prizeDraw' }
      ]

      const payManagerList = [
        { title: '我的订单', key: 'order' },
        { title: '优惠券', key: '' },
        { title: '礼品卡', key: '' },
        { title: '评价晒单', key: '' },
        { title: '售后服务', key: '' },
      ]

      const collectionList = [
        { title: '收藏商品', key: '' },
        { title: '收藏专题', key: '' },
        { title: '收藏品牌', key: '' },
      ]

      const helpList = [
        { title: '帮助中心', key: '' },
        { title: '在线客服', key: '' },
      ]

      return {
        accountList,
        payManagerList,
        collectionList,
        helpList
      }
    }

    const { accountList, payManagerList, collectionList, helpList } = list()

    const menuItems = ref([
      { title: '我的账户', key: 'account', children: accountList },
      { title: '交易管理', key: 'payManager', children: payManagerList },
      { title: '我的收藏', key: 'collection', children: collectionList },
      { title: '帮助中心', key: 'help', children: helpList },
    ])

    const onClick = (row: any) => {
      router.push(`/${row.key}`)
    }

    return {
      onClick,
      menuItems,
      route,
    }
  },

  render() {
    const { onClick, menuItems, route } = this
    return (
      <>
        <HeaderComponent />
        <div class={`${styles.sideNavBox} pt20 pb20`}>
          <div class={`container flexBox`}>
            <Menu
              onClick={onClick}
              style={{ width: 256 }}
              selectedKeys={['center']}
              mode="inline"
            >
              {menuItems && menuItems.map(item => {
                return <div>
                  <h4 class={`fs18 f400 pt30 pl52 pb15 menuTitle`}>{item.title}</h4>

                  {item.children && item.children.map(key => {
                    return <Menu.Item
                      title={key.title}
                      key={key.key}
                      class={route.path === '/' + key.key ? 'ant-menu-item-selected' : ''}
                    >
                      {key.title}
                    </Menu.Item>
                  })}
                </div>
              })}
            </Menu>

            {/* 右边内容插槽 */}
            {this.$slots.content?.()}

          </div>
        </div>
        <FooterComponent />
      </>
    )
  }
})