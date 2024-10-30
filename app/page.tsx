'use client';

import Head from 'next/head';
import Image from "next/image";

export default function Home() {

  function weatherUpdate(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault()
    console.log("INFO: weatherUpdate function triggered.")
  }

  return (
    <div className="">
      <main className="bg-blue-100 h-screen">
        <div className="flex justify-center md:justify-end ">
          <div className="w-36 border-8 border-gray-600 mt-5 md:mr-20 text-center">
            <p>Switch Toggle</p>
          </div>
        </div>

        {/* Application Name */}
        <div className="text-center m-5 text-2xl font-bold">
          <h1>The Weather App</h1>
        </div>

        {/* Input Box */}
        <div className="w-80 ml-auto mr-auto flex items-center">
          <input placeholder="Name of the city" className="w-80 border-8 border-gray-600 text-center rounded-lg text-xl"></input>
          <div className="ml-2" onClick={weatherUpdate}>
            <Image
              className="cursor-pointer"
              src="/search.png" // add another search icon in white
              alt="search icon logomark"
              width={40}
              height={40}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
