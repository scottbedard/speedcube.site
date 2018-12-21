<template>
    <div>
        <v-profile-photo  class="mb-12" />
        <v-contact-info />
    </div>
</template>

<script>
import contactInfoComponent from './contact_info/contact_info.vue';
import profilePhotoComponent from './profile_photo/profile_photo.vue';

export default {
    components: {
        'v-contact-info': contactInfoComponent,
        'v-profile-photo': profilePhotoComponent,
    },
};
</script>
