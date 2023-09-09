const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ValidationError = require("../errors/validation-error");
const NotFoundError = require("../errors/not-found-error");
const UnauthorizedError = require("../errors/unauthorized-error");
const ExistError = require("../errors/exist-error");

const { JWT_SECRET } = require('../utils/app.config');

// Получение всех пользователей
module.exports.getUsers = (req, res, next) => {
  console.log(req.cookies.jwt);
  return User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// Получение пользователя по id
module.exports.getUserById = (req, res, next) =>
  User.findById(req.params.id)
    .orFail(new NotFoundError("Пользователь не найден")) // В случае ненахода пользователя
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ValidationError("Некорректный id"));
        return;
      }
      next(err);
    });

// Получение информации о себе
module.exports.getUserMe = (req, res, next) =>
  User.findById(req.user._id)
    // .orFail(new Error('NotValidId'))
    .then((user) => res.send({ data: user }))
    .catch(next);

// Создание пользователя
module.exports.createUser = (req, res, next) => {
  const { email, name, about, avatar } = req.body;
  bcrypt.hash(req.body.password, 10).then((hash) =>
    User.create({ email, password: hash, name, about, avatar })
      .then((user) => {
        const { _id } = user;
        res.status(201).send({ _id, email, name, about, avatar });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 11000) {
          return next(new ExistError("Такой пользователь существует"));
        }
        if (err.name === "ValidationError") {
          return next(
            new ValidationError(
              `${Object.values(err.errors)
                .map((error) => error.message)
                .join(", ")}`,
            ),
          );
        }
        return next(err);
      }),
  );
};

// Обновление пользователя
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail(new NotFoundError("Пользователь не найден"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return next(
          new ValidationError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(", ")}`,
          ),
        );
      }
      return next(err);
    });
};

// Обновление аватара
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail(new NotFoundError("Пользователь не найден"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return next(
          new ValidationError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(", ")}`,
          ),
        );
      }
      return next(err);
    });
};

// login
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError("Неправильные почта или пароль"));
        // throw new UnauthorizedError('Неправильные почта или пароль')
      }
      return bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          return next(new UnauthorizedError("Неправильные почта или пароль"));
          // throw new UnauthorizedError('Неправильные почта или пароль');
        }
        console.log(user._id);
        const { _id, name, about, avatar } = user;
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        return res
          .cookie("jwt", token, {
            maxAge: 3600000,
            httpOnly: true,
            sameSite: true,
          })
          .send({ _id, email, name, about, avatar });
      });
    })
    .catch(next);
};
