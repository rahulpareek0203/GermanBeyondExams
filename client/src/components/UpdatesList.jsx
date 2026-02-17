export default function UpdatesList({ updates, selectedId, onSelect }) {
  return (
    <div className="updates-list">
      {updates.map(update => (
        <div
          key={update.id}
          className={`update-card ${
            selectedId === update.id ? "active" : ""
          }`}
          onClick={() => onSelect(update.id)}
        >
          <p className="date">{update.date}</p>
          <h3>{update.title}</h3>
          <p>{update.summary}</p>
          <span className="badge">{update.category}</span>
        </div>
      ))}
    </div>
  );
}
