"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {

    const router=useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Success");
            router.push("/login");
        } catch (error:any) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

    return (
        <div className="
            min-h-screen
            flex
            flex-col
            justify-center
            items-center
        " >
            Profile Page
            <button
             onClick={logout}
             className="
                bg-blue-500
                hover:bg-blue-700
                text-white
                font-bold
                py-2
                px-4
                rounded
            " >
                Logout
            </button>
        </div>
    )
}