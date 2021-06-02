<template>
    <ion-page>
        <!-- Navbar -->
        <navbar :title="'Dainville'">
        </navbar>

        <ion-content>

            <!-- Temperature -->
            <div>
                <h1>Titre</h1>
            </div>

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
                    <ion-col>
                        ion-col
                    </ion-col>
                    <ion-col>
                        ion-col
                    </ion-col>
                    <ion-col>
                        ion-col
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

    export default defineComponent({
        components: {
            IonIcon,
            IonCol,
            IonGrid,
            IonRow,
            IonContent,
            Navbar
        },
        setup() {
            return {
                starOutline,
                search,
                add,
                thermometer
            }
        }
    });

</script>

<style scoped>
    .color-thermometer{
        color : white;
    }
</style>