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

  const [displayOpen, setDisplayOpen] = useState(false)

  useEffect(() => {
    if(activityId){fetch()}
  }, [router, activityId])

  useEffect(() => {
    setLoading(!activity)
  }, [activity])

  const fetch = async(setLoad) => {
    if(setLoad){setLoading(true)}
    try{
      const response = await activityService.get(activityId)
      if(response.data.activity.length > 0){
        setActivity(response.data.activity[0])
      }
      if(setLoad){setLoading(false)}
    }
    catch(err){
      console.log(err)
      if(setLoad){setLoading(false)}
    }
  }

  if(!activity){return}
  return (
    <div className="flex flex-col w-screen h-screen"
    style={{
      backgroundColor: theme.ultra_light,   
    }}>
      <div className="transition-all duration-200 origin-top"
      style={{
        transform: displayOpen ? "scaleY(0)" : "scaleY(1)",
        height: displayOpen ? "0px" : "auto"
      }}>
        <EditActivityTitle activity={activity} refresh={fetch} setLoading={setLoading} colors={colors} setTheme={setTheme} theme={theme}/>
      </div>
      <div className="grid w-full h-full overflow-y-scroll transition-all duration-200"
      style={{
        gridTemplateColumns: displayOpen ? "0% 100%" : "50% 50%"
      }}>
        <div className="max-h-screen overflow-y-scroll"
         style={{backgroundColor: theme.semi_light + "A0"}}>
          <EditActivitySide activity={activity} refresh={fetch} setLoading={setLoading} theme={theme}/>
        </div>
        <div className="max-h-screen overflow-y-scroll origin-top-left transition-transform duration-200"
        style={{
          transform: displayOpen ? "scale(1.35) translateY(-10px)" : "scale(1.0) translateY(0px)",
        }}>
            <EditActivityDisplay activity={activity} theme={theme} displayOpen={displayOpen} setDisplayOpen={setDisplayOpen}/>
        </div>
      </div>
    </div>
  )
}