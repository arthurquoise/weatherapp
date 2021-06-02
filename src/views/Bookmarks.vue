<template>
    <ion-page>
        <Navbar :title="'bookmarks'">
        </Navbar>

        <ion-button>
            <ion-icon slot="icon-only" :icon="arrowUndo"></ion-icon>
        </ion-button>

        <ion-content v-if="cities.length>0">
            <BookmarkedElement v-for="(city,index) in cities" :key="index" :city="city.name" :tempMorning="'12,5°C'" :tempAfternoon="'21,5°C'">
            </BookmarkedElement>
        </ion-content>
    </ion-page>
</template>

<script>
    import{
        IonPage,
        IonContent,
        IonIcon,
        IonButton
    } from '@ionic/vue'

    import firebase from 'firebase/app'
    import 'firebase/firestore'
    import { DATABASE_CONFIGURATION } from '@/config.js';

    import Navbar from './Navbar';
    import BookmarkedElement from "@/views/BookmarkedElement";

    import {arrowUndo} from 'ionicons/icons';

    import { defineComponent } from 'vue';

    export const db = firebase.initializeApp(DATABASE_CONFIGURATION).firestore()

    export default defineComponent ({
        name: "Bookmarks",
        components : {
            IonPage,
            IonContent,
            IonIcon,
            IonButton,
            Navbar,
            BookmarkedElement
        },
        data(){
            return {
                cities : []
            }
        },
        setup() {
            return arrowUndo
        },
        firestore: {
            cities : db.collection('cities'),
        },
        mounted(){
            
        }
    })

</script>

<style scoped>

</style>