import { defineComponent, reactive, ref } from "vue"
import styles from '@/components/css/footer.module.less'
export default defineComponent({

  setup() {
    const contact = ref([
      {
        title: '客户服务',
        children: [
          { icon: 'icon-xiaoxi-xiaoxi', color: '#666', subTitle: '在线客服', codeName: 'service', size: 30, pt: 'pt8' },
          { icon: 'icon-changjianwenti', color: '#666', subTitle: '问题反馈', codeName: 'question', size: 36, pt: 'pt5' }
        ]
      },
      {
        title: '关注我们',
        children: [
          { icon: 'icon-weixin1', color: '#666', subTitle: '公众号', codeName: 'gzh', size: 40, pt: 'pt3' },
          { icon: 'icon-weibo', color: '#666', subTitle: '微博', codeName: 'wb', size: 40, pt: 'pt3' }
        ]
      },
    ])

    const copyrightList = ref([
      { id: 1, name: '关于我们' },
      { id: 2, name: '帮助中心' },
      { id: 3, name: '售后服务' },
      { id: 4, name: '配送与验收' },
      { id: 5, name: '商务合作' },
      { id: 6, name: '搜索推荐' },
      { id: 7, name: '友情链接' },
    ])

    const curHightLight = reactive({
      service: false,
      question: false,
      gzh: false,
      wb: false
    })

    const mouseEnterDd = (type: string) => {
      curHightLight[type] = true
    }

    const mouseLeaveDd = (type: string) => {
      curHightLight[type] = false
    }

    return {
      mouseEnterDd,
      curHightLight,
      mouseLeaveDd,
      contact,
      copyrightList,
    }
  },

  render() {
    const { mouseEnterDd, curHightLight, mouseLeaveDd, contact, copyrightList } = this
    return (
      <div class={`${styles.footer} mt30`}>
        <div class={`${styles.contact} bg-ff`}>
          <div class={`container pt60 pr0 pb40 pl25 flexBox`}>
            {contact && contact.map(item => {
              return <dl class={styles.commonDl} style={{ paddingLeft: item.title === '客户服务' ? '0px' : '' }}>
                <dt class={`fs18 c-999`}>{item.title}</dt>
                <div class={`flexBox`}>
                  {item.children && item.children.map(key => {
                    return <div class={`flexBox`}>
                      <dd
                        class={`${styles.commonDd}`}
                        onMouseenter={() => mouseEnterDd(key.codeName)}
                        onMouseleave={() => mouseLeaveDd(key.codeName)}
                      >
                        <i class={`${key.pt} block `}>
                          <svg-icon
                            iconName={key.icon}
                            fontSize={key.size}
                            color={!curHightLight[key.codeName] ? key.color : '#27ba9b'}
                          />
                        </i>
                        <p class={key.pt}>{key.subTitle}</p>
                      </dd>
                    </div>
                  })}
                </div>
              </dl>
            })}

            <dl class={styles.commonDl}>
              <dt class={`fs18 c-999`}>下载APP</dt>
              <div class={`flexBox`}>
                <dd class={styles.commonDd}>
                  <img src="images/qrcode.jpg" alt="" width={76} height={76} />
                </dd>
                <dd class={styles.commonDd} style={{ border: '0px', paddingTop: '5px' }}>
                  <span class={`block fs14`}>扫描二维码</span>
                  <span class={`block fs14`}>立马下载APP</span>
                  <a href="javascript:;" class={`${styles.download} fs14`}>下载页面</a>
                </dd>
              </div>
            </dl>

            <dl class={styles.commonDl} style={{ border: '0px' }}>
              <dt class={`fs18 c-999`}>服务热线</dt>
              <dd class={`pt55 fs22 c-666`}>400-0000-000 </dd>
              <dd class={`fs15 c-999`}>周一至周日 8:00-18:00</dd>
            </dl>
          </div>
        </div>

        <div class={styles.extra}>
          <div class={`container`}>
            <div class={`${styles.slogan} flexWrap pt60 pb60 pl100 pr100`}>
              <a href="javascript:;" class={`fs28 c-fff`}>
                <i class={`commonGradient pl5 pr5 pt2 pb2 mr5`}>
                  <svg-icon iconName={'icon-baoguo_o'} color={'#fff'} />
                </i>
                <span>价格亲民</span>
              </a>
              <a href="javascript:;" class={`fs28 c-fff`}>
                <i class={`commonGradient pl5 pr5 pt2 pb2 mr5`}>
                  <svg-icon iconName={'icon-dianzan'} color={'#fff'} />
                </i>
                <span>物流快捷</span>
              </a>
              <a href="javascript:;" class={`fs28 c-fff`}>
                <i class={`commonGradient pl5 pr5 pt2 pb2 mr5`}>
                  <svg-icon iconName={'icon-wuliu-huoche'} color={'#fff'} />
                </i>
                <span>品质新鲜</span>
              </a>
            </div>
            <div class={styles.copyright}>
              <ul class={`mb20 flexBox flexcenterX`}>
                {copyrightList && copyrightList.map((item, index) => {
                  return <li key={item.id}>
                    <a href="javascript:;" style={{ borderRight: index + 1 === copyrightList.length ? '' : '1px solid #999' }}>{item.name}</a>
                  </li>
                })}
              </ul>
              <p class={`mb20`}>CopyRight © 小兔鲜儿</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
})