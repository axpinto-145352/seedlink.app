# How to Run This Build

## Quick Start

1. **Copy the project files** into your build directory:
   ```
   C:\Users\Antho\OneDrive\Desktop\Business\Real Estate\Venture Capital\AI\Veteran Vectors\Builds\Claude Code Builds\Seedlink.app builds\
   ```

2. **Place these files in that directory:**
   - `CLAUDE.md` (the agents prompt — this is what Claude Code reads automatically)
   - `SeedLink_Combined_Proposal_VeteranVectors_Updated.pdf`
   - `SeedLink_SOW_Combined_VeteranVectors_Updated.pdf`

3. **Open Claude Code** in that directory:
   ```bash
   cd "C:\Users\Antho\OneDrive\Desktop\Business\Real Estate\Venture Capital\AI\Veteran Vectors\Builds\Claude Code Builds\Seedlink.app builds"
   claude
   ```

4. **Kick it off** with this prompt:
   ```
   Read the CLAUDE.md file, then read both PDF documents in this directory. Follow the execution order exactly — start with REQUIREMENTS.md and work through all 7 steps. Build every workflow and prompt file completely, no stubs.
   ```

## What Gets Built

- 7 production-ready n8n workflow JSON files
- 8 Claude API system prompts
- Requirements doc, architecture doc, setup guide, SOP, and Google Sheets template
- Everything needed to import into n8n and go live

## Notes

- `CLAUDE.md` is the special filename Claude Code automatically reads as project context
- The prompt is designed to be self-contained — Claude Code should execute end-to-end without additional input
- If Claude Code pauses to ask questions, tell it to make reasonable assumptions and document them in SUMMARY.md
