import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Properties, Stats, Level, Boost, Date, Basics } from "../types";
import FormComponent from "../components/FormComponent";
import DisplayComponent from "../components/DisplayComponent";
import { useState, useEffect } from "react";
const Home: NextPage = () => {
  const [basics, setBasics] = useState<Basics>()
  const [properties, setProperties] = useState<Properties[]>([{
    "trait_type": "Base",
    "value": "Starfish"
  },
  {
    "trait_type": "Eyes",
    "value": "Big"
  },
  {
    "trait_type": "Mouth",
    "value": "Surprised"
  }])
  const [stats, setStats] = useState<Stats[]>()
  const [levels, setLevels] = useState<Level[]>()
  const [boosts, setBoosts] = useState<Boost[]>()
  const [dates, setDates] = useState<Date[]>()
  useEffect(() => {
    console.log(properties);

  }, [properties])

  return (
    <div>
      <Head>
        <title>NFT MetaTool🚀</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <div className="bg-[#04111D] p-4 text-xl  text-slate-300">
          <span className="text-2xl">NFT MetaTool🚀</span>

        </div>
      </nav>
      <div className="grid bg-[#202225] grid-cols-2 min-h-screen">
        <aside className=""><FormComponent
          basics={basics}
          setBasics={setBasics}
          properties={properties}
          setProperties={setProperties}
          stats={stats}
          setStats={setStats}
          levels={levels}
          setLevels={setLevels}
          boosts={boosts}
          setBoosts={setBoosts}
          dates={dates}
          setDates={setDates}
        /></aside>
        <section className=" text-white">

          <DisplayComponent
            basics={basics}
            properties={properties}
            stats={stats}
            levels={levels}
            boosts={boosts}
            dates={dates}
          />
        </section>
      </div>

    </div>
  );
};

export default Home;
