import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2';
import { IoSearchSharp } from 'react-icons/io5';
import SingleFoods from '../FooodDetails/SingleFoods';

export default function AllMovies() {
  const allfood = useLoaderData();
  

  const [foodData, setFoodData] = useState(allfood);
  const [layout, setLayout] = useState(false);
  
  const [search, setSearch] = useState("");
  

  /// sorting functationality starts here now....

  const handleSort = ()=>{
    const sortedFoods = [...foodData].sort((a, b) => b.quantity - a.quantity);
    setFoodData(sortedFoods);
    Swal.fire({
      position: "center center",
      icon: "success",
      title: "Foods Sorted",
      showConfirmButton: false,
      timer: 2500
    });
   }

   //// Search the under all movies and show to search releted data

   useEffect(()=>{
      fetch(`${import.meta.env.VITE_foods_api}/food?searchParams=${search}`)
       .then(res => res.json())
       .then(data => {
        setFoodData(data);
       })
   }, [search])

  
  return (
    <>
      <div className=' w-96 md:container mx-auto'>
        <div className=' md:flex justify-between items-center my-10'>
          <div>
            <h2 className=' text-xl font-bold'>Total Foods Data ({foodData.length}) </h2>
          </div>
          <div className=' w-96 my-5 md:my-0'>
          <input type="text" onChange={e=> setSearch(e.target.value)} placeholder="Search Movie" className="input input-bordered w-full" />
          </div>
           <div>
          <div>
            <button onClick={()=>setLayout(!layout)} className={`btn ${layout === true ? "btn-info" : "btn-primary"} mr-5 text-white`}>Change Layout</button>
            <button onClick={()=>handleSort()} className=' btn btn-accent text-white'>Sort by Quantity</button>
          </div>

           </div>
        </div>
         
         {/* Showing the movie data  */}
         {
          foodData.length?
          <div className={`grid md:grid-cols-2 ${layout === true ? "lg:grid-cols-2" : "lg:grid-cols-3"} gap-10 mb-10`}>
           {foodData.map(foods => <SingleFoods key={foods._id} foods={foods} />)}
           </div> : <div className=' text-3xl font-semibold flex justify-center gap-3 items-center'> <IoSearchSharp /> Not found Foods</div>
        }
      </div>
    </>
  )
}