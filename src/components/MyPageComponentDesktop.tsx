import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { getCookie } from "../utils/cookies";
import fetcher from "../utils/fetcher";
import Loading from "./Loading";
import jwt_decode from "jwt-decode";

const MyPageComponentDesktop = () => {
  const [userId, setUserId] = useState()

  useEffect(() => {
    let decoded: any = jwt_decode(getCookie('access_token'))
    setUserId(decoded.id)
  }, [])

  const {data, error} = useSWR(`https://bookmanager-api.jinhyo.dev/api/user?id=${userId}`, fetcher)

  if (error) {
    return <div>ERROR</div>
  } else if (!data) {
    return <Loading/>
  } else {
    return (
      <div className={'myPageCompoPC'}>
        {
          data.length === 0 && (
            <div style={{marginTop: '25%', textAlign: 'center', fontSize: '20px'}}>현대 대출 된 도서 목록이 없습니다.</div>
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

export default MyPageComponentDesktop