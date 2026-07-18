$navbarJs = "src\components\Navbar.js"
$lines = Get-Content $navbarJs -Encoding UTF8

$fixedCount = 0
for ($i=0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'Search pages, services') {
        $lines[$i] = '          <span>Search pages, services</span>'
        $lines[$i] = $lines[$i] -replace '</span>', ([char]0x2026 + '</span>')
        $fixedCount++
    }
    if ($lines[$i] -match 'overviewText\}') {
        $lines[$i] = '                      {MENU_DATA[item.label].overviewText} ' + [char]0x2192
        $fixedCount++
    }
}

if ($fixedCount -eq 0) {
    Write-Host "ERROR: could not find either target line - nothing changed"
} else {
    Set-Content -Path $navbarJs -Value $lines -Encoding UTF8
    Write-Host "Fixed $fixedCount line(s) in Navbar.js"
}
