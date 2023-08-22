export default function SlimeDetails({ slime }) {
  if (!slime) return <></>;
  //   console.log(slime);
  const rarity = slime.rarity.toUpperCase();
  const name = slime.slimeName;
  const level = slime.level;
  const gelProduction = slime.baseProduction;
  const levelUpCost = slime.levelUpCost;
  const maxLevel = slime.maxLevel;
  return (
    <div className="flex flex-row gap-2 justify-around p-2">
      <div className="flex">
        {/* create something to map slime names to images */}
        <img
          src="/assets/graphics/slimes/slime-blue.png"
          alt="Slime"
          className="h-32 w-full"
        />
      </div>
      <div className="flex flex-col flex-wrap">
        {/* create something to map colours and rarity */}
        <p className="">{rarity}</p>
        <p>{name}</p>
        <p className="text-xs">
          Level {level}/{maxLevel}
        </p>
        <p className="text-xs">Gel production: {gelProduction} SG</p>
        <button className="bg-pink-400 p-1 text-xs">
          <div className="flex flex-row justify-center items-center">
            <p className="">Level up</p>
            <img
              src="/assets/icons/slimeGel.png"
              alt="Icon"
              className="h-3 w-3 m-1"
            />
            <p className="">{levelUpCost}</p>
          </div>
        </button>
      </div>
    </div>
  );
}
