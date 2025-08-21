"use client"
import { UserAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { CiLogout } from "react-icons/ci"
import UserDataForm from "../user/UserDataForm"

const AdminProfileManagement = () => {
  const { user, logoutAdmin } = UserAuth()

  return (
    <div className='container mx-auto flex mt-10 gap-5'>
      <div onClick={() => { }} className='container mx-auto'>
        <div className='flex justify-between items-center mx-2'>
          <motion.div className='text-[5rem] font-[300] uppercase h-[60px] leading-[60px]'>
            <motion.div
              initial='offscreen'
              whileInView='onscreen'
              transition={{ staggerChildren: 0.1 }}
              className='font-[600] '
            >
              HY! {user?.name}{" "}
            </motion.div>
          </motion.div>
          <CiLogout
            size={25}
            onClick={() => logoutAdmin()}
            className='bg-red-500 text-white p-2 rounded-3xl cursor-pointer'
          />
        </div>
        <UserDataForm />
      </div>
    </div>
  )
}

export default AdminProfileManagement
