import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import User from "../../../../models/userModel";
import Unit from "../../../../models/unitModel";
import { calculateTestStars, getTestRewards } from "../../../../utils/stars";
import Course from "../../../../models/courseModel";
import { mongoose } from "mongoose";
import { rewardData } from "../../../../data/lessonData";

/**
 * @desc    Completion of unit test for rewards and exp
 * @route   POST /api/learn/unit-test/complete
 * @access  Private - Students
 * @param   {string} req.body.unitId - Id of unit completed
 * @param   {string} req.body.score - Score achieved on the unit test
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

    let { courseId, unitId, score } = req.body;

    const unit = await Unit.findById(unitId, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });

    if (!unit) {
      throw new Error("Could not find unit");
    }

    score *= rewardData.test;
    let progressCopy = [...user.progress];
    let courseIndex = -1;
    let unitIndex = -1;
    for (let i = 0; i < progressCopy.length; i++) {
      if (progressCopy[i].courseId === courseId) {
        courseIndex = i;
        for (let j = 0; j < progressCopy[i].units.length; j++) {
          if (progressCopy[i].units[j].unitId === unitId) {
            unitIndex = j;
            break;
          }
        }
        if (unitIndex === -1) {
          progressCopy[i].units.push({
            unitId: unitId,
            lessons: [],
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
            lessons: [],
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
      message: "Unit test completed",
      score: score,
      oldFlowers: user.flowers,
      newFlowers: user.flowers + score,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
