import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
// import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <BrowserRouter>
                 <Navbar />  
               <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      /> 
        {/* <News setprogress={this.setProgress} PageSize="3" countery="in" categorey="science" /> */}
           <Routes>
   
          
          
            <Route path="/" element={<News setprogress={this.setProgress} PageSize="3" countery="in" categorey="general" />}/>
              
            
            <Route path="/business" element={<News setprogress={this.setProgress} PageSize="3" countery="in" categorey="business" />}/>
              
            
            <Route path="/entertainment"element={<News setprogress={this.setProgress} PageSize="3" countery="in" categorey="entertainment" />
            }/>
              
                     <Route path="/Health"element={<News setprogress={this.setProgress} PageSize="3" countery="in" categorey="health" />}/>
              
            
            <Route path="/Science"element={<News setprogress={this.setProgress} PageSize="3" countery="in" categorey="science" />}/>
              
            
            <Route path="/Sports"element={<News setprogress={this.setProgress} PageSize="3" countery="in" categorey="sports" />}/>
              
            
            <Route path="/Technology"element={<News setprogress={this.setProgress} PageSize="3" countery="in" categorey="technology" />}/>
              
            
          
        </Routes>
      </BrowserRouter>
    );
  }
}
