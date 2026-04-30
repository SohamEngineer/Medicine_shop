import React from 'react'
import "tailwindcss"
// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }

function About() {

  const doctors = [
    {
      id:1,
      name: "Dr. Felica Queen",
      title: "Sr. Psychologist",
      image: "/image/doctor5.jpg",
      alt: "Portrait of Dr. Felica Queen, a senior psychologist, smiling and wearing a white coat with a stethoscope around her neck."
    },
    {
      id:2,
     name: "Dr. Felica Queen",
      title: "Sr. Psychologist",
      image: "/image/doctor1.jpg",
      alt: "Portrait of Dr. Felica Queen, a senior psychologist, smiling and wearing a white coat with a stethoscope around her neck." 
    },
    {
      id:3,
     name: "Dr. Felica Queen",
      title: "Sr. Psychologist",
      image: "/image/doctor4.jpg",
      alt: "Portrait of Dr. Felica Queen, a senior psychologist, smiling and wearing a white coat with a stethoscope around her neck." 
    },
    {
      id:4,
     name: "Dr. Felica Queen",
      title: "Sr. Psychologist",
      image: "/image/doctor3.jpg",
      alt: "Portrait of Dr. Felica Queen, a senior psychologist, smiling and wearing a white coat with a stethoscope around her neck." 
    },
  ]
  return (
    <>

    <div className="relative">
          <img
            src="https://storage.googleapis.com/a1aa/image/TWcEBUCx547n5sJ9JGkfbC2tXQdeh1bUsWLYvsRA040.jpg"
            alt="Background image showing a doctor with a stethoscope and a smiling child"
            className="w-full h-64 object-cover opacity-60 z-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white ">
            <h1 className="text-4xl font-bold text-danger">About Us</h1>
            <div className="flex items-center space-x-2 mt-2">
              <span className='text-black'>Home</span>
              <span className="text-sm text-black">&gt;</span>
              <span className="text-sm text-black">About Us</span>
            </div>
          </div>
        </div>




        
    <div className='container mx-auto py-12'>
      <div className='text-center mb-12'>
        <h1>Our Doctors Ready To Help You!</h1>
        <p className='text-gray-600'>Doctor always hear to  care his patient </p>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {doctors.map((doctor) => (
      <div className="bg-white rounded-lg shadow-lg text-center" key={doctor.id}>
        <img 
          src={doctor.image}
          alt={doctor.alt}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <h2 className="text-gray-800 mt-4 text-lg font-semibold">{doctor.name}</h2>
        <p className="text-gray-600 mt-2">{doctor.title}</p>
      </div>
    ))}
  </div>
</div>
</div>
    </>
  )
}

export default About