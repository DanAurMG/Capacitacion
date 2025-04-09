<template>
  <div class="pagination-list">
    <span>localPage: {{ localPage }}</span>
    <br><br>
    <span>Page {{ localPage }} of {{ info.pages }}</span>

    <div class="overflow-auto">
      <b-pagination-nav 
        v-model="localPage"
        :link-gen="linkGen" 
        :number-of-pages="info.pages" 
        use-router
        />
    </div>

  </div>
</template>

<script>
export default {
  name: 'PaginationList',
  props: {
    info: Object,
    value: { 
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      localPage: this.value 
    };
  },
  watch: {
    value(newVal) {
      console.log("newVal: ", newVal);
      this.localPage = newVal;
    },
    localPage() {
      // this.$emit('input', newVal); 
      this.$emit('change-page', this.localPage);  
    }
  },
  mounted() {
    console.log("info prop: ", this.info);
  },
  methods: {
    linkGen(pageNum) {
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