

<template>
    <div class="public-table">
      <div ref="tableRef">
        <el-table ref="tableRefs" border :data="data" :max-height="maxHeight" style="width: 100%" v-bind="$attrs">
          <el-table-column v-if="isSelection" type="selection" width="55" />
          <el-table-column
            v-for="(item, i) in header"
            :key="i"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.mWidth"
            :align="item.align || 'center'"
            :fixed="item.fixed"
            :sortable="item.sortable"
            :show-overflow-tooltip="item.tooltip"
            :type="item.type"
          >
            <template #header>
              <template v-if="!$slots[`header${item.prop}`]">
                {{ item.label }}
                {{ $slots[+'header' + item.prop] }}
              </template>
              <slot v-else :name="`header${item.prop}`" :row="row"></slot>
            </template>
            <template #default="{ row }">
              <template v-if="!$slots[item.prop]">
                <template v-if="item.type === 'date'">
                  <template v-if="row[item.prop]">
                    {{ timeTrans(row[item.prop]) }}
                  </template>
                  <template v-else>-- </template>
                </template>
                <template v-else-if="item.type === 'ratio'">
                  <template v-if="Number(row[item.prop]) === 0 || isNaN(Number(row[item.prop]))">--</template>
                  <template v-else>
                    <div :style="{ color: row[item.prop] > 0 ? 'red' : 'green' }">
                      {{ Number(row[item.prop]).toFixed(2) + '%' }}
                    </div>
                  </template>
                </template>
                <template v-else-if="item.type === 'four'">
                  <template v-if="Number(row[item.prop]) === 0 || isNaN(Number(row[item.prop]))">--</template>
                  <template v-else>
                    <div :style="{ color: row[item.prop] > 0 ? 'red' : 'green' }">
                      {{ Number(row[item.prop]).toFixed(4) }}
                    </div>
                  </template>
                </template>
                <template v-else-if="item.type === 'number'">
                  <template v-if="Number(row[item.prop]) === 0 || isNaN(Number(row[item.prop]))">--</template>
                  <template v-else>
                    <div :style="{ color: row[item.prop] > 0 ? 'red' : 'green' }">{{ Number(row[item.prop]) }}</div>
                  </template>
                </template>
                <template v-else-if="item.type === 'turn'">
                  <template v-if="Number(row[item.prop]) === 0 || isNaN(Number(row[item.prop]))">--</template>
                  <template v-else>
                    {{ tools.turnMoney(row[item.prop]) }}
                  </template>
                </template>
                <template v-else-if="item.type === 'numberTurn'">
                  <template v-if="Number(row[item.prop]) === 0 || isNaN(Number(row[item.prop]))">--</template>
                  <template v-else>
                    <div :style="{ color: row[item.prop] > 0 ? 'red' : 'green' }">
                      {{ tools.turnMoney(row[item.prop]) }}
                    </div>
                  </template>
                </template>
                <template v-else> {{ row[item.prop] || '--' }}</template>
              </template>
              <slot v-else :name="item.prop" :row="row"></slot>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <public-page v-if="isPage" :total="total" :form="pageParams" @page-change="pageChange"></public-page>
    </div>
  </template>
 
 <script>
 export default {
     name: "richTable"
 }
 </script>
  <script setup>
  import { ref, toRefs, onMounted, onUpdated, nextTick, defineExpose } from 'vue';
  import { ElTable } from 'element-plus';
  import publicPage from '../../page/src/index.vue';
  import { timeTrans, tableMaxHeight } from '../../../src/utils/utils.js';
  import tools from '../../../src/utils/tools.js';
  
  const props = defineProps({
    data: {
      // 表格数据  (多选框的怎么封装)
      type: Array,
      default: () => [],
    },
    header: {
      // 表头数据
      type: Array,
      default: () => [],
      /*
       * prop
       * label
       * width
       * mWidth
       * align
       * type   date(日期)/ratio(.fixed(2)%处理)/four(.fixed(4)处理)/number(显示颜色)/turn(金额三分位显示)/numberTurn(显示颜色,金额三分位显示)
       *
       *
       */
    },
    isMaxHeight: {
      // 是否计算最大高度
      type: Boolean ,
      default: true,
    },
    isPage: {
      // 是否有分页
      type: Boolean,
      default: true,
    },
  
    total: {
      // 分页的数据条数
      type: Number,
      default: 0,
    },
    pageParams: {
      type: Object,
    },
    isSelection: {
      type: Boolean,
      default: false,
    },
  });
  const { data, header, isPage, isMaxHeight } = toRefs(props);
  const tableRef = ref();
  const tableRefs = ref();
  defineExpose({ tableRefs });
  const maxHeight = ref();
  onMounted(() => {
    nextTick(() => {
      getMaxHeight();
    });
  });
  onUpdated(function () {
    nextTick(() => {
      getMaxHeight();
    });
  });
  const getMaxHeight = () => {
    // if (isMaxHeight.value) {
    //   const { y: domY } = tableRef.value.getBoundingClientRect();
    //   maxHeight.value = Math.max(tableMaxHeight(domY, window.innerHeight, isPage.value), 250);
    // }
  };
  
  const emit = defineEmits(['pageChange']);
  const pageChange = (val) => {
    emit('pageChange', val);
  };
  </script>
  