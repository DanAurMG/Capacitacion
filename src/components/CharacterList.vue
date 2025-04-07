<template>
    <div class="character-list">
      <div v-for="character in characters" :key="character.id" class="character-card">
        <img :src="character.image" :alt="character.name" class="character-image"/>
        <h3>{{ character.name }} - {{ key }}</h3>
        <p>{{ character.status }} - {{ character.species }}</p>
        <p>{{ character.gender }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CharacterList',
    props: {
      characters: Array
    }
  }
  </script>
  
  <style scoped>
  .character-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  .character-card {
    width: 250px;
    text-align: center;
  }

  .character-image{
    border-radius: 300px;
    max-width: 200px;
  }

  </style>
  