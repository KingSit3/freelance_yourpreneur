<template>
  <div class="space-y-10">
    <div v-for="(form, index) in generatedFormMenuKeys" :key="index" class="space-y-2 capitalize">
      <h2 class="font-bold text-xl border-b-2 border-green-800 w-fit pr-20">{{ form.label }}</h2>
      <p>
        {{ form.description }}
      </p>

      <FormTable
        v-model.emitFormValue="generalStore.$state.formSurveyValue[index]"
        :keys="generalStore.$state.stores"
        :rows="form.survey"
        :formKey="form.key"
      />
    </div>

    <br />
    {{ generalStore.$state.formSurveyValue }}
    {{ generalStore.$state.stores }}

    <div class="flex gap-5">
      <button
        @click="generalStore.$state.mainMenu = 'menu'"
        class="px-3 p-0.5 border-2 border-blue-800 hover:bg-blue-800 text-neutral-100 rounded duration-200"
      >
        Kembali
      </button>
      <button
        @click="generalStore.$state.mainMenu = 'form'"
        class="px-3 p-0.5 border-2 border-green-800 hover:bg-green-800 text-neutral-100 rounded duration-200"
      >
        Hitung hasil
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { FormInterface, FormMenuInterface } from '@/interface/general'
import { useGeneralStore } from '@/stores/general'
import { onMounted, ref } from 'vue'
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

const generatedFormMenuKeys = ref<FormInterface[]>([])

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
  generatedFormMenuKeys.value = makeFormRows(formMenuKeys)
})
</script>
