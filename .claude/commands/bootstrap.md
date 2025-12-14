# Recipe Machine Initialization Prompt v2.0

## Purpose
Initialize the Recipe Machine system for formatting recipes for a Hugo-based recipe website with proper taxonomies and consistent style. This system manages recipe formatting for notes.improvisedscience.org using a multi-document approach for efficient context window management.

## Activation Commands
Respond to any of these:
- `init`, `bootstrap`, `start`
- "Initialize Recipe Machine"
- "Start recipe formatting"
- "I want to add a recipe"
- "Recipe mode"
- "Format a recipe"

## System Overview
Recipe Machine is a Memory System collection (ID: f5485887-69e1-4f89-836b-3b1b390477b7) that:
- Manages Hugo site taxonomies (categories, methods, themes, tags)
- Ensures consistent recipe formatting with proper frontmatter
- Maintains a searchable archive of formatted recipes
- Tracks recipe sources and modifications
- Integrates with hugo_reader MCP tools for live site data

## Environment & Deployment Workflow

**IMPORTANT**: The current working directory (CWD) is the top-level directory of the notes.improvisedscience.org Hugo site source repository.

### Local File Access
- **Direct access** to all Hugo source files (content, themes, config, etc.)
- Recipe files stored in: `content/recipes/[recipe-name]/index.md`
- Use standard file tools (Read, Write, Edit) for content management
- Hugo site structure follows standard conventions

### Deployment Process
1. **Create/Edit Recipe**: Write recipe markdown files to `content/recipes/` directory
2. **Git Workflow**:
   - Stage changes: `git add .`
   - Commit with descriptive message: `git commit -m "Add [recipe name]"`
   - Push to remote: `git push`
3. **Automatic Deployment**: GitHub Actions automatically builds and publishes to live site
4. **Verification**: Check https://notes.improvisedscience.org after deployment completes

### Dual Access Strategy
- **Local files**: Primary method for creating/editing content
- **MCP hugo_reader tools**: Query live site for taxonomy verification and content discovery
- **Best practice**: Fetch taxonomies from live site, write content to local files

## CRITICAL: Initialization Process

### Step 1: Load Recipe Machine Context & Check Cache
Say: "I'll initialize the Recipe Machine for formatting recipes. Let me load the system context."

Execute these searches IN ORDER and EVALUATE RESULTS before proceeding:

```javascript
// 1. Load collection statistics
memory:memory_collection_stats({
  id: "f5485887-69e1-4f89-836b-3b1b390477b7",
  include_memory_types: true
})

// 2. CHECK FOR CACHED TAXONOMIES - THIS IS CRITICAL
memory:memory_memory_search({
  collection: "recipe_machine",
  filter: {type: "taxonomy_cache"},
  query: "categories methods themes tags",
  limit: 4
})
```

**STOP AND EVALUATE**: 
- If taxonomy_cache memories are found → **GO TO STEP 3** (Use Cache)
- If no taxonomy_cache found → Continue to Step 2

### Step 2: Check Project Knowledge (ONLY if no cache in collection)
Look in the conversation context (Project Knowledge) for:
- **Recipe Site Core Taxonomies** (categories, methods, themes)
- **Recipe Site Ingredient Tags** (comprehensive tag list)
- **Recipe Formatting Template** (standard format)

If documents found in Project Knowledge:
- Note which are available
- Proceed to Step 4 (Ready State)

If not found in Project Knowledge:
- Proceed to Step 2A (Fetch from Site)

### Step 2A: Fetch from Live Site (ONLY if no cache anywhere)
```javascript
// 1. Get current timestamp
clockwork:now()

// 2. Discover site structure
hugo_reader:hugo_reader_discover_site({
  hugo_site_path: "https://notes.improvisedscience.org",
  discovery_type: "overview"
})

// 3. Fetch each taxonomy
hugo_reader:hugo_reader_get_taxonomy_terms({
  hugo_site_path: "https://notes.improvisedscience.org",
  taxonomy: "categories"
})

hugo_reader:hugo_reader_get_taxonomy_terms({
  hugo_site_path: "https://notes.improvisedscience.org",
  taxonomy: "methods"
})

hugo_reader:hugo_reader_get_taxonomy_terms({
  hugo_site_path: "https://notes.improvisedscience.org",
  taxonomy: "themes"
})

hugo_reader:hugo_reader_get_taxonomy_terms({
  hugo_site_path: "https://notes.improvisedscience.org",
  taxonomy: "tags"
})
```

After fetching:
1. Save to Recipe Machine collection as taxonomy_cache
2. Create artifacts for Project Knowledge (optional)
3. Proceed to Step 4

### Step 3: Use Cached Taxonomies (PREFERRED PATH)
When taxonomy_cache memories are found:

1. **Evaluate cache freshness**:
   - Check fetched_date in metadata
   - If < 7 days old → USE IT
   - If > 7 days old → Note as stale, offer refresh option

2. **Load the cache data**:
   - Core Taxonomies (categories, methods, themes)
   - Ingredient Tags (separate for efficiency)

3. **DO NOT**:
   - Create new artifacts
   - Try to fetch from site
   - Duplicate the cache

4. **Proceed directly to Step 4**

### Step 4: Report Ready State
Display initialization summary based on what was loaded:

```
✅ Recipe Machine Initialized!

📚 Taxonomy Status:
   Source: [Cache from date] OR [Fresh from site] OR [Project Knowledge]
   - Categories: [count] loaded
   - Methods: [count] loaded
   - Themes: [count] loaded
   - Tags: [count] available for reference
   Cache Age: [X hours/days old] [FRESH/STALE indicator]

🔧 System Configuration:
   - Site: https://notes.improvisedscience.org
   - Collection: recipe_machine ([X] memories)
   - Format: Hugo-compatible with frontmatter

📝 Ready Commands:
   - Provide any recipe to format
   - 'check cache' - Show loaded taxonomies
   - 'list tags' - Display ingredient tags
   - 'refresh' - Update from live site
   - 'recent recipes' - Show latest formatted

Ready to format recipes! Provide a recipe or paste one to get started.
```

## Decision Tree Summary

```
START
  ↓
Search Recipe Machine collection for taxonomy_cache
  ↓
Found cache? 
  → YES: Use it (Step 3) → Ready (Step 4)
  → NO: Check Project Knowledge
      ↓
    Found in Project Knowledge?
      → YES: Use it → Ready (Step 4)
      → NO: Fetch from site (Step 2A) → Save → Ready (Step 4)
```

## Recipe Formatting Workflow

### When User Provides a Recipe

1. **Analyze Content**
   - Identify recipe name
   - Extract ingredients
   - Determine cooking method
   - Calculate times
   - Identify servings

2. **Match Taxonomies** (using loaded cache)
   - Select appropriate category (1 primary)
   - Identify cooking method(s)
   - Determine theme if applicable
   - Tag all major ingredients (capitalized)

3. **Create Recipe File Locally**
   - Generate slug from recipe name (lowercase, hyphens)
   - Create directory: `content/recipes/[slug]/`
   - Write file: `content/recipes/[slug]/index.md`

4. **Generate Formatted Output**
   Use this structure:

```yaml
---
title: "[Recipe Name]"
description: "[Brief SEO-friendly description]"
date: [current timestamp]
lastmod: [same as date]
publishdate: [same as date]
draft: false
weight: 10
prep_time: "[X minutes/hours]"
cook_time: "[X minutes/hours]"
total_time: "[X minutes/hours]"
servings: [number]
categories: ["selected_category"]
methods: ["primary_method"]
tags: ["Ingredient1", "Ingredient2", "Characteristic"]
themes: ["theme_if_applicable"]
iscjklanguage: false
---
```

5. **Write Content Sections**
   - Opening paragraph
   - Ingredients (metric first)
   - Equipment
   - Instructions (staged with times)
   - Notes
   - Variations
   - Storage

6. **Commit and Deploy**
   - Stage changes: `git add content/recipes/[slug]/`
   - Commit: `git commit -m "Add [recipe name] recipe"`
   - Push: `git push`
   - GitHub Actions will automatically build and deploy

## Cache Management Best Practices

### Cache Priority Order
1. **Recipe Machine collection** (FIRST CHECK - most reliable)
2. **Project Knowledge** (second check - session persistent)
3. **Live site fetch** (LAST RESORT - only if no cache exists)

### Cache Storage
When saving NEW cache to Recipe Machine:
```javascript
memory:memory_memory_create({
  memories: [{
    type: "taxonomy_cache",
    content: "[taxonomy data]",
    metadata: {
      taxonomy_type: "categories|methods|themes|tags",
      fetched_date: "[timestamp]",
      term_count: [number],
      site_url: "https://notes.improvisedscience.org",
      privacy_level: "public"
    },
    collections: ["recipe_machine"]
  }]
})
```

### Cache Freshness Guidelines
- **< 1 hour**: FRESH - use without question
- **< 7 days**: GOOD - use normally
- **7-30 days**: STALE - use but offer refresh
- **> 30 days**: EXPIRED - refresh recommended

## Error Handling

### Missing Hugo Reader
```
Hugo Reader MCP tools not available.
✓ Using cached taxonomies from [date]
Options:
1. Continue with cached data (recommended)
2. Provide taxonomies manually
```

### Site Unreachable (only if fetching)
```
Cannot reach https://notes.improvisedscience.org
Options:
1. Retry connection
2. Use cached taxonomies from [date]
3. Provide taxonomy lists manually
```

### No Timestamp Tool
```
I need the current date/time for the recipe.
Please provide: YYYY-MM-DD HH:MM
```

## Commands Reference

### Initialization
- `init` / `bootstrap` / `start` - Begin session
- `Initialize Recipe Machine` - Full bootstrap
- `Recipe mode` - Quick start

### Recipe Operations
- Paste or describe recipe - Auto-format
- `format [recipe name]` - Search and format
- `check ingredients` - Validate tags
- `generate frontmatter` - Just the YAML

### Cache Management
- `check cache` - Show loaded taxonomies & age
- `list tags` - Display all ingredient tags
- `refresh` - Force update from live site
- `cache stats` - Show detailed cache metrics

### Recipe Library
- `recent recipes` - Last 7 days
- `list recipes` - All formatted
- `search [ingredient]` - Find by ingredient
- `unpublished` - Show drafts

## Important Implementation Notes

1. **ALWAYS check Recipe Machine collection FIRST** for cached taxonomies
2. **DO NOT create artifacts if cache exists** in the collection
3. **DO NOT duplicate cached data** - use what's there
4. **Cache age < 7 days is acceptable** - don't refresh unnecessarily
5. **Preserve context window** by not loading unnecessary data
6. **Core taxonomies stay loaded** (~90 terms)
7. **Tags loaded on demand** (180+ terms)
8. **When suggesting new terms**, note they're not in current lists

## Version History
- v2.1 (2025-12-13): Added local file access and git deployment workflow
- v2.0 (2025-08-30): Fixed cache detection logic, prioritize collection cache
- v1.0 (2025-08-30): Initial Recipe Machine setup
- Collection ID: f5485887-69e1-4f89-836b-3b1b390477b7
- Site: https://notes.improvisedscience.org

## Key Changes in v2.1
1. **Environment & Deployment Workflow** section added
2. **Local file access** documented - CWD is Hugo site TLD
3. **Git workflow** integrated - commit and push after recipe creation
4. **GitHub Actions** deployment process documented
5. **Dual access strategy** - local files + MCP tools for verification

## Key Changes in v2.0
1. **Check collection cache FIRST** - don't skip to Project Knowledge
2. **Use found cache immediately** - don't recreate artifacts
3. **Clear decision tree** - explicit paths for each scenario
4. **Cache freshness guidelines** - when to use vs refresh
5. **Removed redundant steps** - streamlined initialization
