import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, onAdd, showAddTask }) => {
  //destructuing the props
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={showAddTask ? "red" : "green"}
          text={showAddTask ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  //if nothing sent by props this will be the default
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired, //makes the title prop of type string and requierd
};

export default Header;
