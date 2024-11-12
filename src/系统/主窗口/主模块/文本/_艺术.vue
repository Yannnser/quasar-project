<script setup lang="ts">
const 参数 = defineProps(['传递']);
</script>
<template>
  <div class="阴影-主">:{{ 参数.传递.内容 }}</div>
  <div class="阴影-辅">:{{ 参数.传递.内容 }}</div>
  <div class="阴影-备">:{{ 参数.传递.内容 }}</div>
  <div class="浮雕-主">:{{ 参数.传递.内容 }}</div>
  <div class="浮雕-辅">:{{ 参数.传递.内容 }}</div>
  <div class="浮雕-备">:{{ 参数.传递.内容 }}</div>
</template>
<style lang="sass" scoped>

@function 制作阴影($颜色)
    $值: 0px 0px $颜色
    @for $i from 1 through 4
        $颜色: fade-out(desaturate($颜色, 1%), .02)
        $值: #{$值}, #{$i}px #{$i}px #{$颜色}
    @return $值

@function 制作浮雕($粗细,$正色,$反色)
        @return -#{$粗细}px -#{$粗细}px  #{$粗细}px $正色,  #{$粗细}px #{$粗细}px #{$粗细}px $反色

@mixin 基础样式()
    font-size: 30px
    margin-top: 20px
    &::before
        content: attr(class)

*
    @include 基础样式()

.阴影-辅
    color: lighten($secondary, 20%)
    text-shadow: 制作阴影($secondary)

.阴影-主
    color: lighten($primary, 20%)
    text-shadow: 制作阴影($primary)

.阴影-备
    color: lighten($dark-page, 10%)
    text-shadow: 制作阴影($accent)

.浮雕-主
    text-shadow: 制作浮雕(2, $primary, $secondary)

.浮雕-辅
    text-shadow: 制作浮雕(2, $secondary, $primary)

.浮雕-备
    text-shadow: 制作浮雕(2, $accent, $dark-page)
</style>
