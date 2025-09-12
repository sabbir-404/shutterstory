# batch-push.ps1
# Splits files into batches of 50 and pushes them to GitHub

# Get all untracked/tracked-but-modified files (except .git stuff)
$files = git ls-files --others --modified --exclude-standard

# Batch size (you can adjust)
$batchSize = 50
$counter = 0
$batchNumber = 1

foreach ($file in $files) {
    git add "$file"
    $counter++

    if ($counter -ge $batchSize) {
        git commit -m "Batch $batchNumber of files"
        git push origin main

        Write-Host "✅ Pushed batch $batchNumber ($counter files)"
        $counter = 0
        $batchNumber++
    }
}

# Commit remaining files
if ($counter -gt 0) {
    git commit -m "Final batch $batchNumber of files"
    git push origin main
    Write-Host "✅ Pushed final batch $batchNumber ($counter files)"
}
