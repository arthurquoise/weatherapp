<template>
    <ion-page>
        <Navbar :title="'bookmarks'"> </Navbar>
        <ion-button @click="log">
            <ion-icon slot="icon-only"></ion-icon>
        </ion-button>
        <ion-content v-if="cities.length > 0">
            <BookmarkedElement
                    v-for="(city, index) in cities"
                    :key="index"
                    :city="city.name"
                    :tempMorning="city.currentWeather.list[0].main.temp + '°C'"
                    :tempAfternoon="city.currentWeather.list[3].main.temp + '°C'"
            >
            </BookmarkedElement>
        </ion-content>
    </ion-page>
</template>
<script>
    import { IonPage, IonContent, IonIcon, IonButton } from "@ionic/vue";
    import firebase from "firebase/app";
    import "firebase/firestore";
    import { DATABASE_CONFIGURATION } from "@/config.js";
    import Navbar from "./Navbar";
    import BookmarkedElement from "@/views/BookmarkedElement";
    import { defineComponent } from "vue";
    import weatherService from "@/services/weatherService";

    if (firebase.apps.length === 0) {
        firebase.initializeApp(DATABASE_CONFIGURATION);
    }

    export const db = firebase.firestore();

    export default defineComponent({
        name: "Bookmarks",
        components: {
            IonPage,
            IonContent,
            IonIcon,
            IonButton,
            Navbar,
            BookmarkedElement,
        },
        data() {
            return {
                cities: [],
            };
        },
        async mounted() {
            db.collection("cities")
                .get()
                .then(async (querySnapshot) => {
                    const documents = querySnapshot.docs.map((doc) => doc.data());
                    documents.forEach(async (city) => {
                        this.cities.push({
                            name: city.name,
                            currentWeather: await weatherService.getCityName(city.name),
                        });
                    });
                });
        },

        methods: {
            log(){
                console.log(this.cities)
            }
        }
    });
</script>
<style scoped>
</style>