import Notification from "@/components/uncategory/Notification"
import { UserAuth } from "@/context/AuthContext"
import { adminCategoryApi } from "@/lib/api/category.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { normalizePositiveNumber } from "@/lib/utils/normalizer"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const CategoryForm = ({
  currentCategoryClicked,
  setCurrentCategoryClicked,
  mode,
  setMode,
  triggerGetData,
  setTriggerGetData,
}) => {
  const [notifications, setNotifications] = useState(false)
  const [notificationContext, setNotificationContext] = useState({})
  const [verifyInput, setVerifyInput] = useState({
    id: "",
    name: "",
    position: "",
    common: ""
  });

  useEffect(() => {
    setVerifyInput({
      id: "",
      name: "",
      position: "",
      common: ""
    })
  }, [mode, currentCategoryClicked]);

  const handleSubmit = async (e) => {
    if (mode === "add") {
      const newCategory = { name: currentCategoryClicked.name, position: currentCategoryClicked.position }
      const { success, error } = await clientFetch(adminCategoryApi.create(newCategory))
      if (!success) {
        setVerifyInput((prev) => ({
          ...prev,
          common: error,
        }));
        return;
      }
    } else {
      const updatedCategory = { name: currentCategoryClicked.name, position: currentCategoryClicked.position }
      const updatedId = currentCategoryClicked.id
      const { success, error } = await clientFetch(adminCategoryApi.update(updatedId, updatedCategory))
      if (!success) {
        setVerifyInput((prev) => ({
          ...prev,
          common: error,
        }));
        return;
      }
    }
    setNotificationContext({
      text: `Đã ${mode === "add" ? "thêm mới" : "cập nhật"} thành công`,
      style: "success",
    })
    setNotifications(true)
    setTriggerGetData((pre) => !pre)
  }

  const handleDelete = async (e) => {
    const isSure = prompt("Nhập vào 'xóa' để xóa")
    if (isSure == "xóa") {
      const { success, error } = await clientFetch(adminCategoryApi.delete(currentCategoryClicked.id))
      if (!success) {
        setVerifyInput((prev) => ({
          ...prev,
          common: error,
        }));
        return;
      }
      setNotificationContext({
        text: "Đã xóa thành công",
        style: "success",
      })
      setNotifications(true)
      setCurrentCategoryClicked({
        id: "",
        name: "",
        position: ""
      })
      setMode("add")
      setTriggerGetData((pre) => !pre)
    }
  }

  return (
    <div className=''>
      {notifications && (
        <Notification
          notification={{
            text: notificationContext.text,
            style: notificationContext.style,
          }}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      )}

      <div className='flex gap-2 justify-end'>
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            setMode("add")
            setCurrentCategoryClicked({
              name: "",
              id: "",
              position: ""
            })
          }}
          className='px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold border-blue-500 border-b-blue-500 bg-white flex-1 shrink-0 text-center'
        >
          THÊM
        </motion.div>
        <motion.div
          onClick={handleDelete}
          whileHover={{ scale: 1.1 }}
          className='px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold border-red-500 border-b-red-500 bg-white flex-1 shrink-0 text-center'
        >
          XÓA
        </motion.div>
      </div>
      <div className='p-10'>
        <h3 className='text-red-500 text-xl mb-4'>
          {verifyInput.common}
        </h3>
        <h2 className={`text-xl mb-1 text-black/50`}>
          Mã danh mục
        </h2>
        <input
          value={currentCategoryClicked?.id}
          className='outline-none border border-black/50 text-black/50 p-4 rounded-2xl w-full text-2xl font-[500] mb-4'
          placeholder='Mã danh mục'
          disabled
        />

        <h2 className={`text-xl mb-1`}>Tên danh mục</h2>
        <input
          onChange={(e) =>
            setCurrentCategoryClicked((pre) => ({
              ...pre,
              name: e.target.value,
            }))
          }
          value={currentCategoryClicked?.name}
          className='outline-none border border-black/50 p-4 rounded-2xl w-full text-2xl font-[500] mb-4'
          placeholder='Nhập tên danh mục'
        />
        <h2 className={`text-xl mb-1`}>Vị trí</h2>
        <input
          onChange={(e) =>
            setCurrentCategoryClicked((pre) => ({
              ...pre,
              position: normalizePositiveNumber(e.target.value),
            }))
          }
          value={currentCategoryClicked?.position}
          className='outline-none border border-black/50 p-4 rounded-2xl w-full text-2xl font-[500]'
          placeholder='Nhập vị trí danh mục'
        />

        <button
          onClick={handleSubmit}
          className='bg-blue-500 w-full p-4 mt-4 text-2xl font-semibold text-white rounded-2xl'
        >
          {mode === "add" ? "THÊM" : "SỬA"}
        </button>
      </div>
    </div>
  )
}

export default CategoryForm

// mode = [add, edit]
