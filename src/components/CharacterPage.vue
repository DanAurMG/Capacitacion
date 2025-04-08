<template>
    <div class="char-container">
        <b-button class="go-back" to="/">Regresar a la lista</b-button>
        <h2>{{ this.character.name }} - Con el ID: {{ this.character.id }}</h2>
        <div class="prof-sect">

            <img :src="character.image" :alt="character.name" class="character-image" />
            <div class="detail-info-sect">
                <div class="info-SC-card">
                    <h4>Species:</h4>
                    <p>{{ this.character.species }}</p>
                </div>
                <div class="info-SC-card">
                    <h4>Origin:</h4>
                    <p>{{ this.character.origin.name }}</p>
                </div>
                <div class="info-SC-card">
                    <h4>Status:</h4>
                    <p>{{ this.character.status }}</p>
                </div>
                <div class="info-SC-card">
                    <h4>Gender:</h4>
                    <p>{{ this.character.gender }}</p>
                </div>
            </div>
        </div>

        <h2>Has appear on this episodes:</h2>
        <div class="caps">
            <div v-for="episode in this.character.episode" :key="episode">
                <b-button class="cap-card" :href="episode">{{ episode }}</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CharacterPage',
    components: {
    },
    data() {
        return {
            character: []
        }
    },
    mounted() {
        this.getCharacter()
    },

    methods: {
        async getCharacter() {
            try {
                console.log("ruta", this.$route.params.id);
                const page = `https://rickandmortyapi.com/api/character/${this.$route.params.id}`
                const response = await axios.get(`${page}`)
                this.character = response.data
                this.paginationInfo = response.data.info
                console.log("test:", this.character);
            } catch (error) {
                console.error(error)
            }
        }
    }
}

</script>

<style>


.go-back{
    background-color: transparent;
    border: solid rgb(235, 172, 79);
    color: black;
    margin-bottom: 20px;
}
.go-back:hover{
    background-color:  rgb(235, 172, 79);
    border: solid rgb(235, 172, 79);
    color: rgb(255, 255, 255);
}

.char-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.prof-sect{
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    width: 90%;
    margin-bottom: 40px;

    justify-content: space-evenly;
}

.character-image {
    width: 350px;
}

.detail-info-sect {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

}

.info-SC-card {
    padding: 20px;
    border: solid 2px white;
    border-radius: 10px;
}

.caps {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 20px;
    gap: 20px;
    margin-bottom: 40px;

}

.cap-card{
    background-color: rgb(235, 172, 79);
}

.cap-card:hover{
    background-color: blanchedalmond;
    color: black;
    cursor: pointer;
}

</style>