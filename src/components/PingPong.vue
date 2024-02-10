<template>
    <div class="flex flex-row justify-around gap-1 m-2 w-80 h-80 bg-green-400 flex-wrap p-1">
    <div v-for="(item, i) in data[1]" :key="i" draggable="true" @dragstart="startDrag($event, item, 2)"
      @dragover="dragOver" @drop="dropElement" class="w-10 h-10 bg-yellow-500 select-none  cursor-pointer">{{ item.index +
        1 }}</div>
  </div>
  <div draggable @dragstart="startDrag($event, item, 1)" dropzone @drop="dropElement" @dragover="dragOver"
    class="flex flex-row justify-around gap-1 m-2 w-80 h-80  flex-wrap p-1 bg-blue-500">
    <div class="w-10 h-10 bg-blue-900 cursor-pointer" v-for="(item, i) in data[2].filter(el => el.zone == 2)" :key="i">{{
      item.index + 1 }}</div>
  </div>
</template>
<script setup>

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioElement = new Audio("./assets/audio/drag.mp3")
import { ref } from 'vue'
const dragSound = '@/assets/audio/drag.mp3'
// import dropSound from '@/assets/audio/drop.mp3'
// for legacy browsers
const audioContext = new AudioContext(); 

const da = Array(10).fill({}).map((el, i) => ({ zone: 1, index: i }))
const data = ref({ 1: [], 2: [] })
data.value[1] = da
const dragged = ref({})
 


// audioElement.addEventListener("loadeddata", () => {
//   let duration = audioElement.duration;
//   console.log("duration: "+duration)
// });

async function playSoundWhenDrag() {
    
  try {
    await audioElement.play()
 


  } catch (error) {
    console.log("error" + error)
  }

  // await sound.play()

}

async function startDrag(e, { index }, zone) {
  // e.preventDefault()
  dragged.value = { index, zone }
  console.log(dragged.value)
  await playSoundWhenDrag()
  

}

function dragOver(e) {
  e.preventDefault();

}

function dropElement(e) {
  // e.preventDefault()  
 
  const { index, zone } = dragged.value
  data.value[zone == 1 ? 2 : 1].splice(index, 1)
  data.value[zone][index] = dragged.value

}
async function showNot() {
  // not.
  if (!("Notification" in window)) {
    console.error("tu navegador no soporta las notificaciones, usa uno diferente")
    return
  }

  const isPermited = await Notification.requestPermission()

  if (isPermited !== "granted") {
    alert("debes aceptar las notificaciones para poder usar la app")
    return
  }


  setTimeout(() => {
    const not = new Notification("holaaa")

    not.show()
  }, 2000)


}

</script>


<style lang="scss" scoped>
.drag-bg-opacity-80 {
  @apply bg-opacity-80;

}
</style>
