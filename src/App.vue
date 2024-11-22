<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

textarea:focus,
input:focus,
select:focus {
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
}

:root {
  --rosaEscuro: #D96277;
  --rosaAlt: #CF5084;
  --rosaClaro: #F29580;
  --roxo: #A432A6;
  --rosaRoxeado: #BF4594;
  --azulClaro: #977EF2;
  --preto: #0D0D0D;
  --cinzaTxt: #3B3B3B;
}

ul,
li,
a {
  list-style: none;
  text-decoration: none;
  font-weight: bold;
  margin: 0; 
  padding: 0; 
}
</style>
