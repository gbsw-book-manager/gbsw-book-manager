import React, {useEffect, useState} from 'react';
import fetcher from "../../utils/fetcher";
import useSWR from 'swr'
import '../../styles/Table.css'
import Loading from "../../components/Loading";
import HamburgerMenu from "../../components/HamburgerMenu";
import {getCookie} from "../../utils/cookies";
import axios from "axios";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

const ReturnMobile = () => {
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [userId, setUserId] = useState()
  const [username, setUsername] = useState()

  useEffect(() => {
    if (getCookie('access_token') === undefined) {
      Swal.fire( {
        title: '로그인 후 이용해 주세요.' ,
        confirmButtonText: '확인',
      }).then(() => {window.location.replace('/')})
    } else {
      let decoded = jwt_decode(getCookie('access_token'))
      setUserId(decoded.id)
      setUsername(decoded.name)
    }
  }, [])

  const {data, error} = useSWR(`https://bookmanager-api.jinhyo.dev/api/user?id=${userId}`, fetcher)

  const checkEvent = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  }

  const returnBook = () => {
    if (checkedInputs.length > 0) {
      let data = {
        'userId': userId,
        'bookTitle': checkedInputs
      }

      axios
        .post('https://bookmanager-api.jinhyo.dev/api/book/return', JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        }).then((res) => {
        Swal.fire({
          text: `${checkedInputs} 도서를 반납 신청 완료했습니다. 선생님에게 책을 반납 한 후, 관리자가 승인을 하면 반납이 완료됩니다.`,
          confirmButtonText: '확인',
          icon: 'info'
        })
          .then(() => {
            window.location.reload()
          })
      })
    }
  }

  if (error) {
    return <div>ERROR</div>
  } else if (!data) {
    return <Loading/>
  } else {
    return (
      <div>
        <div className={'app'}>
          <HamburgerMenu/>
          <main className="content">
            <div className={'statusBar'}>
              <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
              <a href={'/return'} style={{color: '#000'}}> 도서 반납</a>
            </div>
            <div className={'divider'}/>

            {
              data.length === 0 && (
                <div className={'nonDataMobile'}>
                  <div>현재 대출 한 도서 목록이 없습니다.</div>
                  <button onClick={() => window.location.reload()} className={'reloadBtn'}>새로고침</button>
                </div>
              )
            }

            {
              data.length > 0 && (
                <div>
                  <div className={'tableContainer'}>
                    <div style={{fontFamily: 'GyeonggiTitleM', fontSize: '15px'}}>{username}님의 대출 도서 수
                      : {data.length}권
                    </div>
                    <br/>
                    <table className={'mainTable'}>
                      <thead>
                      <tr>
                        <th/>
                        <th>제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>대출 날짜</th>
                      </tr>
                      </thead>
                      <tbody>
                      {Object.values(data).map((log, index) => (
                        <tr key={index}>
                          <td className="checkbox-td">
                            <input type="checkbox" name={`${log.title}`} className="checkbox-box"
                                   id={log.title} onChange={(e) => {
                              checkEvent(e.currentTarget.checked, log.book.title)
                            }}
                                   checked={!checkedInputs.includes(log.book.title) ? false : true}/>
                          </td>
                          <td>{log.book.title}</td>
                          <td>{log.book.author}</td>
                          <td>{log.book.publisher}</td>
                          <td>{log.loanDate}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                  <button className={checkedInputs.length === 0 ? 'btnNotActive' : 'returnBtnActive'} id={'dynamicBtn'}
                          onClick={returnBook}>반납하기
                  </button>
                </div>
              )
            }

          </main>
        </div>
      </div>
    )
  }
}

export default ReturnMobile;