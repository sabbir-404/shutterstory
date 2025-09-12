# batch-push.ps1
# Commit and push image files in batches of 50

# Find all image files (adjust extensions as needed)
$files = Get-ChildItem -Recurse -Include *.jpg, *.jpeg, *.png | Select-Object -ExpandProperty FullName

# Batch size
$batchSize = 50
$counter = 0
$batchNumber = 1
$batchFiles = @()

foreach ($file in $files) {
    $batchFiles += $file
    $counter++

    if ($counter -ge $batchSize) {
        git add $batchFiles
        git commit -m "Batch $batchNumber of images"
        git push origin main

        Write-Host "✅ Pushed batch $batchNumber ($counter files)"
        $counter = 0
        $batchNumber++
        $batchFiles = @()
    }
}

# Push remaining files
if ($counter -gt 0) {
    git add $batchFiles
    git commit -m "Final batch $batchNumber of images"
    git push origin main
    Write-Host "✅ Pushed final batch $batchNumber ($counter files)"
}
