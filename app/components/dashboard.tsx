import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Provider } from "react-redux"
import store from "../store/store"
import { useSelector } from "react-redux"
import axios from "axios"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import logo from "../../public/pang-board.png"
import signout from "../../public/signout.png"
import variables from "../scss/variables.module.scss"
import dashboardStyles from "../scss/dashboard.module.scss"
import "../scss/modal.scss"
import classNames from "classnames"
import GridComponent from "./grid"

import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"

interface DashboardProps {
  onSignout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ onSignout }) => {
  const router = useRouter()
  // const dashboardList = useSelector((state: any) => state.responseData)
  const DEVELOP_URL = "http://api.hyoshincopy.com"
  const [saveDashboardList, setSaveDashboardList] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [errorWrite, setErrorWrite] = useState("")
  const [open, setOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }
  const openModal = () => {
    setOpen(true)
    setTitle("")
    setContent("")
    setErrorWrite("")
  }
  const closeModal = () => {
    setOpen(false)
  }

  useEffect(() => {
    // 서버에서 데이터를 가져오는 로직을 여기에 작성하거나 필요한 경우 다른 함수로 분리해서 사용합니다.
    // 예시로 아래와 같이 axios를 사용하여 데이터를 가져오는 방법을 보여줍니다.
    const fetchData = async () => {
      try {
        const response = await axios.get(`${DEVELOP_URL}/dashboard`, {
          withCredentials: true,
        })
        const dataList = response.data.data_list
        setSaveDashboardList(dataList) // 데이터를 로컬 상태에 업데이트
      } catch (error) {
        console.log("에러 페이지")
        // router.push("/")
        // router.push("/error?code=" + error)
      }
    }

    fetchData() // 데이터를 가져오는 함수 호출
  }, [])

  const handleSignout = async () => {
    const userId = localStorage.getItem("userId")
    localStorage.removeItem("userId")
    localStorage.removeItem("token")
    try {
      const response = await axios.post(
        `${DEVELOP_URL}/signout`,
        {
          userId: userId,
        },
        {
          withCredentials: true,
        },
      )
      console.log("response", response)
      router.push("/")
    } catch (error) {
      console.log("에러 페이지")
    }
  }

  const handleWriteSubmit = async (event: any) => {
    event.preventDefault()

    try {
      const author = localStorage.getItem("userId")
      const response = await axios.post(
        `${DEVELOP_URL}/board`,
        {
          author,
          title,
          content,
        },
        {
          withCredentials: true,
        },
      )
      console.log("response.data:", response.data)
      // 모달 닫히고, 새로고침 되야 함.
      setOpen(false)
      try {
        const response = await axios.get(`${DEVELOP_URL}/dashboard`, {
          withCredentials: true,
        })
        const dataList = response.data.data_list
        setSaveDashboardList(dataList) // 데이터를 업데이트하여 목록 새로고침
      } catch (error) {
        console.log("에러 페이지")
      }
      // router.push("/dashboard")
    } catch (error: any) {
      setErrorWrite("Failed to write a post. Please Contact Pang.")
      console.log("보드 작성 오류 발생:", error.message)
    }
  }

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value)
  }

  const handleContentChange = (event: any) => {
    setContent(event.target.value)
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
            <button className={dashboardStyles["btn-signout"]} onClick={handleSignout}>
              <Image src={signout} alt="signout-icon" className={dashboardStyles["signout"]} />
              Sign out
            </button>
          </header>

          <main className={dashboardStyles["container"]}>
            {/* <h1 className={classNames(signinStyles["logo"], "animate__animated animate__bounce")}> */}
            <button
              onClick={openModal}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              className={classNames(dashboardStyles["btn-write"], {
                "animate__animated animate__pulse": isHovering,
              })}
            >
              Write post
            </button>
            <section className={dashboardStyles["section"]}>
              <GridComponent dashboardList={saveDashboardList} />
            </section>
          </main>
        </div>
        <Modal
          open={open}
          onClose={closeModal}
          center
          classNames={{
            modal: "custom-modal",
          }}
          closeOnOverlayClick={false}
        >
          <div className="top-header">
            <h3>Write a Pang board</h3>
          </div>
          <form onSubmit={handleWriteSubmit}>
            <div className="input-group">
              <div className="input-field">
                <label htmlFor="title">Title</label>
                <div className="input-effect">
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    id="title"
                    placeholder="Enter a title..."
                    required
                    className="input-box"
                    maxLength={100}
                  />
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="content">Content</label>
                <div className="input-effect">
                  <textarea
                    value={content}
                    onChange={handleContentChange}
                    id="content"
                    placeholder="Enter a content..."
                    required
                    className="input-box textarea"
                    maxLength={200}
                  />
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
              </div>
              {errorWrite && (
                <p className={dashboardStyles["notice-txt"]}>
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {errorWrite}
                </p>
              )}
              <input type="submit" className="input-submit" value="Write a post" />
            </div>
          </form>
        </Modal>
      </Provider>
    </>
  )
}

export default Dashboard
