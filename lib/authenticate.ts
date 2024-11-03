export const login = async (email: string | undefined, password: string | undefined) => {
    const res = await fetch('/api/log-in', {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
  return res;
}