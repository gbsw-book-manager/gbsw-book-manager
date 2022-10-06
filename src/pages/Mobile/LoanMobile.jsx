import React, {useEffect, useState} from 'react';
import fetcher from "../../utils/fetcher";
import useSWR from 'swr'
import '../../styles/Table.css'
import Loading from "../../components/Loading";
import HamburgerMenu from "../../components/HamburgerMenu";
import {getCookie} from "../../utils/cookies";
import Swal from "sweetalert2";
import axios from "axios";
import jwt_decode from "jwt-decode";

const LoanMobile = () => {
  const [checkedInputs, setCheckedInputs] = useState([])
  const [userId, setUserId] = useState('')

  const {data, error} = useSWR('https://bookmanager-api.jinhyo.dev/api/book', fetcher)

  const checkEvent = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
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
    } else {
      let decoded = jwt_decode(getCookie('access_token'))
      setUserId(decoded.id)
    }
  }, [])

  const loanBook = () => {
    let data = {
      "userId": userId,
      "bookId": checkedInputs
    }
    if (checkedInputs.length > 5) {
      Swal.fire({
        title: 'Error!',
        text: '최대 대출 도서 수는 5권입니다.',
        icon: 'error',
        confirmButtonText: '확인'
      })
    }
    else if (checkedInputs.length > 0) {
      axios
        .post('https://bookmanager-api.jinhyo.dev/api/book/loan', JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        }).then((res) => {
        if (!res.data) {
          Swal.fire({
            title: 'Success',
            text: '도서 대출 신청이 완료되었습니다. 관리자 승인 후 메일이 오면 실습실에서 대여하세요!',
            icon: 'success',
            confirmButtonText: '확인'
          }).then(() => {
            window.location.reload()
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: '대출 신청을 한 책, 이미 대출 한 책, 수량 부족 또는 대출한 도서의 수가 5권 이상입니다.',
            icon: 'error',
            confirmButtonText: '확인'
          })
        }
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
              <a href={'/loan'} style={{color: '#000'}}> 도서 대출</a>
            </div>
            <div className={'divider'}/>
            <div className={'tableContainer'}>
              <table className={'mainTable'}>
                <thead>
                <tr>
                  <th></th>
                  <th>제목</th>
                  <th>저자</th>
                  <th>출판사</th>
                  <th>총<br/>수량</th>
                  <th>남은<br/>수량</th>
                </tr>
                </thead>
                <tbody>
                {Object.values(data).map((log, index) => (
                  <tr key={index}>
                    <td className="checkbox-td">
                      <input type="checkbox" name={`${log.title}`} className="checkbox-box"
                             id={log.id} onChange={(e) => {
                        checkEvent(e.currentTarget.checked, log.id)
                      }}
                             checked={!checkedInputs.includes(log.id) ? false : true}/>
                    </td>
                    <td>{log.title}</td>
                    <td>{log.author}</td>
                    <td>{log.publisher}</td>
                    <td>{log.quantity}</td>
                    <td>{log.quantityleft}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <button className={checkedInputs.length === 0 ? 'btnNotActive' : 'loanBtnActive'} id={'dynamicBtn'}
                    style={{marginTop: '35px'}} onClick={loanBook}>대출하기
            </button>
          </main>
        </div>
      </div>
    )
  }
}

export default LoanMobile;