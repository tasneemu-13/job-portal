import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';  
import AddJob from './Pages/HomePage/components/AddJob';    // Change this line
import { JobContextProvider } from './context/JobContext';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <JobContextProvider>
          <main className="container mx-auto py-3">
              <Routes>
              <Route path="/" Component={HomePage}/>
              <Route path="/about" Component={AboutPage}/>
              <Route path="/contact" Component={ContactPage}/>
              </Routes>
          </main>
          </JobContextProvider>
        <Footer/>
      </BrowserRouter>
    </>
  )
}
export default App;