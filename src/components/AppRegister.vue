<script setup>
  import { ref } from 'vue'
  import { useLoggedIn } from '../stores/user';
  import { useModal } from '@/stores';

  const passwordEye = ref(false);
  const confirmPasswordEye = ref(false);

  const reg_in_submission = ref(false);
  const reg_show_alert = ref(false)
  const reg_alert_variant = ref("bg-blue-500");
  const reg_alert_msg = ref('Please wait! Your account is being created');

  const user = useLoggedIn()
  const ismodal = useModal()
  const schema = ref({
    name: 'required|min:3|max:20|alpha_spaces',
    email: "required|min:3|max:50|email",
    age: "required|min_value:18|max_value:65",
    password: "required|min:3|max:20",
    confirm_password: "password_mismatch:@password",
    country: "required|country_excluded:Israel,Uzb",
    tos: "tos"
  })

  const userData = ref({
    country: 'Germany',
    // name:'Foruq'
  })
   
  const register = async (value) => {
    reg_show_alert.value = true;
    reg_in_submission.value = true;
    reg_alert_variant.value = "bg-blue-500";
    reg_alert_msg.value = 'Please wait! Your account is being created';

    try {
      await user.register(value)
      reg_alert_variant.value = "bg-green-500";
      reg_alert_msg.value = 'Success! Your account has been created';
      // ismodal.modal = false;
    } catch (error) {
      console.log("Firebase error: ", error);
      reg_show_alert.value = true;
      reg_in_submission.value = false;
      reg_alert_variant.value = "bg-red-500";
      reg_alert_msg.value = "An unexpected error occued. Please try again later";
    }

    window.location.reload();
  }
</script>

<template>
    <div v-if="reg_show_alert" class="font-bold text-center text-white rounded p-4 mb-4" :class="reg_alert_variant">
      {{  reg_alert_msg }}
    </div>
    <vee-form class="space-y-4" :validation-schema="schema" :initial-values="userData" @submit="register">
      <!-- Name -->
      <div>
        <label class="inline-block mb-2">Name</label>
        <vee-field
          name="name"
          type="text"
          class="input"
          placeholder="Enter Name"
        />
        <!-- error -->
        <ErrorMessage class="text-red-500 mt-1" name="name" />
      </div>
      <!-- Email -->
      <div>
        <label class="inline-block mb-2">Email</label>
        <vee-field
          name="email"
          type="email"
          class="input"
          placeholder="Enter Email"
        />
        <!-- error -->
        <ErrorMessage class="text-red-500 mt-1" name="email" />
      </div>
      <!-- Age -->
      <div>
        <label class="inline-block mb-2">Age</label>
        <vee-field
          type="number"
          name="age"
          class="input"
        />
        <!-- error -->
        <ErrorMessage class="text-red-500 mt-1" name="age" />
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

        <!-- confirmPasswordEye   -->

        <!-- error -->
        <ErrorMessage class="text-red-500 mt-1" name="password" />
      </div>
      <!-- Confirm Password -->
      <div>
        <label class="inline-block mb-2">Confirm Password</label>
        <div class="relative">
          <vee-field name="confirm_password" :type="confirmPasswordEye ? 'text' :  'password' " class="input"  placeholder="Confirm Password"/>
          <button type="button" @click="confirmPasswordEye = !confirmPasswordEye" class="absolute top-2 right-4">
            <svg v-if="confirmPasswordEye" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
          </button>
        </div>
        <!-- error -->
        <ErrorMessage class="text-red-500 mt-1" name="confirm_password" />
      </div>
      <!-- Country -->
      <div>
        <label class="inline-block mb-2">Country</label>
        <vee-field as="select" name="country" class="input">
          <option value="USA">USA</option>
          <option value="Mexico">Mexico</option>
          <option value="Germany">Germany</option>
          <option value="Israel">Israel</option>
          <option value="Uzb">Uzb</option>
        </vee-field>
        <!-- error -->
        <ErrorMessage class="text-red-500 mt-1" name="country" />
      </div>
      <!-- TOS -->
      <div class="pl-6">
        <vee-field name='tos'
          type="checkbox"
          value='1'
          class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        />
        <label class="inline-block">Accept terms of service</label>
        <!-- error -->
        <ErrorMessage class="text-red-500 block mt-1" name="tos" />
      </div>
      <button :disabled="reg_in_submission" type="submit" class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
        Submit
      </button>
    </vee-form>
</template>