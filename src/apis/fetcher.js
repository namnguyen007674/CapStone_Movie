import axios from 'axios'
const fetcher = axios.create({
  baseURL:"https://movienew.cybersoft.edu.vn/api",
  headers:{
    TokenCybersoft :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MiIsIkhldEhhblN0cmluZyI6IjIxLzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwODQ3MzYwMDAwMCIsIm5iZiI6MTY4MTE0NjAwMCwiZXhwIjoxNzA4NjIxMjAwfQ.2JFd_iMYjvwU4SaKsLmL_x-kEZcKonddkHVR7z3Gxbc"
  }
})


fetcher.interceptors.request.use((request)=>{
  const user = JSON.parse(localStorage.getItem("currentUser"))
  if(user) {
    request.headers.Authorization = `Bearer ${user.accessToken}`
  }
  return request
})

fetcher.interceptors.response.use((response)=>{
  return response
},(error)=>{
  if(error.response.status === 401) {
    localStorage.removeItem("currentUser")
    window.location.replace("/sign-in")
  }
  return Promise.reject(error)
})

export default fetcher