import { Outlet, Link } from "react-router-dom"


const AuthLayout = () => {
  return (
    <>
      {/* Left side */}
      <section className="flex xl:w-1/2 w-full items-center flex-col z-30">
        {/* Top side */}
        <div>
          <div className="flex px-16 py-10 items-center">
            <div className="flex gap-2 items-center">
              <img 
                src="/assets/icons/logo.svg"
                className="w-12 h-12"
              />
              <h2 className="h3-bold text-primary-500">Music Chart</h2>
            </div>
            <Link to="/" className=" ml-20 text-light-3 hover:text-light-2">Home</Link>
          </div>

          {/* Bottom side */}
          <Outlet />
        </div>

      </section>

      {/* Right Side */}
      <div className="h-screen xl:w-1/2 w-full absolute xl:block xl:relative">
        <img 
          src="/assets/images/music.jpg"
          className="h-screen w-screen object-cover bg-no-repeat absolute"
        />
        {/* 이미지 전체적으로 어둡게 */}
        <div className="absolute w-full h-full bg-black xl:opacity-40 opacity-80"></div> 
        {/* 이미지 그라데이션 효과 */}
        <div className="absolute w-full h-full bg-linear-gradient"></div>
        <div className="absolute w-full h-full bg-gradient-to-t from-black to-transparent"></div>
      </div>

    </>
  )
}

export default AuthLayout