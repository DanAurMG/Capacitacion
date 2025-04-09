<template>
    <div class="filter">
      <p>Total de personajes:</p>
      <p>{{ info.count }}</p>
      <p>¡Busca por nombre!</p>
      <input v-model="filter.name" placeholder="Search by name"  v-on:keyup.enter = "applyFilter" v-on:keyup="applyFilter"/>

      <p>¡O aplica alguno de los filtros!</p>
      <select v-model="filter.status">
        <option value="">All Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select v-model="filter.species">
        <option value="">All species</option>
        <option value="Alien">Alien</option>
        <option value="Human">Human</option>
        <option value="Robot">Robot</option>
      </select>
      <select v-model="filter.gender">
        <option value="">All species</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <button @click="applyFilter">Apply</button>
    </div>
  </template>
  
  <script>
      //<input v-model="filter.name" placeholder="Search by name"  v-on:keyup.enter = "searchName" v-on:keyup = "searchName"/>


  export default {
    name: 'FilterSection',
    props:{
      info: Object,
    },
    data() {
      return {
        filter: {
          name: '',
          status: '',
          species: '',
          gender: '',
        }
      }
    },
    methods: {
      applyFilter() {
        console.log(this.filter);
        
        this.$emit('update-filter', { ...this.filter })
      },
      searchName(){
        const character = this.filter.name;
        this.$emit('search-name', character);
      }

    }
  }
  </script>
  
  <style scoped>
  .filter {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  </style>
  