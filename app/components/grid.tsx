import React, { useState, useEffect } from "react"
import "react-data-grid/lib/styles.css"
import DataGrid from "react-data-grid"
import axios from "axios"
import "../css/custom-grid.css"

interface GridProps {
  dashboardList: {
    id: number
    title: string
    content: string
    created_at: string
    updated_at: string
    authof: string
    views: number
    likes: number
  }[]
}

const Grid: React.FC<GridProps> = ({ dashboardList }) => {
  {
    const DEVELOP_URL = "http://api.hyoshincopy.com"
    const [columns, setColumns] = useState<any[]>([])
    const [rows, setRows] = useState<any[]>([])
    console.log("grid dashboardList:", dashboardList)
    console.log("grid dashboardList:", JSON.stringify(dashboardList))

    const convertUtcToKst = (utcTime: string) => {
      const utcDateTime = new Date(utcTime)
      const kstOffset = 9
      const kstTime = new Date(utcDateTime.getTime() + kstOffset * 60 * 60 * 1000)

      const year = kstTime.getFullYear()
      const month = String(kstTime.getMonth() + 1).padStart(2, "0")
      const date = String(kstTime.getDate()).padStart(2, "0")
      const hours = String(kstTime.getHours()).padStart(2, "0")
      const minutes = String(kstTime.getMinutes()).padStart(2, "0")
      const seconds = String(kstTime.getSeconds()).padStart(2, "0")
      const kstFormatted = `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`

      return kstFormatted
    }

    useEffect(() => {
      setColumns([
        {
          key: "id",
          name: "No",
          width: 35,
        },
        { key: "author", name: "Author" },
        {
          key: "title",
          name: "Title",
        },
        {
          key: "created_at",
          name: "Create Date",
          renderCell(props: any) {
            return convertUtcToKst(props.row.created_at)
          },
        },
        {
          key: "updated_at",
          name: "Update Date",
          renderCell(props: any) {
            return convertUtcToKst(props.row.created_at)
          },
        },
        { key: "views", name: "Views" },
        { key: "likes", name: "Likes" },
      ])
      setRows(dashboardList)
    }, [dashboardList])

    useEffect(() => {
      const token = localStorage.getItem("token")
      if (token) {
        axios.defaults.headers.common["Authorization"] = `${token}`
      }

      // try {
      //   const response = axios.get(`${DEVELOP_URL}/dashboard`, {
      //     headers: {
      //       Authorization: `${token}`,
      //     },
      //   })
      //   // console.log("token:", token)
      //   // console.log("response.data:", response.data)
      //   // /dashboard로 데이터를 전달하는 코드
      //   // dispatch(setResponseData(response.data.data_list))
      //   // localStorage
      //   // localStorage.setItem("userId", id)
      //   // localStorage.setItem("token", token)

      //   // router.push(`/dashboard`)
      // } catch (error) {
      //   console.log("에러 페이지")
      // }
    }, [])

    return (
      <>
        {dashboardList !== null ? <DataGrid columns={columns} rows={rows} /> : <div>No data.</div>}
      </>
    )
  }
}

export default Grid
