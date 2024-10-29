import { useRef } from "react";

export function useAuthRefs() {
    const emailRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    return { emailRef, firstNameRef, lastNameRef, passwordRef};
}
