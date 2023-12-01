import { Outlet } from "react-router-dom"

type Props = {}

const AuthLayout = (props: Props) => {
  return (
    <>
      <img 
        src="/assets/images/music.jpg"
        className="hidden xl:block h-screen w-1/2  object-cover bg-no-repeat"
      />

      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet />
      </section>

    </>
  )
}

export default AuthLayout