import SaveBtn from "./SaveBtn";

// an interface to better keep track of the props being passed into the component.
interface Props {
  titleName: string;
  description: string;
  uid: string;
  onClick?: () => void;
}

/**
 * A card for a move in whatever sport.
 * @param param0 when destrcutured holds the name of the move and its short description
 * @returns a view of the card
 */
const MoveCard = ({ titleName, description, uid, onClick }: Props) => {
  const shortSummary = description.substring(0, getShortSummary(description));

  function getShortSummary(description: string) {
    for (let i = 0; i < description.length; i++) {
      if (description[i] == ".") {
        return i + 1;
      }
    }
  }
  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-md w-80">
      <div className="p-6">
        <h5 className="flex justify-between mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {titleName}
          <SaveBtn uid={uid} />
        </h5>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {shortSummary}
        </p>
      </div>
      <div className="p-6 pt-0">
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={onClick}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default MoveCard;
