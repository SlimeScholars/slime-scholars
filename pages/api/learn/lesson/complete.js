import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import User from "../../../../models/userModel";
import Lesson from "../../../../models/lessonModel";
import { calculateStars, getQuizRewards } from "../../../../utils/stars";
import { areDifferentDays } from "../../../../utils/areDifferentDays";
import Unit from "../../../../models/unitModel";
import Course from "../../../../models/courseModel";
import { rewardData } from "../../../../data/lessonData";
import { mongoose } from "mongoose";

/**
 * @desc    Completion of lesson for rewards and exp
 * @route   POST /api/learn/lesson/complete
 * @access  Private - Students
 * @param   {string} req.body.lessonId - Id of lesson completed
 * @param   {string} req.body.score - Score achieved on the quiz section of the lesson - should be decimal between 0 and 1
 */
export default async function (req, res) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    verifyApiKey(req.headers.apikey);

    // Connect to database
    await connectDB();

    // Authenticate and get user with completed lessons, units, courses
    const user = await authenticate(req.headers.authorization, {
      lessons: 1,
      units: 1,
      courses: 1,
    });

    // Make sure user is a student
    checkUserType(user, 1);

    let { courseId, unitId, lessonId, score } = req.body;

    const lesson = await Lesson.findById(lessonId, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });

    if (!lesson) {
      throw new Error("Could not find lesson");
    }

    let canLoot = false;
    const today = new Date();
    const newLastRewards = [...user.lastRewards];
    for (let i = 0; i < user.lastRewards.length; i++) {
      if (areDifferentDays(today, user.lastRewards[i])) {
        canLoot = true;
        newLastRewards[i] = today;
        break;
      }
    }

    score = adjustScore(score, lesson.lessonType);
    let progressCopy = [...user.progress];
    let courseIndex = -1;
    let unitIndex = -1;
    let lessonIndex = -1;
    for (let i = 0; i < progressCopy.length; i++) {
      if (progressCopy[i].courseId === courseId) {
        courseIndex = i;
        for (let j = 0; j < progressCopy[i].units.length; j++) {
          if (progressCopy[i].units[j].unitId === unitId) {
            unitIndex = j;
            for (let k = 0; k < progressCopy[i].units[j].lessons.length; k++) {
              if (progressCopy[i].units[j].lessons[k].lessonId === lessonId) {
                lessonIndex = k;
                if (score > progressCopy[i].units[j].lessons[k].completion) {
                  progressCopy[i].units[j].completion +=
                    score - progressCopy[i].units[j].lessons[k].completion;
                  progressCopy[i].completion +=
                    score - progressCopy[i].units[j].lessons[k].completion;
                  progressCopy[i].units[j].lessons[k].completion = score;
                }
                break;
              }
            }
            if (lessonIndex === -1) {
              progressCopy[i].units[j].lessons.push({
                lessonId: lessonId,
                completion: score,
              });
              progressCopy[i].units[j].completion += score;
              progressCopy[i].completion += score;
            }
            break;
          }
        }
        if (unitIndex === -1) {
          progressCopy[i].units.push({
            unitId: unitId,
            lessons: [
              {
                lessonId: lessonId,
                completion: score,
              },
            ],
            completion: score,
          });
          progressCopy[i].completion += score;
        }
        break;
      }
    }
    if (courseIndex === -1) {
      progressCopy.push({
        courseId: courseId,
        units: [
          {
            unitId: unitId,
            lessons: [
              {
                lessonId: lessonId,
                completion: score,
              },
            ],
            completion: score,
          },
        ],
        completion: score,
      });
    }

    await User.findByIdAndUpdate(user._id, {
      progress: progressCopy,
    });

    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

// multiply score by respective factors
const adjustScore = (score, lessonType) => {
  switch (lessonType) {
    case "lesson":
      return score * rewardData.lesson;
    case "quiz":
      return score * rewardData.quiz;
    case "test":
      return score * rewardData.test;
    default:
      return score;
  }
};
