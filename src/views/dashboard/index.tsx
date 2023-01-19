import { defineComponent } from "vue"
import HeaderComponent from '@/components/header'
import MainContent from "@/components/mainContent"
export default defineComponent({

  setup() { },

  render() {
    return (
      <>
        <HeaderComponent />
        <MainContent />
      </>
    )
  }
})