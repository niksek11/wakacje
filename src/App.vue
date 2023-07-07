<template>
    <div v-if="loaded">
        <div class="flex flex-col items-center justify-center h-screen w-screen bg-cover bg-center" :style="'background-image: url(' + background + ');'">
            <div v-if="showTime">
                <div class="flex flex-col items-center">
                    <p class="lg:text-7xl sm:text-3xl md:text-6xl lg:mt-[-13vh] sm:mt-[-7vh]">Odliczanie do dnia wylotu</p>
                </div>

                <div class="flex flex-row items-center justify-center">
                    <div class="flex flex-row items-center">
                        <div class="flex items-center flex-col">
                            <p class="lg:text-7xl md:text-7xl font-bold font-poppins">{{ time.days }}</p>
                            <p class="lg:text-2xl md:text-2xl font-poppins">Dni</p>
                        </div>
                        <div class="flex items-center flex-col ml-10">
                            <p class="lg:text-7xl md:text-7xl font-bold font-poppins">{{ time.hours }}</p>
                            <p class="lg:text-2xl md:text-2xl font-poppins">Godzin</p>
                        </div>
                        <div class="flex items-center flex-col ml-10">
                            <p class="lg:text-7xl md:text-7xl font-bold font-poppins">{{ time.minutes }}</p>
                            <p class="lg:text-2xl md:text-2xl font-poppins">Minut</p>
                        </div>
                        <div class="flex items-center flex-col ml-10">
                            <p class="lg:text-7xl md:text-7xl font-bold font-poppins">{{ time.seconds }}</p>
                            <p class="lg:text-2xl md:text-2xl font-poppins">Sekund</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="lg:text-7xl sm:text-3xl md:text-6xl lg:mt-[-13vh] sm:mt-[-7vh] text-white">Już lecimy!</p>
                <div v-if="isPlaying">
                    <div class="flex flex-col items-center">
                        <button @click="toggleRadio()" class="bg-rose-700 hover:bg-rose-950 text-white font-bold py-2 px-4 rounded-lg text-lg">
                            Wyłącz radio
                        </button>
                    </div>
                </div>
                <div v-else>
                    <div class="flex flex-col items-center">
                        <button @click="toggleRadio()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-lg">
                            Odpal radio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    import { Howl } from 'howler';

    export default {
        data() {
            return {
                backgroundList: [
                    "https://i.imgur.com/6SSLTMX.gif",
                    "https://i.imgur.com/Hw6sm6p.gif"
                ],
                time: {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                  },
                showTime: true,
                first: true,
                radio: null,
                isPlaying: false,
                intervalId: null,
                background: null, 
                loaded: false
            };
        },
        created() {
            this.intervalId = setInterval(this.updateMessage, 1000);
        },
        unmounted() {
            clearInterval(this.intervalId);
        },
        methods: {
            updateMessage() {
                const waitTime = new Date("June 19, 2023 00:00:00");
                const currentTime = new Date();
                const diffTime = waitTime - currentTime;

                if(!this.background) {
                    this.background = this.backgroundList[Math.floor(Math.random() * this.backgroundList.length)]
                }

                if(diffTime >= 0) {
                    let d = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    const h = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
                    const m = Math.floor((diffTime / (1000 * 60)) % 60);
                    const s = Math.floor((diffTime / 1000) % 60);
    
                    this.time.days = d
                    this.time.hours = h
                    this.time.minutes = m
                    this.time.seconds = s
                } else {
                    if(this.first) {
                        this.showTime = false
                        this.first = false
                    }
                }
                this.loaded = true
            },
            toggleRadio() {
                if (this.isPlaying) {
                    this.radio.stop();
                    this.isPlaying = false;
                } else {
                    this.radio = new Howl({
                    src: "https://zt02.cdn.eurozet.pl/zet-old.mp3",
                    html5: true,
                    autoplay: true,
                    volume: 1,
                    onplayerror: () => {
                        console.log('Failed to play audio.');
                    },
                    });
                    this.isPlaying = true;
                }
            }
        },
    };
</script>