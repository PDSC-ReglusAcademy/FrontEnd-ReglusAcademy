<template>
    <div>
        <NavReglus></NavReglus>
        <HomeHeadAcademy></HomeHeadAcademy>
        <FooterReglus></FooterReglus>
    </div>
</template>

<script>
import NavReglus from "@/components/nav/NavReglus.vue"
import HomeHeadAcademy from "@/components/card/HomeHeadAcademy.vue"
import FooterReglus from "@/components/nav/FooterReglus.vue"

export default {
    name: "HomeAcademy",
    components: {
        NavReglus,
        HomeHeadAcademy,
        FooterReglus
    }
}
</script>

<style scoped></style>