import React, {useState} from 'react';
import SideBar from "../../components/SideBar";
import fetcher from "../../utils/fetcher";
import useSWR from 'swr'
import '../../styles/Table.css'
import Loading from "../../components/Loading";
import axios from "axios";
import Swal from "sweetalert2";

const LoanDesktop = () => {
  const [checkedInputs, setCheckedInputs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const {data, error} = useSWR('http://localhost:8080/api/book', fetcher)

  const checkEvent = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  }

  const loanBook = () => {
    console.log(user.id)
    let data = {
      "userId": user.id,
      "bookId": checkedInputs
    }

    if (checkedInputs.length > 0) {
      axios
        .post('http://localhost:8080/api/book/loan', JSON.stringify(data), {
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
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: res.data,
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
          <SideBar/>
          <main className="content">
            <div className={'statusBar'}>
              <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
              <a href={'/loan'} style={{color: '#000'}}> 도서 대출</a>
            </div>
            <div className={'divider'}></div>
            <div className={'tableContainer'}>
              <table className={'mainTable'}>
                <thead>
                <tr>
                  <th></th>
                  <th style={{width: '200px'}}>제목</th>
                  <th>저자</th>
                  <th>출판사</th>
                  <th>총 수량</th>
                  <th>남은 수량</th>
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
            <button className={checkedInputs.length === 0 ? 'btnNotActive' : 'loanBtnActive'}
                    id={'dynamicBtn'} onClick={loanBook}>대출 신청
            </button>
          </main>
        </div>
      </div>
    )
  }
}

export default LoanDesktop;

