import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { RxCross1 } from "react-icons/rx"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { skills } from "../../../utils/constant"
import { axiosClient } from '../../../utils/utils'
import { toast } from 'react-toastify'
import { useJobContext } from '../../../Context/JobContext'


const AddJob = () => {
    let [isOpen, setIsOpen] = useState(false); 
    const {fetchAllJobs} = useJobContext()
   

    const initialStates = {
      title: '',
      skills: [],
      company_name: '',
      salary: 10000,
      extend_date: new Date(),
      job_url: '',
      company_profile_pic: '',
      job_type: ''
    };

    const validationSchema = yup.object({
      title: yup.string().required('Title is required'),
      skills: yup.array().of(yup.string()).min(1, 'At least one skill is required'),
      company_name: yup.string().required('Company Name is required'),
      salary: yup.number().required('Salary is required'),
      extend_date: yup.date().required('Extend Date is required'),
      job_url: yup.string().required('Job URL is required'),
      company_profile_pic: yup.string().required('Company Profile Pic is required'),
      job_type: yup.string().required('Job Type is required')
    });

    const onSubmitHandler = async (values, helpers) => {
      try {
          console.log(values);
          const response = await axiosClient.post("/create", values); // Corrected route
          const data = await response.data;
          await fetchAllJobs(); // Fetch all jobs after adding a new one
          toast.success(data.msg)
          close()
          helpers.resetForm();
      } catch (error) {
          console.error("API Error:", error); // Log the error
      }
  };



    function open() {
      setIsOpen(true);
    }

    function close() {
      setIsOpen(false);
    }

    return (
      <>
        <div className="mb-3 flex justify-end">
          <button 
            onClick={open}
            className='px-3 py-2 border-none outline-none text-white rounded-sm bg-indigo-500'>
            Add Job
          </button>
        </div>

        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-[30vh] items-center justify-center p-4">
              <DialogPanel
                className="w-full max-w-2xl rounded-xl bg-white border p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <div className="flex justify-between items-center">
                  <DialogTitle as="h3" className="text-base font-medium text-black">
                    Post Your Job
                  </DialogTitle>
                  <button onClick={close} className='outline-none cursor-pointer border-none p-3 text-xl bg-gray-300 rounded-full'>
                    <RxCross1 />
                  </button>
                </div>

                <Formik onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={initialStates} >
                  {({ values , setFieldValue }) => (
                    <Form className="py-4"> 
                          
                      <div className="mb-3">
                        <Field name="title" className="w-full py-2 border rounded px-3 outline-none" placeholder="Enter Job Title" />
                        <ErrorMessage name="title" component="p" className="text-red-500 text-xs" />
                      </div>

                      <div className="mb-3">
                           <label htmlFor='skills'>Skills</label>
                            <ul className='grid grid-cols-5 gap-2'>
                            {
                            skills.map((skill) => (
                                   <li 
                                   onClick={() => {

                                    if (values.skills.includes(skills)){
                                       const filter_skills = values.skills.filter((s) => s !== skill);
                                       setFieldValue('skills',filter_skills)
                                       
                                    }
                                    else {
                                      setFieldValue('skills', [...values.skills, skill])
                                    }


                                   }}
                                   className = {`py-2 w-full border border-indigo-500 px-2 my-2 
                                    ${values.skills.includes(skill) ? 'bg-indigo-500 rounded-sm text-white':
                                      'border-indigo-500 text-black'}`}>
                                        {skill}
                                    </li>
                            ))
                           }
                            </ul>
                        <ErrorMessage name="skills" component="p" className="text-red-500 text-xs" />
                      </div>


                      <div className="mb-3">
                        <Field name="company_name" className="w-full py-2 border rounded px-3 outline-none" 
                        placeholder="Enter Company Name" />
                        <ErrorMessage name="company_name" component="p" className="text-red-500 text-xs" />
                      </div>


                      <div className="mb-3">
                        <Field type="number" name="salary" className="w-full py-2 border rounded px-3 outline-none" 
                        placeholder="Enter Your Salary" />
                        <ErrorMessage name="salary" component="p" className="text-red-500 text-xs" />
                      </div>

                    
                      <div className="mb-3">
                        <Field type="date" name="extend_date" className="w-full py-2 border rounded px-3 outline-none" 
                        placeholder="Enter Extend Date" />
                        <ErrorMessage name="extend_date" component="p" className="text-red-500 text-xs" />
                      </div>

                      <div className="mb-3">
                        <Field type="url" name="job_url" className="w-full py-2 border rounded px-3 outline-none" 
                        placeholder="Enter Job Url" />
                        <ErrorMessage name="job_url" component="p" className="text-red-500 text-xs" />
                      </div>

                      <div className="mb-3">
                        <Field type="url" name="company_profile_pic" className="w-full py-2 border rounded px-3 outline-none" 
                        placeholder="Enter Company Profile Pic Url" />
                        <ErrorMessage name="company_profile_pic" component="p" className="text-red-500 text-xs" />
                      </div>


                      <div className="mb-3">
                        <Field type as = "select" name="job_type" className="w-full py-2 border rounded px-3 outline-none">
                          <option value="">Select Job Type</option>
                          <option value="full-time">Full Time</option>
                          <option value="part-time">Part Time</option>
                          <option value="internship">Internship</option>

                        </Field>
                      
                        <ErrorMessage name="extend_date" component="p" className="text-red-500 text-xs" />
                      </div>


                       <div className="mb-3">
                        <button type='submit' className='w-full px-3 py-2 border-none outline-none text-white rounded-sm bg-indigo-500'>
                          Post Job
                        </button>
                       </div>

                    </Form>
                  )}
                </Formik>

              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </>
    );
}

export default AddJob;
