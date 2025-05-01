"use client";
import InputBox from "@repo/components/ui/inputBox"
import { ArrowRight } from "lucide-react";
import { GoogleBtn } from "@repo/components/ui/googleBtn";
import Link from "next/link";
import { GithubBtn } from "@repo/components/ui/githubBtn";
import { useState } from "react";
import { useSignUp  } from "../../lib/hooks/useSignup";


export default function Signup() {

  const [email, setEmail] = useState("")
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { handleSignUp } = useSignUp();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true)
    handleSignUp(
      email, 
      firstName,
      lastName,
      password, 
      confirmPassword, 
      setError,
      setLoading
    );
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      <div className="fixed inset-0 bg-[#0c0c0c]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] rounded-b-lg bg-white blur-[100px] "></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px]  bg-white blur-[100px]"></div>
          <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-[#0c0c0c] blur-[100px] animate-pulse delay-700"></div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-md space-y-8 relative">
        {/* Glass card */}
        <div className="backdrop-blur-xl bg-white/5 px-8 pt-8 rounded-3xl shadow-2xl border border-white/10">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <div className="relative">
              <a href="/">
                <img src="./Cleven removeBg.png" alt="cleven.studio" className="h-16 object-cover cursor-pointer" />
              </a>
              <div className="absolute inset-0 flex items-center justify-center">
              </div>
            </div>
          </div>

          <div className="text-center space-y-2 mb-1">
            <h1 className="text-2xl font-semibold text-white"></h1>
            <p className="text-xl font-semibold text-white">
              Orchestrating Solutions Beyond the Obvious!{" "}</p>
          </div>


          <div className="text-center space-y-2 mb-5">
            <h1 className="text-2xl font-semibold text-white"></h1>
            <p className="text-gray-400 text-sm">
              Already have account{" "}
              <Link href="/signin" className="text-white underline hover:text-gray-200">
                Sign in
              </Link>
            </p>
          </div>



          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <InputBox
                placeholder={"Fisrt name*"}
                type={"text"}

                onChange={(value)=>setfirstName(value)}
              />

              <InputBox
                placeholder={"Last name*"}
                type={"text"}

                onChange={(value)=>setlastName(value)}
              />
            </div>


            <InputBox
              placeholder={"Email Address*"}
              type={"email"}

              onChange={(value)=>setEmail(value)}
            />

            <InputBox
              placeholder={"Password*"}
              type={"Password"}

              onChange={(value)=>setPassword(value)}
            />

            <InputBox
              placeholder={"Confirm Password*"}
              type={"Password"}

              onChange={(value)=>setConfirmPassword(value)}
            />


            <button
              type="submit"
              className="w-full bg-[#1c1c1c] hover:bg-[#2c2c2c] text-white font-medium py-3 rounded-xl cursor-pointer transition-colors flex items-center justify-center space-x-2 group"
            >
              {loading ? (
                <div className="mini-loader"></div>
              ) : (
                <>
                  <span>Sign up</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-1/2 border-t border-white/10"></div>
              <span className="px-2  text-gray-400">OR</span>
              <div className="w-1/2 border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
            </div>
          </div>


          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <GoogleBtn /><GithubBtn />
          </div>

          <div className="w-full min-h-8 flex justify-center items-center text-red-500">
            {error}
          </div>
        </div>
      </div>
    </main>
  );
}
