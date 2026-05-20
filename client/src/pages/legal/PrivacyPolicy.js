import "./LegalPages.css";

function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1 className="legal-title">Privacy Policy</h1>

        <p className="legal-updated">
          Last Updated: May 2026
        </p>

        <div className="legal-section">
          <h2>Information We Collect</h2>

          <p>
            CHDK Technology Center may collect personal information including
            name, email address, phone number, business information and other
            details submitted through forms or communication channels.
          </p>
        </div>

        <div className="legal-section">
          <h2>How We Use Information</h2>

          <ul>
            <li>Respond to business inquiries</li>
            <li>Provide engineering and digital services</li>
            <li>Improve website experience</li>
            <li>Maintain security and compliance</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>Contact</h2>

          <p>
            For privacy-related concerns contact:
            info@chdkindia.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;