import { BookData } from "./Bookdata.js";
import { Book } from "./models/BookSchema.js";
const DefaultData = async () => {
  try {
    await Book.insertMany(BookData);
    console.log("Data Imported...");
  } catch (error) {
    console.log(error);
  }
};

export default DefaultData;
