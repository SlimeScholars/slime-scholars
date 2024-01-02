import React from "react";
import emailjs from "@emailjs/browser";
import { verifyApiKey } from "../../utils/verify";

/**
 * @desc    Send email to @slimescholarsedu@gmail.com
 * @route   PUT /api/sendEmail
 */
export default async function (req, res) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    verifyApiKey(req.headers.apikey);
    emailjs
      .sendForm(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        req.body.formCurrent,
        process.env.EMAILJS_USER_ID
      )
      .then(
        (result) => {
          res.status(200).json({ success: true, message: result.text });
        },
        (error) => {
          res.status(400).json({ success: false, message: error.text });
        }
      )
      .catch((err) => {
        res.status(400).json({ success: false, message: err.message });
      });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}
