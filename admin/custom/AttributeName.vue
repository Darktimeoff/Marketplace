<template>
   <div class="flex flex-col gap-2">
        {{ props.record.nameId }}
   </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    adminUser: any;
    record: any;
    column: any;
    meta: any;
    resource: any;
}>();
</script>