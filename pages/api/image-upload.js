import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// console.log("\n\n\n\n\n\n\n\n\n\n\nHELLO FROM BEFORE THE HANDLER")

export default async function handler(req, res) {
  // Upload image to Supabase
  console.log("\n\n\n\n\n\n\n\n\n\n\nHELLO!");
  if (req.method === "POST") {
    let { image } = req.body;

    console.log(
      "\n\n\n\n\n\n\n\n\n\n\ndo we get an image:",
      image.split("base64")?.[0]
    );

    if (!image) {
      return res.status(500).json({ message: "No Image Provided" });
    }
    try {
      const contentType = image.match(/data:(.*);base64/)?.[1];
      const base64FileData = image.split("base64,")?.[1];

      if (!contentType || !base64FileData) {
        return res.status(500).json({ message: "Image Data Not Valid" });
      }

      const fileName = nanoid();
      const ext = contentType.split("/")[1];
      const path = `${fileName}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(path, decode(base64FileData), {
          contentType,
          upsert: true,
        });

      if (uploadError) {
        console.error(uploadError)
        throw new Error("Unable to upload image to storage");
      }

      const url = `${process.env.SUPABASE_URL.replace(
        ".co",
        ".in"
      )}/storage/v1/object/public/${data.Key}`;

      return res.status(200).json({ url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
