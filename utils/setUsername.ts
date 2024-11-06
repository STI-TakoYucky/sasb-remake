export let fullName: string;

export const setUsername = (firstName: string, lastName: string) => {
   fullName = `${firstName} ${lastName}`
}