<template>
    <navbar :title="'Add'">
    </navbar>
    <!-- Default Searchbar -->
    <ion-searchbar @ionChange=onChange></ion-searchbar>
    <ion-button @click="addCity">Ajouter</ion-button>
</template>

<script>
    import {defineComponent} from "vue";
    import {IonSearchbar, IonButton, toastController } from "@ionic/vue";
    import Navbar from "@/views/Navbar.vue";
    import weatherService from "@/services/weatherService";

    import firebase from "firebase/app";
    import "firebase/firestore";
    import { DATABASE_CONFIGURATION } from '../config.js';

    if (firebase.apps.length === 0) {
        firebase.initializeApp(DATABASE_CONFIGURATION);
    }

    export const db = firebase.firestore()

    export default defineComponent ({
        name: "Search",
        data() {
          return {
              city : '',
              currentWeather : { cod : null }
          }
        },
        components:{
            Navbar,
            IonSearchbar,
            IonButton
        },
        methods : {
            onChange(e){
                this.city = e.detail.value;
            },
            async addCity(){
                //Insert city in database
                this.currentWeather = await weatherService.getCityName(this.city);
                if(this.currentWeather.cod === '200'){
                    db.collection('cities')
                        .add({name : this.city})
                        .then(() => {
                        this.PrintToast('your registration has been recorded');
                    }).catch((error) => {
                        console.log(error);
                    });
                } else this.PrintToast('error encountered');

            },
            async PrintToast(msg){
                const toast = await toastController
                    .create({
                        message: msg,
                        duration: 2000
                    })
                return toast.present();
            }
        }
    })

</script>

<style scoped>

</style>