import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../service/authLogic'

const LogoutPage = ({authLogic}) => {
  const navigate = useNavigate()
  useEffect(() => {
    //로그아웃 처리하기
    logout(authLogic.auth)
    navigate("/login")
    //window.location.href="/login"
  },[])
  return (
    <>
      LogoutPage
    </>
  )
}

export default LogoutPage