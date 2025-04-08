<template>
  <div class="character-list">
    <div v-for="character in characters" :key="character.id" class="character-card" href="#">
      <b-button class="" :to="`/${character.id}`">
        <img :src="character.image" :alt="character.name" class="character-image" />
        <div class="character-name-stat">
          <h3>{{ character.name }} </h3>
          <h3>({{ character.status }} )</h3>
        </div>
      </b-button>
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
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.character-card {
  width: 230px;
  text-align: center;
  border-radius: 20px;
  background-color: #D3E7B1;
}

.character-card:hover {
  background-color: #97BD89;
  cursor: pointer;
  height: auto;

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