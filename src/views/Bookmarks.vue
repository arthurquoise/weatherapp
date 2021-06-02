<template>
    <ion-page>
        <Navbar :title="'Arras'">
        </Navbar>

        <ion-button>
            <ion-icon slot="icon-only" :icon="arrowUndo"></ion-icon>
        </ion-button>

        <ion-content>
            <BookmarkedElement :city="'Dainville'" :tempMorning="'12,5°C'" :tempAfternoon="'21,5°C'">
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


    import { defineComponent } from 'vue';

    import Navbar from './Navbar';

    import BookmarkedElement from "@/views/BookmarkedElement";

    import {arrowUndo} from 'ionicons/icons';

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
        setup() {
            return arrowUndo
        }
    })

</script>

<style scoped>

</style>