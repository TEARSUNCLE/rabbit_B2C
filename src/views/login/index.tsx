import { LockOutlined, RightOutlined, SafetyCertificateOutlined, UserOutlined } from "@ant-design/icons-vue"
import { defineComponent, reactive, ref } from "vue"
import { Checkbox, Form, Input, message, Space, Tabs } from "ant-design-vue"
import styles from './css/index.module.less'
import { Button } from "ant-design-vue/lib/radio"
import { Rule } from "ant-design-vue/lib/form"
import { getCodeApi } from "@/api/common"
export default defineComponent({

  setup() {
    const infoLink = ref([
      { id: 1, name: '关于我们' },
      { id: 2, name: '帮助中心' },
      { id: 3, name: '售后服务' },
      { id: 4, name: '配送于验收' },
      { id: 5, name: '商务合作' },
      { id: 6, name: '搜索推荐' },
      { id: 7, name: '友情链接' },
    ])

    // 账号登录
    const accountLoginInfo = reactive({
      account: '',
      password: '',
    })

    // 短信登录
    const messageLoginInfo = reactive({
      mobile: '13106917538',
      msg: ''
    })

    const isChecked = ref(true)
    const accountLogin = ref(true)

    const onFinish = (values: any) => { }
    const onFinishFailed = (errorInfo: any) => { }

    // 校验集合
    const validatorObj = () => {
      const accountValidator = () => {
        const reg = /^[a-zA-Z]([-_a-zA-Z0-9]{6,20})$/
        if (!accountLoginInfo.account) {
          return Promise.reject('请输入用户名')
        } else if (!reg.test(accountLoginInfo.account)) {
          return Promise.reject('字母开头且6-20个字符')
        } else {
          return Promise.resolve()
        }
      }

      const passwordValidator = () => {
        const reg = /^[a-zA-Z0-9_-]{6,20}$/
        if (!accountLoginInfo.password) {
          return Promise.reject('请输入密码')
        } else if (!reg.test(accountLoginInfo.password)) {
          return Promise.reject('6到20位(字母, 数字, 下划线, 减号)')
        } else {
          return Promise.resolve()
        }
      }

      const mobileValidator = () => {
        const reg = /^1[3456789]\d{9}$/
        if (!messageLoginInfo.mobile) {
          return Promise.reject('请输入手机号')
        } else if (!reg.test(messageLoginInfo.mobile)) {
          return Promise.reject('请输入正确的手机号')
        } else {
          return Promise.resolve()
        }
      }

      const msgValidator = () => {
        const reg = /^[0-9]\d{5}$/
        if (!messageLoginInfo.msg) {
          return Promise.reject('请输入验证码')
        } else if (!reg.test(messageLoginInfo.msg)) {
          return Promise.reject('请输入正确的验证码')
        } else {
          return Promise.resolve()
        }
      }

      return {
        accountValidator,
        passwordValidator,
        mobileValidator,
        msgValidator
      }
    }

    const { accountValidator, passwordValidator, mobileValidator, msgValidator } = validatorObj()

    const checkBoxChange = (show: { target: { checked: boolean } }) => {
      show.target.checked ? isChecked.value = true : isChecked.value = false
    }

    const toggleLogin = (type: string) => {
      type === 'message' ? accountLogin.value = false : accountLogin.value = true
    }

    const sendCode = async () => {
      const reg = /^1[3456789]\d{9}$/
      if (!messageLoginInfo.mobile) {
        return message.error('请输入手机号')
      } else if (!reg.test(messageLoginInfo.mobile)) {
        return message.error('请输入正确的手机号')
      } else {
        const { data } = await getCodeApi({ mobile: messageLoginInfo.mobile })
        if (data.code == 1) {
        }
      }
    }

    // 校验规则
    const rules: Record<string, Rule[]> = {
      userName: [{ required: true, validator: accountValidator, trigger: 'blur' }],
      password: [{ validator: passwordValidator, trigger: 'blur' }],
      mobile: [{ validator: mobileValidator, trigger: 'blur' }],
      msg: [{ validator: msgValidator, trigger: 'blur' }],
    }

    return {
      infoLink,
      onFinish,
      onFinishFailed,
      accountLoginInfo,
      messageLoginInfo,
      rules,
      isChecked,
      checkBoxChange,
      toggleLogin,
      accountLogin,
      sendCode,
    }
  },

  render() {
    const {
      infoLink,
      onFinish,
      onFinishFailed,
      accountLoginInfo,
      messageLoginInfo,
      rules,
      checkBoxChange,
      isChecked,
      toggleLogin,
      accountLogin,
      sendCode,
    } = this
    return (
      <div class={styles.loginBox}>
        <header class={`container flexBox flexBetweenX flexEndY`}>
          <h1 class='logo'>
            <a href="/">
              <img src="/images/logo.png" alt="" />
            </a>
          </h1>
          <h3 class={`fs24 f400 mb30 ml20 c-666 subTitle pt20`}>欢迎登录</h3>
          <a
            href="/"
            class='entry mb38 fs16'
          >进入网站首页
            <RightOutlined
              style={{ fontSize: '14px', color: '#27ba9b', paddingLeft: '3px' }} />
            <RightOutlined
              style={{ fontSize: '14px', color: '#27ba9b' }} />
          </a>
        </header>

        <section class='loginSection'>
          <div class='wrapper bg-ff'>
            <nav>
              <Tabs defaultActiveKey="account">
                <Tabs.TabPane tab={'账户登录'} key={'account'}>
                  <div class='toggle pb15 textRight'>
                    {accountLogin ?
                      <a href="javascript:;" onClick={() => toggleLogin('message')} style={{ color: '#27ba9b' }}>
                        <svg-icon iconName={`icon-Email`} color={`#27ba9b`} fontSize={16} className={`mr3 mt1`} />
                        使用短信登录
                      </a> :
                      <a href="javascript:;" onClick={() => toggleLogin('account')} style={{ color: '#27ba9b' }}>
                        <UserOutlined class={`mr3`} />
                        使用账号登录
                      </a>}
                  </div>
                  <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    rules={rules}
                    key={Math.round(Math.random() * 100)}
                  >
                    {accountLogin ?
                      <div>
                        <Form.Item
                          // label="Username"
                          name="userName"
                        >
                          <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined />} v-model={[accountLoginInfo.account, 'value']} />
                        </Form.Item>
                        <Form.Item
                          // label="Password"
                          name="password"
                        >
                          <Input size="large" placeholder="请输入密码" prefix={<LockOutlined />} v-model={[accountLoginInfo.password, 'value']} />
                        </Form.Item>
                      </div> :
                      <div>
                        <Form.Item name="mobile">
                          <Input size="large" placeholder="请输入手机号" prefix={<UserOutlined />} v-model={[messageLoginInfo.mobile, 'value']} />
                        </Form.Item>
                        <Form.Item name="msg">
                          <div class='code'>
                            <Input size="large" placeholder="请输入验证码" prefix={<SafetyCertificateOutlined />} v-model={[messageLoginInfo.msg, 'value']} />
                            <span class='sendCode textCenter c-666 hand' onClick={sendCode}>发送验证码</span>
                          </div>
                        </Form.Item>
                      </div>}
                  </Form>
                  <Checkbox checked={isChecked} onChange={(e) => checkBoxChange(e)}>
                    我已同意
                    <a href="javascript:;" class='agreeA'>《隐私条款》</a>
                    和<a href="javascript:;" class='agreeA'>《服务条款》</a>
                  </Checkbox>
                  {!isChecked && <p class='agreeP fs12 mt5 mb5 ml1'> <svg-icon iconName={`icon-color-warning`} fontSize={14} /> 请勾选登录协议</p>}
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button class={`mt35`}>登录</Button>
                  </Space>
                  <div class='action pt20 flexWrap'>
                    <a href="javascript:;">
                      <img src="images/qqLogin.png" alt="" />
                    </a>
                    <div>
                      <a href="javascript:;" class='c-999 mr10 defaultA'>忘记密码</a>
                      <a href="javascript:;" class='c-999 defaultA'>免费注册</a>
                    </div>
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab={'扫码登录'} key={'qrcode'}>
                  <div class={`textCenter pt30`}>
                    <img src="images/qrcode.png" alt="" width={205} height={205} />
                    <p class={`mt20`}>打开 <a href="javascript:;" class={`fs16`} style={{ color: '#27ba9b' }} >小兔鲜App</a> 扫码登录</p>
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </nav>
          </div>
        </section>

        <footer class='loginFooter pt30 pb50'>
          <div class='container textCenter'>
            <ul class={`pt20 flexBox flexcenterX`}>
              {infoLink && infoLink.map(item => {
                return <li key={item.id}>
                  <a href="javascript:;" class={`pl10 pr10 c-999 block`}>{item.name}</a>
                </li>
              })}
            </ul>
            <p class='c-999 pt20'>CopyRight © 小兔鲜儿</p>
          </div>
        </footer>
      </div>
    )
  }
})