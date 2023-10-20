import React from 'react'
import {useUserContext} from '../../contexts/UserContext/UserContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
export default function ProtectedRouteAdmin({children}) {
  const location = useLocation()
  const {currentUser} = useUserContext()
  // Kiểm tra use đã đăng nhập chưa
  if(!currentUser){
    return <Navigate to={`/sign-in?redirectTo=${location.pathname}`} replace />
  }
  if(currentUser.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to='/' replace/>
  } 
  return children || <Outlet/>
}