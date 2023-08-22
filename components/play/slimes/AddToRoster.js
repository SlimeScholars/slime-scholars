import Roster from "./Roster";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AddToRoster({ user, loading }) {
  const router = useRouter();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    }
  }, [user, loading]);
  return (
    <div>
      <p className="text-md"> Add to team</p>
      <p className="text-xs"> Choose a slime to replace</p>
      <Roster user={user} loading={loading} />
    </div>
  );
}
