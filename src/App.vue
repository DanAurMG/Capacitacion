

<template>
  <div class="app">
    <filter-section @update-filter="applyFilter" />
    <character-list :characters="filteredCharacters" />
    <pagination-list 
      :info="paginationInfo"
      @change-page="fetchCharacters" />
  </div>
</template>

<script>
import CharacterList from '@/components/CharacterList.vue'
import PaginationList from '@/components/PaginationList.vue'
import FilterSection from '@/components/FilterSection.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    CharacterList,
    PaginationList,
    FilterSection
  },
  data() {
    return {
      characters: [],
      filteredCharacters: [],
      paginationInfo: {},
      currentPage: 1,
      filters: {}
    }
  },
  mounted() {
    this.fetchCharacters()
  },
  methods: {
    async fetchCharacters(page = 1) {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
        this.characters = response.data.results
        this.paginationInfo = response.data.info
        this.applyFilter()
      } catch (error) {
        console.error(error)
      }
    },
    applyFilter() {
      console.log(this.filters.name);
      
      let filtered = this.characters
      if (this.filters.name) {
        filtered = filtered.filter(character => character.name.toLowerCase().includes(this.filters.name.toLowerCase()))
      }
      if (this.filters.status) {
        filtered = filtered.filter(character => character.status.toLowerCase() === this.filters.status.toLowerCase())
      }
      this.filteredCharacters = filtered
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>