import Image from "next/image";
import {useRouter} from 'next/router'

export default function Nav({ user, setUser }) {

  const router = useRouter()
  const btn_tw = "px-5 py-2 rounded-lg bg-pink-500 hover:bg-pink-400 transition-all duration-150 text-white text-lg font-bold"

  const onLogOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
    }
    setUser(null);
  };

  return (
    <div className="flex flex-row px-2 items-center justify-between w-full h-[5rem] bg-black">
        <section>
            <a className="flex justify-center items-center h-auto" href="/">
                <Image
                src="/assets/icons/logo-light.png"
                alt="Slime Scholars Logo"
                height={0}
                width={0}
                sizes='100vw'
                className="w-[250px] h-auto rounded-full p-2 brightness-[2]"
                // style={{
                //     backgroundColor: !colorPalette ? "" : colorPalette.primary1
                // }}
                />
            </a>
        </section>
        <section className="hidden lg:flex lg:z-10 p-2 pr-5 gap-4">
          {user ?
            <button className={btn_tw} onClick={onLogOut}>
              Log Out
            </button> :
            <>
              <button className={btn_tw} onClick={() => {router.push('/login')}}>
                Login
              </button>
              <button className={btn_tw} href={() => {router.push('/signup')}}>
                Sign Up
              </button>
            </>
          }
        </section>
    </div>
  );
}

