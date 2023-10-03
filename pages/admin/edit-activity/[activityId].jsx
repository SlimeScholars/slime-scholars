import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { activityService } from "../../../services"
import EditActivityTitle from "../../../components/admin/edit/activity/title"
import EditActivityDisplay from "../../../components/admin/edit/activity/display"
import EditActivitySide from "../../../components/admin/edit/activity/editor"
import { colors } from "../../../data/editColors"

export default function EditActivity({setLoading}) {
  const router = useRouter()
  const {activityId} = router.query

  const [activity, setActivity] = useState(null)
  const [theme, setTheme] = useState(colors.sky)

  useEffect(() => {
    if(activityId){fetch()}
  }, [router, activityId])

  useEffect(() => {
    setLoading(!activity)
  }, [activity])

  const fetch = async() => {
    setLoading(true)
    try{
      const response = await activityService.get(activityId)
      if(response.data.activity.length > 0){
        setActivity(response.data.activity[0])
      }
      setLoading(false)
    }
    catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  if(!activity){return}
  return (
    <div className="flex flex-col w-screen h-screen">
      <EditActivityTitle activity={activity} refresh={fetch} setLoading={setLoading} colors={colors} setTheme={setTheme} theme={theme}/>
      <div className="activity-editor-grid w-full h-full">
        <EditActivitySide activity={activity} refresh={fetch} setLoading={setLoading} theme={theme}/>
        <EditActivityDisplay activity={activity} theme={theme}/>
      </div>
    </div>
  )
}