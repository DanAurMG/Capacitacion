<template>
  <div class="character-list">
    <b-button v-for="character in charactersList" :key="character.id" class="character-card" :to="`/${character.id}`">
      <!-- <b-button class="character-card-link" :to="`/${character.id}`"> -->
        <img :src="character.image" :alt="character.name" class="character-image" />
        <div class="character-name-stat">
          <h3>{{ character.name }} </h3>
          <h3>({{ character.status }} )</h3>
        </div>
      <!-- </b-button> -->
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'CharacterList',
  props: {
    charactersList: Array
  }
}
</script>

<style scoped>

.character-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;

}

.character-card {
  /* width: 260px;
  height: 350px;
  text-align: center;
  border-radius: 20px;
  overflow: hidden; */
  border: transparent;
  width: 260px;
  height: 400px;
  background-color: #D3E7B1;
  color: black;
  border-radius: 20px;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  justify-content: space-evenly;
}

.character-card:hover {
  background-color: #97BD89;
  cursor: pointer;

}

.character-card:hover img {
  opacity: 0.8;
}

.character-image {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  max-width: 230px;
}

.character-name-stat {
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.character-name-stat h3 {
  margin: 5px 0px 0px 0px;
}
</style>