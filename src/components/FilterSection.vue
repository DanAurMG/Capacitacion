<template>
    <div class="filter">
      <input v-model="filter.name" placeholder="Search by name" />
      <select v-model="filter.status">
        <option value="">All Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select name="" id="">
        <option value="">All species</option>
        <option value="Alien">Alien</option>
        <option value="Human">Human</option>
        <option value="Robot">Robot</option>
      </select>
      <button @click="applyFilter">Apply</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FilterSection',
    data() {
      return {
        filter: {
          name: '',
          status: ''
        }
      }
    },
    methods: {
      applyFilter() {
        this.$emit('update-filter', { ...this.filter })
      }
    }
  }
  </script>
  
  <style scoped>
  .filter {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  </style>
  