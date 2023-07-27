import React, { useState, useEffect } from "react"
import { Provider } from "react-redux"
import store from "../store/store"
import { useSelector } from "react-redux"
import axios from "axios"
import Image from "next/image"
import logo from "../../public/pang-board.png"
import signout from "../../public/signout.png"
import variables from "../scss/variables.module.scss"
import dashboardStyles from "../scss/dashboard.module.scss"
import "../scss/modal.scss"
import classNames from "classnames"
// import BoardModalComponent from "./boardModal"
// import Swal from "sweetalert2"
// import Modal from "react-modal"

import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"

interface DashboardProps {
  onSignout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ onSignout }) => {
  const dashboardList = useSelector((state: any) => state.responseData)
  const DEVELOP_URL = "http://api.hyoshincopy.com"
  // const [isShowModal, setIsShowModal] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [open, setOpen] = useState(false)
  const openModal = () => {
    setOpen(true)
    setTitle("")
    setContent("")
  }
  const closeModal = () => {
    setOpen(false)
  }

  const handleSignout = async () => {
    const userId = localStorage.getItem("userId")
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
    } catch (error) {
      console.log("에러 페이지")
    }
  }

  const handleWriteSubmit = async (event: any) => {
    event.preventDefault()

    try {
      const response = await axios.post(
        `${DEVELOP_URL}/board`,
        {
          title: "",
          content: "",
        },
        {
          withCredentials: true,
        },
      )
    } catch (error: any) {}
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
              <Image
                src={signout}
                alt="signout-icon"
                className={dashboardStyles["signout"]}
                title="signout"
              />
              Sign out
            </button>
          </header>

          <main className={dashboardStyles["container"]}>
            <button onClick={openModal} className={dashboardStyles["btn-write"]}>
              Write post
            </button>
            <section>
              {dashboardList &&
                dashboardList.map((item: any) => (
                  <li key={item.board_id}>
                    <p>{item.board_id}</p>
                    <p>{item.content}</p>
                    <p>{item.title}</p>
                  </li>
                ))}
              asd
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
                    className="input-box effect-9"
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
              <input type="submit" className="input-submit" value="Write a post" />
            </div>
          </form>
        </Modal>
      </Provider>
    </>
  )
}

export default Dashboard
