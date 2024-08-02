<script setup>
import { useModal } from '@/stores';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { useLoggedIn } from '../stores/user';

const isModal = useModal(); 
const user = useLoggedIn();

const route = useRoute();
const router = useRouter();

const goOut = () => {
  user.logOut();
  if (route.name === 'manage') {  
    router.push({ name: 'home' });
  }
};

console.log(user.userLogin);
</script>



<template>
    <!-- Header -->
    <header id="header" class="bg-gray-700">
      <nav class="container mx-auto flex justify-start items-center gap-7 py-5 px-4">
        <!-- App Name -->
        <RouterLink to="/" class="text-white font-bold uppercase text-2xl mr-4" exact-active-class="no-active">
          Music
        </RouterLink>

        <div class="flex flex-grow items-center">
          <!-- Primary Navigation -->
          <ul class="flex text-white flex-row gap-7 mt-1">
              <li>
                <router-link to="/about" active-class="text-yellow-500">About</router-link>
              </li>
            <!-- Navigation Links -->
            <li v-if="!user.userLogin">
              <button @click="isModal.toggleModal" href="#">Login / Register</button>
            </li>
            <template v-else class="flex items-center gap-6">
              <li>
                <router-link to="/manage" active-class="text-yellow-500">Manage</router-link>
              </li>
              <li>
                <a href="#" @click.prevent="goOut">Logout</a>
              </li>
            </template>
          </ul>
        </div>
      </nav>
    </header>
</template>
