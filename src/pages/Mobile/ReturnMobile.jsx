import React, {useState} from 'react';
import fetcher from "../../utils/fetcher";
import useSWR from 'swr'
import '../../styles/Table.css'
import Loading from "../../components/Loading";
import HamburgerMenu from "../../components/HamburgerMenu";

const ReturnMobile = () => {
  const [checkedInputs, setCheckedInputs] = useState([]);

  const {data, error} = useSWR('http://localhost:8080/api/book', fetcher)

  const checkEvent = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
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
            <div className={'divider'}></div>
            <div className={'tableContainer'}>
              <div>ooo님의 대출 도서 수 : {data.length}</div>
              <table className={'mainTable'}>
                <thead>
                <tr>
                  <th/>
                  <th>ID</th>
                  <th style={{width: '300px'}}>제목</th>
                  <th>저자</th>
                  <th>출판사</th>
                </tr>
                </thead>
                <tbody>
                {Object.values(data).map((log) => (
                  <tr key={1}>
                    <td className="checkbox-td"><input type="checkbox" name={`${log.title}`} className="checkbox-box"
                                                       id={log.id} onChange={(e) => {checkEvent(e.currentTarget.checked, log.id)}}
                                                       checked={!checkedInputs.includes(log.id) ? false : true}/>
                    </td>
                    <td>{log.id}</td>
                    <td>{log.title}</td>
                    <td>{log.author}</td>
                    <td>{log.publisher}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <button className={checkedInputs.length === 0 ? 'btnNotActive' : 'returnBtnActive'} id={'dynamicBtn'}>반납하기</button>
          </main>
        </div>
      </div>
    )
  }
}

export default ReturnMobile;