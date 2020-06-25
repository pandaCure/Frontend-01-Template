<template>
  <div>
    <template v-for="(row, x) in pattern">
      <template v-for="(col, y) in row">
        <div :key="x+y">{{x + y + 2}}</div>
      </template>
      <br :key="x" />
    </template>
  </div>
</template>
<script lang="ts">
import {reactive, ref} from 'vue'
const useCreateChessBoard = () => {}
export default {
  name: 'Chessboard',
  setup () {
    console.log(1)
    // useCreateChessBoard()
    const pattern = ref([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]);
      console.log(pattern.value)
      const f = ref(8)
      return {pattern: pattern.value, f}
  }
}
</script>
<style>

</style>