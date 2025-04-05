import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { axiosClient } from '../utils/utils';

const ContactPage = () => {
  const initialStates = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    subject: yup.string().required('Subject is required'),
    message: yup.string().required('Message is required')
  });

  const onSubmitHandler = async (values, helpers) => {
    try {
      const response = await axiosClient.post('/contact', values);
      const data = await response.data;
      console.log("Form submitted with values:", values);
      toast.success("Message sent successfully!");
      helpers.resetForm();
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="p-4 mx-auto max-w-xl bg-white">
        <h1 className="text-2xl text-slate-900 font-semibold text-center">Contact us</h1>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialStates}
          onSubmit={onSubmitHandler}
        >
          <Form>
            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">Name</label>
              <Field
                name="name"
                type="text"
                placeholder="Enter Name"
                className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border focus:border-slate-900 focus:bg-transparent text-sm outline-none transition-all"
              />
              <ErrorMessage name="name" component="p" className="text-xs text-red-500" />
            </div>

            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">Email</label>
              <Field
                name="email"
                type="email"
                placeholder="Enter Email"
                className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border focus:border-slate-900 focus:bg-transparent text-sm outline-none transition-all"
              />
              <ErrorMessage name="email" component="p" className="text-xs text-red-500" />
            </div>

            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">Subject</label>
              <Field
                name="subject"
                type="text"
                placeholder="Enter Subject"
                className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border focus:border-slate-900 focus:bg-transparent text-sm outline-none transition-all"
              />
              <ErrorMessage name="subject" component="p" className="text-xs text-red-500" />
            </div>

            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">Message</label>
              <Field
                as="textarea"
                name="message"
                placeholder="Enter Message"
                rows={4}
                className="w-full px-4 text-slate-800 bg-gray-100 border focus:border-slate-900 focus:bg-transparent text-sm pt-3 outline-none transition-all"
              />
              <ErrorMessage name="message" component="p" className="text-xs text-red-500" />
            </div>

            <button
              type="submit"
              className="mt-8 text-white bg-slate-900 hover:bg-slate-800 tracking-wide text-[15px] px-4 py-2 w-full outline-none"
            >
              Send
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default ContactPage;
