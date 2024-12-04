<template>
    <div id="raiz">
        <div class="lista">
            <ul>
                <img :src="logo" class="logo">
                <li>
                    <router-link to="/" style="color: var(--roxoPadrao)">Início</router-link>
                </li>
                <li v-if="isLoggedIn">Recursos</li>
                <li>Sobre Nós</li>
            </ul>
        </div>

        <div v-if="isLoggedIn" class="lista">
            <button @click="logout" class="logout-button">Logout</button>
        </div>

        <div v-else class="lista">
            <ul>
                <li>
                    <router-link to="/login">Fazer Login</router-link>
                </li>
                <li>
                    <router-link to="/redirecionarlogin" id="btnCadastro">USE GRATUITAMENTE</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "NavOut",
    data() {
        return {
            logo: `${process.env.BASE_URL}logoreglus.png`,
            isLoggedIn: false,
        };
    },
    mounted() {
        const user = localStorage.getItem('user');
        if (user) {
            this.isLoggedIn = true;
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('user');
            localStorage.removeItem('userType');
            this.isLoggedIn = false;
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
#raiz {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0em 2em;
}

.logo {
    width: 100px;
    margin-top: 1em;
}

.lista {
    display: flex;
    align-items: center;
}

.lista ul {
    display: flex;
    align-items: center;
    gap: 2em;
}

a {
    text-decoration: none;
    color: black;
    transition: 1s;
    font-weight: bold;
}

a:hover {
    color: var(--roxoPadrao);
}

#btnCadastro {
    color: #fff;
    background-color: #000;
    padding: 0.5em;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    transition: 2s;
}

#btnCadastro:hover {
    background-color: var(--roxoPadrao);
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