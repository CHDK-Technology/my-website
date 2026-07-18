$navbarJs = "src\components\Navbar.js"
$lines = Get-Content $navbarJs -Encoding UTF8

$fixedCount = 0
for ($i=0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '\{MENU_DATA\[item\.label\]\.overviewText\}') {
        if ($i -ge 1 -and $lines[$i-1] -match '\{data\.overviewText && \(') {
            $lines[$i] = '                  <Link to={data.overviewPath} className="learn-more-btn">{data.overviewText}</Link>'
            $fixedCount++
        }
    }
}

if ($fixedCount -eq 0) {
    Write-Host "ERROR: could not find the broken desktop line - nothing changed"
} else {
    Set-Content -Path $navbarJs -Value $lines -Encoding UTF8
    Write-Host "Fixed $fixedCount line(s) - restored desktop dropdown Link"
}
