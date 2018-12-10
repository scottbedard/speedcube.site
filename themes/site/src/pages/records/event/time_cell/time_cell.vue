<template functional>
    <div>
        <div class="font-bold mb-2">
            {{ (Math.floor(props.value / 10) / 100).toFixed(2) }}
        </div>
    </div>
</template>
