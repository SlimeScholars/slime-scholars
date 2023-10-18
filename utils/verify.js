import { userData } from "../data/userData";

// Verify if API key is correct
export const verifyApiKey = (apiKey) => {
  //FIXME
  return
  if (!apiKey) {
    throw new Error('Must send an API key')
  }
  if (apiKey !== process.env.API_KEY) {
    throw new Error('Incorrect API key')
  }
}

// Verify if email is acceptable
export const verifyEmail = (email) => {
  if (!email) {
    throw new Error("Email cannot be left blank");
  }
  if (email.length > userData.maxEmailLength) {
    throw new Error(
      `Email must be at most ${userData.maxEmailLength} characters long`
    );
  }
  if (!email.includes("@")) {
    throw new Error('Email must contain "@"');
  }
};

export const verifyName = (name) => {
  const regex = /^[a-zA-Z]+$/;
  if (!name) {
    throw new Error("First and last name cannot be left blank");
  }
  if (name.length > userData.maxNameLength) {
    throw new Error(
      `First and last name must be at most ${userData.maxNameLength} characters long`
    );
  }
  if (!regex.test(name)) {
    throw new Error(
      "First and last name must only contain alphabetical letters"
    );
  }
};

export const verifyUsername = (username) => {
  const regex = /^[a-zA-Z0-9]+$/;
  if (!username) {
    throw new Error("Username cannot be left blank");
  }
  if (username.length < userData.minUsernameLength) {
    throw new Error(
      `Username must be at least ${userData.minUsernameLength} characters long`
    );
  }
  if (username.length > userData.maxUsernameLength) {
    throw new Error(
      `Username must be at most ${userData.maxUsernameLength} characters long`
    );
  }
  if (!regex.test(username)) {
    throw new Error(
      "Username must only contain alphabetical letters and numbers"
    );
  }
};

export const verifyPassword = (password) => {
  if (!password) {
    throw new Error("Password cannot be left blank");
  }
  if (password.length < userData.minPasswordLength) {
    throw new Error(
      `Password must be at least ${userData.minPasswordLength} characters long`
    );
  }
  if (password.length > userData.maxPasswordLength) {
    throw new Error(
      `Password must be at most ${userData.maxPasswordLength} characters long`
    );
  }
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  if (
    !lowercaseRegex.test(password) ||
    !uppercaseRegex.test(password) ||
    !numberRegex.test(password)
  ) {
    throw new Error(
      "Password must contain a lowercase letter, an uppercase letter, and a number"
    );
  }
};

export const verifyHonorific = (honorific) => {
  if (honorific && !userData.honorifics.includes(honorific)) {
    const honorificString = userData.honorifics
      .map((word) => `"${word}"`)
      .join(", ");
    throw new Error(`Honorific must be one of: ${honorificString}, and none`);
  }
};

export const verifyClassName = (className) => {
  if (!className) {
    throw new Error("Class name cannot be left blank");
  }
  if (className.length < userData.minClassNameLength) {
    throw new Error(
      `Class name must be at least ${userData.minClassNameLength} characters long`
    );
  }
  if (className.length > userData.maxClassNameLength) {
    throw new Error(
      `Class name must be at most ${userData.maxClassNameLength} characters long`
    );
  }
};
