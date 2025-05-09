type cardPropsType = {
  image: string;
  selected: boolean;
  onClick: () => void;
};

function Card({ image, selected, onClick }: cardPropsType) {
  return (
    <div className="card">
      <div className={selected ? "selected" : ""}>
        <img src={image} alt="" className="card-face" />

        <img
          src="/assets/fireship.png"
          alt=""
          className="card-back"
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default Card;
