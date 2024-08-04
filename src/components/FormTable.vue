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
            :for="formKey + rowIndex.toString() + index.toString()"
            :class="`${col == formValue[rowIndex] ? 'bg-green-800' : 'bg-neutral-300'} ${disabled ? 'cursor-default' : 'cursor-pointer'} size-7 flex justify-center border border-neutral-700 duration-200`"
          >
            <span v-show="col == formValue[rowIndex]" class="font-bold">X</span>
          </label>

          <input
            v-model="formValue[rowIndex]"
            type="radio"
            name="lorem"
            :id="formKey + rowIndex.toString() + index.toString()"
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
import { onMounted, ref, watch } from 'vue'
import type { FormRowInterface } from '../interface/general'

const formOptionLabel = [9, 7, 5, 3, 1, 3, 5, 7, 9]
const formOptionValue = [0.11, 0.14, 0.2, 0.33, 1, 3, 5, 7, 9]
const formValue = ref<any>([])
let emitFormValue = defineModel()

const getValueByOppositeOptionValue = (value?: number) => {
  switch (value) {
    case 0.11:
      return 9
    case 0.14:
      return 7
    case 0.2:
      return 5
    case 0.33:
      return 3
    case 3:
      return 0.33
    case 5:
      return 0.2
    case 7:
      return 0.14
    case 9:
      return 0.11
    default:
      return 1
  }
}

watch(formValue.value, (current) => {
  // Step 1
  let rawData = props.keys.map((key, keyIndex) => {
    let rows = props.rows
      .map((value, index) => {
        return {
          key: value.key,
          value: current[index]
        }
      })
      .filter((row) => row.key.includes(key))
      .map((value) => {
        const splitRowKey = value.key.split('-')
        if (splitRowKey[0] == key) {
          return value.value
        } else {
          return getValueByOppositeOptionValue(value.value)
        }
      })

    // @ts-expect-error
    return rows.toSpliced(keyIndex, 0, 1)
  })

  // Sum by Column
  const sumData = rawData.map((value) =>
    value.reduce((prev: number, current: number) => prev + current)
  )

  // Step 3
  const rawResult = rawData.map((value, index) =>
    value.map((data: number): number => data / sumData[index])
  )

  // Step 4
  let result = []
  for (let sumDataIndex = 0; sumDataIndex < sumData.length; sumDataIndex++) {
    for (let rawResultIndex = 0; rawResultIndex < rawResult.length; rawResultIndex++) {
      result[sumDataIndex] = +rawResult[rawResultIndex][sumDataIndex]
    }
  }
  emitFormValue.value = result
})

const props = defineProps<{
  rows: FormRowInterface[]
  keys: string[]
  formKey: string
  disabled?: boolean
}>()

onMounted(() => {
  // Set Initial Row Values
  props.rows.map((row, index) =>
    row.value ? (formValue.value[index] = row.value) : (formValue.value[index] = 1)
  )
})
</script>
