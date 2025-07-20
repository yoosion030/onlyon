import fs from "node:fs/promises";
import path from "node:path";
import { glob } from "glob";

async function collectCoverageFiles() {
  try {
    // Define the patterns to search
    const patterns = ["../../apps/*", "../../packages/*"];

    // Define the destination directory
    const destinationDir = path.join(process.cwd(), "coverage/raw");

    // Create the destination directory if it doesn't exist
    await fs.mkdir(destinationDir, { recursive: true });

    // Arrays to collect all directories and directories with coverage
    const allDirectories = [];
    const directoriesWithCoverage = [];

    // Process each pattern
    for (const pattern of patterns) {
      // Find all paths matching the pattern
      const matches = await glob(pattern);

      // Filter to only include directories
      for (const match of matches) {
        const stats = await fs.stat(match);

        if (stats.isDirectory()) {
          allDirectories.push(match);

          // Try multiple possible coverage file names
          const possibleCoverageFiles = [
            path.join(match, "coverage.json"),
            path.join(match, "coverage", "coverage-final.json"),
            path.join(match, "coverage", "coverage.json"),
          ];

          let coverageFilePath = null;

          // Check which coverage file exists
          for (const filePath of possibleCoverageFiles) {
            try {
              await fs.access(filePath);
              coverageFilePath = filePath;
              break;
            } catch {
              // Continue to next possible file
            }
          }

          if (coverageFilePath) {
            // File exists, add to list of directories with coverage
            directoriesWithCoverage.push(match);

            // Copy it to the destination with a unique name
            const directoryName = path.basename(match);
            const destinationFile = path.join(
              destinationDir,
              `${directoryName}.json`,
            );

            await fs.copyFile(coverageFilePath, destinationFile);
            console.log(`✓ Collected coverage from ${directoryName}`);
          } else {
            console.log(`⚠ No coverage file found in ${path.basename(match)}`);
          }
        }
      }
    }

    // Create clean patterns for display (without any "../" prefixes)
    const replaceDotPatterns = (str: string) => str.replace(/\.\.\//g, "");

    if (directoriesWithCoverage.length > 0) {
      console.log(
        `\n✅ Found coverage files in: ${directoriesWithCoverage
          .map(replaceDotPatterns)
          .join(", ")}`,
      );
    } else {
      console.log("\n❌ No coverage files found. Run tests first:");
      console.log("   turbo test:coverage");
    }

    console.log(`\n📁 Coverage collected into: ${destinationDir}`);

    // List collected files
    const collectedFiles = await fs.readdir(destinationDir);
    if (collectedFiles.length > 0) {
      console.log("📋 Collected files:");
      collectedFiles.forEach((file) => console.log(`   - ${file}`));
    }
  } catch (error) {
    console.error("❌ Error collecting coverage files:", error);
    process.exit(1);
  }
}

// Run the function
collectCoverageFiles();
