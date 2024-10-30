import Head from 'next/head';

export default function Home() {
  return (
    <div className="">
      <main className="bg-blue-200 h-screen">
        <div className="flex justify-center md:justify-end ">
          <div className="w-36 border-8 border-gray-600 mt-5 md:mr-20 text-center">
            <p>Switch Toggle</p>
          </div>
        </div>

        {/* Application Name */}
        <div className="text-center m-5 text-xl font-bold">
          <h1>The Weather App</h1>
        </div>

        {/* Input Box */}
        <div className="w-60 mx-auto flex-roq items-center">
          <input className="border-8 border-gray-600 w-60 text-center rounded-lg"></input>
        </div>
      </main>
    </div>
  );
}
