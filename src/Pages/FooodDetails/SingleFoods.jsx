import React from 'react'
import { Link } from 'react-router-dom';

export default function SingleFoods({ foods }) {
    const { _id, foodName, foodImg, quantity, location, expireDateTime, donator, foodStatus } = foods;

    const handleDetails = (id) => {
        // console.log(id);
    }

    return (
        <>
            <div>
                <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg object-cover w-full h-[300px]" src={foodImg} alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{foodName}</h5>
                        </a>
                        <p className={`mb-3 font-semibold text-lg text-gray-700 ${foodStatus === "Available" ? "text-green-500" : ""} ${foodStatus === "Pending" ? "text-blue-600" : "text-blue-600"} ${foodStatus === "Expired" ? "text-[#e96666]" : ""} inline rounded-full`}>{foodStatus}</p>
                        <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400 bg-gray">Quantity: <span className=' bg-gray-700 py-1 px-3 rounded-full'>{quantity}</span></p>
                        <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400">Expired Date: {expireDateTime}</p>
                        <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400 bg-gray">Locations: {location}</p>
                        <div className=' flex flex-col justify-end items-end'>
                            <Link to={`/details/${_id}`} className=' btn btn-primary text-white'>See Foods Details</Link>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}