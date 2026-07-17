import { useEffect, useState } from "react";
import "./Resources.css";

const CATEGORY_LABELS = {
  brochure: "Brochure",
  catalogue: "Catalogue",
  sop: "SOP",
  "recipe-book": "Recipe Book",
};

function DocumentCard({ doc }) {
  return (
    <div className="res-card">
      {doc.thumbnail && (
        <div className="res-card-thumb-wrap">
          <img className="res-card-thumb" src={doc.thumbnail} alt={doc.title} />
        </div>
      )}
      <span className="res-card-tag">{CATEGORY_LABELS[doc.category] || doc.category}</span>
      <h3 className="res-card-title">{doc.title}</h3>
      {doc.description && <p className="res-card-desc">{doc.description}</p>}
      <div className="res-card-footer">
        <span className="res-card-price">Rs. {doc.price}</span>
        <button className="res-card-btn" disabled title="Payment gateway coming soon">Coming Soon</button>
      </div>
    </div>
  );
}

export default function Resources() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/documents")
      .then((res) => res.json())
      .then((data) => setDocs(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load resources."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="resources-page">
      <section className="res-hero">
        <h1 className="res-hero-title">LIBRARY</h1>
        <p className="res-hero-sub">Brochures, catalogues, SOPs and recipe books from the CHDK Group, available for purchase soon.</p>
      </section>

      <section className="res-container">
        {loading && <p className="res-state">Loading resources...</p>}
        {!loading && error && <p className="res-state">{error}</p>}
        {!loading && !error && docs.length === 0 && (
          <p className="res-state">No resources published yet, check back soon.</p>
        )}

        <div className="res-grid">
          {docs.map((doc) => (
            <DocumentCard key={doc._id} doc={doc} />
          ))}
        </div>
      </section>
    </div>
  );
}
