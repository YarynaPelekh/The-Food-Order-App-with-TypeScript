import classes from "./Card.module.css";

import { PropsOnClose } from "../../types/GereralTypes";

const Card: React.FC<PropsOnClose> = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
