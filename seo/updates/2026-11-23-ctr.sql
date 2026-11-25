-- Títulos y descripciones SEO por CTR bajo en top 10 (Search Console, 2026-11-23). Correr a mano en el SQL Editor de Supabase. Idempotente.

UPDATE articles AS a SET seo_title = v.t, seo_description = v.d
FROM (VALUES
  ('questions-region-patagonia', 'en', 'Is Patagonia Safe to Visit? Real Risks & Official Advice', 'Patagonia is generally safe for tourists. The real risks (theft, weather, trails, health) with official sources, emergency numbers and what to do.'),
  ('climbing-shoes-guide', 'en', 'How to Choose Climbing Shoes: Bouldering, Sport & Trad', 'Pick climbing shoes by style: SCARPA Drago and Drago LV for bouldering, La Sportiva TC Pro for trad and big walls, Black Diamond Method for value.'),
  ('amancay-patagonia', 'en', 'Amancay (Alstroemeria aurea): Patagonia''s Lily of the Incas', 'Amancay, the Lily of the Incas, blooms in summer in Patagonia''s windy mountains in yellow, orange and red. Cultural meaning, medicinal uses and how it grows.'),
  ('nalgene-water-bottle-review', 'en', 'Nalgene Water Bottle Review: Durability, Leaks & Models', 'Nalgene review for Patagonia hikers: BPA-free Tritan, leak-proof lids, Wide Mouth, Easy Sipper and 50% recycled Sustain models, plus care tips and where to buy.'),
  ('calafate-in-patagonia', 'en', 'Calafate Fruit (Berberis microphylla): Uses & Where It Grows', 'Calafate is a thorny Patagonian shrub with sweet, slightly acidic dark blue berries. Where it grows, its medicinal uses and how to reach El Calafate.'),
  ('red-berries-of-patagonia', 'en', 'Red Berries of Patagonia: Calafate, Strawberry & Blueberry', 'Red berries of Patagonia: calafate, frutilla strawberries, blueberries and blackberries. Health benefits, culinary uses, the calafate legend and local economy.'),
  ('piche-patagonico', 'es', 'Piche Patagónico (Zaedyus pichiy): El Armadillo que Hiberna', 'El piche patagónico es el armadillo más austral del mundo y el único cingulado que hiberna. Dónde vive, cómo es su caparazón aserruchado y cómo reconocerlo.'),
  ('lupinos', 'es', 'Lupinos en la Patagonia: Floración, Colores y Beneficios', 'Los lupinos (Lupinus) florecen en la Patagonia en blanco, azul, rosa y púrpura, 8 a 12 semanas tras sembrarlos. Cuándo florecen, sus vainas y su valor nutritivo.')
) AS v(slug, lang, t, d)
WHERE a.slug = v.slug AND a.language = v.lang
RETURNING a.language, a.slug, a.seo_title;

insert into sql_log(file) values ('2026-11-23-ctr.sql') on conflict (file) do update set applied_at = now();
