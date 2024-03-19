import { useState, useEffect } from "react";
import MoveCard from "../components/MoveCard";
import supabase from "../config/supabaseClient";
import SideBar from "../components/SideBar";

interface Moves {
  name: string;
  description: string;
  uid: number;
}

const SavePage = () => {
  const [moves, setMoves] = useState<Moves[]>([]);

  useEffect(() => {
    const fetchMoves = async () => {
      const { data, error } = await supabase
        .from("basketballMoveCards")
        .select()
        .eq("saved", true);
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log("jk");
        setMoves(data);
      }
    };

    fetchMoves();
  }, []);
  return (
    <div className="flex flex-row justify-center pl-6">
      <div className="">
        <SideBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 xl:grid-cols-4">
        {moves.map((move, index) => (
          <MoveCard
            key={index}
            titleName={move.name}
            description={move.description}
            uid={move.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default SavePage;
