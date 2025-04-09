<template>
  <div class="app">
    <div class="filtering">
      <filter-section @update-filter="applyFilter" @search-name="filterName" :info="paginationInfo" />
    </div>
    <div class="listing">
      <pagination-list :info="paginationInfo" @change-page="fetchCharacters" />
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
        
        // const url = !page ? "https://rickandmortyapi.com/api/character/?page=1" : page;
        // const response = await axios.get(`${url}`)
        // console.log("datos con axios", response.data);
        // console.log(response.data.results);
        
        // this.characters = response.data.results
        // this.paginationInfo = response.data.info
      } catch (error) {
        console.error(error)
      }
    },
    async applyFilter(filters) {

      const params = {
        status: filters.status,
        species: filters.species,
        gender: filters.gender,
        name: filters.name,
      }

      try {


        axios({
          url: "https://rickandmortyapi.com/graphql",
          method: 'post',
          data: {
            query: `
              query PostsForChars {
                  characters(filter: { name: ${filters.name}, status: ${filters.status}, species: ${filters.species}, gender: ${filters.gender}}) {
                    info {
                      count,
                      next,
                      pages,
                      prev,
                    }
                    results {
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
        }).then((result) => {
          console.log("Tus datos filtrados: ", result.data);
        });


        const response = await axios.get("https://rickandmortyapi.com/api/character/", { params });
        this.characters = response.data.results;
        this.paginationInfo = response.data.info;
        console.log(this.characters);

      } catch (error) {
        console.log(error);
      }
    },
    async filterName(characterName) {
      try {

        axios({
          url: "https://rickandmortyapi.com/graphql",
          method: 'post',
          data: {
            query: `
              query PostsForChars {
                  characters(filter: {name: ${characterName}}) {
                    info {
                      count,
                      next,
                      pages,
                      prev,
                    }
                    results {
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
        }).then((result) => {
          console.log("Tus datos por nombre: ", result.data);
        });


        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
        this.characters = response.data.results;
        this.paginationInfo = response.data.info;
        console.log(this.characters);

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