<script setup>
import { RouterView , useRoute } from 'vue-router'
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import Auth from './components/Auth.vue';
import { auth } from './includes/firebase';
import { useLoggedIn } from './stores/user';
const user = useLoggedIn()

onMounted(() => {
  if (auth.currentUser) {
    user.userLogin = true;
  }
  
  // Listening to auth state changes
  auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
      user.userLogin = true;
    } else {
      user.userLogin = false;
    }
  });
})

const route = useRoute();
</script>


<template>
    <Header :class="route.name ==='NotFound' ? 'hidden' : 'block'"/>
    <RouterView />
    <!-- Player -->
    <div  class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full" :class="route.name ==='NotFound' ? 'hidden' : 'block'">
      <!-- Track Info -->
      <div class="text-center">
        <span class="song-title font-bold">Song Title</span> by
        <span class="song-artist">Artist</span>
      </div>
      <div class="flex flex-nowrap gap-4 items-center">
        <!-- Play/Pause Button -->
        <button type="button">
          <i class="fa fa-play text-gray-500 text-xl"></i>
        </button>
        <!-- Current Position -->
        <div class="player-currenttime">00:00</div>
        <!-- Scrub Container  -->
        <div class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
          <!-- Player Ball -->
          <span
            class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
            style="left: 50%"
          >
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span
            class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
            style="width: 50%"
          ></span>
        </div>
        <!-- Duration -->
        <div class="player-duration">03:06</div>
      </div>
    </div>
    <Auth/>



</template>


