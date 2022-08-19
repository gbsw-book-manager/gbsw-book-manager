import React from "react";
import { useMediaQuery } from 'react-responsive'
import StudentManagementDesktop from "./Desktop/StudentManagementDesktop";
import StudentManagementMobile from "./Mobile/StudentManagementMobile";

const StudentManagement = () => {
  const isPC = useMediaQuery({
    query: '(min-width: 900px)'
  })

  return (
    isPC ? <StudentManagementDesktop/> : <StudentManagementMobile/>
  )
}

export default StudentManagement