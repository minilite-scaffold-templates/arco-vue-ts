<script lang="tsx">
  import { defineComponent, h, compile } from 'vue'

  export default defineComponent({
    props: {
      icon: String,
      size: Number,
      type: String,
    },
    setup(props) {
      return () => <div>{h(compile(`<${props.icon} size="${props.size}" type="${props.type}" />`))}</div>
    },
  })
</script>

<style scoped lang="less"></style>
