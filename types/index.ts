import { Dispatch, SetStateAction } from "react";

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

export interface AuthenticationPageProps {
  linkName: string,
  link: string,
  styles: string,
  children: React.ReactNode
}

export interface useCredentialsProps {
  firstName?: string,
  lastName?: string,
  role?: string,
  children?: React.ReactNode
}

export interface alertProps {
  setError: Dispatch<SetStateAction<boolean>>
  setStatusMessage: Dispatch<SetStateAction<string>>
}
