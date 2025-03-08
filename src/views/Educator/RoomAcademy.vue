<template>
    <div>
        <NavReglusV3 />

        <div class="container">
            <div class="headerContainer">
                <h2>Gerencie suas salas</h2>
                <button @click="toggleRoomRegister">
                    {{ showRoomRegister ? '↑' : '+' }}
                </button>
            </div>

            <RoomRegister v-if="showRoomRegister" @close-room-register="toggleRoomRegister" />

            <RoomList />
        </div>
        <FooterReglus />
    </div>
</template>

<script>
import RoomRegister from "@/components/card/RoomRegister.vue";
import RoomList from "@/components/card/RoomListEducator.vue";
import FooterReglus from "@/components/nav/FooterReglus.vue";
import NavReglusV3 from "@/components/nav/NavReglusV3.vue";

export default {
    name: "RoomAcademy",
    components: {
        NavReglusV3,
        RoomRegister,
        RoomList,
        FooterReglus
    },
    data() {
        return {
            showRoomRegister: false,
            userRole: '',
        };
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        const userType = localStorage.getItem('userType');

        this.userRole = userType || '';

        if (!user) {
            this.$router.push('/');
        }
    },
    methods: {
        toggleRoomRegister() {
            this.showRoomRegister = !this.showRoomRegister;
        },
    }

}
</script>

<style scoped>
.headerContainer {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

button {
    font-size: 1.5em;
    min-width: 5px;
    padding: 0.3em 1em;
    background-color: var(--lilas);
    color: white;
    border-radius: 7px;
    transition: background-color 0.7s;
}

button:hover {
    background-color: var(--lilashover);
}
</style>