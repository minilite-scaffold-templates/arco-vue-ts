<script lang="tsx">
  import { defineComponent, h, onBeforeMount } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  export default defineComponent({
    name: 'RedirectPage',
    setup() {
      const route = useRoute()
      const router = useRouter()
      onBeforeMount(() => {
        const { params, query } = route
        const { path } = params
        router.replace({
          path: `/${Array.isArray(path) ? path.join('/') : path}`,
          query,
        })
      })
      return () => h('')
    },
  })
</script>
