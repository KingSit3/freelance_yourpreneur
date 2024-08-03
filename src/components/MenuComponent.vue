<template>
  <div class="space-y-10">
    <!-- Title -->
    <section>
      <h2 class="font-semibold text-xl text-center">
        Selamat datang di sistem <span class="font-bold">YourPreneur</span>
      </h2>
    </section>
    <!-- End Title -->

    <!-- Points -->
    <section class="space-y-2">
      <p>
        Ini adalah sistem pendukung keputusan untuk membantu kamu menentukan jenis usaha apa yang
        cocok berdasarkan latar belakang yang kamu miliki. Pada sistem ini, kamu akan diminta untuk
        memberikan nilai untuk membandingkan setiap elemen, dimana:
      </p>
      <ol>
        <li>1 = Sama penting</li>
        <li>3 = Sedikit lebih penting</li>
        <li>5 = Lebih Penting</li>
        <li>7 = Sangat lebih penting</li>
        <li>9 = Mutlak lebih penting</li>
      </ol>
      <p>
        Semakin besar nilai yang kamu berikan berarti elemen tersebut paling sesuai dengan kondisi
        kamu. Jadi, untuk mendapatkan hasil rekomendasi yang cocok, lakukanlah perbandingan dengan
        benar dan sesuai.
      </p>
    </section>
    <!-- End Points -->

    <!-- Example -->
    <section>
      <p>
        Ini adalah tampilan form perbandingan dimana apabila simbol x menempati angka yang semakin
        dekat dengan elemen maka elemen tersebut bernilai lebih besar. Contoh :
      </p>

      <FormInput disabled :rows="example1" />
      <p>Nilai di atas menunjukkan bahwa A lebih penting dari B</p>

      <FormInput disabled :rows="example2" />
      <p>Nilai di atas menunjukkan bahwa B sangat lebih penting dari A</p>
    </section>
    <!-- End Example -->

    <!-- Criteria -->
    <section>
      <h3 class="font-semibold text-xl">Kriteria</h3>
      <p>
        Pada bagian ini kamu bisa memilih menggunakan penilaian yang sudah tersedia dengan data yang
        sudah melalui riset dari 40 orang pengusaha kelas mikro hingga makro, atau kamu bisa
        melakukan men-setting penilaian kamu sendiri dengan mempertimbang kan latar belakang kamu
        sendiri.
      </p>
      <FormInput :rows="criteria" />
    </section>
    <!-- End Criteria -->

    <!-- Buttons -->
    <section class="flex justify-center">
      <button
        @click="generalStore.$state.mainMenu = 'form'"
        class="px-3 p-0.5 border-2 border-green-800 hover:bg-green-800 text-neutral-100 rounded duration-200"
      >
        Mulai isi form
      </button>
    </section>
    <!-- End Buttons -->
  </div>
</template>
<script lang="ts" setup>
import { useGeneralStore } from '@/stores/general'
import FormInput from './FormInput.vue'
import { useFormCount } from '@/composables/formCount'

const generalStore = useGeneralStore()
useFormCount()

const example1 = [
  {
    key: 'example1',
    value: 0.2,
    first_label: 'A',
    last_label: 'B'
  }
]

const example2 = [
  {
    key: 'example2',
    value: 7,
    first_label: 'A',
    last_label: 'B'
  }
]

const criteria = [
  {
    key: 'pendidikan-pengalaman',
    value: 3,
    first_label: 'Pendidikan',
    last_label: 'Pengalaman'
  },
  {
    key: 'pendidikan-keuangan',
    value: 3,
    first_label: 'Pendidikan',
    last_label: 'Keuangan'
  },
  {
    key: 'pendidikan-relasi',
    value: 5,
    first_label: 'Pendidikan',
    last_label: 'Relasi'
  },
  {
    key: 'pendidikan-dukungan_keluarga',
    value: 0.33,
    first_label: 'Pendidikan',
    last_label: 'Dukungan Keluarga'
  },
  {
    key: 'pendidikan-kebiasaan',
    value: 7,
    first_label: 'Pendidikan',
    last_label: 'Kebiasaan'
  },
  {
    key: 'pengalaman-keuangan',
    value: 1,
    first_label: 'Pengalaman',
    last_label: 'Keuangan'
  },
  {
    key: 'pengalaman-relasi',
    value: 3,
    first_label: 'Pengalaman',
    last_label: 'Relasi'
  },
  {
    key: 'pengalaman-dukungan_keluarga',
    value: 0.2,
    first_label: 'Pengalaman',
    last_label: 'Dukungan Keluarga'
  },
  {
    key: 'pengalaman-kebiasaan',
    value: 3,
    first_label: 'Pengalaman',
    last_label: 'Kebiasaan'
  },
  {
    key: 'keuangan-relasi',
    value: 3,
    first_label: 'Keuangan',
    last_label: 'Relasi'
  },
  {
    key: 'keuangan-dukungan_keluarga',
    value: 0.2,
    first_label: 'Keuangan',
    last_label: 'Dukungan Keluarga'
  },
  {
    key: 'keuangan-kebiasaan',
    value: 3,
    first_label: 'Keuangan',
    last_label: 'Kebiasaan'
  },
  {
    key: 'relasi-dukungan_keluarga',
    value: 3,
    first_label: 'Relasi',
    last_label: 'Dukungan Keluarga'
  },
  {
    key: 'relasi-kebiasaan',
    value: 3,
    first_label: 'Relasi',
    last_label: 'Kebiasaan'
  },
  {
    key: 'dukungan_keluarga-kebiasaan',
    value: 7,
    first_label: 'Dukungan Keluarga',
    last_label: 'Kebiasaan'
  }
]
</script>
