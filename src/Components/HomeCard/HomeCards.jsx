import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HomeCards() {

  // useing the transtrac queryes --------------

  const { isPending, data: foods} = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_foods_api}/allfoods`)
      return await res.json()
    }
  })


  // const [foods, setFoods] = useState([])

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_foods_api}/allfoods`)
  //     .then(res => res.json())
  //     .then(data => setFoods(data))
  // }, [])

  if(isPending){
    return <div className=' flex justify-center items-center h-screen'>Loading...</div>
  }

  return (
    <>
      <div className=' grid md:grid-cols-2 lg:grid-cols-3 gap-10 container mx-auto md:my-20'>
        {foods?.map(data => <div key={data._id}>
          <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg object-cover w-full h-[300px]" src={data.foodImg} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.foodName}</h5>
              </a>
              <p className={`mb-3 font-semibold text-lg ${data.foodStatus === "Available" ? "text-green-500" : ""} ${data.foodStatus === "Requested" ? "text-blue-600" : ""} ${data.foodStatus === "Expired" ? "text-[#e96666]" : ""} inline rounded-full`}>{data.foodStatus}</p>
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
      <div className={`${foods.length ? "flex justify-center items-center w-full my-10" : "hidden"}`}><Link to="/allfood" className='btn btn-accent'>See All Foods</Link></div>

    </>
  )
}
