import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
// import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


export default function App() {
  const [progress,setProgress]= useState (0)
  
  
    return (
      <BrowserRouter>
                 <Navbar />  
               <LoadingBar
        color='#f11946'
        progress={progress}
      /> 
        {/* <News setprogress={setProgress} PageSize="5"countery="in" categorey="science" /> */}
           <Routes>
   
          
          
            <Route path="/" element={<News setprogress={setProgress} PageSize="5"countery="in" categorey="general" />}/>
              
            
            <Route path="/business" element={<News setprogress={setProgress} PageSize="5"countery="in" categorey="business" />}/>
              
            
            <Route path="/entertainment"element={<News setprogress={setProgress} PageSize="5"countery="in" categorey="entertainment" />
            }/>
              
                     <Route path="/Health"element={<News setprogress={setProgress} PageSize="5"countery="in" categorey="health" />}/>
              
            
            <Route path="/Science"element={<News setprogress={setProgress} PageSize="5"countery="in" categorey="science" />}/>
              
            
            <Route path="/Sports"element={<News setprogress={setProgress} PageSize="5"countery="in" categorey="sports" />}/>
              
            
            <Route path="/Technology"element={<News setprogress={setProgress} PageSize="5"countery="in" categorey="technology" />}/>
              
            
          
        </Routes>
      </BrowserRouter>
    );
  }




