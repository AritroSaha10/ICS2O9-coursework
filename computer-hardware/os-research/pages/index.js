import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import DebianLogo from "../public/imgs/logo.png"
import DebianBanner from '../public/imgs/banner.png'

export default function Home() {
  return (
    <div className='flex flex-col bg-gray-200 min-h-screen'>
      <Head>
        <title>Debian - OS Research ICS2O9</title>
        <meta name="description" content="A overview of Debian, made for an exercise in ICS2O9." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="h-screen relative bg-black">
        {/* Background image using Next.js Image, taken from here: https://github.com/vercel/next.js/discussions/18357#discussioncomment-132523 */}
        <Image
          layout="fill"
          className="h-screen min-w-full overflow-hidden absolute blur-sm"
          src={DebianBanner}
          alt="Banner"
          objectFit='cover'
          objectPosition="center"
        />

        <div className="relative z-1 h-screen bg-opacity-60 bg-black flex items-center justify-center">
          <div className="mx-2 text-center">
            <h1 className="text-gray-500 font-bold text-4xl xs:text-5xl md:text-6xl">
              <span className="text-slate-200">Debian</span>
            </h1>

            <h2 className="text-gray-500 font-semibold text-2xl xs:text-3xl md:text-4xl mt-4">
              <span className="text-gray-300">One of the most major Linux distributions.</span>
            </h2>

            <div className="mt-6">
              <Link href="#what-is-debian">
                <a className="py-2 px-4 bg-red-500 rounded-lg font-semibold text-white hover:bg-red-700 duration-150 text-md mt-4">
                  Learn More
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row justify-between px-32 py-16 w-full bg-slate-50" id="what-is-debian">
        <div className="flex flex-col gap-2 lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-4xl font-medium text-center lg:text-left mb-2">
            What is Debian?
          </h1>
          <p className="text-lg text-gray-700">
            Debian is a distribution of GNU/Linux, a completely free and open source (FOSS) operating system that focuses on stability. It&apos;s one of the 
            earliest of its kind, dating back to 1993 (?). The community effort was first led by ?? ??, who released the first version of the OS 
            on ??, ??, 1993(?). Since then, it&apos;s served as the root for a variety of distributions, such as:
            <ul className="list-disc list-inside">
              <li className=''>Ubuntu</li>
              <li className=''>Linux Mint</li>
              <li className=''>MX Linux</li>
              <li className=''>Raspberry Pi OS (formerly Raspbian OS)</li>
              <li>and more!</li>
            </ul>
          </p>
        </div>

        <Image src={DebianLogo} objectFit="contain" width={300} height={300}/>
      </div>

      <div className="flex p-10 flex-col items-center lg:p-20 items-left bg-gray-100">
        <div className="flex flex-col text-center">
          <h3 className="text-lg text-red-500 font-semibold">Who it&apos;s for</h3>
          <h1 className="text-4xl text-black font-bold">Target Audience</h1>
        </div>

        <div className="w-full xl:w-5/6 grid grid-cols-1 md:grid-cols-2 p-10 justify-between items-center text-center lg:text-left lg:items-start gap-4">
          <div className="flex flex-col p-4 gap-4 items-center lg:items-start">
            <div className="flex items-center justify-center text-2xl text-white bg-red-500 w-12 h-12 rounded-lg">
              {/* Font Awesome Icon */}
            </div>

            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-lg text-gray-600">
              Debian is great for users who want a rock-solid operating system that they can tailor to their own desires.
            </p>
          </div>

          <div className="flex flex-col p-4 gap-4 items-center lg:items-end">
            <div className="flex items-center justify-center text-2xl text-white bg-red-500 w-12 h-12 rounded-lg">
              {/* Font Awesome Icon */}
            </div>

            <h1 className="text-3xl font-bold">Network Admins</h1>
            <p className="text-lg text-gray-600 lg:text-right">
              Due to its stability and maturity, Debian falls high in the ranks of server operating systems, more specifically 
              production servers for people from enthusiasts wishing to create a homelab to medium-sized companies. 
            </p>
          </div>
        </div>
      </div>

      <div className="flex p-8 flex-col items-center items-left bg-slate-50">
        <div className="flex flex-col text-center">
          <h3 className="text-lg text-red-500 font-semibold">What makes it better</h3>
          <h1 className="text-4xl text-black font-bold">Advantages</h1>
        </div>

        <div className="w-full xl:w-5/6 grid grid-cols-1 md:grid-cols-2 p-10 justify-between text-center lg:text-left gap-4">
          <div className="flex flex-col p-4 gap-1 items-center lg:items-start">
            <div className="flex items-center justify-center text-2xl text-white rounded-lg mb-4">
              {/* Image */}
              <Image src={DebianBanner} width={325} height={200} objectFit="cover" objectPosition="center" className="rounded-2xl" />
            </div>

            <h1 className="text-3xl font-bold text-center lg:text-left">Stability</h1>
            <p className="text-lg text-gray-600 text-center lg:text-left">
              ...
            </p>
          </div>

          <div className="flex flex-col p-4 gap-1 items-center lg:items-end">
            <div className="flex items-center justify-center text-2xl text-white rounded-lg mb-4">
              {/* Image */}
              <Image src={DebianBanner} width={325} height={200} objectFit="cover" objectPosition="center" className="rounded-2xl" />
            </div>

            <h1 className="text-3xl font-bold text-center lg:text-right">Free and Open Source</h1>
            <p className="text-lg text-gray-600 text-center lg:text-right">
              ...
            </p>
          </div>

          <div className="flex flex-col p-4 gap-1 items-center lg:items-start">
            <div className="flex items-center justify-center text-2xl text-white rounded-lg mb-4">
              {/* Image */}
              <Image src={DebianBanner} width={325} height={200} objectFit="cover" objectPosition="center" className="rounded-2xl" />
            </div>

            <h1 className="text-3xl font-bold text-center lg:text-left">Users</h1>
            <p className="text-lg text-gray-600 text-center lg:text-left">
              Debian is great for users who want a rock-solid operating system that they can tailor to their own desires.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-slate-200 p-4">
        <p className="text-gray-600">Made by <Link href="https://aritrosaha.vercel.app"><a className="text-blue-500 hover:underline hover:text-blue-700 transition duration-50">Aritro Saha</a></Link></p>
        {/* <p className="text-gray-600">Created for the Computer Hardware assignment of ICS2O9</p> */}
      </div>
    </div>
  )
}
