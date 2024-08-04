export interface FormRowInterface {
  key: string
  value?: number
  first_label: string
  last_label: string
}

export interface FormMenuInterface {
  key: 'pendidikan' | 'pengalaman' | 'keuangan' | 'relasi' | 'dukungan_keluarga' | 'kebiasaan'
  label: string
  description: string
}

export interface FormInterface extends FormMenuInterface {
  survey: FormRowInterface[]
}
