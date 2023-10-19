"use client"

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";

export default function SignUpPage() {

    const router=useRouter();
    const [buttonDisabled,setButtonDisabled]=useState(false);
    const [loading,setLoading]=useState(false);

    const [user,setUser]=useState({
        email:"",
        password:"",
        username:""
    })

    const onSignUp=async()=>{
        try {
            setLoading(true);
            const respose = await axios.post("/api/users/signup",user);
            console.log("Sign Up Success",respose.data);
            toast.success("Sign Up Success");
            router.push("/login");
        } catch (error:any) {
            console.log("Sign Up Failed",error.message);

            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col md:w-[35%] w-[50%] mx-auto mt-32">
        <h1 className="text-center pb-2">Sign Up</h1>
        <hr/>
        <label className="pt-2" htmlFor="username">Username</label>
        <input
         className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
         placeholder="Username"
         type="text"
         id="username"
         value={user.username}
         onChange={(e)=>setUser({...user,username:e.target.value})}
        />
        <label htmlFor="email">Email</label>
        <input
         className="p-2  text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
         placeholder="Email"
         type="text"
         id="email"
         value={user.email}
         onChange={(e)=>setUser({...user,email:e.target.value})}
        />
        <label htmlFor="password">Password</label>
        <input
         className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
         placeholder="Password"
         type="password"
         id="password"
         value={user.password}
         onChange={(e)=>setUser({...user,password:e.target.value})}
        />
        <button
         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
         onClick={onSignUp}
        >
            Sign Up
        </button>
        <Link href="/login">
            Already have an account? Login
        </Link>
        </div>
    )
}