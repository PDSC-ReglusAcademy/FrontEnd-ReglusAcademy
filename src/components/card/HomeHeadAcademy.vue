<template>
    <div id="raiz">
        <div class="leftCard">
            <div class="cardDescription">
                <div class="iconDescription">
                    <img :src="livroIcon" alt="icon">
                </div>
                <div class="textDescription">
                    <h3>ESTUDE GRATUITAMENTE</h3>
                    <p>Estamos criando uma comunidade virtual de estudos verdadeiramente inclusiva, onde todos têm a
                        oportunidade de aprender e crescer. </p>
                </div>
            </div>

            <div class="cardDescription">
                <div class="iconDescription">
                    <img :src="profIcon" alt="icon">
                </div>
                <div class="textDescription">
                    <h3>SEJA ACOMPANHADO</h3>
                    <p>Utilizamos um sistema de salas virtuais que oferece acompanhamento pedagógico personalizado.
                    </p>
                </div>
            </div>

            <div class="cardDescription">
                <div class="iconDescription">
                    <img :src="dataIcon" alt="icon">
                </div>
                <div class="textDescription">
                    <h3>ORGANIZE SEUS ESTUDOS</h3>
                    <p>Se organize através de agendas, calendários e criação de pastas
                        e/ou arquivos dividindo-se em disciplinas ou áreas de estudo.</p>
                </div>
            </div>
        </div>

        <div class="rightCard">
            <p>Planeje seus estudos, estude em grupo com salas virtuais, seja direcionado por um tutor, compartilhe suas
                ideias e conhecimentos com demais usuários, tudo em um único ambiente de aprendizagem. </p>
            <h2>Descubra uma educação inclusiva e gratuita conosco.</h2>
        </div>

    </div>
</template>

<script>
export default {
    name: "HomeHeadAcademy",
    data() {
        return {
            livroIcon: require("@/assets/content/book.png"),
            profIcon: require("@/assets/content/teachers.png"),
            dataIcon: require("@/assets/content/calendar.png"),
        };
    }
}
</script>

<style scoped>
#raiz {
    display: flex;
    padding: 0em 2em;
}

.cardDescription {
    display: flex;
    background-color: #000;
    width: 36em;
    height: 9em;
    border-radius: 10px 2px 2px 10px;
    margin-top: 1em;
}

.textDescription {
    display: flex;
    flex-direction: column;
    color: #fff;
    justify-content: center;
    margin: 0em 2em;
}

.iconDescription {
    background-color: var(--roxoPadrao);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}

.iconDescription img {
    width: 8em;
    margin: 1em;
}

.textDescription h3 {
    font-size: 1.2em;
    font-weight: bold;
}

.textDescription p {
    font-size: 0.9em;
}

.rightCard {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 3em;
    margin-right: 1em;
}

.rightCard h2 {
    font-size: 3.7em;
    font-weight: bold;
}

.rightCard p {
    font-size: 1.3em;
    text-align: justify;
}
</style>