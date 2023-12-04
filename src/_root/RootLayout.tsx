import { Outlet, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/lib/react-query/queries"
import { useEffect } from "react";


const RootLayout = () => {
  const navigate = useNavigate();
  const {mutate: Logout, isSuccess} = useLogout();

  useEffect(() => {
    if(isSuccess) navigate(0);
  },[isSuccess])

  return (
    <div className="w-full">
      <Button 
        className="shad-button_primary px-20 py-6 mt-4"
        onClick={() => Logout()}
      >
          로그아웃
      </Button>

      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout