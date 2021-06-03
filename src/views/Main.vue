<template>
    <ion-page>
        <!-- Navbar -->
        <navbar v-if="currentWeather!== null" :title="currentWeather.name">
        </navbar>

        <ion-content>
            <!-- Grid info localization -->
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <img src="../../public/assets/icon/rain-drop.svg" alt="" class="color-thermometer">
                    </ion-col>
                    <ion-col>
                        <div>
                            <ion-icon slot="icon-only" class="color-thermometer" :icon="thermometer"></ion-icon>
                        </div>
                    </ion-col>
                    <ion-col>
                        <img src="../../public/assets/icon/wind.svg" alt="" class="color-thermometer">
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col v-if="currentWeather">
                        <p>{{ currentWeather.main.humidity + '%' }}</p>
                    </ion-col>
                    <ion-col v-if="currentWeather">
                        <p>{{ currentWeather.main.temp + '°C' }}</p>
                    </ion-col>
                    <ion-col v-if="currentWeather">
                        <p>{{ currentWeather.wind.speed + 'km/h' }}</p>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- Information list about next days -->
            <ion-list lines="full">
                <ion-item>
                    <ion-label>Full Lines Item 1</ion-label>
                </ion-item>

                <ion-item>
                    <ion-label>Full Lines Item 2</ion-label>
                </ion-item>

                <ion-item>
                    <ion-label>Full Lines Item 2</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>

    </ion-page>
</template>

<script>

    import {
        IonIcon,
        IonCol,
        IonGrid,
        IonRow,
        IonContent
    } from '@ionic/vue';

    import {
        search,
        starOutline,
        add,
        thermometer

    } from 'ionicons/icons'

    import { defineComponent } from 'vue';

    import Navbar from './Navbar';
    import weatherService from "@/services/weatherService";

    export default defineComponent({
        components: {
            IonIcon,
            IonCol,
            IonGrid,
            IonRow,
            IonContent,
            Navbar
        },
        data(){
            return{
                currentWeather : null
            }
        },
        setup() {
            return {
                starOutline,
                search,
                add,
                thermometer
            }
        },
        mounted() {
            //Get the localization
            navigator.geolocation.getCurrentPosition( async position => {
                const { latitude, longitude } = position.coords;
                //API call
                this.currentWeather = await weatherService.getPosition(latitude,longitude)
            });


        }
    });

</script>

<style scoped>
    .color-thermometer{
        color : white;
    }
</style>