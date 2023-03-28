import "./Nav.css";
import NavEntry from "./NavEntry";

function Nav(props: { changeSite: any }) {
  return (
    <div className="Nav">
      <NavEntry
        src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png"
        name="home"
        onClick={() => props.changeSite(0)}
      />
      <NavEntry
        src="https://cdn-icons-png.flaticon.com/512/9506/9506150.png"
        name="settings"
        onClick={() => props.changeSite(1)}
      />
    </div>
  );
}

export default Nav;
