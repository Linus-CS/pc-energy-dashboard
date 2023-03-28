import "./Nav.css";

function NavEntry(props: { src: string; name: string; onClick: any }) {
  return (
    <div className="Entry" onClick={props.onClick()}>
      <img src={props.src} alt={props.name} />
      <h1>{props.name}</h1>
    </div>
  );
}

export default NavEntry;
