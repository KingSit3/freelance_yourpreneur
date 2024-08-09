<template>
  <div class="space-y-10">
    <div v-for="(form, index) in generatedFormSurveys" :key="index" class="space-y-2 capitalize">
      <h2 class="font-bold text-xl border-b-2 border-green-800 w-fit pr-20">{{ form.label }}</h2>
      <p>
        {{ form.description }}
      </p>

      <FormTable
        v-model.emitFormValue="surveyFormData[index]"
        :keys="generatedFormKeys"
        :rows="form.survey"
        :formKey="form.key"
      />
    </div>

    <div class="bg-blue-200 rounded-lg p-5">
      <h2 class="font-bold text-xl text-center">Hasil</h2>
      <div>
        <table class="table-auto w-full">
          <tr
            v-for="(result, index) in surveyResult"
            :key="index"
            class="first:font-bold first:border-b-2 border-neutral-300"
          >
            <td class="py-2">Usaha dengan nilai tertinggi ke-{{ index + 1 }}</td>
            <td class="capitalize">{{ result.key }}</td>
            <td>Dengan Bobot</td>
            <td class="capitalize">{{ result.value }}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="flex justify-center gap-5">
      <button
        @click="generalStore.$state.mainMenu = 'menu'"
        class="px-5 p-1.5 border-2 border-blue-800 hover:bg-blue-800 hover:*:text-neutral-100 rounded duration-200"
      >
        Kembali ke Menu Utama
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { FormInterface, FormMenuInterface } from '@/interface/general'
import { useGeneralStore } from '@/stores/general'
import { computed, onMounted, ref, watch } from 'vue'
import FormTable from './FormTable.vue'

const generalStore = useGeneralStore()
const formMenuKeys: FormMenuInterface[] = [
  {
    key: 'pendidikan',
    label: 'Pendidikan',
    description:
      'Pada penilaian pendidikan terdapat 2 jenis pendidikan yang bisa menjadi pertimbangan yaitu pendidikan formal dan nonformal, formal pendidikan berjenjang seperti SD-SMP-SMA-SMA-KULIAH, dan pendidikan non formal yang berupa pelatihan, seminar, dan sejauh mana pengetahuan anda dalam usaha itu'
  },
  {
    key: 'pengalaman',
    label: 'Pengalaman',
    description:
      'Pada bagian pengalaman anda bisa memberikan penilaian terhadap alternatif usaha, yang berupa pengalaman bekerja, pengalaman organisasi, dan pengalaman yang berkaitan dengan usaha yang akan dijalankan'
  },
  {
    key: 'keuangan',
    label: 'Keuangan',
    description:
      'Pada bagian keuangan pertimbangkan seberapa besar modal atau biaya yang dibutuhkan untuk membangun dari masing masing usaha, dan perkirakan seberapa lama modal itu kembali.'
  },
  {
    key: 'relasi',
    label: 'Relasi',
    description:
      'Dalam kriteria relasi, pertimbangkanlah kesesuaian usaha yang akan anda jalankan dengan relasi yang anda miliki.'
  },
  {
    key: 'dukungan_keluarga',
    label: 'Dukungan Keluarga',
    description:
      'Dukungan keluarga menjadi pertimbangkan tambahan, dukungan keluarga yang bisa berupa finansial ataupun fasilitas yang memiliki kesesuaian terhadap usaha yang akan dijalankan,'
  },
  {
    key: 'kebiasaan',
    label: 'Kebiasaan',
    description:
      'Pada bagian ini terdapat beberapa pilihan jenis usaha, piihlah 3 jenis usaha yang paling sesuai dengan kebiasaan anda sehari-hari.'
  }
]

const surveyFormData = ref<number[][]>([])
const surveyResult = ref<any[]>([])
watch(surveyFormData.value, (current) => {
  let weightedSupermatrix = generalStore.$state.criteriaValue.map((criteria, criteriaIndex) => {
    if (current[criteriaIndex]) {
      // Step 1, Combining
      let combinedResult = current[criteriaIndex].map((surveyValue) => surveyValue * criteria)

      // Step 2, Summary
      let sumResult = combinedResult.reduce((prev, current) => current + prev)

      // Step 3, Normalization
      let normalizeResult = combinedResult.map((value) => value / sumResult)

      // Step 4, Weighted Supermatriks
      let weightedResult = normalizeResult.map((value) => value * criteria)

      return weightedResult
    }
  })

  // Step 5, Get Eigenvector 1
  let eigenvectorFirstResult: number[] = []
  for (let storeIndex = 0; storeIndex < generalStore.$state.stores.length; storeIndex++) {
    let sum = 0
    for (let weightedIndex = 0; weightedIndex < weightedSupermatrix.length; weightedIndex++) {
      sum += weightedSupermatrix?.[weightedIndex]?.[storeIndex] ?? 0
    }
    eigenvectorFirstResult.push(sum)
  }

  surveyResult.value = eigenvectorFirstResult
    .map((value, index) => {
      return {
        key: generalStore.$state.stores[index],
        value: value
      }
    })
    .sort((a, b) => b.value - a.value)
})

const generatedFormKeys = computed(() => {
  return generalStore.$state.stores.map((value) => value.trim().toLowerCase().replace(/\s+/g, '_'))
})
const generatedFormSurveys = ref<FormInterface[]>([])

const makeFormRows = (formMenuKeys: FormMenuInterface[]): FormInterface[] => {
  return formMenuKeys.map((formMenu) => {
    let surveyData = []
    for (let i = 0; i < generalStore.$state.stores.length; i++) {
      for (let j = 1; j < generalStore.$state.stores.length; j++) {
        if (i + 1 != generalStore.$state.stores.length) {
          const storeA = generalStore.$state.stores[i]
          const storeB = generalStore.$state.stores[j]
          if (
            storeA.trim().toLowerCase().replace(/\s+/g, '_') !=
            storeB.trim().toLowerCase().replace(/\s+/g, '_')
          ) {
            surveyData.push({
              key: `${storeA.trim().toLowerCase().replace(/\s+/g, '_')}-${storeB.trim().toLowerCase().replace(/\s+/g, '_')}`,
              value: 1,
              first_label: storeA,
              last_label: storeB
            })
          }
        }
      }
    }

    return {
      key: formMenu.key,
      label: formMenu.label,
      description: formMenu.description,
      survey: surveyData
    }
  })
}

onMounted(() => {
  generatedFormSurveys.value = makeFormRows(formMenuKeys)
})
</script>
