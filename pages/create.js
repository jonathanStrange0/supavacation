import Layout from "@/components/Layout";
import ListingForm from "@/components/ListingForm";
import axios from 'axios'

import React from "react";

const create = () => {
  const addHome = data => axios.post('/api/home', data);
  return (
    <Layout>
      <div className='max-w-screen-sm mx-auto'>
        <h1 className='text-xl font-medium text-gray-800'>List Your Home</h1>
        <p className='text-gray-500'>Fill out the form below</p>
        <div className='mt-8'>
          <ListingForm
            buttonText='Add Home'
            redirectPath='/'
            onSubmit={addHome}
          />
        </div>
      </div>
    </Layout>
  );
};

export default create;
