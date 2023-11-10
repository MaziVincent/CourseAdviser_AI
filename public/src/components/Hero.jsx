import FadeIn from "../shared/FadeIn"
import courseadviser from "../assets/courseadviser.jpg"
import { Link } from "react-router-dom";


const Hero = () => {

    const openModal = () => {

      console.log('modal open')
    }

  return (
    <>
      <div
        className="h-screen relative flex flex-col items-center pt-40 gap-6  "
        style={{
          background: `url(${courseadviser})`,
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          
        }}
      >
        
        <FadeIn
          delay={0.2}
          direction="down"
          padding
          fullWidth
        >
          <h1 className="mt-[90px] text-center text-5xl lg:text-7xl leading-tight xs:text-[64px] text-gray-700 max-w-[1050px] font-extrabold">
          My Adviser, an AI course adviser chatbot.
          </h1>
        </FadeIn>
        <FadeIn
          delay={0.4}
          direction="down"
          padding
          fullWidth
        >
          <h5 className="mt-6 text-center text-lg lg:text-xl xs:text-xl text-gray-600 max-w-[500px]">
          Provide an intelligent and user-friendly platform to assist individuals in making informed decisions regarding their programming education and career paths.
          </h5>
        </FadeIn>
        <FadeIn 
          delay={0.6}
          direction="up"
          padding
          fullWidth
        >
        <div className="flex flex-row justify-center items-center">
                    <Link className="bg-blue-500 hover:bg-blue-600 focus:ring-4 
              focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base
               px-5 py-2.5 text-center text-gray-50
               mr-3 md:mr-0 dark:bg-blue-500 dark:hover:bg-blue-600 "
               to='/register'
            >         
                        Get Started </Link>
                </div>
        </FadeIn>
      </div>
    </>
  );
};

export default Hero;
