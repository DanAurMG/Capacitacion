<template>
  <div class="pagination-list">
    <div class="button-list">
      <b-button variant="outline-success" :disabled="!info.prev" @click="changePage(info.prev)">
        Prev
      </b-button>
      <button class="number-button-page" @click="changePage()">
        {{ 1 }}
      </button>
      <button class="number-button-page" :disabled="!info.next" :hidden="!colocable(1)" @click="changePageF(info.next, 0)">
        {{ getCurrentPage() + 1 }}
      </button>
      <button class="number-button-page" :disabled="!info.next" :hidden="!colocable(2)" @click="changePageF(info.next, 1)">
        {{ getCurrentPage() + 2 }}
      </button>
      <button class="number-button-page" :disabled="!info.next" :hidden="!colocable(3)" @click="changePageF(info.next, 2)">
        {{ getCurrentPage() + 3 }}
      </button>
      <button class="number-button-page" :disabled="!info.next" :hidden="!colocable(4)"
        @click="changePageF(info.next, 3)">
        {{ getCurrentPage() + 4 }}
      </button>
      <p class="text-pagination">_ _ _</p>
      <button class="number-button-page" @click="changePageL(info.pages, 1)">
        {{ info.pages - 1 }}
      </button>
      <button class="number-button-page" @click="changePageL(info.pages, 0)">
        {{ info.pages }}
      </button>

      <b-button variant="outline-success" :disabled="!info.next" @click="changePage(info.next)">
        Next
      </b-button>
    </div>
    <span>Page {{ getCurrentPage() }} of {{ info.pages }}</span>
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
      if(!page){
        page = "https://rickandmortyapi.com/api/character/?page=1";
      }
      console.log("Nueva pagina", page);
      this.$emit('change-page', page)

    }, getCurrentPage() {
      const prevUrl = this.info?.prev;
      if (!prevUrl) return 1;
      const url = new URL(prevUrl);
      return parseInt(url.searchParams.get('page')) + 1;

    }, changePageF(page, number) {
      const forwardUrl = new URL(page);
      const url = `https://rickandmortyapi.com/api/character/?page=${parseInt(forwardUrl.searchParams.get('page')) + number}`;
      this.$emit("change-page", url);

    }, linkGen(pageNum) {
      console.log(pageNum);
      return pageNum === 1 ? '?' : `?page=${pageNum}`

    }, colocable(limit) {
      const current = this.getCurrentPage();
      return ((this.info.pages - (current + limit)) >= 0 ) ? true : false; 

    }, changePageL(limit, minus){
      const url = `https://rickandmortyapi.com/api/character/?page=${limit-minus}`;
      this.$emit("change-page", url);

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