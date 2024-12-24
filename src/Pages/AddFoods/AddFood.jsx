import React, { useContext, useState } from 'react'
import { IoMdClose, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authContext } from '../../Provider/AuthProvider';

export default function AddMovies() {
  const { user } = useContext(authContext);
  console.log(user);
  
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const donator={
      name: user.displayName,
      email: user.email,
      profile: user.photoURL
    };
    const foodName = form.foodName.value;
    const date = form.date.value;
    const photo = form.photo.value;
    const quentity = form.quentity.value;
    const status = form.status.value;
    const location = form.location.value;
    const summary = form.summary.value;

    /// validations the movie url ----------------------------

    const urlPattern = /^https?:\/\/[\w.-]+\.[a-z]{2,6}(\/[\w-./?%&=]*)?$/i;
    if (!urlPattern.test(photo)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Movie URL",
        text: "Please enter a valid movie URL",
        confirmButtonText: "Okay"
      });
      return;
    }

    /// validations the movie title ----------------------------

    if (!foodName || foodName.trim().length < 2) {
      Swal.fire({
        icon: "error",
        title: "Invalid Movie Title",
        text: "Please enter a valid movie title with at least 2 characters",
        confirmButtonText: "Okay"
      });
      return;
    }

    /// validations the movie title ----------------------------

    if (!summary || summary.trim().length < 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Movie Summary",
        text: "You must provide at least 10 characters",
        confirmButtonText: "Okay"
      });
      return;
    }

    const MovieInfo = { donator, foodName, date, photo, quentity, status, location, summary, }
    console.log(MovieInfo);
       
      // fetch(`${import.meta.env.VITE_foods_api}/foods`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(MovieInfo)
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     // console.log(data);
      //     if (data.insertedId) {
      //       Swal.fire({
      //         position: "center center",
      //         icon: "success",
      //         title: `New Movie Added Successfully`,
      //         showConfirmButton: false,
      //         timer: 2500
      //       });
      //       form.reset();
      //       setTimeout(() => {
      //         Navigate('/allmovives');
      //       }, 2000);
      //     }
      //   })


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
                <input name='foodName' type="text" placeholder="Food Name" className="input input-bordered" required />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Expire date</span>
                </label>
                <input name='date' type="date" placeholder="expire date" className="input input-bordered" required />
              </div>

            </div>
            {/* 2nd value collection */}
            <div className=' flex justify-between items-center gap-5 my-2'>
            <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Food URL</span>
                </label>
                <input name='photo' type="text" placeholder="Food URL" className="input input-bordered" required />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Food Quentity</span>
                </label>
                <input name='quentity' type="number" placeholder="Food Quentity" className="input input-bordered" required />
              </div>
            </div>
            {/* 3rd value collection */}
            <div className=' flex justify-between items-center gap-5 my-2'>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Food Status</span>
                </label>
                <select className=' p-3 bg-transparent border-2 rounded-md text-semibold outline-none text-gray-400 border-gray-700 focus:ring-2 focus:ring-gray-700' name="status" id="" required>
                  <option className=' text-black' value="" disabled selected>Food Status</option>
                  <option className=' text-black' value="available">available</option>
                  <option className=' text-black' value="requested">requested</option>
                  <option className=' text-black' value="sells">expired</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input name='location' type="text" placeholder="Pickup location" className="input input-bordered" required />
              </div>
            </div>
            <div>
              <textarea
                placeholder="Foods description..." name='summary' required
                className="textarea textarea-bordered textarea-lg w-full"></textarea>
            </div>

            <div className="form-control">
              <button className="btn btn-primary  text-white">Add Foods</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}