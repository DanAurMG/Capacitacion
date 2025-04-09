<template>
  <div class="app">
    <div class="filtering">
      <filter-section @update-filter="setFilters" @search-name="filterName" :info="paginationInfo" />
    </div>
    <div class="listing">
      <pagination-list :info="paginationInfo" @change-page="applyFilter" />
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
      userFilters: {}
    }
  },
  mounted() {
    this.applyFilter()
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
        
        this.characters = responseGraph.data.data.characters.results;
        this.paginationInfo = responseGraph.data.data.characters.info;
        
      } catch (error) {
        console.error(error)
      }
    },
    async applyFilter( ) {
    //TODO: use v-model to bind pagination component with MainView instead of using url params
    //TODO: study not only v-model but watchers and computed 
      const currentPage = this.$route.query.page ?  `${this.$route.query.page}` : 1;
      console.log("url obtenida----", this.$route.query.page);
      console.log(currentPage);
      
      try {

        const query = `
          query{
            characters(
            ${currentPage ? `page: ${currentPage},` : 1}
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

        this.characters = responseGraphFilters.data.data.characters.results;
        this.paginationInfo = responseGraphFilters.data.data.characters.info;

      } catch (error) {
        console.log(error);
      }
    },setFilters(filters = ""){
      this.userFilters.name = filters.name ? `"${filters.name}"` : '';
      this.userFilters.specie = filters.species ? `"${filters.species}"` : '';
      this.userFilters.gender = filters.gender ? `"${filters.gender}"` : '';
      this.userFilters.status = filters.status ? `"${filters.status}"` : '';
      this.applyFilter();
    },
    async filterName(characterName) {
      const name = characterName ? `"${characterName}"` : null;
      try {
        const query = `
              query{
                  characters(filter: {
                    ${name ? `name: ${name},` : ''}
                  }) {
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
        const responseGraphName = await axios({
          url: "https://rickandmortyapi.com/graphql",
          method: 'post',
          data: {
            query 
          }
        });
        
        this.characters = responseGraphName.data.data.characters.results;
        this.paginationInfo = responseGraphName.data.data.characters.info;

      } catch (err) {
        console.log(err);

      }
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