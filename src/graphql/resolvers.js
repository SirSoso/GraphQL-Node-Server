const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Course = require("../models/Course");

const resolvers = {
  Query: {
    me: (_, __, { user }) => user,

    courses: async (_, { page, limit }) => {
      return Course.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("created_by");
    },
  },

  Mutation: {
    register: async (_, { input }) => {
      const { password, ...rest } = input;
      const hashed = await bcrypt.hash(password, 10);
      const user = new User({
        ...rest,
        password: hashed,
      });
      const result = await user.save();
      const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const valid = bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token, user };
    },

    createCourse: async (_, data, { user }) => {
      if (!user || user.role !== "ADMIN") {
        throw new Error("Unauthorized");
      }

      return Course.create({
        ...data,
        createdBy: user.id,
      });
    },
  },
};

module.exports = {
  resolvers,
};
