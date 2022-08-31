import React from "react";
import useSWR from "swr";
import { getCookie } from "../utils/cookies";
import fetcher from "../utils/fetcher";
import Loading from "./Loading";

const MyPageComponent = () => {
  const {data, error} = useSWR(`http://localhost:8080/api/user?id=${getCookie('id')}`, fetcher)

  if (error) {
    return <div>ERROR</div>
  } else if (!data) {
    return <Loading/>
  } else {
    return (
     <div className={'MyPageComponent'}>
       <div className={'componentTitle'}>대출 도서 목록</div>
       {
         data.length === 0 && (
           <div style={{ marginTop: '60px', textAlign: 'center' }}>현대 대출 된 도서 목록이 없습니다.</div>
         )
       }
       {
         data.length > 0 && (
           <div>
             {Object.values(data).map((log: any, index) => (
               <ul key={index}>
                 <li>{log.book.title} ({log.book.publisher})</li>
               </ul>
             ))}
           </div>
         )
       }
     </div>
    )
  }
}

export default MyPageComponent