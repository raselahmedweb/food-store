import React, { useContext } from 'react'
import { data, Link, useLoaderData, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { authContext } from '../../Provider/AuthProvider';

export default function FoodDetails() {

    const { user } = useContext(authContext);
    const currrentTime = new Date();
    const requestedTime = `${currrentTime.toLocaleDateString()} - ${currrentTime.toLocaleTimeString()}`

    const singleFoodData = useLoaderData();
    console.log(singleFoodData);

    const { _id, foodName, foodImg, quantity, location, expireDateTime, donator, foodStatus } = singleFoodData;
    const Navigate = useNavigate();
    const allMovie = () => {
        Navigate('/allmovives');
    }

    const handledelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be delete this movie",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://movie-portal-back.vercel.app/delete/${id}`, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                position: "center center",
                                icon: "success",
                                title: "Deleted successfully",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                        // console.log(data);
                        Navigate('/allmovives');

                    })
            }
        });
    }

    /// Updated movies functionality start here here now ---------------------------------

    const handleUpdate = (id) => {
        Navigate(`/updatemovie/${id}`);
    }

    /// favirite functionality starting .................................

    const handleRequest = () => {

        my_modal_3.showModal()

        // Swal.fire({
        //     position: "center center",
        //     icon: "success",
        //     title: "Request Successfull",
        //     showConfirmButton: false,
        //     timer: 2000
        //   });
    }


    return (
        <>

            {/* useing the modal code */}

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal w-5xl">
                <div className=" modal-box p-0 bg-gray-800">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="card-body">
                        <div className=' flex justify-between items-center gap-5 my-2'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold">Food Name</span>
                                </label>
                                <input name='DR' type="text" value={foodName} placeholder="DR Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold">Food image</span>
                                </label>
                                <input name='email' type="text" value={foodImg} placeholder="DR your email" className="input input-bordered" required />
                            </div>

                        </div>

                        {/* part two faield */}

                        <div className=' flex justify-between items-center gap-5 my-2'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold">Food Id</span>
                                </label>
                                <input name='foodName' type="text" placeholder="Food Name" value={_id} className="input input-bordered" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold">Donator Email</span>
                                </label>
                                <input name='date' type="text" value={donator.email} placeholder="expire date" className="input input-bordered" required />
                            </div>

                        </div>
                        {/* 2nd value collection */}
                        <div className=' flex justify-between items-center gap-5 my-2'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold">Donator Name</span>
                                </label>
                                <input name='photo' type="text" value={donator.name} placeholder="Food URL" className="input input-bordered" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">User email</span>
                                </label>
                                <input name='quentity' type="text" value={user?.email} placeholder="Food Quentity" className="input input-bordered" required />
                            </div>
                        </div>
                        {/* 3rd value collection */}
                        <div className=' flex justify-between items-center gap-5 my-2'>
                            
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Request Date</span>
                                </label>
                                <input name='location' type="text" value={requestedTime}  placeholder="current date" className="input input-bordered" required />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Picup location</span>
                                </label>
                                <input name='location' type="text" value={location}  placeholder="current date" className="input input-bordered" required />
                            </div>

                            
                        </div>
                        {/* 4th value collection */}
                        <div className=' flex justify-between items-center gap-5 my-2'>
                            
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Expired Date</span>
                                </label>
                                <input name='location' type="text" value={expireDateTime}  placeholder="current date" className="input input-bordered" required />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold">Food Status</span>
                                </label>
                                <select className=' w-full p-3 bg-transparent border-2 rounded-md text-semibold outline-none text-gray-400 border-gray-700 focus:ring-2 focus:ring-gray-700' name="status" defaultValue={foodStatus} id="" required>
                                    <option className=' text-black' value="" disabled selected>Food Status</option>
                                    <option className=' text-black' value="available">available</option>
                                    <option className=' text-black' value="requested">requested</option>
                                    <option className=' text-black' value="sells">expired</option>
                                </select>
                            </div>

                            
                        </div>

                        <div className="form-control">
                            <button className="btn btn-accent text-white">Request</button>
                        </div>
                    </div>
                </div>
            </dialog>

            {/* useing the modal code end---- */}


            <div className=' flex flex-col justify-center items-center my-10'>
                <h2 className=' text-3xl font-bold my-3'>Foods Details</h2>
            </div>
            <div className=" container mx-auto grid grid-cols-6 gap-10 mb-10 bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className=' col-span-3 p-10'>
                    <img className="object-cover w-full rounded-lg" src={foodImg} alt="" />
                </div>
                <div className="flex flex-col justify-center col-span-3 p-4 w-full">
                    <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{foodName}</h5>
                    <p className={`mb-3 font-bold text-lg ${foodStatus === "Available" ? "text-green-500" : ""} ${foodStatus === "Requested" ? "text-blue-600" : ""} ${foodStatus === "Expired" ? "text-[#e96666]" : ""} inline rounded-full`}>{foodStatus}</p>
                    <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400">Quantity: <span className=' bg-gray-600 py-1 px-3 rounded-full'>{quantity}</span></p>
                    <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400">D.R Email: {donator.name}</p>
                    <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400">Expire Date: {expireDateTime}</p>
                    <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400">Location: {location}</p>
                    <div className=' flex gap-5 items-center mt-5'>
                        <Link to="/allfood" className=' btn btn-primary font-semibold text-white'>Add to Other</Link>
                        <button onClick={handleRequest} className=' btn btn-accent font-semibold text-white'>Add to Request</button>
                    </div>
                </div>
            </div>
        </>
    )
}