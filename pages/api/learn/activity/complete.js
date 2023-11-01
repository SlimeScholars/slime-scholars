import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import User from "../../../../models/userModel";
import Lesson from "../../../../models/lessonModel";
import Activity from "../../../../models/activityModel";
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
 * @param   {string} req.body.activityId - Id of lesson completed
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

    // Authenticate and get user with completed activities, units, courses
    const user = await authenticate(req.headers.authorization, {
      activities: 1,
      units: 1,
      courses: 1,
    });

    // Make sure user is a student
    checkUserType(user, 1);

    let { courseId, unitId, activityId, score } = req.body;

    const activity = await Activity.findById(activityId, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });

    if (!activity) {
      throw new Error("Could not find activity");
    }

    score = score * rewardData.activity;
    let progressCopy = [...user.progress];
    let courseIndex = -1;
    let unitIndex = -1;
    let activityIndex = -1;
    for (let i = 0; i < progressCopy.length; i++) {
      if (progressCopy[i].courseId === courseId) {
        courseIndex = i;
        for (let j = 0; j < progressCopy[i].units.length; j++) {
          if (progressCopy[i].units[j].unitId === unitId) {
            unitIndex = j;
            for (
              let k = 0;
              k < progressCopy[i].units[j].activities.length;
              k++
            ) {
              if (
                progressCopy[i].units[j].activities[k].activityId === activityId
              ) {
                activityIndex = k;
                if (
                  score === progressCopy[i].units[j].activities[k].completion
                ) {
                  res.status(200).json({
                    message: "Activity completed",
                    score: 0,
                    oldFlowers: user.flowers,
                    newFlowers: user.flowers,
                  });
                }
                if (score > progressCopy[i].units[j].activities[k].completion) {
                  progressCopy[i].units[j].completion +=
                    score - progressCopy[i].units[j].activities[k].completion;
                  progressCopy[i].completion +=
                    score - progressCopy[i].units[j].activities[k].completion;
                  progressCopy[i].units[j].activities[k].completion = score;
                }
                break;
              }
            }
            if (activityIndex === -1) {
              progressCopy[i].units[j].activities.push({
                activityId: activityId,
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
            activities: [
              {
                activityId: activityId,
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
            activities: [
              {
                activityId: activityId,
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
      flowers: user.flowers + score,
    });

    res.status(200).json({
      message: "Activity completed",
      score: score,
      oldFlowers: user.flowers,
      newFlowers: user.flowers + score,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
