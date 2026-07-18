$navbarJs = "src\components\Navbar.js"
$lines = Get-Content $navbarJs -Encoding UTF8

$searchIconEndIdx = $null
for ($i=0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'const SearchIcon') {
        for ($j=$i; $j -lt $i+10; $j++) {
            if ($lines[$j].Trim() -eq ');') { $searchIconEndIdx = $j; break }
        }
        break
    }
}
if ($null -eq $searchIconEndIdx) { Write-Host "ERROR: could not find SearchIcon end - stopping"; exit }

$closeIconBlock = @(
    '',
    'const CloseIcon = () => (',
    '  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">',
    '    <line x1="18" y1="6" x2="6" y2="18" />',
    '    <line x1="6" y1="6" x2="18" y2="18" />',
    '  </svg>',
    ');'
)

$lines = $lines[0..$searchIconEndIdx] + $closeIconBlock + $lines[($searchIconEndIdx+1)..($lines.Count-1)]

$asideIdx = $null
for ($i=0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'aria-label="Navigation menu"') { $asideIdx = $i; break }
}
if ($null -eq $asideIdx) { Write-Host "ERROR: could not find aside line - stopping"; exit }

$searchBarCommentIdx = $null
for ($i = $asideIdx; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'Search bar') { $searchBarCommentIdx = $i; break }
}
if ($null -eq $searchBarCommentIdx) { Write-Host "ERROR: could not find Search bar comment - stopping"; exit }

$headerBlock = @(
    '        {/* Drawer header: title + close button */}',
    '        <div className="mobile-drawer-header">',
    '          <span className="mobile-drawer-title">Menu</span>',
    '          <button',
    '            className="mobile-drawer-close"',
    '            onClick={closeMobile}',
    '            aria-label="Close menu"',
    '          >',
    '            <CloseIcon />',
    '          </button>',
    '        </div>',
    ''
)

$lines = $lines[0..($searchBarCommentIdx-1)] + $headerBlock + $lines[$searchBarCommentIdx..($lines.Count-1)]

Set-Content -Path $navbarJs -Value $lines -Encoding UTF8
Write-Host "Navbar.js updated successfully"

$navbarCss = "src\components\Navbar.css"
$cssLines = Get-Content $navbarCss -Encoding UTF8
$idx = $null
for ($i=0; $i -lt $cssLines.Count; $i++) {
    if ($cssLines[$i] -match '\.mobile-drawer\.open') { $idx = $i; break }
}
if ($null -eq $idx) { Write-Host "ERROR: could not find .mobile-drawer.open line - stopping"; exit }

$newCssBlock = @(
    '',
    '.mobile-drawer-header {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  padding: 4px 20px 12px;',
    '  flex-shrink: 0;',
    '}',
    '',
    '.mobile-drawer-title {',
    '  font-size: 15px;',
    '  font-weight: 600;',
    '  letter-spacing: 0.3px;',
    '  color: var(--light);',
    '  text-transform: uppercase;',
    '  opacity: 0.85;',
    '}',
    '',
    '.mobile-drawer-close {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  width: 36px;',
    '  height: 36px;',
    '  border-radius: 50%;',
    '  background: rgba(255,255,255,0.06);',
    '  border: 1px solid rgba(255,255,255,0.1);',
    '  color: var(--light);',
    '  cursor: pointer;',
    '  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;',
    '}',
    '.mobile-drawer-close:hover {',
    '  background: rgba(255,255,255,0.12);',
    '  border-color: rgba(255,255,255,0.25);',
    '  transform: rotate(90deg);',
    '}',
    '',
    'body.light-mode .mobile-drawer-title { color: var(--dark); }',
    'body.light-mode .mobile-drawer-close {',
    '  background: rgba(0,0,0,0.05);',
    '  border-color: rgba(0,0,0,0.1);',
    '  color: var(--dark);',
    '}',
    'body.light-mode .mobile-drawer-close:hover {',
    '  background: rgba(0,0,0,0.1);',
    '  border-color: rgba(0,0,0,0.2);',
    '}'
)

$cssLines = $cssLines[0..$idx] + $newCssBlock + $cssLines[($idx+1)..($cssLines.Count-1)]
Set-Content -Path $navbarCss -Value $cssLines -Encoding UTF8
Write-Host "Navbar.css updated successfully"
