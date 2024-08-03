<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="(label, index) in formOptionLabel" :key="index">{{ label }}</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr class="[&>*]:p-1" v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td class="font-semibold text-right">{{ row.first_label }}</td>
        <td v-for="(col, index) in formOptionValue" :key="index">
          <label
            :for="rowIndex.toString() + index.toString()"
            :class="`${col == formValue[rowIndex] ? 'bg-green-800' : 'bg-neutral-300'} ${disabled ? 'cursor-default' : 'cursor-pointer'} size-7 flex justify-center border border-neutral-700 duration-200`"
          >
            <span v-show="col == formValue[rowIndex]" class="font-bold">X</span>
          </label>

          <input
            v-model="formValue[rowIndex]"
            type="radio"
            name="lorem"
            :id="rowIndex.toString() + index.toString()"
            :value="col"
            :disabled="disabled"
            hidden
          />
        </td>
        <td class="font-semibold text-left">{{ row.last_label }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const formOptionLabel = [9, 7, 5, 3, 1, 3, 5, 7, 9]
const formOptionValue = [0.11, 0.14, 0.2, 0.33, 1, 3, 5, 7, 9]
const formValue = ref<any>([])

interface RowInterface {
  key: string
  value?: number
  first_label: string
  last_label: string
}

const props = defineProps<{
  rows: RowInterface[]
  disabled?: boolean
}>()

onMounted(() => {
  // Set Initial Value
  props.rows.map((row, index) => {
    return row.value ? (formValue.value[index] = row.value) : (formValue.value[index] = 1)
  })
})
</script>
