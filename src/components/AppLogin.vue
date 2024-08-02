<script setup>
    import {ref} from 'vue' 
    import { useLoggedIn } from '../stores/user';
    const user = useLoggedIn();
    import { useModal } from '@/stores';
    const ismodal = useModal();


    const passwordEye = ref(false);
    const login_in_submission = ref(false);
    const login_show_alert = ref(false)
    const login_alert_variant = ref("bg-blue-500");
    const login_alert_msg = ref('Please wait! Your account is being created')


    const loginSchema = ref({
      email:"required|min:3|max:50|email",
      password:"required|min:3|max:20",
    })

  
    const login = async(value) =>{
      login_show_alert.value = true;
      login_in_submission.value = true;
      login_alert_variant.value = "bg-blue-500";
      login_alert_msg.value = 'Please wait! Your account is being created';
      login_alert_variant.value = "bg-green-500";
      login_alert_msg.value = 'Succcess! Your account has been created';

      try {

        await user.authenticate(value);
        // ismodal.modal = false;

      } catch (error) {
          console.log("Error firebase name:", error);
          login_show_alert.value = true;
          login_in_submission.value = false;
          login_alert_variant.value = "bg-red-500";
          login_alert_msg.value = 'Invalid login details';
      }
      window.location.reload();

    }
</script>

<template>
  <div v-if="login_show_alert" class="font-bold text-center text-white rounded p-4 mb-4" :class="login_alert_variant">
      {{  login_alert_msg }}
    </div>
  <vee-form  class="space-y-4" :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div>
      <label class="inline-block mb-2">Email</label>
      <vee-field name="email" type="email" class="input" placeholder="Enter Email"/>
      <!-- error -->
      <ErrorMessage class="text-red-500 mt-1" name="email" />
    </div>
    <!-- Password -->
      <div>
        <label class="inline-block mb-2">Password</label>
        <div class="relative">
          <vee-field :type="passwordEye ? 'text' : 'password' " name="password" class="input" placeholder="Password"/>
          <button type="button" @click="passwordEye = !passwordEye" class="absolute top-2 right-4">
            <svg v-if="passwordEye" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
          </button>                
        </div>
        <!-- error -->
        <ErrorMessage class="text-red-500 mt-1" name="password" />
      </div>
    <button type="submit" class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
      Submit
    </button>
  </vee-form>
</template>