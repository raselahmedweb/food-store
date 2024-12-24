import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HomeCards() {

  const [foods, setFoods] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_foods_api}/allfoods`)
      .then(res => res.json())
      .then(data => setFoods(data))
  }, [])

  return (
    <>
      <div className=' grid md:grid-cols-2 lg:grid-cols-3 gap-10 container mx-auto md:mt-20'>
        {foods.map(data => <div key={data._id}>
          <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg object-cover w-full h-[300px]" src={data.foodImg} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.foodName}</h5>
              </a>
              <p className={`mb-3 font-semibold text-lg text-gray-700 ${data.foodStatus === "Available" ? "text-green-500" : ""} ${data.foodStatus === "Pending" ? "text-blue-600" : ""} ${data.foodStatus === "Expired" ? "text-[#e96666]" : ""} inline rounded-full`}>{data.foodStatus}</p>
              <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400">Expire Date: {data.expireDateTime}</p>
              <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400">Quentity:  <span className=' bg-slate-600 py-1 px-3 rounded-full'>{data.quantity}</span></p>
              <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400">Location: {data.location}</p>
              <div className=' flex flex-col justify-end items-end'>
                <Link to={`/details/${data._id}`} className=' btn btn-primary text-white'>See Details</Link>
              </div>
            </div>
          </div>
        </div>)}
      </div>
      <div className=' flex justify-center items-center w-full my-20'><Link to="/allfood" className=' btn btn-accent'>See More Movie</Link></div>

    </>
  )
}
