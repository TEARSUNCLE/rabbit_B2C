import { defineComponent, reactive, ref } from "vue"
import HeaderComponent from "@/components/header"
import FooterComponent from "@/components/footer"
import styles from './css/index.module.less'
import { Checkbox, Form, Input, message } from "ant-design-vue"
import { Rule } from "ant-design-vue/lib/form"
import { registerAccountApi, registerCodeApi } from "@/api/common"
export default defineComponent({

  setup() {
    const isChecked = ref<boolean>(true)
    const codeTime = ref<number>(60)
    const ruleForm = ref<any>(null)

    const checkBoxChange = (show: { target: { checked: boolean } }) => {
      show.target.checked ? isChecked.value = true : isChecked.value = false
    }

    const defaultData = reactive({
      account: '',
      mobile: '13106917538',
      code: '',
      password: '',
      confirmPassword: ''
    })

    const validatorObj = () => {
      const accountValidator = () => {
        // const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        const reg = /^[a-zA-Z0-9]{6,16}$/
        if (!defaultData.account) {
          return Promise.reject('请设置用户名称')
        } else if (!reg.test(defaultData.account)) {
          return Promise.reject('请输入6~16位的英文或数字')
        } else {
          return Promise.resolve()
        }
      }

      const mobileValidator = () => {
        const reg = /^1[3456789]\d{9}$/
        if (!defaultData.mobile) {
          return Promise.reject('请输入手机号')
        } else if (!reg.test(defaultData.mobile)) {
          return Promise.reject('请输入正确的手机号')
        } else {
          return Promise.resolve()
        }
      }

      const codeValidator = () => {
        const reg = /^[0-9]\d{5}$/
        if (!defaultData.code) {
          return Promise.reject('请输入验证码')
        } else if (!reg.test(defaultData.code)) {
          return Promise.reject('请输入正确的验证码')
        } else {
          return Promise.resolve()
        }
      }

      const passwordValidator = () => {
        const reg = /^.*(?=.{6,20})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*? ]).*$/;
        if (!defaultData.password) {
          return Promise.reject('请输入密码')
        } else if (!reg.test(defaultData.password)) {
          return Promise.reject('请设置6至20位字母、数字和符号组合的密码')
        } else {
          return Promise.resolve()
        }
      }
      const confirmPasswordValidator = () => {
        if (!defaultData.confirmPassword) {
          return Promise.reject('请再次输入上述密码')
        } else if (defaultData.password !== defaultData.confirmPassword) {
          return Promise.reject('密码和确认密码不一致')
        } else {
          return Promise.resolve()
        }
      }
      return {
        accountValidator,
        mobileValidator,
        codeValidator,
        passwordValidator,
        confirmPasswordValidator,
      }
    }

    const handleSubmit = () => {
      ruleForm.value.validateFields().then(async values => {
        if (values) {
          const params = {
            ...defaultData,
            type: 'pc'
          }
          if (params.confirmPassword) delete params.confirmPassword
          const { data } = await registerAccountApi(params)
          if (data.code == 1) {
            console.log(95, data)
          }
        }
      })
    }

    const sendCode = async () => {
      if (codeTime.value < 60) return false

      const reg = /^1[3456789]\d{9}$/
      if (!defaultData.mobile) {
        return message.error('请输入手机号')
      } else if (!reg.test(defaultData.mobile)) {
        return message.error('请输入正确的手机号')
      } else {
        const timer = setInterval(() => {
          if (codeTime.value <= 0) {
            clearInterval(timer)
            codeTime.value = 60
          } else {
            codeTime.value--
          }
        }, 1000)
        const { data } = await registerCodeApi({ mobile: defaultData.mobile })
        if (data.code == 1) {
          console.log(114, data)
        }
      }
    }

    const { accountValidator, mobileValidator, codeValidator, passwordValidator, confirmPasswordValidator } = validatorObj()

    // 校验规则
    const rules: Record<string, Rule[]> = {
      account: [{ required: true, validator: accountValidator, trigger: 'blur' }],
      mobile: [{ required: true, validator: mobileValidator, trigger: 'blur' }],
      code: [{ required: true, validator: codeValidator, trigger: 'blur' }],
      password: [{ required: true, validator: passwordValidator, trigger: 'blur' }],
      confirmPassword: [{ required: true, validator: confirmPasswordValidator, trigger: 'blur' }]
    }

    return {
      ruleForm,
      rules,
      defaultData,
      checkBoxChange,
      isChecked,
      sendCode,
      codeTime,
      handleSubmit,
    }
  },

  render() {
    const { rules, defaultData, checkBoxChange, isChecked, sendCode, codeTime, handleSubmit } = this
    return (
      <>
        <HeaderComponent />
        <div class={`${styles.registerBox} pt50 pb50`}>
          <div class='container'>
            <div class='register'>
              <h3 class={`fs26 c-999 f400 pl30 pt20`}>新用户注册</h3>
              <div class='mt30 pb77 textCenter formBox'>
                <Form
                  name="basic"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 6 }}
                  style={{ maxWidth: 600 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                  rules={rules}
                  ref="ruleForm"
                  model={defaultData}
                >
                  <Form.Item
                    label="用户名"
                    name="account"
                  >
                    <Input placeholder={'请设置用户名称'} v-model={[defaultData.account, 'value']} />
                  </Form.Item>
                  <Form.Item
                    label="手机号"
                    name="mobile"
                  >
                    <Input placeholder={'请输入手机号'} v-model={[defaultData.mobile, 'value']} />
                  </Form.Item>
                  <Form.Item
                    label="验证码"
                    name="code"
                  >
                    <div class='code'>
                      <Input placeholder={'获取验证码'} v-model={[defaultData.code, 'value']} />
                      <span class='sendCode textCenter c-666 hand' onClick={sendCode}>{codeTime === 60 ? '发送验证码' : codeTime + '秒后重试'}</span>
                    </div>
                  </Form.Item>

                  <Form.Item
                    label="密码"
                    name="password"
                  >
                    <Input.Password placeholder={'设置6至20位字母、数字和符号组合的密码'} v-model={[defaultData.password, 'value']} />
                  </Form.Item>
                  <Form.Item
                    label="确认新密码"
                    name="confirmPassword"
                  >
                    <Input.Password placeholder={'请再次输入上述密码'} v-model={[defaultData.confirmPassword, 'value']} />
                  </Form.Item>
                </Form>

                <div class={`ml10 flexBox flexcenterX`}>
                  <Checkbox checked={isChecked} onChange={(e) => checkBoxChange(e)} />
                  <p class={`ml5`}> 已阅读并同意
                    <a href="javascript:;" class='agreeA'>《用户服务协议》</a>
                  </p>
                </div>
                <div class='goLogin'>
                  已有账号?去
                  <a href="/login" class='agreeA'>登录</a>
                </div>
                <a href="javascript:;" class='submit mt20 hand fs16 block c-fff' onClick={handleSubmit}>下一步</a>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </>
    )
  }
})