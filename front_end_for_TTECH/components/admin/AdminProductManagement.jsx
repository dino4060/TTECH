"use client"

import { useState } from "react"
import ProductAction from "./productManagement/ProductAction"
import ProductManagementForm from "./productManagement/ProductManagementForm"
import ProductRenderList from "./productManagement/ProductRenderList"
import useDebounce from "@/customHook/useDeboune"
import { useEffect } from "react"
import { handleProduct } from "@/app/api/handleProduct"
import { handleCategory } from "@/app/api/handleCategory"
import { handleSupplier } from "@/app/api/handleSupplier"
import { UserAuth } from "@/context/AuthContext"
import { clientFetch } from "@/lib/http/fetch.client"
import { adminCategoryApi } from "@/lib/api/category.api"
import { adminSupplierApi } from "@/lib/api/supplier.api"
import { adminProductApi } from "@/lib/api/product.api"

const AdminProductManagement = () => {
  const { token, user, logout } = UserAuth()

  const [currentProductChoose, setCurrentProductChoose] = useState({})
  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 999_999,
  })
  const [triggerImage, setTriggerImage] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [list, setList] = useState([])
  const [supplier, setSupplier] = useState([{}])
  const [category, setCategory] = useState([{}])
  const [allImageOfProduct, setAllImageOfProduct] = useState([])

  const getAllImage = async () => {
    try {
      const result = await handleProduct.getAllImageOfProduct(
        currentProductChoose?.productId
      )
      setAllImageOfProduct(result)
    } catch (error) { }
  }

  useEffect(() => {
    getAllImage()
  }, [currentProductChoose, triggerImage])

  const getData = async () => {
    try {
      const { data: categories } = await clientFetch(adminCategoryApi.list())
      setCategory(categories)

      const { data: suppliers } = await clientFetch(adminSupplierApi.list())
      setSupplier(suppliers)

    } catch (error) { }
  }

  useEffect(() => {
    getData()
  }, [])

  const filterDebounce = useDebounce(filter, 1000)

  const getProduct = async () => {
    try {
      const { data: { items: products } } = await clientFetch(adminProductApi.list())
      setList(products)

    } catch (error) { }
  }

  useEffect(() => {
    getProduct()
  }, [filterDebounce, trigger])

  return (
    <>
      <div className='container mx-auto mt-14 p-6 bg-white rounded-3xl'>
        <ProductAction
          setList={setList}
          filter={filter}
          setFilter={setFilter}
          setTrigger={setTrigger}
          category={category}
          setCategory={setCategory}
          supplier={supplier}
          setSupplier={setSupplier}
          currentProductChoose={currentProductChoose}
          setCurrentProductChoose={setCurrentProductChoose}
        />
        <div className='flex gap-3 mt-4 flex-1'>
          <ProductRenderList
            filter={filterDebounce}
            list={list}
            setList={setList}
            setCurrentProductChoose={setCurrentProductChoose}
            currentProductChoose={currentProductChoose}
          />
          <div className=''>
            <ProductManagementForm
              setTrigger={setTrigger}
              currentProductChoose={currentProductChoose}
              category={category}
              setCategory={setCategory}
              supplier={supplier}
              setSupplier={setSupplier}
              allImageOfProduct={allImageOfProduct}
              setAllImageOfProduct={setAllImageOfProduct}
              triggerImage={triggerImage}
              setTriggerImage={setTriggerImage}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProductManagement
