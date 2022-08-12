import React from 'react';
import SideBar from "../components/SideBar";
import fetcher from "../utils/fetcher";
import useSWR from 'swr'
import './Loan.css'
import Loading from "../components/Loading";

const Loan = () => {

  const {data, error} = useSWR('http://localhost:8080/book', fetcher)
  console.log(data)

  if (error) {
    return <div>ERROR</div>
  } else if (!data) {
    return <Loading />
  }
  else {
    return (
      <div>
        <SideBar/>
        <section className={'home'}>
          <div className={'statusBar'}><a href={'/'} style={{ color: '#999' }}>홈</a> {'>'} <a href={'/loan'} style={{ color: '#000' }}>도서 대출</a></div>
          <div className={'divider'}></div>
          <table className={'mainTable'}>
            <thead>
            <tr>
              <th>ID</th>
              <th style={{ width: '100px' }}>제목</th>
              <th>저자</th>
              <th>출판사</th>
              <th>총 수량</th>
              <th>남은 수량</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(data).map((log: any) => (
              <tr key={1}>
                <td>{log.id}</td>
                <td>{log.title}</td>
                <td>{log.author}</td>
                <td>{log.publisher}</td>
                <td>{log.quantity}</td>
                <td>{log.quantityleft}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </section>
      </div>
    )
  }
}

export default Loan;