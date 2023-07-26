import React, { useState } from "react"
import { Provider } from "react-redux"
import store from "../store/store"
import { useSelector } from "react-redux"
import axios from "axios"
import Image from "next/image"
import logo from "../../public/pang-board.png"
import variables from "../scss/variables.module.scss"
import dashboardStyles from "../scss/dashboard.module.scss"
import classNames from "classnames"

interface DashboardProps {
  onSignout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ onSignout }) => {
  const dashboardList = useSelector((state: any) => state.responseData)
  const DEVELOP_URL = "http://api.hyoshincopy.com"

  const handleSignout = async () => {
    try {
      const response = await axios.post(`${DEVELOP_URL}/signout`, {
        withCredentials: true,
      })
      console.log("response", response)
    } catch (error) {
      console.log("에러 페이지")
    }
  }

  return (
    <>
      <Provider store={store}>
        <div className={dashboardStyles["wrapper"]}>
          <header className={dashboardStyles["header"]}>
            <h1 className={dashboardStyles["logo"]}>
              <Image src={logo} alt="pang-board-icon" />
              <a href="#" style={{ color: variables.lavenderColor }}>
                Pang Board
              </a>
            </h1>
            <button onClick={handleSignout}>Sign out</button>
          </header>

          <main>
            <h2>글 목록</h2>
            {dashboardList &&
              dashboardList.map((item: any) => (
                <li key={item.board_id}>
                  <p>{item.board_id}</p>
                  <p>{item.content}</p>
                  <p>{item.title}</p>
                </li>
              ))}
            <h2>글 쓰기</h2>
            <button>글 쓰기</button>
            <h2>글 수정</h2>
            <h2>글 삭제</h2>
          </main>
          <footer>footer</footer>
        </div>
      </Provider>
    </>
  )
}

export default Dashboard
