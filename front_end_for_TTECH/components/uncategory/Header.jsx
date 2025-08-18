"use client"

import { UserAuth } from "@/context/AuthContext"
import { categoryApi } from "@/lib/api/category.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CiUser } from "react-icons/ci"
import Cart from "../cart/Cart"
import CategoryPhone from "./CategoryPhone"
import SearchBar from "./SearchBar"
const Header = () => {
  const [category, setCategory] = useState([])
  const { user } = UserAuth()
  const router = useRouter()

  const getAllCategory = async () => {
    const { success, data } = await clientFetch(categoryApi.list())
    if (success)
      setCategory(data)
    else
      console.error("Header: Failed to fetch categories");
    ;
  }

  const handleOnClick = () => {
    if (user?.id) {
      router.push("/account")
      return
    }
    router.push("/login")
  }

  const handleOnClickLogo = () => {
    const nextRoute = "/"; // user.roles.includes("ADMIN") ? "/admin" : "/";
    router.push(nextRoute);
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  return (
    <div className='fixed top-0 z-30 inset-x-0 px-10 h-[50px] bg-white/20 backdrop-blur-md'>
      <div className='mx-3 mt-3'>
        <div className='flex w-full items-center gap-[10px] justify-evenly '>
          <div className='lg:hidden p-2'>
            <CategoryPhone />
          </div>
          <div
            onClick={handleOnClickLogo}
            className='shinks-0'
          >
            <Image
              alt=''
              src={"/images/1x/Asset1.png"}
              width={81.081081}
              height={20}
            />
          </div>

          <ul className='hidden md:flex overflow-x-scroll flex-nowrap noneScrollBar my-2'>
            <motion.li
              whileHover={{ color: "red" }}
              onClick={() =>
                router.push(
                  "/products?IsDescending=false&pageNumber=1&pageSize=12"
                )
              }
              className='text-[1.3rem] font-[300] capitalize mx-2 text-black/80 cursor-pointer whitespace-nowrap	'
            >
              All
            </motion.li>

            {category?.map((category, index) => (
              <motion.li
                whileHover={{ color: "red" }}
                key={index}
                onClick={() => {
                  router.push(
                    "/products?" +
                    "categoryId=" +
                    category.id +
                    "&IsDescending=true&pageNumber=1&pageSize=12"
                  )
                }}
                className='text-[1.3rem] font-[300] capitalize mx-2 text-black/80 cursor-pointer whitespace-nowrap	'
              >
                {category.name}
              </motion.li>
            ))}
          </ul>

          <motion.div className='grow-[1] '>
            <SearchBar />
          </motion.div>

          <motion.div className=' p-2 '>
            <Cart />
          </motion.div>

          <motion.div
            onClick={handleOnClick}
            whileHover={{ color: "#dc2626" }}
            className='md:block cursor-pointer'
          >
            <CiUser size={25} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Header
