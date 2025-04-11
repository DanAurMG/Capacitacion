<template>
  <div class="app">
    <div class="filtering">
      <filter-section @update-filter="setFilters" @del-filters="filterName" :info="paginationInfo" />
    </div>
    <div class="listing">
      <!-- <pagination-list v-model="page" :info="paginationInfo" @change-page="applyFilter" /> -->
      page: {{ page }}



      <PaginationList :value="page" :info="paginationInfo" @change-page="applyFilter" />




      <character-list :charactersList="characters1" />
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
      characters1: [],
      filteredCharacters: [],
      paginationInfo: {},
      userFilters: {},
      page: 1
    }
  },
  mounted() {
    this.applyFilter(1)
  },
  methods: {
    async fetchCharacters() {
      
      
      
      try {
        //https://rickandmortyapi.com/graphql
        //No puedo pasar los parámetros como ${variable}
        const responseGraph = await axios({
          url: "https://rickandmortyapi.com/graphql",
          method: 'post',
          data: {
            query: `
              query {
                characters() {
                  info {
                    count,
                    next,
                    pages,
                    prev,
                  }
                  results {
                    id,
                    name,
                    species,
                    status,
                    gender,
                    image,
                    location{
                      name,
                    }
                  }
                }
              }
            `
          }
        });
        console.log("con Graph");
        
        console.log(responseGraph.data.data.characters.results);
        console.log(responseGraph.data.data.characters.info);
        
        this.characters1 = responseGraph.data.data.characters.results;
        this.paginationInfo = responseGraph.data.data.characters.info;
        
      } catch (error) {
        console.error(error)
      }
    },
    async applyFilter( newPage ) {
    //TODO: use v-model to bind pagination component with MainView instead of using url params
    //TODO: study not only v-model but watchers and computed 
      this.page = newPage;
      try {
        const query = `
          query{
            characters(
            ${this.page ? `page: ${this.page},` : 1}
            filter: {
              ${this.userFilters.name ? `name: ${this.userFilters.name},` : '' }
              ${this.userFilters.specie ?  `species: ${this.userFilters.specie},` : '' }
              ${this.userFilters.gender ?  `gender: ${this.userFilters.gender}, ` : '' }
              ${this.userFilters.status ?  `status: ${this.userFilters.status}, ` : '' }
            }){
              info {
                count,
                next,
                pages,
                prev,
              }results{
                id,
                name,
                species,
                status,
                gender,
                image,
                location{
                  name,
                }
              }
            }
          }
        `
        const responseGraphFilters = await axios({
          url: "https://rickandmortyapi.com/graphql",
          method: 'post',
          data: {
            query
          }
        });

        this.characters1 = responseGraphFilters.data.data.characters.results;
        this.paginationInfo = responseGraphFilters.data.data.characters.info;

        if(this.page > this.paginationInfo.pages){
          this.page = 1;
        }

      } catch (error) {
        console.log(error);
      }
    },
    setFilters(filters = ""){
      console.log('buscando..')
      this.userFilters.name = filters.name ? `"${filters.name}"` : '';
      this.userFilters.specie = filters.species ? `"${filters.species}"` : '';
      this.userFilters.gender = filters.gender ? `"${filters.gender}"` : '';
      this.userFilters.status = filters.status ? `"${filters.status}"` : '';
      this.applyFilter(1);
    },
    filterName() {
      this.userFilters.name = "";
      this.userFilters.specie = "";
      this.userFilters.gender = "";
      this.userFilters.status = "";
      this.applyFilter(1);
    }
  }
}
</script>


<style>
body {
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

.app {
  display: flex;
  flex-direction: row;
  gap: 60px;
  background-color: #FFFCF7;
}

.filtering {
  padding: 20px;
  font-size: larger;
  background-color: #A1B5D8;
}

.listing {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0px 40px 0px;
}
</style>