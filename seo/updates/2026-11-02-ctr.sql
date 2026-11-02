-- Títulos y descripciones SEO por CTR bajo en top 10 (Search Console). Correr a mano en el SQL Editor de Supabase. Idempotente.

UPDATE articles AS a SET seo_title = v.t, seo_description = v.d
FROM (VALUES
  ('nutria', 'en', 'Coipo (Nutria) in Patagonia: Habitat, Size and Diet', 'The coipo, or nutria (Myocastor coypus), is a semi-aquatic rodent 40–60 cm long and 5–9 kg. Where it lives in Patagonian rivers and lakes, and what it eats.'),
  ('ciervo-colorado', 'es', 'Ciervo Colorado (Cervus elaphus): Origen y Hábitat', 'El ciervo colorado o venado rojo (Cervus elaphus) llegó a Argentina en 1906 y hoy ocupa la Patagonia: descripción, hábitat, comportamiento e impacto ambiental.'),
  ('strait-of-magellan-history-significance', 'en', 'Strait of Magellan: Map, Location and Discovery History', 'At South America''s southern tip, the Strait of Magellan is a 560 km passage joining the Atlantic and Pacific, found in 1520. Map, location and history.'),
  ('monito-del-monte-marsupial', 'en', 'Monito del Monte: Patagonia''s Living Fossil Marsupial', 'The monito del monte (Dromiciops gliroides) is a 20–40 g marsupial of Patagonian forests. Size, diet, habitat and its link between South America and Australia.'),
  ('tero', 'es', 'Tero en la Patagonia: Huevos, Nido y Curiosidades', 'El tero (Vanellus chilensis) mide 35 cm y tiene un espolón en las alas. Dónde vive, cómo defiende su nido, qué come y cómo cuida los huevos y los pichones.'),
  ('liebre-europea-historia-impacto-y-curiosidades', 'es', 'Liebre Europea en Patagonia: Cómo Llegó y Su Impacto', 'La liebre europea (Lepus europaeus) llegó a Argentina en 1888 desde Alemania y avanzó 25-30 km por año. Biología, reproducción e impacto ecológico en el sur.'),
  ('pedulas-escalada', 'es', 'Pedulas de Escalada: Guía para Elegir Pies de Gato', 'Qué son las pedulas o pies de gato y cómo elegirlas según el estilo de escalada y la roca de El Chaltén, Cochamó o Valle Encantado: tipos, ajuste y compra.'),
  ('puma-concolor-patagonia', 'es', 'Puma en la Patagonia: Hábitat, Rasgos y Conservación', 'El puma (Puma concolor), segundo felino más grande de América, habita de Neuquén a Tierra del Fuego. Hábitat, características, conservación y rol ecológico.'),
  ('loica-in-patagonia-habitat-behavior-conservation', 'en', 'Loica (Leistes loyca): Patagonia''s Red-Breasted Bird', 'The loica (Leistes loyca) is a Patagonian songbird: males are glossy black with a red breast, females brown. Habitat, behavior, identification and conservation.')
) AS v(slug, lang, t, d)
WHERE a.slug = v.slug AND a.language = v.lang
RETURNING a.language, a.slug, a.seo_title;
