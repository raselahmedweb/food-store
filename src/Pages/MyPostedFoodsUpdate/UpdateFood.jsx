import React, { useContext, useState } from 'react'
import { IoMdClose, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authContext } from '../../Provider/AuthProvider';

export default function AddFood() {
  const { user } = useContext(authContext);
  const Navigate = useNavigate();
  const updateFood = useLoaderData();

  const { _id, foodName, foodImg, expireDateTime, quantity, foodStatus, location } = updateFood;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const donator={
      name: user.displayName,
      email: user.email,
      img: user.photoURL
    };
    const foodName = form.foodName.value;
    const foodImg = form.photo.value;
    const expireDateTime = form.date.value;
    const quantity = form.quentity.value;
    const foodStatus = form.status.value;
    const location = form.location.value;

    /// validations the food url ----------------------------

    const urlPattern = /^https?:\/\/[\w.-]+\.[a-z]{2,6}(\/[\w-./?%&=]*)?$/i;
    if (!urlPattern.test(foodImg)) {
      Swal.fire({
        icon: "error",
        title: "Invalid food URL",
        text: "Please enter a valid food URL",
        confirmButtonText: "Okay"
      });
      return;
    }

    /// validations the food title ----------------------------

    if (!foodName || foodName.trim().length < 2) {
      Swal.fire({
        icon: "error",
        title: "Invalid food Title",
        text: "Please enter a valid food title with at least 2 characters",
        confirmButtonText: "Okay"
      });
      return;
    }

    const addFoods = { 
      foodName,
      foodImg, 
      quantity, 
      location,
      expireDateTime, 
      donator,
      foodStatus, 
    }
    
    /// call the api and update the my posted food --------------------
       
      fetch(`${import.meta.env.VITE_foods_api}/update/${_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addFoods)
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          if (data.modifiedCount > 0) {
            Swal.fire({
              position: "center center",
              icon: "success",
              title: `Updated food successfull.`,
              showConfirmButton: false,
              timer: 2500
            });
            form.reset();
            setTimeout(() => {
              Navigate('/mypost');
            }, 2000);
          }
        })


  }


  return (
    <>
      <div className=' container mx-auto flex flex-col justify-center items-center'>
        <div className="bg-base-100 w-full max-w-7xl shrink-0 shadow-2xl relative">
          <h2 className=' text-center font-bold  text-2xl mt-5'>Add Foods</h2>
          <Link to="/" className=' absolute top-1 -right-2 w-10 h-10 rounded-full text-red-400 text-2xl'><IoMdClose /></Link>
          <form onSubmit={handleSubmit} className="card-body">
            <div className=' flex justify-between items-center gap-5 my-2'>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">D.R Name</span>
                </label>
                <input name='DR' type="text" value={user?.displayName} placeholder="DR Name" className="input input-bordered" required />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">D.R email</span>
                </label>
                <input name='email' type="text" value={user?.email} placeholder="DR your email" className="input input-bordered" required />
              </div>

            </div>

            {/* part two faield */}

            <div className=' flex justify-between items-center gap-5 my-2'>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Food Name</span>
                </label>
                <input name='foodName' type="text" placeholder="Food Name" defaultValue={foodName} className="input input-bordered" required />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Expire date</span>
                </label>
                <input name='date' type="date" defaultValue={expireDateTime} placeholder="expire date" className="input input-bordered" required />
              </div>

            </div>
            {/* 2nd value collection */}
            <div className=' flex justify-between items-center gap-5 my-2'>
            <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Food URL</span>
                </label>
                <input name='photo' type="text" placeholder="Food URL" defaultValue={foodImg} className="input input-bordered" required />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Food Quentity</span>
                </label>
                <input name='quentity' type="number" placeholder="Food Quentity" defaultValue={quantity} className="input input-bordered" required />
              </div>
            </div>
            {/* 3rd value collection */}
            <div className=' flex justify-between items-center gap-5 my-2'>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Food Status</span>
                </label>
                <select className=' p-3 bg-transparent border-2 rounded-md text-semibold outline-none text-gray-400 border-gray-700 focus:ring-2 focus:ring-gray-700' defaultValue={foodStatus} name="status" id="" required>
                  <option className=' text-black' value="" disabled>Food Status</option>
                  <option className=' text-black' value="Available">Available</option>
                  <option className=' text-black' value="Requested">Requested</option>
                  <option className=' text-black' value="Expired">Expired</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input name='location' type="text" defaultValue={location} placeholder="Pickup location" className="input input-bordered" required />
              </div>
            </div>

            <div className="form-control">
              <button className="btn btn-primary  text-white">Update Foods</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}