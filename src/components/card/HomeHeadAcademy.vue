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
                    <h3>SEJA ACOMPANHADO POR UM TUTOR</h3>
                    <p>Buscamos proporcionar visibilidade ao papel fundamental do pedagogo no processo educativo.
                        Utilizamos um sistema de salas virtuais que oferece acompanhamento pedagógico personalizado.
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
            <p>Planeje seus estudos, Estude em grupo com salas virtuais, Seja direcionado por um tutor, Compartilhe suas
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
}

.cardDescription {
    display: flex;
    background-color: #000;
    width: 40em;
    height: 14em;
    border-radius: 10px;
    margin-top: 2em;
}

.textDescription {
    display: flex;
    flex-direction: column;
    color: #fff;
    justify-content: center;
    margin: 0em 2em;
}

.textDescription h3 {
    font-size: 1.5em;
    font-weight: bold;
}

.textDescription p {
    font-size: 0.9em;
}

.iconDescription {
    min-width: 15em;
    background-color: #be9dff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}

.iconDescription img {
    width: 12em;
}

.rightCard {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 5em;
}

.rightCard h2 {
    font-size: 3.7em;
    font-weight: bold;
}

.rightCard p {
    font-size: 1.5em;
    text-align: justify;
}
</style>