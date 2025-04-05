import { createContext } from "react";
import { useContext } from "react";
import { axiosClient } from "../utils/utils";
import { toast } from "react-toastify";
import { ErrorMessage } from 'formik';
import { useEffect } from "react";
import { useState } from "react";
import LoaderComponent from "../Components/LoaderComponent";

export const jobContext = createContext({
    jobs: [],
    fetchAllJobs: () => {},
});

export const useJobContext = () => {
  return useContext(jobContext);
};

export const JobContextProvider = ({ children }) => {
    const [loader,setLoader] = useState(true)
    const [jobs, setJobs] = useState([]);
    const fetchAllJobs = async () => {
      try {
        const response = await axiosClient.get('/jobs');
        const data = await response.data;
        setJobs(data);
       
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error(error.message)
      }finally{
        setLoader(false)
      }
    }
 useEffect(() => {
    fetchAllJobs();
   },[])
  
   if(loader){
    return <div className="min-h-screen flex items-center justify-center">
           <LoaderComponent/>
    </div>
   }
  
    return (
    <jobContext.Provider value={{jobs,fetchAllJobs}}>
      {children}
    </jobContext.Provider>
  );
};
