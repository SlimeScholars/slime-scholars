import { ActivityService } from "./admin/activityService";
import { CourseService } from "./admin/courseService";
import { LessonService } from "./admin/lessonService";
import { SubjectService } from "./admin/subjectService";
import { UnitService } from "./admin/unitService";
import { AssessmentService } from "./admin/assessmentService";

const url = ""

export const activityService = new ActivityService(url)
export const lessonService = new LessonService(url)
export const unitService = new UnitService(url)
export const courseService = new CourseService(url)
export const subjectService = new SubjectService(url)
export const assessmentService = new AssessmentService(url)