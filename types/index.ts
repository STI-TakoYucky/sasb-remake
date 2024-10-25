export interface CustomAuthFormProps {
  data: {
    icon: string;
    inputType: string;
    placeholder: string;
  }[];
  submit: (event: React.FormEvent<HTMLFormElement>) => void,
  buttonName: string
}
