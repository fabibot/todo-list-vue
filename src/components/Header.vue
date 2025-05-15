<template>
    <div class="container-fluid d-flex align-items-center p-2">
        <div class="mainIcone ms-4"></div>
        <h1 class="light-blue-color">TodoTodo</h1>
        <h3 id="date" class="delicious-font mt-5 mx-3 light-blue-color"> {{ date }}</h3>
    </div>
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