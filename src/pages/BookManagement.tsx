import React from "react";
import { useMediaQuery } from 'react-responsive'
import BookManagementDesktop from "./Desktop/BookManagementDesktop";
import BookManagementMobile from "./Mobile/BookManagementMobile";

const BookManagement = () => {
  const isPC = useMediaQuery({
    query: '(min-width: 900px)'
  })

  return (
    isPC ? <BookManagementDesktop/> : <BookManagementMobile/>
  )
}

export default BookManagement