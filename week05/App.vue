<template>
  <div>
    <div class="select_block">
      <SelectComponent
        :initData="innerGlobalObjectArr"
        :defaultValue="defaultValue"
        @handleSelectEvent="handleSelectEvent"
      />
    </div>
    <div id="container" />
  </div>
</template>

<script lang="ts">
import G6, { TreeGraph } from '@antv/g6'
import data from './m'
import { insertCss } from 'insert-css'
import {
  handleInnerGlobalObject,
  innerGlobalObject,
  contextValue
} from './getReamlData'
import SelectComponent from './Select.vue'
import { onMounted, ref, provide, defineComponent } from 'vue'
const minimapCss = `
  .g6-minimap-container {
    border: 1px solid #e2e2e2;
    position: fixed !important;
    left: 0;
    top: 0;
  }
  .g6-minimap-viewport {
    border: 2px solid rgb(25, 128, 255);
  }
`
insertCss(minimapCss)
export default defineComponent({
  components: {
    SelectComponent
  },
  setup() {
    function getClientData() {
      return [window.innerWidth, window.innerHeight]
    }
    let graphContext = ref<TreeGraph | null>(null)
    onMounted(() => {
      const [width, height] = getClientData()
      const minimap = new G6.Minimap({
        size: [150, 320],
        className: 'minimap'
      })
      const graph = new G6.TreeGraph({
        container: 'container',
        width: width,
        height: height,
        modes: {
          default: [
            {
              type: 'collapse-expand',
              onChange: function onChange(item, collapsed) {
                const data = item.get('model').data
                data.collapsed = collapsed
                return true
              }
            },
            'drag-canvas',
            'zoom-canvas'
          ]
        },
        defaultNode: {
          size: 26, // 点的大小
          anchorPoints: [
            // 调整线的位置
            [0, 0.5],
            [1, 0.5]
          ],
          style: {
            fill: '#C6E5FF', // 点里面的元素
            stroke: '#5B8FF9' // 点边的元素
          }
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            stroke: '#A3B1BF'
          }
        },
        layout: {
          type: 'compactBox',
          direction: 'LR',
          getId: function getId(d) {
            return d.id
          },
          getHeight: function getHeight() {
            return 16
          },
          getWidth: function getWidth() {
            return 16
          },
          getVGap: function getVGap() {
            return 10
          },
          getHGap: function getHGap() {
            return 100
          }
        },
        plugins: [minimap]
      })

      graph.node(function (node) {
        return {
          label: node.id,
          labelCfg: {
            offset: 10,
            position:
              node.children && node.children.length > 0 ? 'left' : 'right'
          }
        }
      })

      graph.data(handleInnerGlobalObject(['String']))
      graph.render()
      graph.fitView()
      graphContext.value = graph
      graph.changeData
    })
    function handleSelectEvent(chooseType: string[]) {
      const handleInnerObj =
        chooseType[0] === 'all' ? [...innerGlobalObject] : [`${chooseType[0]}`]
      graphContext.value!.changeData(handleInnerGlobalObject(handleInnerObj))
      graphContext.value!.refresh()
      graphContext.value!.fitView()
    }
    const innerGlobalObjectArr = ref(innerGlobalObject)
    return {
      handleSelectEvent,
      innerGlobalObjectArr
    }
  }
})
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
}
.select_block {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
