import React, {useEffect, useState} from 'react';
import SideBar from "../../components/SideBar";
import fetcher from "../../utils/fetcher";
import useSWR from 'swr'
import '../../styles/Table.css'
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import {getCookie} from "../../utils/cookies";

const ReturnDesktop = () => {
  const [checkedInputs, setCheckedInputs] = useState([]);
  const {data, error} = useSWR(`http://localhost:8080/api/user?id=${getCookie('id')}`, fetcher)

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
        'userId': getCookie('id'),
        'bookTitle': checkedInputs
      }

      axios
        .post('http://localhost:8080/api/book/return', JSON.stringify(data), {
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

  useEffect(() => {
    if (getCookie('access_token') === undefined) {
      Swal.fire({
        title: '로그인 후 이용해 주세요.',
        confirmButtonText: '확인',
      }).then(() => {
        window.location.replace('/')
      })
    }
  }, [])

  if (error) {
    return <div>ERROR</div>
  } else if (!data) {
    return <Loading/>
  } else {
    return (
      <div>
        <div className={'app'}>
          <SideBar/>
          <main className="content">
            <div className={'statusBar'}>
              <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
              <a href={'/return'} style={{color: '#000'}}> 도서 반납</a>
            </div>
            <div className={'divider'}/>

            {
              data.length > 0 && (
                <div>
                  <div className={'tableContainer'}>
                    <div style={{fontFamily: 'GyeonggiTitleM', fontSize: '18px'}}>{getCookie('name')}님의 대출 도서 수 : {data.length}권
                    </div>
                    <br/>
                    <table className={'mainTable'}>
                      <thead>
                      <tr>
                        <th/>
                        <th style={{width: '300px'}}>제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                      </tr>
                      </thead>
                      <tbody>
                      {Object.values(data).map((log, index) => (
                        <tr key={index}>
                          <td className="checkbox-td">
                            <input type="checkbox" name={`${log.title}`} className="checkbox-box"
                                   id={log.title} onChange={(e) => {
                              checkEvent(e.currentTarget.checked, log.title)
                            }}
                                   checked={!checkedInputs.includes(log.title) ? false : true}/>
                          </td>
                          <td>{log.title}</td>
                          <td>{log.author}</td>
                          <td>{log.publisher}</td>
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


            {
              data.length === 0 && (
                <div className={'noDataBox'}>
                  <div>현재 대출 한 도서 목록이 없습니다.</div>
                  <button onClick={() => window.location.reload()} className={'reloadBtn'}>새로고침</button>
                </div>
              )
            }

          </main>
        </div>
      </div>
    )
  }
}

export default ReturnDesktop;