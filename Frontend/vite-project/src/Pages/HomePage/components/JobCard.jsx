import React from 'react'
import moment from 'moment'
import { SlCalender } from "react-icons/sl";
import { MdOutlineWork, MdPublish } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import DeleteJob from './DeleteJob';

const JobCard = ({ data }) => {
  return (
    <div className='flex items-start gap-x-2 w-full border border-transparent hover:border-indigo-500 transition-all duration-300 px-5 py-3 rounded-md'>

      {/* Company Logo */}
      <div className="">
        <img
          src={data.company_profile_pic}
          alt=""
          className="rounded-full h-12 w-12 bg-gray-300 p-2 object-cover"
        />
      </div>

      {/* Job Details */}
      <div className="w-full">
        <h1 className='text-xl font-bold'>{data.company_name}</h1>
        <span className='text-sm font-medium text-gray-900'>{data.title}</span>

        <ul className="flex items-center gap-x-2 rounded-md flex-wrap gap-y-3 py-3">
          {data.skills.map((cur, i) => (
            <li key={i} className='text-xs text-gray-700 px-3 py-1 bg-gray-300 rounded'>{cur}</li>
          ))}
        </ul>

        <p className="flex items-center gap-x-2">
          <MdPublish /> <span>{moment(data.createdAt).format('ll')}</span>
        </p>

        <p className="flex items-center gap-x-2">
          <SlCalender /> <span>{moment(data.extend_date).format('ll')}</span>
        </p>

        <p className="flex items-center gap-x-2">
          <MdOutlineWork /> <span>{data.job_type}</span>
        </p>

        {/* Apply and Delete buttons */}
        <div className="flex justify-between items-center mt-4">
          <a
            href={data.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 flex items-center gap-1"
          >
            Apply <GoArrowUpRight />
          </a>

          <DeleteJob jobId={data._id} />
        </div>
      </div>
    </div>
  );
}

export default JobCard;
