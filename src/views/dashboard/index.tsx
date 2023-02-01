import { defineComponent } from "vue"
import HeaderComponent from '@/components/header'
import MainContent from "@/components/mainContent"
import FooterComponent from "@/components/footer"

export default defineComponent({

  setup() { },

  render() {
    return (
      <>
        <HeaderComponent />
        <MainContent />
        <FooterComponent />
      </>
    )
  }
})