<template>
  <div class="pagination-list">
    <p>Mover esto hasta arriba</p>
    <button :disabled="!info.prev" @click="changePage(info.prev)">
      Prev
    </button>
    <span>Page {{ getCurrentPage()}} of {{ info.pages }}</span>
    <button :disabled="!info.next" @click="changePage(info.next)">
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationList',
  props: {
    info: Object
  },
  methods: {
    changePage(page) {
      console.log("Nueva pagina", page);

      this.$emit('change-page', page)

    }, getCurrentPage() {
      const prevUrl = this.info?.prev;
      if (!prevUrl) return 1;
      const url = new URL(prevUrl);
      return parseInt(url.searchParams.get('page')) + 1;
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>