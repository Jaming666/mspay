<script setup lang="ts">
export interface CusNavProps {
  title?: string
  className?: string
}
const props = withDefaults(defineProps<CusNavProps>(), {
  title: '民生库管',
  className: '',
})
</script>
<template>
  <div class="cusNav">
    <div class="title" :class="[props.className]">
      {{ props.title }}
    </div>
  </div>
</template>
<style lang="scss">
.cusNav {
  display: flex;
  text-align: center;
  padding: 106px 40px 0 0;
  width: 100%;
  color: #000;
  justify-content: center;
  .title {
    font-size: 34px;
  }
  .white {
    color: #fff;
    background-color: transparent;
  }
}
</style>
