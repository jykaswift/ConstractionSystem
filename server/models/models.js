const sequelize = require("../db");
const moment = require("moment");
const { DataTypes } = require("sequelize");

const UserAccount = sequelize.define(
  "UserAccount",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstname: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    patronymic: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, unique: true },
  },
  {
    tableName: "user_account",
  }
);

const UserLoginInfo = sequelize.define(
  "UserLoginInfo",
  {
    login_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: { type: DataTypes.STRING, unique: true },
    password_hash: { type: DataTypes.STRING },
  },
  {
    tableName: "user_login_data",
  }
);

const GoogleLoginInfo = sequelize.define(
  "GoogleLoginInfo",
  {
    google_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: { type: DataTypes.STRING, unique: true },
  },
  {
    tableName: "google_login_data",
  }
);

const UserToken = sequelize.define(
  "UserToken",
  {
    token_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    refresh_token: { type: DataTypes.TEXT, unique: true },
  },
  {
    tableName: "user_token",
  }
);

const UserHistory = sequelize.define(
  "UserHistory",
  {
    history_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    request: { type: DataTypes.TEXT },
    count: { type: DataTypes.INTEGER },
    createdAt: {
      type: DataTypes.DATEONLY,
      get: function () {
        return moment(this.getDataValue("createdAt")).format("DD.MM.YYYY");
      },
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    tableName: "user_history",
  }
);

const Document = sequelize.define(
  "Document",
  {
    document_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    elastic_id: { type: DataTypes.STRING, unique: true },
    doc_name: { type: DataTypes.TEXT },
  },
  {
    tableName: "document",
  }
);

const UserProject = sequelize.define(
  "UserProject",
  {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.TEXT },
  },
  {
    tableName: "user_project",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "name"],
      },
    ],
  }
);

const UserDocument = sequelize.define(
  "UserDocument",
  {},
  { tableName: "user_document" }
);


const ProjectDocument = sequelize.define(
  "ProjectDocument",
  {},
  { tableName: "project_document" }
);

const UserBookmark = sequelize.define(
  "UserBookmark",
  {},
  { tableName: "user_bookmark" }
);

const Bookmark = sequelize.define(
  "Bookmark",
  {
    bookmark_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: { type: DataTypes.TEXT },
    name: { type: DataTypes.TEXT },
    rowStart: { type: DataTypes.INTEGER },
    rowEnd: { type: DataTypes.INTEGER },
    lastString: { type: DataTypes.TEXT }
  },
  {
    tableName: "bookmark",
  }
);


UserAccount.hasOne(UserLoginInfo, {
  foreignKey: "user_id",
  as: "userLogin",
});
UserLoginInfo.belongsTo(UserAccount, {
  foreignKey: "user_id",
  as: "userLogin",
});

UserAccount.hasOne(GoogleLoginInfo, {
  foreignKey: "user_id",
  as: "googleLogin",
});
GoogleLoginInfo.belongsTo(UserAccount, {
  foreignKey: "user_id",
  as: "googleLogin",
});

UserAccount.hasOne(UserToken, {
  foreignKey: "user_id",
  as: "userToken",
});
UserToken.belongsTo(UserAccount, {
  foreignKey: "user_id",
  as: "userToken",
});

UserAccount.hasMany(UserHistory, {
  foreignKey: "user_id",
  as: "userHistory",
});

UserHistory.belongsTo(UserAccount, {
  foreignKey: "user_id",
  as: "userHistory",
});

UserAccount.belongsToMany(Document, {
  through: UserDocument,
  foreignKey: "user_id",
});

Document.belongsToMany(UserAccount, {
  through: UserDocument,
  foreignKey: "document_id",
});

UserAccount.hasMany(UserProject, {
  foreignKey: "user_id",
  as: "userProject",
});

UserProject.belongsTo(UserAccount, {
  foreignKey: "user_id",
  as: "userProject",
});

UserProject.belongsToMany(Document, {
  through: ProjectDocument,
  foreignKey: "project_id",
});

Document.belongsToMany(UserProject, {
  through: ProjectDocument,
  foreignKey: "document_id",
});

UserAccount.belongsToMany(Bookmark, {
  through: UserBookmark,
  foreignKey: "user_id",
});

Bookmark.belongsToMany(UserAccount, {
  through: UserBookmark,
  foreignKey: "bookmark_id",
});

Document.hasMany(Bookmark, {
  foreignKey: "document_id",
  as: "userDocument",
});

Bookmark.belongsTo(Document, {
  foreignKey: "document_id",
  as: "userDocument",
});



module.exports = {
  Bookmark,
  UserBookmark,
  GoogleLoginInfo,
  UserAccount,
  UserDocument,
  ProjectDocument,
  UserLoginInfo,
  UserToken,
  UserHistory,
  Document,
  UserProject,
};

