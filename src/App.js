/*
 * @file App.js
 * @author Ashish H. Prajapati (prajapatiashish40567@gmail.com)
 * @brief Main file for the application to handle routing and context API 
 * 
 * @details This file is the main file for the application. It handles the routing and context API for the application.
 *          It also checks if the user is logged in or not and then renders the components accordingly.
 *          If the user is not logged in, it will redirect the user to the login page.
 *
 * @version 0.1
 * @date 14th March 2024
 *
 * @history 14th March 2021 Finalized the file for version 0.1
 */

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./styles/globals.css";
import { createContext, useEffect, useState } from "react";


// context API to check if the user is logged in or not
// export const AppContext = createContext();

// // function to check if the user is logged in or not
// const checkLogin = async () => {

//   const username = localStorage.getItem("email") || null;
//   const password = localStorage.getItem("password") || null;

//   let response = { success: false };

//   if (username!==null && password!==null) {
//     response = await Login_F({ username, password }).then((response) => {
//       return response;
//     });
//   }

//   return response;
// };

function App() {
  // to check if the user is logged in or not
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   checkLogin().then((response) => {
  //     if (response?.success)
  //       setIsLoggedIn(true);
  //     else
  //       setIsLoggedIn(false);
  //   });
  // }, []);

  return (
    // <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
          <Routes>
            <Route path="/" element={<div className=" bg-black text-red-600">Home</div>} />
          </Routes>
      </Router>
    // </AppContext.Provider>
  );
}

export default App;
