import { useEffect } from "react";
import { useRouter } from "next/router";
import { TutorialPanels } from "../../components/tutorial/tutorialPanels";

export default function Play({
  loading,
  user,
  setLoading,
  setUser,
  panelsVisible,
  setPanelsVisible,
}) {
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      // router.push("/");
    }
  }, [user, loading]);

  // Home will be rendered via the Home component found on app. This is to prevent a rerendering of home when switching between pages
  return (
    <TutorialPanels
      user={user}
      panelsVisible={panelsVisible}
      setPanelsVisible={setPanelsVisible}
    />
  );
}
