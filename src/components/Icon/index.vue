<script lang="tsx">
  import { defineComponent, h, compile } from 'vue'

  export default defineComponent({
    props: {
      icon: String,
      size: Number,
      type: String,
    },
    setup(props) {
      return () => <span>{h(compile(`<${props.icon} size="${props.size}" type="${props.type}" />`))}</span>
    },
  })
</script>

<style scoped lang="less"></style>
