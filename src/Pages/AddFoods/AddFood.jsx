import React, { useContext, useState } from 'react'
import { IoMdClose, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import { AuthContext } from '../AuthProviders/AuthProvider';

export default function AddMovies() {
  // const { userEmail } = useContext(AuthContext);
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const photo = form.photo.value;
    const title = form.title.value;
    const genry = form.genry.value;
    const duration = form.duration.value;
    const year = form.year.value;
    const ratting = form.ratting.value;
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

    if (!title || title.trim().length < 2) {
      Swal.fire({
        icon: "error",
        title: "Invalid Movie Title",
        text: "Please enter a valid movie title with at least 2 characters",
        confirmButtonText: "Okay"
      });
      return;
    }

    /// validations the movie Durations ----------------------------

    if (duration == 60 || duration <= 60) {
      Swal.fire({
        icon: "error",
        title: "Invalid Movie Duration",
        text: "Minimum duration must be 60",
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

    const MovieInfo = { photo, title, genry, duration, year, ratting, summary, userEmail }
    // console.log(MovieInfo);

    fetch('https://movie-portal-back.vercel.app/movie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(MovieInfo)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "center center",
            icon: "success",
            title: `New Movie Added Successfully`,
            showConfirmButton: false,
            timer: 2500
          });
          form.reset();
          setTimeout(() => {
            Navigate('/allmovives');
          }, 2000);
        }
      })


  }


  return (
    <>
      <div className=' container mx-auto flex flex-col justify-center items-center'>
        <div className="bg-base-100 w-full max-w-7xl shrink-0 shadow-2xl relative">
          <h2 className=' text-center font-bold  text-2xl mt-5'>Add Movie</h2>
          <Link to="/" className=' absolute top-1 -right-2 w-10 h-10 rounded-full text-red-400 text-2xl'><IoMdClose /></Link>
          <form onSubmit={handleSubmit} className="card-body">
            <div className=' flex justify-between items-center gap-5 my-2'>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Movie URL</span>
                </label>
                <input name='photo' type="text" placeholder="Movie URL" className="input input-bordered" required />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Movie Title</span>
                </label>
                <input name='title' type="text" placeholder="Movie title" className="input input-bordered" required />
              </div>
            </div>
            {/* 2nd value collection */}
            <div className=' flex justify-between items-center gap-5 my-2'>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Movie Genre</span>
                </label>
                <select className=' p-3 bg-transparent border-2 rounded-md text-semibold outline-none border-gray-700 focus:ring-2 focus:ring-gray-700' name="genry" id="" required>
                  <option value="" disabled selected>Select Genry</option>
                  <option value="comedy">Comedy</option>
                  <option value="drama">Drama</option>
                  <option value="horror">Horror</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Movie Duration</span>
                </label>
                <input name='duration' type="number" placeholder="Movie duration" className="input input-bordered" required />
              </div>
            </div>
            {/* 3rd value collection */}
            <div className=' flex justify-between items-center gap-5 my-2'>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Movie Release Year</span>
                </label>
                <select className=' p-3 bg-transparent border-2 rounded-md text-semibold outline-none border-gray-700 focus:ring-2 focus:ring-gray-700' name="year" id="" required>
                  <option value="" disabled selected>Select Release Year</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Movie Ratting</span>
                </label>
                <input name='ratting' type="number" placeholder="Movie Ratting" className="input input-bordered" required />
              </div>
            </div>
            <div>
              <textarea
                placeholder="Movie Summary" name='summary' required
                className="textarea textarea-bordered textarea-lg w-full"></textarea>
            </div>

            <div className="form-control">
              <button className="btn btn-primary  text-white">Add Movie</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}