import { useRef } from "react";

export function useAuthRefs() {
    const emailRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);

    return { emailRef, usernameRef, firstNameRef, lastNameRef, passwordRef};
}
