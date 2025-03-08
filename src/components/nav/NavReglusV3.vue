<template>
    <div id="raiz">
        <img :src="logo" class="logo">
        <nav class="listasOpcoes">
            <div class="lista">
                <ul>
                    <li>
                        <router-link to="/">Início</router-link>
                    </li>
                    <li>
                        <router-link to="/inicioeducador">Recursos</router-link>
                    </li>
                    <li>
                        <router-link to="/salas">Salas</router-link>
                    </li>
                    <li>
                        <router-link to="/agenda">Tutorias</router-link>
                    </li>
                    <li>
                        <router-link to="/sobrenos">Sobre Nós</router-link>
                    </li>
                </ul>
            </div>

            <div class="lista">
                <button @click="logout" class="logout-button">Logout</button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "NavReglusV3",
    data() {
        return {
            logo: require("@/assets/logoreglus.png"),
        };
    },
    methods: {
        logout() {
            localStorage.removeItem('user');
            localStorage.removeItem('userType');
            this.$router.push('/');
        }
    }
}
</script>

<style>
#raiz {
    display: flex;
    align-items: center;
    padding: 10px;
    width: 100%;
}

.logo {
    width: 100px;
    margin-right: 20px;
}

.listasOpcoes {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    width: 100%; 
    margin: 0em 2em;
}

ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin: 0;
    padding: 0;
    list-style-type: none;
}

a {
    text-decoration: none;
    color: rgb(0, 0, 0);
    font-weight: bold;
}

.lista {
    display: flex;
}

.view-account,
.logout-button {
    border: none;
    padding: 1em 2em;
    border-radius: 5px;
    font-size: 1em;
    font-weight: bold;
    background: none;
    transition: 1s;
}

.view-account:hover,
.logout-button:hover {
    color: var(--roxoPadrao);
    transition: 1s;
}
</style>