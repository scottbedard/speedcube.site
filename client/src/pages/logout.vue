<script>
import { logout } from '@/app/state/current-user';

export default {
  created() {
    logout().then(() => {
      this.$router.replace({ name: 'home' });
    });
  },
};
</script>
