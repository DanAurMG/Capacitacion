<template>
    <div class="app">
      <div class="filtering">
        <filter-section @update-filter="applyFilter" @search-name="filterName" :info="paginationInfo"/>
      </div>
      <div class="listing">
        <pagination-list 
        :info="paginationInfo"
        @change-page="fetchCharacters" />
        <character-list :characters="characters" />
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
      async fetchCharacters(page) {
        try {
          const url = !page ? "https://rickandmortyapi.com/api/character/?page=1" : page;
          const response = await axios.get(`${url}`)
          this.characters = response.data.results
          this.paginationInfo = response.data.info
        } catch (error) {
          console.error(error)
        }
      },
      async applyFilter() {
        console.log(this.filters.name);
        
        let filtered = this.characters
        if (this.filters.name) {
          filtered = filtered.filter(character => character.name.toLowerCase().includes(this.filters.name.toLowerCase()))
        }
        if (this.filters.status) {
          filtered = filtered.filter(character => character.status.toLowerCase() === this.filters.status.toLowerCase())
        }
        this.filteredCharacters = filtered
      },
      async filterName(characterName){
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
        this.characters = response.data.results;
        this.paginationInfo = response.data.info;
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