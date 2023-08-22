import Roster from "./Roster";

export default function AddToRoster({ user, loading, setLoading }) {
  return (
    <div className="p-4">
      <p className="text-md"> Add to team</p>
      <p className="text-xs"> Choose a slime to replace</p>
      <div className="flex flex-row justify-around items-center">
        <Roster user={user} loading={loading} setLoading={setLoading} />
      </div>
    </div>
  );
}
