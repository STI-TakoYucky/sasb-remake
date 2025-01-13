import { FormatDistanceToNowOptions } from "date-fns";
import { ObjectId } from "mongodb";
import { Date } from "mongoose";
import { Dispatch, SetStateAction } from "react";

export interface CustomAuthFormProps {
  data: {
    icon: string;
    inputType: string;
    placeholder: string;
    ref: React.RefObject<HTMLInputElement>;
  }[];
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonName: string;
  children?: React.ReactNode;
  success: boolean;
}

export interface AuthenticationPageProps {
  linkName: string;
  link: string;
  styles: string;
  children: React.ReactNode;
}

export interface useCredentialsProps {
  firstName?: string;
  lastName?: string;
  role?: string;
  children?: React.ReactNode;
}

export interface alertProps {
  makeAlertVisible: string;
  alertColor?: string;
  alertMessages?: string[];
}

export interface PostImageProps {
  images?: {
    url: string;
    public_id: string;
    fileName: string;
  }[] | undefined;
}

export interface postProps {
  posts: {
    _id: ObjectId;
    organization: string;
    caption?: string;
    images?: PostImageProps;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }[];
}
