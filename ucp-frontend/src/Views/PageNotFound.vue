<template>
  <div class="page_not_found-wrapper">
    <IconComponent iconPath="Icons/maintenance_white" />

    <span>Az oldal jelenleg karbantartás alatt van!</span>
    <span>A fejlesztők dolgoznak a hibák, illetve a felmerülő problémák kijavításán.</span>
  </div>
</template>

<script setup>
  import IconComponent from '@/Components/Icon'
</script>

<style lang="scss" scoped>
  .page_not_found-wrapper {
    :nth-child(1) {
      margin-bottom: 50px;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    text-align: center;
    font-size: 18px;
    color: white;
  }
</style>