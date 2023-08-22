import Roster from "./Roster";

export default function AddToRoster({
  user,
  loading,
  setLoading,
  slime,
  setUser,
}) {
  return (
    <div className="p-4">
      <p className="text-md mx-1"> Add to team</p>
      <p className="text-xs mb-2 mx-1"> Choose a slime to replace</p>
      <div className="flex flex-row justify-around items-center">
        <Roster
          user={user}
          loading={loading}
          setLoading={setLoading}
          slime={slime}
          setUser={setUser}
        />
      </div>
    </div>
  );
}
