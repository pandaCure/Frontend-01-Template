<template>
  <div ref="container" class="container" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
    <template v-for="(item, key) in items">
      <div :key="item" class="block" :style="{background: cacheArray.has(key) ? 'red' : ''}" @mouseenter="handleMouseOver(key)" @mouseleave="handleMouseOut(key)"/>
    </template>
  </div>
</template>
<script lang="ts">
import {reactive} from 'vue'
const useInitStatus = () =>{
  const list = reactive<Number[]>(new Array(1000).fill(0))
  return list
}
export default {
  name: 'App',
  setup () {
    const items = useInitStatus()
    return {
      items
    }
  },
  data () {
    return {
      cacheArray: new Set(),
      status: false
    }
  },
  mounted () {
    const cacheArray = window.localStorage.getItem('cacheArray')
    if (cacheArray) this.cacheArray = new Set(JSON.parse(cacheArray))
  },
  methods: {
    handleMouseUp () {
      window.localStorage.setItem('cacheArray', JSON.stringify(Array.from(this.cacheArray)))
      this.status = false

    },
    handleMouseDown () {
      this.status = true
    },
    handleMouseOver (index: number) {
      if (!this.status) return false
      if (this.cacheArray.has(index)) return false
      this.cacheArray.add(index)
    },
    handleMouseOut () {},
  }
}
</script>
<style>
* {
  box-sizing: border-box;
}
html, body {
  padding: 0;
  margin: 0;
}
.container {
  display: flex;
  flex-wrap: wrap;
}
.block {
  width: 30px;
  height: 30px;
  background-color: gray;
  margin: 5px;
}
</style>