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
</script>