export interface CustomAuthFormProps {
  data: {
    icon: string;
    inputType: string;
    placeholder: string;
    ref: React.RefObject<HTMLInputElement>
  }[];
  submit: (event: React.FormEvent<HTMLFormElement>) => void,
  buttonName: string,
  children?: React.ReactNode,
  success: boolean
}
