<template>
    <ion-page>
        <Navbar :title="'bookmarks'"> </Navbar>
        <a href="/Main">
            <ion-button>
                <ion-icon slot="icon-only" :icon="home"></ion-icon>
            </ion-button>
        </a>
        <ion-content v-if="cities.length > 0">
            <BookmarkedElement
                    @clicked="refresh"
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
    import { home } from 'ionicons/icons';

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
        setup(){
            return {
                home
            }
        },
        async mounted() {
            //API call and insertion in a table
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
                })
        },
         methods:{
            //Doesn't work -> this should refresh the components
             refresh(){
                 this.$forceUpdate
             }
         }
    });
</script>
<style scoped>
</style>