#!/usr/bin/env node
// Joins the nordic-culinary-platform ingredient vocabulary (data/catalog.json) to the TrueAPI portfolio
// ingredient dictionary (static USDA FoodData Central data, resolved offline) and
// (re)writes data/ingredient-nutrition.json. Unresolved names keep resolved:false —
// render "not yet verified against FoodData Central", never invented numbers.
//
// Refresh: DICTIONARY_PATH=<bundle> node scripts/build-ingredient-nutrition.mjs
import { readFileSync, writeFileSync } from 'node:fs'
const DICT_PATH = process.env.DICTIONARY_PATH ?? 'C:/Users/Dell/OneDrive/Desktop/Documents/Kimi/Workspaces/TrueAPI/bundles/ingredient-dictionary.json'
const OUT = 'data/ingredient-nutrition.json'
const norm = (s) => String(s).toLowerCase().replace(/s+/g, ' ').trim()
const dict = JSON.parse(readFileSync(DICT_PATH, 'utf8'))
const catalog = JSON.parse(readFileSync('data/catalog.json', 'utf8'))
const entries = {}
let resolved = 0
for (const ing of catalog.ingredients) {
  const e = dict.entries[norm(ing)]
  if (!e) continue
  entries[norm(ing)] = { display: e.display, resolved: !!e.resolved, fdcId: e.fdcId ?? null, name: e.name ?? null, dataType: e.dataType ?? null, per100g: e.per100g ?? {} }
  if (e.resolved) resolved += 1
}
writeFileSync(OUT, JSON.stringify({ bundle: 'nordic-culinary-platform-ingredient-nutrition', source: 'USDA FoodData Central via TrueAPI portfolio dictionary', fetchedAt: dict.fetchedAt, counts: { catalog: catalog.ingredients.length, resolved }, entries }, null, 1))
console.log(OUT + ': ' + Object.keys(entries).length + ' entries, ' + resolved + '/' + catalog.ingredients.length + ' resolved')
