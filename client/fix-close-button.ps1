$navbarJs = "src\components\Navbar.js"
$navbarCss = "src\components\Navbar.css"

$content = Get-Content $navbarJs -Raw

$oldSearchIcon = @"
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
"@

$newSearchIcon = @"
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
"@

$content = $content.Replace($oldSearchIcon, $newSearchIcon)

$oldAside = @"
      <aside className={`mobile-drawer `${mobileOpen ? "open" : ""}`} aria-label="Navigation menu">

        {/* Search bar */}
"@

$newAside = @"
      <aside className={`mobile-drawer `${mobileOpen ? "open" : ""}`} aria-label="Navigation menu">

        {/* Drawer header: title + close button */}
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">Menu</span>
          <button
            className="mobile-drawer-close"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Search bar */}
"@

$content = $content.Replace($oldAside, $newAside)
[System.IO.File]::WriteAllText($navbarJs, $content)
Write-Host "Navbar.js updated"

$css = Get-Content $navbarCss -Raw

$oldCss = @"
.mobile-drawer.open { transform: translateX(0); }

.mobile-search-bar {
"@

$newCss = @"
.mobile-drawer.open { transform: translateX(0); }

.mobile-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 20px 12px;
  flex-shrink: 0;
}

.mobile-drawer-title {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: var(--light);
  text-transform: uppercase;
  opacity: 0.85;
}

.mobile-drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--light);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.mobile-drawer-close:hover {
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.25);
  transform: rotate(90deg);
}

body.light-mode .mobile-drawer-title { color: var(--dark); }
body.light-mode .mobile-drawer-close {
  background: rgba(0,0,0,0.05);
  border-color: rgba(0,0,0,0.1);
  color: var(--dark);
}
body.light-mode .mobile-drawer-close:hover {
  background: rgba(0,0,0,0.1);
  border-color: rgba(0,0,0,0.2);
}

.mobile-search-bar {
"@

$css = $css.Replace($oldCss, $newCss)
[System.IO.File]::WriteAllText($navbarCss, $css)
Write-Host "Navbar.css updated"
