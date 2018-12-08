<template functional>
    <div>
        <!-- name -->
        <div class="font-bold mb-2">
            {{ props.value ? props.value.name : 'Anonymous' }}
        </div>

        <!-- date -->
        <div class="text-grey-dark text-xs">
            {{ props.row.createdAt | date('MMMM Do, YYYY') }}
        </div>
    </div>
</template>
