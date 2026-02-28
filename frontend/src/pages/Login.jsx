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
