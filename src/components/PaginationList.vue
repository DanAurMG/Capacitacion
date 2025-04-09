<template>
  <div class="pagination-list">
    
    <span>Page {{ getCurrentPage() }} of {{ info.pages }}</span>

    <div class="overflow-auto">
      <b-pagination-nav @page-click="changePageBoot()" :link-gen="linkGen" :number-of-pages="info.pages" use-router></b-pagination-nav>
    </div>

  </div>
</template>

<script>


export default {
  name: 'PaginationList',
  props: {
    info: Object
  },
  mounted() {
    console.log("info prop: ", this.info);

  },
  methods: {
    changePageBoot(){
      console.log();
      setTimeout(() => {
        this.$emit('change-page')
      },10)
    }
    , getCurrentPage() {
      const currentPage = this.$route.query.page ?  `${this.$route.query.page}` : 1;
      return currentPage

    }, linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`

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

.button-list {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.number-button-page:hover {
  background-color: #197854;
  color: white;
}

.number-button-page {
  border-radius: 500px;
  padding: 10px;
  cursor: pointer;
  background-color: transparent;
  color: #197854;
  border: #197854 solid .2px;
}

.text-pagination {
  margin-bottom: 0px;
}
</style>