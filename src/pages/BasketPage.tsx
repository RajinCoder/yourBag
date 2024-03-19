import { useState, useEffect } from "react";
import MoveCard from "../components/MoveCard";
import DescriptionModal from "../components/DescriptionModal";
import SideBar from "../components/SideBar";
import { Moves } from "../types/types";

const BasketPage = () => {
  const [moves, setMoves] = useState<Moves[]>([]);
  const [modalState, setModalState] = useState(false);
  const [moveName, setMoveName] = useState<string>();
  const [moveDescr, setMoveDescr] = useState<string>();
  //const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleModal = (moveName?: string, moveDescr?: string) => {
    setModalState(!modalState);
    setMoveName(moveName);
    setMoveDescr(moveDescr);
  };

  useEffect(() => {
    fetch("/api/basketballMoves")
      .then((response) => response.json())
      .then((data) => setMoves(data))
      .catch((error) => console.log("Not able to get listings", error));
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
            onClick={() => handleModal(move.name, move.description)}
          />
        ))}
        <DescriptionModal
          moveName={moveName}
          moveDescr={moveDescr}
          onClick={handleModal}
          status={modalState}
        />
      </div>
    </div>
  );
};

export default BasketPage;
