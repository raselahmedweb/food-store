import React from 'react'

export default function Delevary() {
  return (
    <>
      <div
        className="hero h-[800px] object-cover rounded-md"
        style={{
          backgroundImage: "url(https://restfast-react.vercel.app/assets/hero-slider-BIia5jLe.png)",
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="">
            <h1 className="mb-5 text-5xl font-bold">A captivating show that takes viewers behind the scenes of movie production.</h1>
            <p className="mb-5 text-xl font-semibold">A List of all available shotting retreats.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      {/* 2nd section start here now */}
      <div className=' w-full container mx-auto'>
        <h1 className=' text-3xl text-start mt-10 mb-5 w-full'>Delivary man</h1>
      </div>
      <div className=' grid md:grid-cols-2 lg:grid-cols-3 gap-10 container mx-auto mb-20 text-black'>
        <div className=' bg-slate-100 p-5 rounded-md'>
          <img className=' mb-5 h-[600px] object-cover w-full' src="https://img.freepik.com/free-photo/food-delivery-boy-delivering-food-scooter_1303-27695.jpg" alt="" />
          <h2 className=' text-xl font-semibold'>Hochzillertal, Austria</h2>
          <h2 className=' text-xl font-semibold'>2 Nights</h2>
        </div>
        <div className=' bg-slate-100 p-5 rounded-md'>
          <img className=' mb-5 h-[600px] object-cover w-full' src="https://st2.depositphotos.com/4218696/43704/i/450/depositphotos_437048410-stock-photo-happy-smiling-black-delivery-man.jpg" alt="" />
         <h2 className=' text-xl font-semibold'>Verbier, Swizerland</h2>
          <h2 className=' text-xl font-semibold'>8 Nights</h2>
        </div>
        <div className=' bg-slate-100 p-5 rounded-md'>
          <img className=' mb-5 h-[600px] object-cover w-full' src="https://thumbs.dreamstime.com/b/food-delivery-cheerful-handsome-young-delivery-guy-holding-boxes-hot-pizza-109997703.jpg" alt="" />
          <h2 className=' text-xl font-semibold'>Hochzillertal, Iceland</h2>
          <h2 className=' text-xl font-semibold'>`2 Nights</h2>
        </div>
      </div>
      {/* 3rd section start here now */}

      <div className=' relative w-full'>
        <div
          className="hero h-[400px] object-cover"
          style={{
            backgroundImage: "url(https://bslthemes.com/html/quickeat/assets/img/background-img.jpg)",
          }}>
        </div>
      </div>
    </>
  )
}