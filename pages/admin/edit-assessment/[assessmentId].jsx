import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { assessmentService } from "../../../services"
import EditAssessmentTitle from "../../../components/admin/edit/assessment/title"
import EditAssessmentSide from "../../../components/admin/edit/assessment/editor"
import EditAssessmentDisplay from "../../../components/admin/edit/assessment/display"
import { colors } from "../../../data/editColors"

export default function EditAssessment({ setLoading }) {
  const router = useRouter()
  const { assessmentId } = router.query

  const [assessment, setAssessment] = useState(null)
  const [theme, setTheme] = useState(colors.sky)

  const [displayOpen, setDisplayOpen] = useState(false)

  useEffect(() => {
    if (assessmentId) { refetch() }
  }, [router, assessmentId])

  useEffect(() => {
    setLoading(!assessment)
  }, [assessment])

  const refetch = async (setLoad) => {
    if (setLoad) { setLoading(true) }
    try {
      const response = await assessmentService.get(assessmentId)
      if (response.data.lesson) {
        setAssessment(response.data.lesson)
      }
      if (setLoad) { setTimeout(() => { setLoading(false) }, 150) }
    }
    catch (err) {
      console.log(err)
      if (setLoad) { setTimeout(() => { setLoading(false) }, 150) }
    }
  }

  if (!assessment) { return }
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
        <EditAssessmentTitle assessment={assessment} refresh={refetch} setLoading={setLoading} colors={colors} setTheme={setTheme} theme={theme} />
      </div>
      <div className="grid w-full h-full overflow-y-scroll transition-all duration-200"
        style={{
          gridTemplateColumns: displayOpen ? "0% 100%" : "50% 50%"
        }}>
        <div className="max-h-screen overflow-y-scroll"
          style={{ backgroundColor: theme.semi_light + "A0" }}>
          <EditAssessmentSide assessment={assessment} refresh={refetch} setLoading={setLoading} theme={theme} />
        </div>
        <div className="max-h-screen overflow-y-scroll origin-top-left transition-transform duration-200"
          style={{
            transform: displayOpen ? "scale(1.35) translateY(-10px)" : "scale(1.0) translateY(0px)",
          }}>
          <EditAssessmentDisplay assesssment={assessment} theme={theme} displayOpen={displayOpen} setDisplayOpen={setDisplayOpen} />
        </div>
      </div>
    </div>
  )
}