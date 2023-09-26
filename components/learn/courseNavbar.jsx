import Image from "next/image"
import { gameData } from "../../data/gameData"
import { useRouter } from "next/router";

export default function CourseNavbar({colorPalette, user}){
    const router = useRouter();

    return(
        <>
        <div className="flex flex-row px-2 items-center justify-between w-full h-[4.9rem]"
        style={{
            backgroundColor: !colorPalette ? "" : colorPalette.black
        }}>
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
            <section className="flex flex-row font-bold text-xl items-center"
            style={{
                color: !colorPalette ? "" : colorPalette.text1
            }}>
                <button className="font-normal text-xl mr-8 bg-gray-800 p-3 rounded-mds"
                onClick={() => {router.push("/play")}}>
                    Play
                </button>
                <div>
                    {user ? user.username : ""}
                </div>
                <button
                onClick={(e) => {
                    e.preventDefault();
                    router.push("/settings");
                }}
                style={{
                    backgroundColor: `${colorPalette ? colorPalette.text1 : "#ffffff"}`,
                    border: `5px solid ${colorPalette.text1}`,
                    padding: "0.7rem"
                }}
                className={`hover:opacity-60 rounded-full p-3 overflow-hidden relative box-border 
                2xl:w-[5.6rem] 2xl:h-[5.6rem] max-xl:w-[3.6rem] max-xl:h-[3.6rem] scale-[0.65]`}
                >
                    <div className="flex gap-[1rem] max-xl:grid max-xl:grid-cols-3 max-xl:grid-rows-2 
                    max-xl:gap-[0.5rem]">
                        {user && user.pfpSlime ? (
                            <div className="relative flex items-center justify-center">
                                <div className="absolute h-32 w-32 overflow-hidden">
                                    <Image
                                        src={
                                        "/assets/pfp/backgrounds/" + gameData.items[user.pfpBg].pfp
                                        }
                                        alt={user.pfpBg}
                                        height={0}
                                        width={0}
                                        className="absolute h-32 w-32"
                                    />
                                </div>
                                <Image
                                src={
                                    "/assets/pfp/slimes/" +
                                    gameData.slimes[user.pfpSlime].pfp
                                }
                                alt={user.pfpSlime}
                                height={0}
                                width={0}
                                sizes="100vw"
                                className="relative z-10 translate-y-1/3 scale-150 w-[3.5rem] h-[3.5rem] max-xl:w-[2rem] max-xl:h-[2rem] max-xl:scale-300"
                                />
                            </div>
                            ) : (
                            <div className="default-image">
                                {"/assets/pfp/slimes/blue-slime.png"}
                            </div>
                        )}
                    </div>
                </button>
            </section>
        </div>
        <div className="w-full h-[0.1rem]"
        style={{
            backgroundColor: !colorPalette ? "" : colorPalette.primary2
        }}/>
        </>
    )
}