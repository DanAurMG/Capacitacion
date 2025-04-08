<template>
    <div class="app">
      <div class="filtering">
        <filter-section @update-filter="applyFilter" :info="paginationInfo"/>
      </div>
      <div class="listing">
        <pagination-list 
        :info="paginationInfo"
        @change-page="fetchCharacters" />
        <character-list :characters="filteredCharacters" />
      </div>
    </div>
  </template>
  
  <script>
  import CharacterList from '@/components/CharacterList.vue'
  import PaginationList from '@/components/PaginationList.vue'
  import FilterSection from '@/components/FilterSection.vue'
  import axios from 'axios'
  
  export default {
    name: 'MainView',
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
        filters: {}
      }
    },
    mounted() {
      this.fetchCharacters()
    },
    methods: {
      async fetchCharacters(page = "https://rickandmortyapi.com/api/character/?page=1") {
        try {
          const response = await axios.get(`${page}`)
          this.characters = response.data.results
          this.paginationInfo = response.data.info
          console.log("Pagination info", response.data.info);
          console.log(page);
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
  body{
    padding: 0px;
    margin: 0px;
  }
  
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
    padding: 0px;
    margin: 0px;
   
  }
  .app{
    display: flex;
    flex-direction: row;
    gap: 60px;
    background-color: #FFFCF7;
  }
  .filtering{
    padding: 20px;
    font-size: larger;
    background-color: #A1B5D8;
  }
  
  .listing{
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0px 40px 0px;
  }
  </style>