import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Signup from "./Signup/Signup";
import Login from "./login/login";
import Hero from "./Hero/Hero";
// import Addjob from "./AddJob/Addjob";
import CreateAccount from "./createAccount/createAccount";
import Employer from "./employer/employer";
import Jobseeker from "./jobseeker/jobseeker";
import JobDetails from "./JobDetails/JobDetails";
import ManageJobs from "./managejob/managejob";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        {/* <Route path="/addjob" element={<Addjob />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
         <Route path="/signup" element={<CreateAccount />} />
         <Route path="/employer" element={<Employer />} />
         <Route path="/jobseeker" element={<Jobseeker />} />
        <Route path="/job/:id" element={<JobDetails />} />
         <Route path="/managejob" element={<ManageJobs />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
