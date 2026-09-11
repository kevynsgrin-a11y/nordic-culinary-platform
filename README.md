# Nordic Culinary Platform

A Nordic recipe catalog (site #12 of the TrueAPI Phase 1 plan). The core
product problem the plan solves: ingredient identity. Nordic names vary ("herring",
"sill", "pickled herring" were three different ingredients to a string-matching
filter), so allergen and diet filters key off USDA FoodData Central canonical
fdcIds instead of raw strings, nutrition panels come from the resolved per-100g
values, and Azure Translator keeps terminology consistent across the catalog.
This scaffold ships the ingredient-identity layer: the catalog seed vocabulary,
the portfolio dictionary join, and the generated nutrition data. Recipe content
build-out follows; every new recipe's ingredient list resolves through the same
dictionary.

## APIs

FoodData Central (canonical fdcId + per-100g nutrition), Spoonacular (planned, free-text parsing), Azure Translator (planned, Nordic terminology).

All data is a committed build-time artifact from the TrueAPI portfolio ingest
(https://ingest.oakandmain.dev); no visitor page-load ever calls an upstream API.

## Build

```bash
node scripts/build-ingredient-nutrition.mjs   # regenerate data/ingredient-nutrition.json
DICTIONARY_PATH=<updated bundle> node scripts/build-ingredient-nutrition.mjs  # refresh
```
