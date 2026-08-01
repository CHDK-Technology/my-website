import { useEffect, useState } from "react";
import "./Resources.css";

const API_URL = process.env.REACT_APP_API_URL;

const CATEGORY_LABELS = {
  brochure: "Brochure",
  catalogue: "Catalogue",
  sop: "SOP",
  "recipe-book": "Recipe Book",
};

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

// Loads Razorpay's Checkout.js once and reuses it on subsequent purchases.
let razorpayScriptPromise = null;
function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve(true);
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
  return razorpayScriptPromise;
}

function DocumentCard({ doc, purchase, onBuyClick, onFieldChange, onPay }) {
  const isActive = purchase.activeSlug === doc.slug;

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
        {!isActive && (
          <button className="res-card-btn res-card-btn-active" onClick={() => onBuyClick(doc.slug)}>
            Buy Now
          </button>
        )}
      </div>

      {isActive && (
        <div className="res-purchase-form">
          <input
            type="email"
            className="res-purchase-input"
            placeholder="Your email address"
            value={purchase.email}
            onChange={(e) => onFieldChange("email", e.target.value)}
          />
          <input
            type="tel"
            className="res-purchase-input"
            placeholder="Phone (optional)"
            value={purchase.phone}
            onChange={(e) => onFieldChange("phone", e.target.value)}
          />

          {purchase.error && <p className="res-purchase-error">{purchase.error}</p>}

          <div className="res-purchase-actions">
            <button
              className="res-purchase-cancel"
              onClick={() => onBuyClick(null)}
              disabled={purchase.loading}
            >
              Cancel
            </button>
            <button
              className="res-purchase-pay"
              onClick={() => onPay(doc)}
              disabled={purchase.loading}
            >
              {purchase.loading ? "Processing…" : `Pay Rs. ${doc.price}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Resources() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Purchase UI state, keyed by which card's inline form is open.
  const [purchase, setPurchase] = useState({
    activeSlug: null,
    email: "",
    phone: "",
    loading: false,
    error: "",
  });

  useEffect(() => {
    fetch(API_URL + "/api/documents")
      .then((res) => res.json())
      .then((data) => setDocs(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load resources."))
      .finally(() => setLoading(false));
  }, []);

  const handleBuyClick = (slug) => {
    setPurchase({ activeSlug: slug, email: "", phone: "", loading: false, error: "" });
  };

  const handleFieldChange = (field, value) => {
    setPurchase((p) => ({ ...p, [field]: value, error: "" }));
  };

  const handlePay = async (doc) => {
    if (!EMAIL_REGEX.test(purchase.email)) {
      setPurchase((p) => ({ ...p, error: "Please enter a valid email address." }));
      return;
    }

    setPurchase((p) => ({ ...p, loading: true, error: "" }));

    try {
      // 1. Create a Razorpay order on our backend
      const orderRes = await fetch(`${API_URL}/api/documents/${doc.slug}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: purchase.email, phone: purchase.phone }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.message || "Could not start payment. Please try again.");
      }

      // 2. Load Razorpay's Checkout.js (only fetched once, reused after)
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Could not load payment gateway. Check your connection and try again.");
      }

      // 3. Open the Razorpay Checkout popup
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "CHDK Technology Center",
        description: orderData.documentTitle,
        order_id: orderData.orderId,
        prefill: {
          email: purchase.email,
          contact: purchase.phone || undefined,
        },
        theme: { color: "#00AEEF" },
        handler: async (response) => {
          await handleVerify(doc, response);
        },
        modal: {
          ondismiss: () => {
            setPurchase((p) => ({ ...p, loading: false }));
          },
        },
      });

      rzp.on("payment.failed", () => {
        setPurchase((p) => ({
          ...p,
          loading: false,
          error: "Payment failed or was cancelled. Please try again.",
        }));
      });

      rzp.open();
    } catch (err) {
      setPurchase((p) => ({ ...p, loading: false, error: err.message }));
    }
  };

  const handleVerify = async (doc, response) => {
    try {
      const verifyRes = await fetch(`${API_URL}/api/documents/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(verifyData.message || "Payment verification failed.");
      }

      // 4. Trigger the gated download using the one-time token
      const downloadUrl = `${API_URL}/api/documents/${doc.slug}/download?token=${verifyData.downloadToken}`;
      window.location.href = downloadUrl;

      // Reset the inline form back to its default state
      setPurchase({ activeSlug: null, email: "", phone: "", loading: false, error: "" });
    } catch (err) {
      setPurchase((p) => ({ ...p, loading: false, error: err.message }));
    }
  };

  return (
    <div className="resources-page">
      <section className="res-hero">
        <h1 className="res-hero-title">LIBRARY</h1>
        <p className="res-hero-sub">
          Brochures, catalogues, SOPs and recipe books from the CHDK Group — instant download after purchase.
        </p>
      </section>

      <section className="res-container">
        {loading && <p className="res-state">Loading resources...</p>}
        {!loading && error && <p className="res-state">{error}</p>}
        {!loading && !error && docs.length === 0 && (
          <p className="res-state">No resources published yet, check back soon.</p>
        )}

        <div className="res-grid">
          {docs.map((doc) => (
            <DocumentCard
              key={doc._id}
              doc={doc}
              purchase={purchase}
              onBuyClick={handleBuyClick}
              onFieldChange={handleFieldChange}
              onPay={handlePay}
            />
          ))}
        </div>
      </section>
    </div>
  );
}