import "./LegalPages.css";

function CookiePolicy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1 className="legal-title">Cookie Policy</h1>

        <div className="legal-section">
          <h2>Cookie Usage</h2>

          <p>
            Our website uses cookies to improve functionality, analytics,
            performance and user experience.
          </p>
        </div>

        <div className="legal-section">
          <h2>Types of Cookies</h2>

          <ul>
            <li>Essential Cookies</li>
            <li>Analytics Cookies</li>
            <li>Performance Cookies</li>
            <li>Marketing Cookies</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CookiePolicy;