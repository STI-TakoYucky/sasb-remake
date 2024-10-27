import { useRef } from "react";

export function useAuthRefs() {
    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    return { emailRef, usernameRef, passwordRef};
}
