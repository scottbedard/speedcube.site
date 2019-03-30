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
                Privacy Policy
            </h2>
            <div class="max-w-lg mb-16">
                <p>Your stats page is publicly viewable, and your replays may appear on record pages.</p>
                <p>We collect email addresses only for account purposes. Users may reset their passwords by having a one-time link emailed to them.</p>
            </div>
        </v-margin>
    </v-page>
</template>
