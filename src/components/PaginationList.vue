<template>
    <div class="pagination-list">
      <button 
        :disabled="!info.prev" 
        @click="changePage(info.prev)">
        Prev
      </button>
      <span>Page {{ info.page }} of {{ info.pages }}</span>
      <button 
        :disabled="!info.next" 
        @click="changePage(info.next)">
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
        this.$emit('change-page', page)
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
  