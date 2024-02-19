<template>
  <div class="icon-wrapper">
    <div :style="`background-image: url(${require('@/Assets/' + iconPath + '.png')}`" />
    <span v-if="iconText !== ''">{{ iconText }}</span>
  </div>
</template>
  
<script setup>
  import { toRefs } from 'vue'

  const Props = defineProps({
    iconPath: String,
    iconText: String
  })

  const {
    iconPath,
    iconText
  } = toRefs(Props)
</script>

<style lang="scss" scoped>
  .icon-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;

    div {
      aspect-ratio: 1;

      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }

    span {
      font-size: 18px;
    }
  }
</style>