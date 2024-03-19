import svg1 from "../assets/starWhite.svg";
import svg2 from "../assets/starBlack.svg";

interface Props {
  uid?: string;
}
/**
 * A save button that stores the card which is saved.
 * @returns the view of the button
 */
const SaveBtn = ({ uid }: Props) => {
  // the boolean value of whether a card was saved or not.
  //const [saved, setSaved] = useState(false);
  const saved = false;

  return (
    <button>
      <img src={saved == false ? svg1 : svg2} alt="" className="max-h-6 " />
    </button>
  );
};

export default SaveBtn;
