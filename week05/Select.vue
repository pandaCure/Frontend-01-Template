<template>
  <div>
    <select v-model="stateValue.selectvalue">
      <option value="all">全部</option>
      <option v-for="(item, key) in initData" :key="key" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { reactive, ref, watch, provide } from 'vue'
export default {
  props: {
    initData: Array,
    handleSelectEvent: {
      type: Function,
      required: true
    }
  },
  setup(props, {emit}) {
    const initData = ref(props.initData)
    const inputValue = ref(0)
    const stateValue = reactive({
      selectvalue: 'String'
    })
    watch(() => stateValue.selectvalue, (newValue, oldValue) => {
      emit('handleSelectEvent',[newValue, oldValue])
    })
    // watch(inputValue, (newValue, oldValue) => {
    //   console.log(newValue)
    //   console.log(oldValue)
    // })
    return {
      initData,
      stateValue,
      inputValue
    }
  }
}
</script>
