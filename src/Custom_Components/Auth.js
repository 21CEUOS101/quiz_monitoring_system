import { Link } from "react-router-dom";
import { UserAuthForm } from "./UserAuthForm";


export const metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function Auth() {
  return (
    <div className="h-screen">
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to={"/login"}
          className="absolute right-4 top-4 md:right-8 md:top-8 bg-secondary 
          text-secondary-foreground hover:bg-secondary/80 inline-flex items-center 
          justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background 
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
          focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
          h-10 px-4 py-2 border-2 border-black
          "
        >
          Login
        </Link>
        <div className="relative hidden h-screen flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Quizwiz
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Teachers love our quiz-monitoring app for its ease of use and robust security features. It’s designed to streamline the quiz process, ensuring fairness and efficiency, allowing educators like Ms. Smith to focus on what they do best: teaching!&rdquo;
              </p>

              <footer className="text-sm">- Tony Stark</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}