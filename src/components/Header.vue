<template>
    <header class="container-fluid background-main-blue d-flex align-items-center">
        <div class="mainIcone"></div>
        <h1>TodoTodo</h1>
        <h3 id="date" class="delicious-font"> {{ date }}</h3>
    </header>
</template>

<script>
import { ref } from 'vue'

export default {
    name: "Header",
    setup() {
        const date = ref(getDate())

        function getDate() {
            const date = new Date();

            let weekDayName = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
            let weekDay = weekDayName[date.getDay()];
            let day = date.getDate();
            let monthName = [ "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "décembre"];
            let month = monthName[date.getMonth()];
            let year = date.getFullYear();
            let currentDate = `${weekDay} ${day} ${month} ${year}`;
            return currentDate;
        }

        return {
        date
        }
    },
}
</script>