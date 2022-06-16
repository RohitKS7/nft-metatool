import { InputMetaData } from "../types";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import PropertiesInput from "./PropertiesInput";
import StatsInput from "./StatsInput";

const INPUTSTYLE =
  "bg-[#202225] border-2 border-[#4A5357] px-2 text-[#EDEDEE] focus:border-[#205ADC] rounded-md focus:outline-none";
const FormComponent = ({
  basics,
  setBasics,
  properties,
  setProperties,
  stats,
  setStats,
}: InputMetaData) => {
  return (
    <div>
      <h1 className="text-center text-[#205ADC] text-2xl mt-5">
        Basic Information
      </h1>
      <label htmlFor="name" className="text-[#205ADC] mr-2">
        Name
      </label>
      <input
        type="text"
        className={INPUTSTYLE}
        onChange={(e) =>
          setBasics((prevMetaData) => ({
            ...prevMetaData,
            name: e.target.value,
          }))
        }
      />
      <br />
      <label htmlFor="external_url" className="text-[#205ADC] mr-2">
        External URL
      </label>
      <input
        type="text"
        className={INPUTSTYLE}
        onChange={(e) =>
          setBasics((prevMetaData) => ({
            ...prevMetaData,
            external_url: e.target.value,
          }))
        }
      />
      <br />
      <label htmlFor="description" className="text-[#205ADC] mr-2">
        Description
      </label>
      <textarea
        className={INPUTSTYLE}
        onChange={(e) =>
          setBasics((prevMetaData) => ({
            ...prevMetaData,
            description: e.target.value,
          }))
        }
      />
      <PropertiesInput properties={properties} setProperties={setProperties} />
      {/* Stats */}
      <StatsInput stats={stats} setStats={setStats} />
    </div>
  );
};

export default FormComponent;
