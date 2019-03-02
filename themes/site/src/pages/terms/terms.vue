<style lang="scss" scoped>
    p {
        @apply font-thin leading-normal text-grey-7;

        &:not(:last-child) {
            @apply mb-4;
        }
    }
</style>

<template>
    <v-page padded>
        <v-margin padded>
            <!-- code of conduct -->
            <h2 class="font-thin mb-8 text-4xl">
                Code of Conduct
            </h2>
            <div class="max-w-lg mb-16">
                <p>We are committed to ensuring a harassment-free experience for everyone, regardless of level of experience, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, age, or religion.</p>
                <p>Examples of unacceptable behavior by users include the use of sexual language or imagery, derogatory comments or personal attacks, trolling, public or private harassment, insults, or other unprofessional conduct.</p>
                <p>Website moderators have the right and responsibility to remove or edit user comments that are not aligned to this Code of Conduct. Users that continue to violate these terms may be permenantly banned.</p>
                <p>Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by opening an issue or contacting one or more of the site moderators.</p>
            </div>

            <!-- privacy -->
            <h2 class="font-thin mb-8 text-4xl">
                Privacy
            </h2>
            <div class="max-w-lg mb-16">
                <p>All user's profile picture, username, solve history, and personal records are all considered public information. This means it may published on records and stats pages. Additionally, this information may be broadcast to other users.</p>
                <p>While we collect email addresses from our users, this information will never be shared with anyone. Users who have forgotten their credentials may reset their passwords by having a one-time reset link emailed to them.</p>
            </div>
        </v-margin>
    </v-page>
</template>
