import { MediaSetter } from "../../types";
import { create as ipfsHttpClient, Options } from "ipfs-http-client";
import { Line } from "rc-progress";
import { useState } from "react";
import { Preview } from "@mui/icons-material";
const INPUTSTYLE =
  "bg-[#202225] border-2 border-[#4A5357] px-2 text-[#EDEDEE] focus:border-[#205ADC] rounded-md focus:outline-none";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0" as Options);
type Progress = {
  statusImage: "initial" | "uploading" | "completed";
  statusVideo: "initial" | "uploading" | "completed";
  total: number;
  progress: number;
};

const MediaInput = ({ media, setMedia }: MediaSetter) => {
  let { background_color, animation_url, image, youtube_url } = media;
  const [progressData, setProgressData] = useState<Progress>({
    total: 10,
    progress: 9,
    statusImage: "initial",
    statusVideo: "initial",
  });
  const uploadToIPFS = async (
    files: FileList | null,
    video: boolean = false
  ) => {
    if (files) {
      let file = files[0];
      try {
        video
          ? setProgressData((prev) => ({
              ...prev,
              total: file.size,
              statusVideo: "uploading",
            }))
          : setProgressData((prev) => ({
              ...prev,
              total: file.size,
              statusImage: "uploading",
            }));
        const added = await client.add(file, {
          progress: (prog) =>
            setProgressData((prev) => ({
              ...prev,
              progress: prog,
            })),
        });
        video
          ? setProgressData((prev) => ({ ...prev, statusVideo: "completed" }))
          : setProgressData((prev) => ({ ...prev, statusImage: "completed" }));
        video
          ? setMedia((prev) => ({
              ...prev,
              animation_url: `ipfs://${added.path}`,
            }))
          : setMedia((prev) => ({
              ...prev,
              image: `ipfs://${added.path}`,
            }));
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
  };
  return (
    <div className="my-5">
      <div className="text-[#205ADC] text-4xl">Media</div>
      <label className="text-[#205ADC]">Background Color</label>
      <input
        className={INPUTSTYLE}
        type="text"
        name="background_color"
        id="background_color"
        onChange={(e) =>
          setMedia((prev) => ({ ...prev, background_color: e.target.value }))
        }
        value={background_color}
      />
      <br />
      <div className="text-[#205ADC] text-3xl mt-2">Image</div>

      <label className="text-[#205ADC]">Upload Image to IPFS</label>
      <input
        className="text-white"
        id="file_input"
        type="file"
        onChange={(e) => uploadToIPFS(e.target.files)}
      ></input>
      {progressData.statusImage == "uploading" && (
        <div className="w-full flex items-center justify-center">
          <Line
            strokeColor={"#205ADC"}
            percent={(progressData.progress * 100) / progressData.total}
          />
        </div>
      )}
      <br />
      {progressData.statusImage != "uploading" && (
        <>
          <label className="text-[#205ADC]" htmlFor="image">
            Image Url
          </label>
          <input
            type="text"
            name="image"
            className={INPUTSTYLE}
            id="image"
            value={image}
            onChange={(e) =>
              setMedia((prev) => ({ ...prev, image: e.target.value }))
            }
          />
          <div className="text-xs text-slate-300">
            Image can be of form ipfs:// or https://
          </div>
        </>
      )}
      <div className="text-[#205ADC] text-3xl mt-2">Youtube</div>

      <label className="text-[#205ADC]" htmlFor="youtube_url">
        Youtube Link
      </label>
      <input
        type="text"
        name="youtube_url"
        id="youtube_url"
        className={INPUTSTYLE}
        value={youtube_url || ""}
        onChange={(e) => {
          setMedia((prev) => ({ ...prev, youtube_url: e.target.value }));
        }}
      />
      <br />
      <div className="text-[#205ADC] text-3xl mt-2">Animation</div>
      <label className="text-[#205ADC]">Upload Video to IPFS</label>
      <input
        className="text-white"
        id="file_input"
        type="file"
        onChange={(e) => uploadToIPFS(e.target.files, true)}
      ></input>
      {progressData.statusVideo == "uploading" && (
        <div className="w-full flex items-center justify-center">
          <Line
            strokeColor={"#205ADC"}
            percent={(progressData.progress * 100) / progressData.total}
          />
        </div>
      )}
      <br />
      {progressData.statusVideo != "uploading" && (
        <>
          <label className="text-[#205ADC]" htmlFor="image">
            Animation Url
          </label>
          <input
            type="text"
            name="image"
            className={INPUTSTYLE}
            id="image"
            value={animation_url}
            onChange={(e) =>
              setMedia((prev) => ({ ...prev, animation_url: e.target.value }))
            }
          />
        </>
      )}
    </div>
  );
};

export default MediaInput;
