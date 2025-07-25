"use client"

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { useRouter } from "next/navigation"
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { auth } from "../firebaseConfig"
import { handleUser } from "@/app/api/handleUser"
import { handleAuth } from "@/app/api/handleAuth"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [token, setToken] = useState("")
  const [triggerLogin, setTriggerLogin] = useState(false)

  const router = useRouter()

  const handleUserWhenLogInByGoogle = async (
    currentUser
  ) => {
    //call API check user is exit (search by uid) on database
    const isExit = await handleUser.getUserById(
      currentUser?.uid
    )

    if (isExit?.user_id) {
      // if exit => login this user on database
      const login_form = {
        phone: isExit.phone,
        password: isExit.email,
      }
      const res_login = await handleAuth.login(login_form)

      if (res_login?.token) {
        const { user, token } = res_login
        setToken(token)
        setUser(user)
        router.push("/")
      }
    } else {
      // if not exit => register user (add to USER table on database)
      const user_format = {
        userId: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        phone: (Math.random() * 10)
          .toString()
          .split(".")[1]
          .split("")
          .slice(0, 10)
          .join(""),
        password: currentUser.email,
        role: "USER",
      }

      const res_register = await handleAuth.register(
        user_format
      )

      if (res_register?.token) {
        setUser(res_register.user)
        setToken(res_register.token)
        router.push("/")
      }
    }
  }

  const logout = () => {
    //clear user and token
    setUser({})
    setToken("")

    //remove token and user in localstorage
    localStorage.removeItem("TTECH_user")
    localStorage.removeItem("TTECH_token")

    // redirect to main page

    router.push("/")
  }

  const logoutAdmin = () => {
    //clear user and token
    setUser({})
    setToken("")

    //remove token and user in localstorage
    localStorage.removeItem("TTECH_user")
    localStorage.removeItem("TTECH_token")

    // redirect to main page
    router.push("/admin/login")
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then((result) => {
      const { user } = result
      handleUserWhenLogInByGoogle(user)
    })
  }

  const logOutGoogle = () => {
    signOut(auth)
  }

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("TTECH_user"))
      const token = JSON.parse(localStorage.getItem("TTECH_token"))

      setUser(user)
      setToken(token)
      // if (user?.id) {
      //   setUser(user)
      // }
      // if (token) {
      //   setToken(token)
      // }
    } catch (error) { }
  }, [])

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("TTECH_user", JSON.stringify(user))
    }
    if (token) {
      localStorage.setItem("TTECH_token", JSON.stringify(token))
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        setUser,
        googleSignIn,
        logOutGoogle,
        logoutAdmin,

        setToken,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
