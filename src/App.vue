<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

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