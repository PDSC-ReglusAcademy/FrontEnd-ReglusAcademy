<template>
    <div id="raiz">
        <nav class="listasOpcoes">
            <div class="lista">
                <img :src="logo" class="logo">
                <ul>
                    <li>
                        <router-link to="/">Início</router-link>
                    </li>
                    <li>Organização</li>
                </ul>
            </div>

            <div class="lista">
                <ul>
                    <li>Sobre Nós</li>
                    <li>
                        <router-link to="/login">Fazer Login</router-link>
                    </li>
                    <li>
                        <router-link to="/redirecionarlogin" id="btnCadastro">USE GRATUITAMENTE</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "NavReglus",
    data() {
        return {
            logo: require("@/assets/logoreglus.png"),
        };
    }
}
</script>

<style>
#raiz {
    padding: 0em 1.5em;
}

.logo {
    width: 150px;
}

.listasOpcoes {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    width: 100%; 
}

ul {
    display: flex;
    align-items: center;
    gap: 1.5em;
}

a {
    text-decoration: none;
    color: black;
}

.lista {
    display: flex;
    align-items: center;
}

#btnCadastro {
    color: #fff;
    background-color: #000;
    padding: 0.5em;
    border: none; 
    cursor: pointer; 
}
</style>
