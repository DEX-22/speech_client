<template>
  <section id="section" class="pattern"  
  style="width: 100dvw;height: 100dvh; display:flex; flex-direction: column; justify-content: center; align-items: center;" >
   <h2 style="font-size: 1.2rem; margin-top: 2rem; margin-bottom: 2rem; background-color: #F2F2F2;padding: 2rem;">
     Haz click en start y luego una pregunta de si o no  
   </h2>
  <button @click="recognitionStart" :class="{'pulse-button':isloading} " style="font-size: larger; justify-self: start; width: 10rem; height: 10rem;color:#F2F2F2; background-color: red;" class=" btn btn-primary rounded-full">
      {{ buttonContent }}
    </button>
    <br>
    <hr>
    <br>
    <pre v-html="output" style="overflow-y: scroll; background-color: wheat;color:blue; width: 75dvw; scrollbar-color: transparent; font-size: .75rem; height: 20rem;"></pre>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { grammarNumbers } from '../data/grammar'  //"#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
const speechSynthesis = window.speechSynthesis || window.webkitSpeechSynthesis

const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;

const clientVoice = new SpeechSynthesisUtterance()

let voices = []
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
const output = ref("")
const colorSelected = ref("red")
const isloading= ref(false)
const buttonContent = ref("Start")

voices = speechSynthesis.getVoices();

speechRecognitionList.addFromString(grammarNumbers, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "es-MX";
recognition.interimResults = false;
recognition.maxAlternatives = 1;


// if (voices.length > 0) output.value += voices.map((el)=>`${el.name} <br>`)


function recognitionStart() {
  
  output.value += "Cual es tu pregunta? <br>"
  recognition.start();
  isloading.value = true
  buttonContent.value = "Recording..."
  console.log("Ready to receive a color command.");

};


function speak(text) {
  const respuesta = text.length > 0 ? text.length % 2 == 0 ? "si" : "no" : "lo siento, no entendi"
  clientVoice.text =  respuesta
  clientVoice.lang = "es-MX"
  clientVoice.volume = 1
  clientVoice.rate = 1
  clientVoice.pitch = 1
  clientVoice.voice = voices[0]
  speechSynthesis.speak(clientVoice)
  output.value += `<span  style="color:${text.length % 2 == 0?'green':'orange'}" >Respuesta: ${respuesta}  </span> <br>`
}



const getData = (event) => new Promise((res,rej)=>{
   try{
     const color = event.results[0][0].transcript;
    // console.log(event.results[0][0].transcript[color]) //event.results[0][0].transcript;
    output.value += `Pregunta: ${color}?` + "<br>";
    colorSelected.value = color 
    buttonContent.value = "Start"
    res()
   }catch(e){
    rej()
   }
})


recognition.onresult =async (e)=> {

  await getData(e)
  isloading.value = false
  speak(colorSelected.value)
}

// recognition.onsoundend = () =>


// voices = speechSynthesis.getVoices().sort(function (a, b) {
//     const aname = a.name.toUpperCase();
//     const bname = b.name.toUpperCase();

//     if (aname < bname) {
//       return -1;
//     } else if (aname == bname) {
//       return 0;
//     } else {
//       return +1;
//     }
//   });





</script>

<style scoped>
.pattern{
  background-color: #e5e5f7;
opacity: 0.8;
background: radial-gradient(circle, transparent 20%, #e5e5f7 20%, #e5e5f7 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #e5e5f7 20%, #e5e5f7 80%, transparent 80%, transparent) 25px 25px, linear-gradient(#444cf7 2px, transparent 2px) 0 -1px, linear-gradient(90deg, #444cf7 2px, #e5e5f7 2px) -1px 0;
background-size: 50px 50px, 50px 50px, 25px 25px, 25px 25px;
}

.pulse-button {
  animation: pulse .5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

</style>