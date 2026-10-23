-- Link al artículo nuevo de los tulipanes de Trevelin en el tip "Visitar Trevelin
-- en primavera" del artículo de los galeses (ES y EN). Solo agrega el link: el
-- resto del texto queda igual.
-- Ya aplicado el 2026-10-22 por la API (mismo reemplazo). Se puede volver a
-- correr: el `where` saltea las filas que ya tienen el link.

update public.articles
set content = replace(
  content,
  '<li><strong>Visitar Trevelin en primavera</strong>: Cuando los tulipanes florecen (entre mediados a finales de octubre).</li>',
  '<li><strong>Visitar Trevelin en primavera</strong>: Cuando los tulipanes florecen (entre mediados a finales de octubre). Más info: <a href="/flora/tulipanes-trevelin">campo de tulipanes de Trevelin</a>.</li>'
)
where slug = 'galeses-patagonia-historia-turismo-chubut'
  and language = 'es'
  and position('/flora/tulipanes-trevelin' in content) = 0;

update public.articles
set content = replace(
  content,
  '<li><strong>Visit Trevelin in spring</strong>: When tulips bloom in homage to the Welsh settlers.</li>',
  '<li><strong>Visit Trevelin in spring</strong>: When tulips bloom in homage to the Welsh settlers. More info: <a href="/en/flora/trevelin-tulip-fields">Trevelin tulip fields</a>.</li>'
)
where slug = 'welsh-patagonia'
  and language = 'en'
  and position('/en/flora/trevelin-tulip-fields' in content) = 0;
