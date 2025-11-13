import Image from "next/image";
import { ChevronDown } from "lucide-react";
export default function Home() {
  console.log("Home");
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-black font-sans text-white font-medium text-xl overflow-x-hidden"
    >
      <main className="flex min-h-screen w-full flex-col items-center bg-black overflow-x-hidden">
      <div className="flex flex-col items-center gap-3 absolute top-[8%] md:top-[15%] z-10 px-4">
            <div className=' top-0 z-10'>
              <Image src="images/logo-mark.svg" alt="Living Works" width={36} height={36} />

            </div>
              <div className="text-sm md:text-base uppercase font-medium text-center">Creative × Connection × Capital</div>
          </div>
        <div
          className="h-screen w-full relative flex flex-col items-center justify-center"
          style={{
            backgroundImage: "url('/images/hero_bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='h-[85%] flex flex-col items-center justify-center px-4'>
          
          <div className="flex flex-col items-center gap-3 mt-12 md:mt-16">
          <div className="flex flex-col items-center uppercase tracking-wider">
          <div className="text-2xl md:text-4xl font-bold text-center">You're Not Invisble</div>
          <div className="text-3xl md:text-5xl font-bold text-center">You're Just Early</div>
          </div>
          <div className="text-center px-4">
          <div className="font-bold text-base md:text-lg">For the Creators, Founders, Leaders, Renegades</div>
          <div className="text-sm md:text-base">who passionately create</div>
          <div className="text-sm md:text-base">what the future can't automate,</div>
          </div>
          <div className='uppercase font-bold my-5 mt-8 md:mt-20 text-sm md:text-base'>you're in the right place.</div>
          </div>

          </div>

          <div className='text-center px-4 pb-8'>
            <div className='font-bold text-sm md:text-base'>Welcome to LivingWorks Venture Catalysts</div>
            <div className="text-xs md:text-sm">a different kind of venture firm</div>
          </div>
          <div className='mt-2'><ChevronDown /></div>
      </div>
        <div className='min-h-screen py-12 md:py-16 flex flex-col items-center justify-center w-full bg-black px-4'>
          <div className='flex flex-col items-center justify-center gap-3 max-w-4xl w-full'>
          <div className='text-center'>
            <div className='uppercase text-sm md:text-base'>welcome to</div>
            <Image src="images/logo.svg" alt="Living Works" width={205.67} height={40} className="mx-auto" />
            </div>
            <div className='text-center text-sm md:text-base mt-4'>
              <div>Where Capability and Courage meets Capital.</div>
              <div>Where Mastery meets Means.</div>
              <div>Where the Bold meets true Believers.</div>
            </div>
            <div className='text-center mt-10 text-sm md:text-base'>
              <div>It's personal, not business.</div>
            </div>
            </div>
            <div className='flex flex-col items-center justify-center text-center mt-8 sm:mt-16 w-full'>
              <div className='uppercase opacity-50 text-sm mb-4'>Exits</div>
              <div className='flex sm:flex-row flex-col items-center gap-6 sm:gap-10 justify-center sm:justify-between w-full max-w-3xl mt-6 sm:mt-10'>
                <div><Image src="images/wholefoods.svg" alt="Living Works" width={100} height={100} /></div>
                <div><Image src="images/experian.svg" alt="Living Works" width={100} height={100} /></div>
                <div><Image src="images/universal.svg" alt="Living Works" width={100} height={100} /></div>
                <div><Image src="images/seaport.svg" alt="Living Works" width={100} height={100} /></div>
                
              </div>
              
            </div>
            <div className='flex flex-col items-center justify-center text-center mt-8 sm:mt-16 w-full'>
              <div className='uppercase opacity-50 text-sm mb-4'>partnered</div>
              <div className='flex sm:flex-row flex-col items-center gap-6 sm:gap-10 justify-center sm:justify-between w-full max-w-3xl mt-6 sm:mt-10'>
                
                <div><Image src="images/apple.svg" alt="Living Works" width={30} height={30} /></div>
                <div><Image src="images/nike.svg" alt="Living Works" width={100} height={100} /></div>
                <div><Image src="images/coca-cola.svg" alt="Living Works" width={100} height={100} /></div>
                <div><Image src="images/mtv.svg" alt="Living Works" width={50} height={50} /></div>
              </div>
              <div className='flex sm:flex-row flex-col items-center gap-6 sm:gap-10 justify-center sm:justify-between w-full max-w-3xl mt-6 sm:mt-10'>
                <div><Image src="images/visa.svg" alt="Living Works" width={100} height={100} /></div>
                <div><Image src="images/bmw.svg" alt="Living Works" width={40} height={40} /></div>
                <div><Image src="images/sxsw.svg" alt="Living Works" width={100} height={100} /></div>

              </div>
              </div>
        </div>
      </main>
    </div>
  );
}
