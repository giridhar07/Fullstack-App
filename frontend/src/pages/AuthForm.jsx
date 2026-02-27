import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/UserContext.jsx"
export default function AuthForm() {
  const [mode, setMode] = useState("login")
  const [form, setForm] = useState({ username: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
   const navigate = useNavigate()

     const { fetchUserProfile} = useAuth()
   
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === "login") {
        const response = await axios.post("http://localhost:5000/api/users/login", {
          email: form.email,
          password: form.password,
        },{
          withCredentials: true}
      )
        if (response.status === 200) {
          toast.success("Login successful 🎉")
          setForm({ username: "", email: "", password: "" })
          await fetchUserProfile()
           navigate("/")
        }
      } else {
        const response = await axios.post("http://localhost:5000/api/users/signup", {
          username: form.username,
          email: form.email,
          password: form.password,
        })
        if (response.status === 201) {
          toast.success("Account created successfully 🎉")
          setMode("login")
        }
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong ❌")
    } finally {
      setLoading(false)
    }
  }

  const isLogin = mode === "login"

  return (
    <div className="h-full p-8 bg-white/10  border border-white/20 shadow-lg "
    //  style={{
    //     boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
    //  }}
    >
      {/* Toggle */}
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-white/10 p-1 backdrop-blur-md border border-white/20">
        <button
          type="button"
          onClick={() => setMode("login")}
          aria-pressed={isLogin}
          className={`rounded-md px-3 py-2 text-sm font-medium transition ${
            isLogin ? "bg-sky-500 text-white shadow-md" : "text-black/70 hover:text-gray-600"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          aria-pressed={!isLogin}
          className={`rounded-md px-3 py-2 text-sm font-medium transition ${
            !isLogin ? "bg-sky-500 text-white shadow-md" : "text-black/70 hover:text-gray-600"
          }`}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div className="grid gap-1.5">
            <label htmlFor="username" className="text-sm font-medium text-white/90">
              Username
            </label>
            <input
    id="username"
    name="username"
    value={form.username}
    onChange={handleChange}
    autoComplete="username"
    required
    placeholder="yourusername"
    className="w-full px-3 py-2 rounded-lg outline-none border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 shadow-sm"
  />
          </div>
        )}

        <div className="grid gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-white/90">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full px-3 py-2 rounded-lg outline-none border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 shadow-sm"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-white/90">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
            placeholder={isLogin ? "Enter your password" : "Create a strong password"}
            className="w-full px-3 py-2 rounded-lg outline-none border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {loading ? (isLogin ? "Logging in..." : "Creating account...") : isLogin ? "Login" : "Create account"}
        </button>

        {isLogin && (
          <div className="flex items-center justify-end text-xs">
            <button type="button" onClick={() => setMode("signup")} className="text-sky-400 hover:underline">
              Create an account
            </button>
          </div>
        )}
      </form>

      <p className="mt-5 text-xs text-white/60">
        Required fields: {isLogin ? "Email, Password" : "Username, Email, Password"}
      </p>
    </div>
  )
}

