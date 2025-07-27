"use client"
import { adminSupplierApi } from "@/lib/api/supplier.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { useEffect, useState } from "react"
import SupplierForm from "./supplierManagement/SupplierForm"
import SupplierRenderList from "./supplierManagement/SupplierRenderList"

const AdminSupplierManagement = () => {
  const [supplierList, setSupplierList] = useState([])
  const [mode, setMode] = useState("add")
  const [triggerGetData, setTriggerGetData] = useState(false)

  const [currentSupplierClicked, setCurrentSupplierClicked] = useState({})

  const getData = async () => {
    const { data } = await clientFetch(adminSupplierApi.list())
    if (Array.isArray(data)) setSupplierList(data)
  }

  useEffect(() => {
    getData()
  }, [triggerGetData])

  return (
    <div className='container mx-auto flex mt-10 gap-5'>
      <div className='flex-1'>
        <SupplierRenderList
          supplierList={supplierList}
          setSupplierList={setSupplierList}
          currentSupplierClicked={currentSupplierClicked}
          setCurrentSupplierClicked={setCurrentSupplierClicked}
          setMode={setMode}
        />
      </div>
      <div className='flex-1 bg-white'>
        <SupplierForm
          currentSupplierClicked={currentSupplierClicked}
          setCurrentSupplierClicked={setCurrentSupplierClicked}
          mode={mode}
          setMode={setMode}
          triggerGetData={triggerGetData}
          setTriggerGetData={setTriggerGetData}
        />
      </div>
    </div>
  )
}

export default AdminSupplierManagement
