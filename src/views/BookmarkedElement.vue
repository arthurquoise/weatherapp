<template>
    <ion-card>
        <ion-card-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <img src="../../public/assets/icon/sun.svg" alt="">
                        <p>{{ city }}</p>
                    </ion-col>
                    <ion-col>
                        <p>{{ tempMorning }}</p>
                        <p>{{ tempAfternoon }}</p>
                    </ion-col>
                    <ion-col>
                        <ion-button color="danger" @click="deleteBookmark">
                            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                        </ion-button>
                    </ion-col>
                    <ion-col>
                        <ion-button color="danger" @click="modifyBookmark">
                            <ion-icon slot="icon-only" :icon="create"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-card-content>
    </ion-card>
</template>

<script>
    import {
        IonCard,
        IonCardContent,
        IonButton,
        IonCol,
        IonRow,
        IonGrid,
        alertController
    } from '@ionic/vue'

    import { trash, create } from 'ionicons/icons'

    import firebase from "firebase/app";
    import "firebase/firestore";
    import { DATABASE_CONFIGURATION } from '../config.js';

    if (firebase.apps.length === 0) {
        firebase.initializeApp(DATABASE_CONFIGURATION);
    }

    import { defineComponent } from 'vue';
    import weatherService from "@/services/weatherService";

    export const db = firebase.firestore()

    export default defineComponent ({
        name: "BookmarkedElement",
        components : {
            IonCard,
            IonCardContent,
            IonButton,
            IonCol,
            IonRow,
            IonGrid,
        },
        setup() {
            return { trash, create }
        },
        data() {
            return {
                currentWeather : { cod : null }
            }
        },
        methods:{
            //Delete an element in
            deleteBookmark(){
                const deleteCity = db.collection('cities').where('name','==',this.city);
                deleteCity.get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        doc.ref.delete();
                    });
                });
            },
            async modifyBookmark() {
                const alert = await alertController
                    .create({
                        cssClass: 'my-custom-class',
                        header: 'Modification',
                        message: 'Modify this element',
                        inputs: [
                            {
                                value : this.city,
                                name: 'name',
                                type: 'text'
                            }],
                        buttons: [
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                cssClass: 'secondary',
                                handler: blah => {
                                    console.log('Confirm Cancel:', blah)
                                },
                            },
                            {
                                text: 'Okay',
                                handler: async (alertData) => {
                                    this.currentWeather = await weatherService.getCityName(alertData.name);
                                    if(this.currentWeather.cod === '200'){
                                        const updateCity = db.collection('cities').where('name','==',this.city);
                                        updateCity.get().then(function(querySnapshot) {
                                            querySnapshot.forEach(function(doc) {
                                                doc.ref.set({name : alertData.name});
                                            });
                                        });
                                    }
                                    console.log(alertData.name)
                                },
                            },
                        ],
                    });
                return alert.present();
            },
        },
        props:{
            city : String,
            tempMorning : String,
            tempAfternoon : String

        }
    })
</script>

<style scoped>

</style>