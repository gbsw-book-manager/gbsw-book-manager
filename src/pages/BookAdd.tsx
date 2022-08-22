import React from "react";
import { useMediaQuery } from 'react-responsive';
import BookAddDesktop from "./Desktop/BookAddDesktop";
import BookAddMobile from "./Mobile/BookAddMobile";

const BookAdd = () => {
  const isPC = useMediaQuery({
    query: '(min-width: 900px)'
  })

  return (
    isPC ? <BookAddDesktop/> : <BookAddMobile/>
  )
}

export default BookAdd