<script setup>
  import {ref} from 'vue' 
  import { useModal } from '@/stores';
  import AppLogin from './AppLogin.vue';
  import AppRegister from './AppRegister.vue';
  const isModal= useModal();
  const tab = ref("login");
</script>

<template>
    <!-- Auth Modal -->
    <div v-if="isModal.modal" class="fixed z-10 inset-0 overflow-y-auto" id="modal">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <!-- Add margin if you want to see some of the overlay behind the modal-->
          <div class="py-4 text-left px-6">
            <!--Title-->
            <div class="flex justify-between items-center pb-4">
              <p class="text-2xl font-bold">Your Account</p>
              <!-- Modal Close Button -->
              <button @click="isModal.toggleModal" type="button" class="modal-close cursor-pointer z-50">
                <i class="fas fa-times"></i>
              </button>
            </div>

            <!-- Tabs -->
            <div class="grid grid-cols-2 gap-3 mb-4">
              <button @click="tab = 'login'" type="button" class="rounded py-3 px-4 transition"
              :class="{
                'hover:text-white text-white bg-blue-600' : tab === 'login',
                'hover:bg-blue-500 hover:text-white' : tab === 'register'}">
                Login
                </button>
              <button @click="tab = 'register' " type="button" class="rounded py-3 px-4 transition"
              :class="{
                'hover:text-white text-white bg-blue-600' : tab === 'register',
                'hover:bg-blue-500 hover:text-white' : tab === 'login'}">
                  Register
                </button>
            </div>

            <!-- Login Form  --> 
            <AppLogin v-if="tab === 'login'"/>
            <!-- Registration Form -->
            <AppRegister v-else />
            

        
          </div>
        </div>
      </div>
    </div>
</template>

