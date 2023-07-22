export default function Footer({ caption, username }) {
  return (
    <div style={{ paddingTop: "10px", paddingLeft: "2px" }}>
      {/* "p-4 pt-2 pb-1" */}
      <span style={{ marginRight: "1px", fontWeight: "700" }}>{username}</span>
      {/* "mr-1 font-bold" */}
      <span style={{ fontStyle: "italic", paddingLeft: "2px" }}>{caption}</span>
      {/* className="italic" */}
    </div>
  );
}
