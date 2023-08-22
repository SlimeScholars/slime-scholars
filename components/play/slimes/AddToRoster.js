import Roster from "./Roster";

export default function AddToRoster({ user, loading }) {
  return (
    <div>
      <p className="text-md"> Add to team</p>
      <p className="text-xs"> Choose a slime to replace</p>
      <Roster user={user} loading={loading} />
    </div>
  );
}
