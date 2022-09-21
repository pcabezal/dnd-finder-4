import mongoose from "mongoose";

const CardSchema = mongoose.Schema({
    card_id: String,
    cloud_url: String,
    user_googid: String,
    accessToken: String,
});

let Card;

try {
  Card = mongoose.model("cards");
} catch (err) {
  Card = mongoose.model("cards", CardSchema);
}

export default Card;