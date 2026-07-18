$navbarCss = "src\components\Navbar.css"
$cssLines = Get-Content $navbarCss -Encoding UTF8

$idx = $null
for ($i=0; $i -lt $cssLines.Count; $i++) {
    if ($cssLines[$i] -match 'body\.light-mode \.mobile-drawer-title') { $idx = $i; break }
}
if ($null -eq $idx) { Write-Host "ERROR: could not find body.light-mode .mobile-drawer-title line - stopping"; exit }

$cssLines[$idx] = $cssLines[$idx] -replace 'var\(--dark\)', 'var(--light)'

for ($i=$idx; $i -lt $cssLines.Count; $i++) {
    if ($cssLines[$i] -match 'body\.light-mode \.mobile-drawer-close \{') {
        for ($j=$i; $j -lt $i+5; $j++) {
            if ($cssLines[$j] -match 'color: var\(--dark\);') {
                $cssLines[$j] = $cssLines[$j] -replace 'var\(--dark\)', 'var(--light)'
                break
            }
        }
        break
    }
}

Set-Content -Path $navbarCss -Value $cssLines -Encoding UTF8
Write-Host "Navbar.css light-mode fix applied"
