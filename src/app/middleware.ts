import { useState } from 'react'

export default function Middleware() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return { isAuthenticated, setAuthenticated}
}


