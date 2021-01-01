<template>
  <div>
    <v-card-header>
      Profile Photo
    </v-card-header>
    <v-card padded>
      <div class="max-w-lg mx-auto text-center">
        <!-- display -->
        <div class="mb-6">
          <v-avatar size="xl" :file="currentUserAvatar" />
        </div>

        <!-- upload -->
        <v-upload-button
          accept="image/png,image/jpeg"
          :loading="deleteAvatarIsLoading || uploadAvatarIsLoading"
          @change="onChange">
          Upload Photo
        </v-upload-button>

        <!-- delete -->
        <div
          v-if="currentUserAvatar"
          class="mt-6 text-sm">
          <a
            class="flex items-center justify-center hover:text-red-500"
            href="#"
            @click.prevent="onDelete">
            <v-icon class="mr-2" name="trash-2" />
            Delete profile photo
          </a>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { currentUserAvatar } from '@/app/store/user/getters';
import { defineComponent } from 'vue';
import { fireAlert } from '@/app/store/alert/actions';
import { useDeleteAvatar } from '@/app/store/user/behaviors/delete-avatar';
import { useUploadAvatar } from '@/app/store/user/behaviors/upload-avatar';
import VAvatar from '@/components/avatar.vue';
import VCard from '@/components/card.vue';
import VCardHeader from '@/components/card-header.vue';
import VIcon from '@/components/icon.vue';
import VUploadButton from '@/components/upload-button.vue';

export default defineComponent({
  setup() {
    const {
      deleteAvatar,
      deleteAvatarIsLoading,
    } = useDeleteAvatar();

    const {
      uploadAvatar,
      uploadAvatarIsLoading,
    } = useUploadAvatar();

    const onChange = (file: string | Blob) => {
      uploadAvatar(file).then(() => {
        fireAlert({
          message: 'Profile photo updated',
          type: 'success',
        });
      });
    }

    const onDelete = () => {
      deleteAvatar().then(() => {
        fireAlert({
          message: 'Profile photo deleted',
          type: 'success',
        });
      });
    }

    return {
      currentUserAvatar,
      deleteAvatarIsLoading,
      onChange,
      onDelete,
      uploadAvatarIsLoading,
    };
  },
  components: {
    VAvatar,
    VCard,
    VCardHeader,
    VIcon,
    VUploadButton,
  },
});
</script>
