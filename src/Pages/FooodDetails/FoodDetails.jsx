import React from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function FoodDetails() {

    const singleFoodData = useLoaderData();
    console.log(singleFoodData);

    const { foodName, foodImg, quantity, location, expireDateTime, donator, foodStatus } = singleFoodData;
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
            <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
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
                    <p className={`mb-3 font-bold text-lg text-gray-700 ${foodStatus === "Available" ? "text-green-500" : ""} ${foodStatus === "Pending" ? "text-blue-600" : "text-blue-600"} ${foodStatus === "Expired" ? "text-[#e96666]" : ""} inline rounded-full`}>{foodStatus}</p>
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