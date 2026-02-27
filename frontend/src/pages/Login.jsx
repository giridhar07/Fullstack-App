// import { useState } from "react";
// import API from "../services/api";

// export default function Login({ setLoggedIn }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async () => {
//     const res = await API.post("/users/login", { email, password });
//     localStorage.setItem("token", res.data.token);
//     setLoggedIn(true);
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow w-80">
//         <h2 className="text-xl font-bold mb-4">Login</h2>
//         <input className="border p-2 w-full mb-2"
//           placeholder="Email"
//           onChange={(e)=>setEmail(e.target.value)}
//         />
//         <input className="border p-2 w-full mb-4"
//           type="password"
//           placeholder="Password"
//           onChange={(e)=>setPassword(e.target.value)}
//         />
//         <button
//           onClick={login}
//           className="bg-blue-600 text-white w-full p-2 rounded"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

import AuthForm from "./AuthForm.jsx";
import EventsApp from "../assets/EventsApp.png";

export default function AuthPage() {
  return (
    <main className="relative min-h-screen w-full  flex justify-center items-center">
      {/* Container */}
      <div className="max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden">
        <section className="grid grid-cols-1 md:grid-cols-2 h-full">
          
          {/* Left: Image */}
          <div className="relative hidden md:block">
            <img
              src={EventsApp}
              alt="Event management visual"
              className="object-cover h-full w-full rounded-l-2xl"
            />
            <span className="sr-only">Events, venues, and attendee management illustration</span>
          </div>

          {/* Right: Glass Form */}
          <div className=" flex items-center justify-center bg-white backdrop-blur-lg ">
            {/* Divider line */}
            <div className="absolute left-0 top-0 h-full w-px bg-white"></div>

              <div className="w-full h-full rounded-l-2xl">
                <AuthForm />
              </div>
           
          </div>
        </section>
      </div>
    </main>
  );
}
