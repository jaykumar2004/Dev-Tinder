const mongoose = require("mongoose");

const connectionRequestScheme = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //this is reference to the user collection 
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true, 
  }
);

connectionRequestScheme.index({fromUserId:1,toUserId : 1});

connectionRequestScheme.pre("save", function (next) {
  const connectionRequest = this;
  //check if my fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!!!");
  };
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestScheme
);

module.exports = ConnectionRequestModel;
