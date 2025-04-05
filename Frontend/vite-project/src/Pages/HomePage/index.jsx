import React from 'react'
import AddJob from './components/AddJob'
import JobCard from './components/JobCard'

import { useJobContext } from '../../context/JobContext'

const HomePage = () => {
  const {jobs} = useJobContext()


  return (
    <>
            <AddJob/>

            {/* other components */}
            <div className="grid  grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-3 px-3 w-full">
              {
               jobs &&jobs.length>0 && jobs.map((cur,i)=>{
                  return <JobCard key={i} data={cur} />
                })
              }
            </div>
    </>
  )
}

export default HomePage