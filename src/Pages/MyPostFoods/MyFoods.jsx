import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Provider/AuthProvider'
import { Link, useNavigate } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Swal from 'sweetalert2';

export default function MyFoods() {
  const { user } = useContext(authContext)
  const [myFoods, setMyFoods] = useState([])

  const Navigate = useNavigate();

  // Fetch my foods from MongoDB--------------

  useEffect(() => {
    fetch(`${import.meta.env.VITE_foods_api}/posted?email=${user?.email}`)
      .then(res => res.json())
      .then(data => setMyFoods(data))

    //     axios.get(`http://localhost:5000/apply?email=${user.email}`, /// axios use korle amader duibar then korte hoy na and method headers asob kono kicu dite hoy nah
    //     {withCredentials: true})
    //     .then(res => setJobs(res.data)
    //     )
    // }, [user.email])
  }, [user?.email])

  /// delete my posted data form mongodb -----------------------

  const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be delete this food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${import.meta.env.VITE_foods_api}/delete/${id}`, {
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
                setMyFoods(myFoods.filter(food => food._id !== id))
              }
              // console.log(data);
              Navigate('/mypost');

            })
        }
      });
  }


  return (
    <>
      {
        !myFoods.length ? <h2 className=' text-center text-3xl font-bold flex justify-center items-center'>You are Not posted any foods.</h2> :
          <div className=' container mx-auto w-full'>
            <div className="overflow-x-auto">
              <h2 className=' text-xl font-bold text-center my-10'>My Posted Foods </h2>
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th className=' text-lg text-white'>Foods</th>
                    <th className=' text-lg text-white'>Expired Date</th>
                    <th className=' text-lg text-white'>Quantity</th>
                    <th className=' text-lg text-white'>Food Status</th>
                    <th className=' text-lg text-white'>Customs</th>
                  </tr>
                </thead>
                {
                  myFoods.map(donar =>
                    <tbody key={donar._id}>
                      {/* row 1 */}
                      <tr>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={donar.foodImg}
                                  alt="Avatar Tailwind CSS Component" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{donar.foodName}</div>
                              <div className="text-sm opacity-100">{donar.location}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <h2 className="badge badge-ghost text-lime-400 font-bold">{donar.expireDateTime}</h2>
                        </td>
                        <td><span className=' bg-gray-700 font-bold py-1 px-3 rounded-full'>{donar.quantity}</span></td>
                        <td className={`${donar.foodStatus === "Available" ? "text-green-500" : ""} ${donar.foodStatus === "Requested" ? "text-blue-600" : ""} ${donar.foodStatus === "Expired" ? "text-[#e96666]" : ""}`}>{donar.foodStatus}</td>
                        <th>
                          <Link to={`/update/${donar._id}`} className="btn bg-gray-600 text-white font-semibold mr-3 text-md"><CiEdit /> Edit</Link>
                          <button onClick={() => handleDelete(donar._id)} className="btn btn-error font-semibold text-md"><RiDeleteBin5Line /> Delete</button>
                        </th>
                      </tr>
                    </tbody>
                  )
                }
              </table>
            </div>
          </div>
      }
    </>
  )
}
