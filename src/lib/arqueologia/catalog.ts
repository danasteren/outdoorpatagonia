export type ArqueologiaCategoria = "dinosaurio" | "fosil" | "humano" | "petroglifo"

export type ArqueologiaEntry = {
  slug: string
  nombre: string
  nombreCientifico?: string
  categoria: ArqueologiaCategoria
  era: string
  edadAnios?: string
  lat: number
  lng: number
  provincia: string
  pais: "AR" | "CL" | "CL/AR"
  museo?: string
  museoSlug?: string
  descripcion: string[]
  datosExtra: Array<{ label: string; valor: string }>
  faq: Array<{ pregunta: string; respuesta: string }>
  wikipediaTitle: string
  urlFuente?: string
}

export const ARQUEOLOGIA_CATALOG: ArqueologiaEntry[] = [
  // ─── DINOSAURIOS ─────────────────────────────────────────────────────────────
  {
    slug: "argentinosaurus",
    nombre: "Argentinosaurus",
    nombreCientifico: "Argentinosaurus huinculensis",
    categoria: "dinosaurio",
    era: "Cretácico Tardío",
    edadAnios: "~95 millones de años",
    lat: -38.9327,
    lng: -69.2197,
    provincia: "Neuquén",
    pais: "AR",
    museo: "Museo Carmen Funes (MUPAM), Plaza Huincul",
    descripcion: [
      "El Argentinosaurus es considerado el dinosaurio más grande que pisó la Tierra. Sus restos fueron descubiertos en 1987 por el productor rural Guillermo Heredia en la zona de Plaza Huincul, Neuquén, y descriptos científicamente en 1993 por José Bonaparte y Rodolfo Coria. Se estima que alcanzaba entre 35 y 40 metros de longitud y pesaba entre 70 y 80 toneladas.",
      "Perteneció al grupo de los titanosaurios, saurópodos de cuello largo que prosperaron en el período Cretácico. Habitó lo que hoy es la Patagonia argentina hace aproximadamente 95 millones de años, cuando la región era una llanura cálida y húmeda atravesada por grandes ríos.",
      "Sus restos más completos se exhiben en el Museo Carmen Funes (MUPAM) de Plaza Huincul, a 100 km de Neuquén capital. El museo también alberga una réplica a escala real que se puede recorrer y es uno de los más visitados de la región.",
    ],
    datosExtra: [
      { label: "Longitud estimada", valor: "35–40 metros" },
      { label: "Peso estimado", valor: "70–80 toneladas" },
      { label: "Grupo", valor: "Sauropoda — Titanosauria" },
      { label: "Era", valor: "Cretácico Tardío (~95 Ma)" },
      { label: "Hallazgo", valor: "Plaza Huincul, Neuquén, 1987" },
      { label: "Descripto por", valor: "Bonaparte & Coria, 1993" },
    ],
    faq: [
      {
        pregunta: "¿Dónde se puede ver el Argentinosaurus?",
        respuesta:
          "El esqueleto original y una réplica a escala real se exhiben en el Museo Carmen Funes (MUPAM) en Plaza Huincul, Neuquén, a 100 km de la capital provincial. El museo está abierto al público y es visitable en el marco de la Ruta de los Dinosaurios de Neuquén.",
      },
      {
        pregunta: "¿Era el Argentinosaurus el dinosaurio más grande?",
        respuesta:
          "Es uno de los candidatos más firmes al título de dinosaurio más largo y pesado. Sin embargo, el Patagotitan mayorum, hallado en Chubut en 2014, disputó ese récord. Ambos son titanosaurios patagónicos y los candidatos principales a ser el animal terrestre más grande de la historia.",
      },
      {
        pregunta: "¿Qué comía el Argentinosaurus?",
        respuesta:
          "Era herbívoro. Su cuello largo le permitía alcanzar vegetación de las copas de los árboles del Cretácico: coníferas, cícadas y helechos arborescentes. Necesitaba consumir cientos de kilogramos de vegetación por día para sostener su enorme masa corporal.",
      },
    ],
    wikipediaTitle: "Argentinosaurus",
    urlFuente: "https://www.mupam.neuquen.gov.ar/",
  },
  {
    slug: "giganotosaurus",
    nombre: "Giganotosaurus",
    nombreCientifico: "Giganotosaurus carolinii",
    categoria: "dinosaurio",
    era: "Cretácico Tardío",
    edadAnios: "~97 millones de años",
    lat: -39.27,
    lng: -68.74,
    provincia: "Neuquén",
    pais: "AR",
    museo: "Museo Ernesto Bachmann, Villa El Chocón",
    descripcion: [
      "Descubierto en 1993 por el mecánico aficionado Rubén Carolini mientras circulaba por la Formación Candeleros en Villa El Chocón, Neuquén, el Giganotosaurus es uno de los carnívoros más grandes conocidos de la historia. Su nombre significa 'lagarto gigante del sur' y desafió durante años el reinado del Tyrannosaurus rex.",
      "Con un cráneo de 1,8 metros de longitud y un cuerpo de 12 a 13 metros, superaba al T. rex en tamaño aunque vivió 30 millones de años antes que él. Pertenecía a la familia Carcharodontosauridae — los 'lagartos dientes de tiburón' — y probablemente cazaba en grupos para atacar a los gigantescos saurópodos de la región.",
      "Sus restos se exhiben en el Museo Ernesto Bachmann de Villa El Chocón, a orillas del embalse Ezequiel Ramos Mexía. La zona es un destino paleontológico de primer nivel: el mismo embalse expuso huellas de dinosaurios y restos de plesiosaurios en sus márgenes.",
    ],
    datosExtra: [
      { label: "Longitud estimada", valor: "12–13 metros" },
      { label: "Peso estimado", valor: "6–8 toneladas" },
      { label: "Grupo", valor: "Theropoda — Carcharodontosauridae" },
      { label: "Era", valor: "Cretácico Tardío (~97 Ma)" },
      { label: "Hallazgo", valor: "Villa El Chocón, Neuquén, 1993" },
      { label: "Descripto por", valor: "Coria & Salgado, 1995" },
    ],
    faq: [
      {
        pregunta: "¿El Giganotosaurus era más grande que el T. rex?",
        respuesta:
          "En longitud y peso estimado, sí — el Giganotosaurus era ligeramente mayor que el Tyrannosaurus rex. Sin embargo, el T. rex tenía un cráneo más robusto y una mordida más poderosa. Vivieron en épocas y continentes distintos: Giganotosaurus en Sudamérica hace 97 Ma, T. rex en Norteamérica hace ~66 Ma.",
      },
      {
        pregunta: "¿Dónde se puede ver el Giganotosaurus?",
        respuesta:
          "El fósil original se exhibe en el Museo Ernesto Bachmann de Villa El Chocón, Neuquén. Una réplica también se encuentra en el MUPAM de Plaza Huincul. Villa El Chocón está a 80 km de Neuquén capital por la Ruta Nacional 237.",
      },
      {
        pregunta: "¿Cazaba en manada el Giganotosaurus?",
        respuesta:
          "Se sugiere que sí, al encontrar en la misma formación el Mapusaurus roseae (pariente cercano) en grupos. La caza cooperativa habría sido la única forma de derribar a presas como el Argentinosaurus. Sin embargo, la evidencia directa de comportamiento social en dinosaurios es indirecta y debatida.",
      },
    ],
    wikipediaTitle: "Giganotosaurus",
    urlFuente: "https://www.museoernestobachmann.neuquen.gov.ar/",
  },
  {
    slug: "patagotitan",
    nombre: "Patagotitan",
    nombreCientifico: "Patagotitan mayorum",
    categoria: "dinosaurio",
    era: "Cretácico Temprano",
    edadAnios: "~100 millones de años",
    lat: -43.2443,
    lng: -65.3087,
    provincia: "Chubut",
    pais: "AR",
    museo: "Museo Paleontológico Egidio Feruglio (MEF), Trelew",
    descripcion: [
      "Descubierto en 2012 en la estancia La Flecha, cerca de Las Plumas, Chubut, el Patagotitan mayorum es el dinosaurio más pesado conocido. Sus restos fueron hallados accidentalmente por el empleado rural Aurelio Hernández y excavados durante años por el equipo del Museo Paleontológico Egidio Feruglio (MEF) de Trelew.",
      "Se estima que pesaba aproximadamente 70 toneladas — equivalente a 14 elefantes africanos — y medía unos 37 metros de largo. Fue descripto científicamente en 2017 por Diego Pol y José Luis Carballido. El New York Museum of Natural History encargó un molde completo que desde 2016 ocupa el hall central del museo, donde el cuello y parte de la cabeza sobresalen hacia el corredor externo.",
      "El MEF de Trelew es uno de los museos paleontológicos más importantes del mundo y exhibe los huesos originales junto con la réplica. La sala de titanosaurios permite ver los fémures reales de Patagotitan, cada uno de más de 2 metros de alto.",
    ],
    datosExtra: [
      { label: "Longitud estimada", valor: "~37 metros" },
      { label: "Peso estimado", valor: "~70 toneladas" },
      { label: "Grupo", valor: "Sauropoda — Titanosauria" },
      { label: "Era", valor: "Cretácico Temprano (~100 Ma)" },
      { label: "Hallazgo", valor: "La Flecha, Chubut, 2012" },
      { label: "Descripto por", valor: "Pol & Carballido, 2017" },
    ],
    faq: [
      {
        pregunta: "¿Dónde se puede ver el Patagotitan?",
        respuesta:
          "Los huesos originales y una réplica completa se exhiben en el Museo Paleontológico Egidio Feruglio (MEF) en Trelew, Chubut. El museo está a 1350 km de Buenos Aires. También hay una réplica famosa en el American Museum of Natural History de Nueva York.",
      },
      {
        pregunta: "¿Es el Patagotitan el dinosaurio más grande del mundo?",
        respuesta:
          "En peso es el candidato más sólido al récord: ~70 toneladas según estimaciones de 2017. En longitud, el Argentinosaurus (también patagónico) puede haberlo igualado. Ambos son titanosaurios de la Patagonia argentina y rivalizan por el título de animal terrestre más pesado de la historia.",
      },
      {
        pregunta: "¿Cuánto tiempo tomó excavar el Patagotitan?",
        respuesta:
          "La excavación principal duró cuatro años (2012–2015). Se recuperaron más de 220 huesos individuales pertenecientes a al menos seis individuos distintos. Es uno de los hallazgos paleontológicos más completos de un titanosaurio gigante.",
      },
    ],
    wikipediaTitle: "Patagotitan",
    urlFuente: "https://www.mef.org.ar/",
  },
  {
    slug: "amargasaurus",
    nombre: "Amargasaurus",
    nombreCientifico: "Amargasaurus cazaui",
    categoria: "dinosaurio",
    era: "Cretácico Temprano",
    edadAnios: "~130 millones de años",
    lat: -37.1,
    lng: -69.9,
    provincia: "Neuquén",
    pais: "AR",
    museo: "Museo Argentino de Ciencias Naturales (MACN), Buenos Aires",
    descripcion: [
      "El Amargasaurus es uno de los dinosaurios más singulares de la Patagonia. Hallado en 1984 en la quebrada La Amarga, Neuquén, por la expedición de José Bonaparte, presentaba dos hileras de espinas altas que recorrían toda la longitud del cuello — una característica única entre los saurópodos conocidos.",
      "Estas espinas podían alcanzar los 60 cm de alto. Los paleontólogos debaten si sostenían una vela de piel para regulación térmica, si eran elementos de exhibición sexual o social, o si simplemente limitaban la movilidad del cuello reduciendo el riesgo de ataque. Medía unos 9 a 10 metros, pequeño comparado con sus parientes titanosaurios.",
      "Su esqueleto casi completo se conserva en el Museo Argentino de Ciencias Naturales (MACN) de Buenos Aires. Fue descripto en 1991 por Leonardo Salgado y José Bonaparte. La quebrada La Amarga, en el noroeste neuquino, es un sitio paleontológico rico en dinosaurios del Cretácico Temprano.",
    ],
    datosExtra: [
      { label: "Longitud estimada", valor: "9–10 metros" },
      { label: "Peso estimado", valor: "~2,5 toneladas" },
      { label: "Grupo", valor: "Sauropoda — Dicraeosauridae" },
      { label: "Era", valor: "Cretácico Temprano (~130 Ma)" },
      { label: "Hallazgo", valor: "La Amarga, Neuquén, 1984" },
      { label: "Descripto por", valor: "Salgado & Bonaparte, 1991" },
    ],
    faq: [
      {
        pregunta: "¿Para qué servían las espinas del Amargasaurus?",
        respuesta:
          "No hay consenso científico. Las hipótesis más aceptadas son: sostenían una membrana de piel para regulación térmica (como una vela), eran elementos de exhibición o reconocimiento intraespecífico, o limitaban la movilidad del cuello en una estrategia de defensa. La alta vascularización de las espinas sugiere que podían tener función termorreguladora.",
      },
      {
        pregunta: "¿Dónde se puede ver el Amargasaurus?",
        respuesta:
          "El esqueleto original se exhibe en el Museo Argentino de Ciencias Naturales Bernardino Rivadavia (MACN) en Buenos Aires. También hay réplicas en varios museos de Neuquén y en museos internacionales.",
      },
    ],
    wikipediaTitle: "Amargasaurus",
  },
  {
    slug: "carnotaurus",
    nombre: "Carnotaurus",
    nombreCientifico: "Carnotaurus sastrei",
    categoria: "dinosaurio",
    era: "Cretácico Tardío",
    edadAnios: "~70 millones de años",
    lat: -42.7,
    lng: -66.5,
    provincia: "Chubut",
    pais: "AR",
    museo: "Museo Argentino de Ciencias Naturales (MACN), Buenos Aires",
    descripcion: [
      "El Carnotaurus ('toro carnívoro') es uno de los terópodos más extraños y reconocibles de la Patagonia. Su rasgo más llamativo son los dos cuernos gruesos sobre los ojos — una característica única entre los terópodos carnívoros — que le dan su nombre y una apariencia intimidante. Fue hallado en Bajada Moreno, Chubut, en 1984.",
      "Tenía brazos extremadamente pequeños, incluso más reducidos que los del T. rex, y una cabeza muy corta y roma para ser un gran depredador. Su cuero fue preservado con impresiones de escamas — uno de los pocos terópodos con evidencia directa de piel — mostrando pequeñas escamas no imbricadas con filas de escudos más grandes.",
      "Perteneció a la familia Abelisauridae, los depredadores dominantes de Gondwana (Sudamérica, África, India) durante el Cretácico Tardío, equivalentes ecológicos de los ceratosáuridos y abelisáuridos del norte. Fue descripto por José Bonaparte en 1985.",
    ],
    datosExtra: [
      { label: "Longitud estimada", valor: "7,5–8 metros" },
      { label: "Peso estimado", valor: "~1,5 toneladas" },
      { label: "Grupo", valor: "Theropoda — Abelisauridae" },
      { label: "Era", valor: "Cretácico Tardío (~70 Ma)" },
      { label: "Hallazgo", valor: "Bajada Moreno, Chubut, 1984" },
      { label: "Descripto por", valor: "Bonaparte, 1985" },
    ],
    faq: [
      {
        pregunta: "¿Para qué usaba los cuernos el Carnotaurus?",
        respuesta:
          "Se cree que los cuernos eran principalmente para combates intraespecíficos (entre machos de la misma especie) o para exhibición sexual, similar a los cuernos de muchos mamíferos actuales. No estaban orientados para la caza — los depredadores de gran tamaño usan la mandíbula, no la cabeza.",
      },
      {
        pregunta: "¿El Carnotaurus tenía escamas?",
        respuesta:
          "Sí, el espécimen de Chubut preservó impresiones de piel, lo que es raro en dinosaurios. Las escamas eran pequeñas y no superpuestas, con filas de escudos más grandes en los costados del cuerpo. Es uno de los mejores registros de piel de terópodo conocidos.",
      },
    ],
    wikipediaTitle: "Carnotaurus",
  },
  {
    slug: "mapusaurus",
    nombre: "Mapusaurus",
    nombreCientifico: "Mapusaurus roseae",
    categoria: "dinosaurio",
    era: "Cretácico Tardío",
    edadAnios: "~96 millones de años",
    lat: -38.85,
    lng: -69.1,
    provincia: "Neuquén",
    pais: "AR",
    museo: "Museo Carmen Funes (MUPAM), Plaza Huincul",
    descripcion: [
      "El Mapusaurus ('lagarto de la tierra' en mapudungún) fue descubierto en el Cañadón del Gato, Neuquén, en un hallazgo excepcional: los restos de al menos siete individuos de distintos tamaños agrupados en el mismo sitio. Este 'cementerio' de Mapusaurus es la evidencia más sólida de que los grandes carcharodontosáuridos podían vivir o cazar en grupo.",
      "Era un pariente cercano del Giganotosaurus y compartió territorio con él. Con 10 a 12 metros de longitud, era ligeramente más pequeño que su primo pero igual de formidable. Los paleontólogos sugieren que la caza cooperativa en manada habría sido la estrategia necesaria para derribar a las presas más grandes de la región, como el Argentinosaurus.",
      "Fue descripto en 2006 por Rodolfo Coria y Phil Currie. El sitio del hallazgo se conoce como la 'Quarry of the Giants' y sigue siendo excavado. Sus restos se exhiben en el MUPAM de Plaza Huincul.",
    ],
    datosExtra: [
      { label: "Longitud estimada", valor: "10–12 metros" },
      { label: "Peso estimado", valor: "~3 toneladas" },
      { label: "Grupo", valor: "Theropoda — Carcharodontosauridae" },
      { label: "Era", valor: "Cretácico Tardío (~96 Ma)" },
      { label: "Hallazgo", valor: "Cañadón del Gato, Neuquén, 1997" },
      { label: "Descripto por", valor: "Coria & Currie, 2006" },
    ],
    faq: [
      {
        pregunta: "¿El Mapusaurus cazaba en manada?",
        respuesta:
          "Es la hipótesis más aceptada dado el hallazgo de múltiples individuos juntos. Si el Mapusaurus cazaba en grupo, podría haber derribado presas enormes como el Argentinosaurus. Sin embargo, la agrupación también podría explicarse por un accidente colectivo (inundación, sequía) o un sitio de descanso compartido.",
      },
      {
        pregunta: "¿Qué significa 'Mapusaurus'?",
        respuesta:
          "'Mapu' en mapudungún significa 'tierra' o 'lugar'. El nombre hace referencia al territorio mapuche donde fue hallado, en el norte de la Patagonia argentina. La especie se llama 'roseae' en honor a Rose Letwin, patrocinadora de la expedición.",
      },
    ],
    wikipediaTitle: "Mapusaurus",
  },
  {
    slug: "abelisaurus",
    nombre: "Abelisaurus",
    nombreCientifico: "Abelisaurus comahuiensis",
    categoria: "dinosaurio",
    era: "Cretácico Tardío",
    edadAnios: "~80 millones de años",
    lat: -39.5,
    lng: -68.0,
    provincia: "Río Negro",
    pais: "AR",
    museo: "Museo Carlos Ameghino, Cipoletti",
    descripcion: [
      "El Abelisaurus es el dinosaurio que da nombre a toda una familia de terópodos: los Abelisauridae, los grandes carnívoros que dominaron Sudamérica, África, India y Madagascar durante el Cretácico. Su hallazgo en la Formación Anacleto de Río Negro, en 1985, cambió la comprensión de los depredadores del hemisferio sur.",
      "Fue descripto por José Bonaparte y Fernando Novas a partir de un cráneo casi completo de 85 cm. La forma de la cabeza, más alta y corta que la de los carnívoros del norte, se convirtió en el modelo típico de los abelisáuridos. Medía unos 7 a 9 metros y era el depredador ápice de su ecosistema.",
      "Aunque no es tan conocido popularmente como el Giganotosaurus o el Carnotaurus, su importancia científica es enorme: definió un grupo entero de dinosaurios y confirmó que Gondwana tenía su propia línea evolutiva de grandes carnívoros, distinta de los del norte.",
    ],
    datosExtra: [
      { label: "Longitud estimada", valor: "7–9 metros" },
      { label: "Grupo", valor: "Theropoda — Abelisauridae" },
      { label: "Era", valor: "Cretácico Tardío (~80 Ma)" },
      { label: "Hallazgo", valor: "Río Negro, 1985" },
      { label: "Descripto por", valor: "Bonaparte & Novas, 1985" },
      { label: "Material", valor: "Cráneo casi completo" },
    ],
    faq: [
      {
        pregunta: "¿Por qué es importante el Abelisaurus si no es tan famoso?",
        respuesta:
          "Porque define científicamente la familia Abelisauridae, que incluye al Carnotaurus y decenas de otras especies de cuatro continentes. Es el 'tipo nomenclatural' del grupo, lo que lo convierte en uno de los dinosaurios más influyentes para la paleontología gondwánica aunque no sea el más vistoso.",
      },
    ],
    wikipediaTitle: "Abelisaurus",
  },

  // ─── FÓSILES ─────────────────────────────────────────────────────────────────
  {
    slug: "mosasaurio-patagonico",
    nombre: "Mosasaurio patagónico",
    nombreCientifico: "Taniwhasaurus oweni",
    categoria: "fosil",
    era: "Cretácico Tardío",
    edadAnios: "~70 millones de años",
    lat: -43.3,
    lng: -65.1,
    provincia: "Chubut",
    pais: "AR",
    museo: "Museo Paleontológico Egidio Feruglio (MEF), Trelew",
    descripcion: [
      "Los mosasaurios eran reptiles marinos del Cretácico Tardío que dominaron los mares del mundo cuando los dinosaurios reinaban en tierra. En la Patagonia, el mar interior que existió durante ese período dejó una rica fauna marina fósil. Varias especies de mosasaurios se han hallado en los yacimientos marinos de Chubut y Río Negro.",
      "Estos animales eran parientes de los varánidos actuales (como el dragón de Komodo) que regresaron al mar hace ~95 millones de años. Podían alcanzar 15 metros de longitud, nadaban como cocodrilos actuales y tenían doble mandíbula para tragar presas grandes. Sus dientes eran cónicos y curvados hacia adentro para impedir que la presa escapara.",
      "La Formación Allen y la Formación Jagüel en la Patagonia nororiental son ricas en restos de mosasaurios. El MEF de Trelew y el Museo Paleontológico de Madryn exhiben ejemplares regionales. Algunos hallazgos incluyen contenido estomacal preservado con restos de peces y ammonites.",
    ],
    datosExtra: [
      { label: "Longitud estimada", valor: "hasta 15 metros" },
      { label: "Grupo", valor: "Squamata — Mosasauridae" },
      { label: "Era", valor: "Cretácico Tardío (~70 Ma)" },
      { label: "Ambiente", valor: "Mar interior epicontinental" },
      { label: "Regiones de hallazgo", valor: "Chubut, Río Negro, Neuquén" },
    ],
    faq: [
      {
        pregunta: "¿Los mosasaurios son dinosaurios?",
        respuesta:
          "No. Los mosasaurios eran reptiles marinos escamosos, parientes de las serpientes y los varanos, no dinosaurios. El término 'dinosaurio' se aplica estrictamente a los arcosaurios terrestres del Triásico-Cretácico. Los mosasaurios, junto con los plesiosaurios e ictiosaurios, eran reptiles marinos de otros linajes.",
      },
      {
        pregunta: "¿Dónde se pueden ver fósiles de mosasaurios en Patagonia?",
        respuesta:
          "El MEF de Trelew, el Museo Paleontológico de Puerto Madryn y el Museo de Ciencias Naturales de la Ciudad de Buenos Aires exhiben fósiles de mosasaurios patagónicos. La zona de la Formación Allen (Río Negro-Neuquén) es el principal yacimiento.",
      },
    ],
    wikipediaTitle: "Mosasaurio",
  },
  {
    slug: "plesiosaurio-patagonia",
    nombre: "Plesiosaurio de Patagonia",
    nombreCientifico: "Aristonectes quiriquinensis",
    categoria: "fosil",
    era: "Cretácico Tardío",
    edadAnios: "~70 millones de años",
    lat: -54.8,
    lng: -68.3,
    provincia: "Tierra del Fuego",
    pais: "AR",
    museo: "Museo del Fin del Mundo, Ushuaia",
    descripcion: [
      "Los plesiosaurios son quizás los reptiles marinos más icónicos del Mesozoico. La Patagonia y el extremo sur de Sudamérica han entregado algunos de los ejemplares más completos del mundo. En Tierra del Fuego, en la Formación Cerro Dorotea, se han hallado restos de Aristonectes, un plesiosaurio de cuello corto y cabeza grande que habitó los mares del fin del mundo.",
      "A diferencia de la imagen popular del 'Monstruo del Lago Ness' (cuello largo, cabeza pequeña), el Aristonectes pertenecía al grupo de los polikotylosaurios: cuello relativamente corto, mandíbulas largas con numerosos dientes pequeños perfectos para atrapar peces y cefalópodos. Podía medir entre 6 y 10 metros.",
      "Los yacimientos marinos del extremo sur de Patagonia son únicos porque corresponden al mar que existió en el Polo Sur durante el Cretácico — un oceáno polar cálido que nada tiene que ver con la Antártida actual. Estas condiciones permitieron una biodiversidad marina excepcional que los geólogos y paleontólogos siguen descubriendo.",
    ],
    datosExtra: [
      { label: "Longitud estimada", valor: "6–10 metros" },
      { label: "Grupo", valor: "Plesiosauria — Polycotylidae" },
      { label: "Era", valor: "Cretácico Tardío (~70 Ma)" },
      { label: "Ambiente", valor: "Mar polar del hemisferio sur" },
      { label: "Regiones de hallazgo", valor: "Tierra del Fuego, Santa Cruz, Patagonia chilena" },
    ],
    faq: [
      {
        pregunta: "¿El plesiosaurio es el 'Monstruo del Lago Ness'?",
        respuesta:
          "El Monstruo del Lago Ness es un criptido sin evidencia científica. La imagen popular del 'Nessie' (cuello largo, cuerpo grande) se basa en plesiosaurios de cuello largo como el Elasmosaurus. Sin embargo, los plesiosaurios se extinguieron hace 66 millones de años y no podían vivir en agua dulce fría.",
      },
      {
        pregunta: "¿Por qué hay fósiles marinos en la Patagonia terrestre?",
        respuesta:
          "Durante el Cretácico, el nivel del mar era mucho más alto y un mar interior epicontinental cubría partes de lo que hoy es la Patagonia. Cuando ese mar se retiró, dejó sedimentos marinos con fósiles de reptiles, moluscos y peces que hoy emergen en la superficie terrestre.",
      },
    ],
    wikipediaTitle: "Aristonectes",
  },
  {
    slug: "macrauchenia",
    nombre: "Macrauchenia",
    nombreCientifico: "Macrauchenia patachonica",
    categoria: "fosil",
    era: "Pleistoceno",
    edadAnios: "~10.000 años",
    lat: -51.6,
    lng: -69.3,
    provincia: "Santa Cruz",
    pais: "AR",
    museo: "Museo de Historia Natural de Buenos Aires / MEF Trelew",
    descripcion: [
      "La Macrauchenia es uno de los animales más extraños que hayan pisado la Patagonia — y la describió ni más ni menos que Charles Darwin durante su viaje en el Beagle (1834). Darwin la encontró en Puerto San Julián, Santa Cruz, y quedó perplejo por un animal que parecía mezclar rasgos de camello, rinoceronte y tapir.",
      "Pertenecía a los 'ungulados nativos sudamericanos' (Litopterna), un grupo que evolucionó de forma completamente independiente en Sudamérica durante los 60 millones de años que el continente estuvo aislado. La Macrauchenia tenía tres dedos con pezuñas, un cuello largo, un cuerpo robusto y probablemente una trompa corta para ramonear vegetación.",
      "Se extinguió hace unos 10.000 a 12.000 años, probablemente por la combinación del cambio climático del final del Pleistoceno y la llegada de los primeros humanos a Sudamérica. Su origen evolutivo fue un misterio durante casi 150 años hasta que análisis de ADN antiguo en 2017 confirmaron su parentesco con los ungulados del norte.",
    ],
    datosExtra: [
      { label: "Altura en cruz", valor: "~1,8 metros" },
      { label: "Peso estimado", valor: "~1 tonelada" },
      { label: "Grupo", valor: "Litopterna — Macraucheniidae" },
      { label: "Era", valor: "Pleistoceno (~3 Ma–10.000 años)" },
      { label: "Descrito por", valor: "Owen, 1838 (a partir de Darwin)" },
      { label: "Distribución", valor: "Toda la Patagonia hasta Tierra del Fuego" },
    ],
    faq: [
      {
        pregunta: "¿Qué era la Macrauchenia?",
        respuesta:
          "Un ungulado nativo de Sudamérica sin parientes vivos cercanos, emparentado con caballos, tapires y rinocerontes según análisis de ADN antiguo. Durante 60 millones de años, Sudamérica estuvo aislada y desarrolló su propia megafauna única — la Macrauchenia era su equivalente a un 'camello con trompa'.",
      },
      {
        pregunta: "¿Por qué se extinguió la Macrauchenia?",
        respuesta:
          "Se extinguió hace ~10.000–12.000 años junto con la mayoría de la megafauna del Pleistoceno (mamuts, gliptodontes, tigres dientes de sable). Las causas debatidas son el cambio climático rápido al final de la última glaciación y la caza por parte de los primeros humanos que llegaron a Sudamérica.",
      },
    ],
    wikipediaTitle: "Macrauchenia",
  },
  {
    slug: "gliptodonte",
    nombre: "Gliptodonte",
    nombreCientifico: "Glyptodon clavipes",
    categoria: "fosil",
    era: "Pleistoceno",
    edadAnios: "~10.000 años",
    lat: -40.8,
    lng: -63.0,
    provincia: "Río Negro / Chubut",
    pais: "AR",
    museo: "Museo de Ciencias Naturales La Plata / MACN Buenos Aires",
    descripcion: [
      "El Gliptodonte es uno de los animales más asombrosos que habitaron la Patagonia y la llanura pampeana: un 'armadillo gigante' del tamaño de un Volkswagen Escarabajo. Su caparazón de hasta 1,5 metros de diámetro estaba compuesto por cientos de placas óseas fusionadas — un escudo natural que lo protegía de depredadores y posiblemente del frío.",
      "No es un dinosaurio: vivió en el Pleistoceno, el mismo período que los mamuts y los primeros humanos. De hecho, los primeros habitantes de Sudamérica convivieron con los gliptodontes — se han hallado huesos de Glyptodon con marcas de corte que sugieren que los humanos los cazaron y posiblemente usaron los caparazones como refugio.",
      "Se extinguió hace unos 10.000 años, probablemente por la combinación de caza humana y cambio climático. Era herbívoro, ramoneaba pastizales con su boca reducida, y usaba la cola reforzada con placas óseas como arma de defensa. Está emparentado con los actuales armadillos patagónicos (pichi, peludo).",
    ],
    datosExtra: [
      { label: "Longitud total", valor: "~3 metros" },
      { label: "Peso estimado", valor: "~1–2 toneladas" },
      { label: "Grupo", valor: "Xenarthra — Glyptodontidae" },
      { label: "Era", valor: "Pleistoceno (~2 Ma–10.000 años)" },
      { label: "Parientes vivos", valor: "Armadillos (Dasypodidae)" },
      { label: "Distribución", valor: "Patagonia, Pampa, toda Sudamérica" },
    ],
    faq: [
      {
        pregunta: "¿Qué relación tiene el Gliptodonte con los armadillos?",
        respuesta:
          "Son parientes cercanos dentro del grupo Xenarthra. El Glyptodon es básicamente un armadillo de proporciones enormes. El caparazón tiene la misma estructura de placas óseas dérmicas que los armadillos actuales, aunque en el Gliptodonte estaban fusionadas en una pieza rígida sin articulaciones.",
      },
      {
        pregunta: "¿Los primeros humanos en Patagonia cazaban Gliptodontes?",
        respuesta:
          "Sí, hay evidencia directa. En varios sitios del Pampa y la Patagonia se encontraron huesos de Glyptodón con marcas de corte de instrumentos líticos. Algunos caparazones presentan marcas que sugieren su uso como refugio o recipiente. La caza intensiva pudo haber acelerado su extinción.",
      },
    ],
    wikipediaTitle: "Glyptodon",
  },

  // ─── HUMANOS ─────────────────────────────────────────────────────────────────
  {
    slug: "cueva-de-las-manos",
    nombre: "Cueva de las Manos",
    categoria: "humano",
    era: "~9.300 a.C.",
    edadAnios: "~11.300 años",
    lat: -47.1563,
    lng: -70.6647,
    provincia: "Santa Cruz",
    pais: "AR",
    descripcion: [
      "La Cueva de las Manos es el sitio de arte rupestre más importante de la Patagonia y uno de los más significativos del mundo. Declarada Patrimonio de la Humanidad por la UNESCO en 1999, alberga más de 800 manos en negativo — siluetas de manos humanas creadas soplando pigmento alrededor de la mano apoyada en la roca — datadas entre 9.300 y 700 a.C.",
      "Ubicada en el cañadón del Río Pinturas, a 163 km al sur de Perito Moreno (Santa Cruz), las pinturas cubren una pared de roca de 24 metros de ancho por 10 de alto. Además de las manos, hay representaciones de guanacos, ñandúes, felinos y escenas de cacería grupal que documentan la vida de los cazadores-recolectores patagónicos durante más de 10.000 años.",
      "Las manos son casi todas izquierdas, lo que se explica porque los artistas sostenían el tubo soplador con la mano derecha y apoyaban la izquierda en la roca. Los pigmentos — ocre rojo, negro de manganeso, blanco de caolín — eran mezclados con grasa animal y aplicados en húmedo. La variedad de tamaños revela que la práctica se extendía a niños.",
    ],
    datosExtra: [
      { label: "Datación más antigua", valor: "~9.300 a.C. (11.300 años)" },
      { label: "Datación más reciente", valor: "~700 a.C." },
      { label: "Número de manos", valor: "más de 800" },
      { label: "Declaración UNESCO", valor: "Patrimonio Mundial, 1999" },
      { label: "Acceso", valor: "163 km al sur de Perito Moreno (Santa Cruz)" },
      { label: "Horario", valor: "Abierto todo el año; tour guiado obligatorio" },
    ],
    faq: [
      {
        pregunta: "¿Cómo llegaban los artistas a las partes altas de la cueva?",
        respuesta:
          "Se especula que usaban andamios de madera o ramas. Las pinturas más altas están a más de 4 metros del suelo actual, aunque el nivel del piso puede haber sido distinto hace miles de años. Otras hipótesis incluyen el uso de cuerdas atadas a salientes naturales.",
      },
      {
        pregunta: "¿Quiénes hicieron las pinturas de la Cueva de las Manos?",
        respuesta:
          "Se atribuyen a los ancestros de los pueblos tehuelches y mapuches, cazadores-recolectores que habitaron la Patagonia desde el fin de la última glaciación. Las capas más antiguas (>9.000 a.C.) corresponden a la cultura Toldense; las más recientes pertenecen a culturas posteriores que continuaron usando el sitio por milenios.",
      },
      {
        pregunta: "¿Cómo se llega a la Cueva de las Manos?",
        respuesta:
          "Desde Perito Moreno (Santa Cruz) por la Ruta Provincial 97 (163 km de ripio). También hay acceso desde Los Antiguos. El sitio requiere guía certificado para el ingreso. Hay tours organizados desde Perito Moreno y desde El Chaltén. La visita dura entre 2 y 3 horas.",
      },
    ],
    wikipediaTitle: "Cueva de las Manos",
    urlFuente: "https://whc.unesco.org/es/list/936/",
  },
  {
    slug: "los-toldos",
    nombre: "Los Toldos",
    categoria: "humano",
    era: "~11.000 a.C.",
    edadAnios: "~13.000 años",
    lat: -47.6,
    lng: -70.4,
    provincia: "Santa Cruz",
    pais: "AR",
    descripcion: [
      "El sitio arqueológico Los Toldos, en la estepa santacruceña, es uno de los registros de presencia humana más antiguos de Sudamérica. Las excavaciones de la arqueóloga argentina Augusto Cardich en la década de 1970 revelaron herramientas líticas y restos de fauna extinta datados en ~11.000 a.C., lo que sitúa a los primeros patagónicos como contemporáneos de los grandes megafaunales del Pleistoceno.",
      "El sitio consta de varias cuevas y abrigos rocosos en el cañadón del Río Pinturas (el mismo que alberga la Cueva de las Manos, a pocos kilómetros). Los niveles más profundos contienen puntas de proyectil tipo 'cola de pescado' y herramientas de obsidiana que revelan una tecnología sofisticada para la caza de caballos americanos (extintos), guanacos y mylodones.",
      "Los Toldos es un sitio de investigación activo. Cada campaña de excavación aporta nuevos datos sobre los primeros patagónicos: su dieta (evidenciada por restos óseos con marcas de corte), su movilidad estacional y sus redes de intercambio de materiales a cientos de kilómetros de distancia.",
    ],
    datosExtra: [
      { label: "Datación más antigua", valor: "~11.000 a.C." },
      { label: "Tipo de sitio", valor: "Abrigos rocosos con depósitos estratificados" },
      { label: "Artefactos hallados", valor: "Puntas de proyectil, raspadores, huesos de megafauna" },
      { label: "Fauna extinta asociada", valor: "Caballo americano, mylodón, guanaco" },
      { label: "Acceso", valor: "Área restringida — investigación académica" },
    ],
    faq: [
      {
        pregunta: "¿Cuándo llegaron los primeros humanos a la Patagonia?",
        respuesta:
          "La evidencia más sólida sitúa la llegada entre 12.000 y 14.000 años atrás, al final de la última glaciación. Sitios como Los Toldos (~13.000 años) y Monte Verde en Chile (~14.500 años) son los registros más tempranos confirmados. Los primeros patagónicos llegaron desde el norte, siguiendo la costa pacífica o los pasillos libres de hielo.",
      },
      {
        pregunta: "¿Qué es una punta 'cola de pescado'?",
        respuesta:
          "Es un tipo de punta de proyectil característica de los primeros cazadores de las Américas, con una base cóncava que se asemeja a la cola de un pez. Esta tecnología es casi idéntica a las puntas 'Clovis' de Norteamérica, lo que sugiere una expansión rápida de grupos humanos desde el norte a través de todo el continente hace ~13.000 años.",
      },
    ],
    wikipediaTitle: "Los Toldos (sitio arqueológico)",
  },
  {
    slug: "piedra-museo",
    nombre: "Piedra Museo",
    categoria: "humano",
    era: "~9.000 a.C.",
    edadAnios: "~11.000 años",
    lat: -47.9,
    lng: -67.6,
    provincia: "Santa Cruz",
    pais: "AR",
    descripcion: [
      "Piedra Museo es un yacimiento arqueológico en la meseta de Santa Cruz que ha entregado evidencia de ocupación humana continua durante más de 11.000 años. Su nombre proviene de las formaciones rocosas naturales que semejan piezas de museo al costado de la Ruta Provincial 49.",
      "Las excavaciones revelaron una secuencia cultural extraordinariamente larga: desde los primeros cazadores del Pleistoceno Terminal (con puntas de proyectil 'cola de pescado' asociadas a fauna extinta) hasta los tehuelches del siglo XIX. En el mismo nivel estratigráfico se encontraron herramientas humanas y restos de mylodón — una evidencia de que los primeros americanos convivieron con estos perezosos gigantes.",
      "A diferencia de la Cueva de las Manos (arte rupestre), Piedra Museo es principalmente un sitio habitacional y de caza. Sus depósitos estratificados son una 'biblioteca' de la vida patagónica milenaria que los arqueólogos siguen estudiando. El sitio es visitable y ofrece interpretación arqueológica en el marco de una reserva natural.",
    ],
    datosExtra: [
      { label: "Datación más antigua", valor: "~9.000 a.C." },
      { label: "Capas culturales", valor: "12+ estratos (11.000 años continuos)" },
      { label: "Fauna extinta hallada", valor: "Mylodón, caballo americano, guanaco" },
      { label: "Acceso", valor: "Ruta Provincial 49, Santa Cruz — visitable" },
    ],
    faq: [
      {
        pregunta: "¿Qué es el mylodón?",
        respuesta:
          "El mylodón (Mylodon darwinii) era un perezoso terrestre gigante que vivió en la Patagonia hasta hace unos 10.000 años. Podía medir 3 metros parado, pesaba ~1 tonelada y comía vegetación. Sus restos se hallaron en cuevas patagónicas con pelo, piel y excrementos preservados — una rareza paleontológica mundial. En Puerto Natales, Chile, la 'Cueva del Mylodón' es uno de los sitios más visitados de la región.",
      },
      {
        pregunta: "¿Los primeros humanos cazaron al mylodón?",
        respuesta:
          "Es probable. En Piedra Museo y otros sitios se hallaron restos de mylodón y herramientas humanas en el mismo nivel estratigráfico. Aunque la evidencia de caza directa (como puntas incrustadas en huesos) es escasa, la coincidencia temporal y espacial es significativa. La extinción del mylodón coincide con la expansión humana en Patagonia.",
      },
    ],
    wikipediaTitle: "Piedra Museo",
  },
  {
    slug: "cueva-del-milodon",
    nombre: "Cueva del Mylodón",
    categoria: "humano",
    era: "~10.000 a.C.",
    edadAnios: "~12.000 años",
    lat: -51.5833,
    lng: -72.65,
    provincia: "Magallanes",
    pais: "CL",
    descripcion: [
      "La Cueva del Mylodón es uno de los sitios paleontológicos y arqueológicos más importantes de la Patagonia chilena. A 24 km al norte de Puerto Natales, en el Monumento Natural Cueva del Mylodón, esta caverna de 200 metros de profundidad albergó a perezosos gigantes (Mylodon darwinii), caballos americanos y otras especies extintas hasta hace aproximadamente 10.000 años.",
      "El descubrimiento de 1895 por el estanciero Herman Eberhard cambió el mundo científico: encontró restos de piel, pelo, excrementos y huesos de mylodón extraordinariamente preservados por las condiciones secas de la cueva. Esto demostró que estos animales habían vivido en tiempos recientes — muchísimo más cerca del presente de lo que se creía.",
      "Hay evidencia de presencia humana en la cueva en el mismo período que los mylodones. Algunos arqueólogos proponen que los primeros patagónicos domesticaron parcialmente al mylodón (mantenían animales en corrales naturales), aunque esta hipótesis es debatida. Hoy el monumento es visitable y cuenta con una réplica a escala real del mylodón en la entrada.",
    ],
    datosExtra: [
      { label: "Tamaño de la caverna", valor: "200 m de profundidad, 30 m de alto" },
      { label: "Restos hallados", valor: "Piel, pelo, excrementos, huesos de mylodón" },
      { label: "Datación", valor: "~10.000–12.000 años" },
      { label: "Acceso", valor: "24 km al norte de Puerto Natales, Chile" },
      { label: "Declaración", valor: "Monumento Natural de Chile" },
    ],
    faq: [
      {
        pregunta: "¿Por qué está tan bien preservado el mylodón en la cueva?",
        respuesta:
          "Las condiciones de la cueva — baja humedad, temperatura estable, ausencia de luz — crearon un ambiente similar a una liofilización natural. La piel y el pelo se deshidrataron antes de descomponerse, preservando la estructura orgánica. Este tipo de momificación natural también ocurre en cuevas de Patagonia y en zonas áridas como las de Atacama.",
      },
      {
        pregunta: "¿Se puede visitar la Cueva del Mylodón?",
        respuesta:
          "Sí. El Monumento Natural Cueva del Mylodón está abierto al público todo el año y puede visitarse en media jornada desde Puerto Natales. Hay senderos, paneles interpretativos y una réplica a escala real del mylodón. El acceso es por la Ruta Y-290.",
      },
    ],
    wikipediaTitle: "Cueva del Milodón",
    urlFuente: "https://www.conaf.cl/parques/monumento-natural-cueva-del-milodon/",
  },

  // ─── PETROGLIFOS ─────────────────────────────────────────────────────────────
  {
    slug: "valle-encantado-petroglifos",
    nombre: "Petroglifos del Valle Encantado",
    categoria: "petroglifo",
    era: "~2.000 a.C.",
    edadAnios: "~4.000 años",
    lat: -40.95,
    lng: -71.45,
    provincia: "Río Negro / Neuquén",
    pais: "AR",
    descripcion: [
      "El Valle Encantado, en la zona del Lago Nahuel Huapi (Río Negro), concentra además de sus formaciones geológicas espectaculares varios sitios con grabados rupestres en los afloramientos de arenisca roja. Los petroglifos fueron producidos por grupos mapuches y sus predecesores, y representan figuras zoomorfas, geométricas y posiblemente escenas de rituales.",
      "Esta zona fue habitada por grupos cazadores-recolectores patagónicos al menos desde hace 4.000 años. La región del Nahuel Huapi es un corredor natural entre los pasos andinos que comunican Chile y Argentina, y el arte rupestre refleja el cruce de tradiciones culturales de ambos lados de la cordillera.",
      "Los petroglifos del Valle Encantado se pueden visitar en el marco de los senderos del Parque Nacional Nahuel Huapi. Son más accesibles que otros sitios patagónicos y se integran perfectamente con el atractivo geológico y paisajístico del valle.",
    ],
    datosExtra: [
      { label: "Técnica", valor: "Grabado en arenisca roja" },
      { label: "Motivos", valor: "Zoomorfos, geométricos, abstractos" },
      { label: "Datación estimada", valor: "~2.000 a.C. – épocas históricas" },
      { label: "Acceso", valor: "Senderos del Parque Nacional Nahuel Huapi" },
      { label: "Desde Bariloche", valor: "~65 km por la Ruta 237" },
    ],
    faq: [
      {
        pregunta: "¿Se pueden visitar los petroglifos del Valle Encantado?",
        respuesta:
          "Sí, los petroglifos se encuentran en el área de acceso público del Valle Encantado, dentro del Parque Nacional Nahuel Huapi. Se recomienda visitar con guía habilitado para encontrarlos y entender el contexto. El acceso es por la Ruta Nacional 237 hacia el lago Traful.",
      },
    ],
    wikipediaTitle: "Valle Encantado (Patagonia)",
  },
  {
    slug: "lago-viedma-pinturas",
    nombre: "Pinturas del Lago Viedma",
    categoria: "petroglifo",
    era: "~3.000 a.C.",
    edadAnios: "~5.000 años",
    lat: -49.4,
    lng: -72.6,
    provincia: "Santa Cruz",
    pais: "AR",
    descripcion: [
      "La cuenca del Lago Viedma y el Lago Argentino (Santa Cruz) concentra numerosos sitios de arte rupestre poco conocidos fuera del ámbito académico. Los abrigos rocosos de la zona albergan pinturas de manos negativas, guanacos, figuras geométricas y representaciones abstractas producidas por los grupos que habitaron el área andino-patagónica durante miles de años.",
      "Esta zona, ahora parte del Parque Nacional Los Glaciares, fue habitada por pueblos tehuelches meridionales (Aónikenk) que se desplazaban estacionalmente entre la costa del Pacífico y la estepa atlántica. El arte rupestre del área actúa como registro de su cosmología, marcadores de territorio y comunicación intergeneracional.",
      "Los sitios son poco publicitados para protegerlos del vandalismo, pero algunos son accesibles en tours específicos organizados desde El Chaltén. El CONICET y la Universidad de Buenos Aires realizan relevamientos sistemáticos en el marco del proyecto de documentación de arte rupestre de Santa Cruz.",
    ],
    datosExtra: [
      { label: "Motivos principales", valor: "Manos negativas, guanacos, abstractos" },
      { label: "Datación estimada", valor: "~3.000 a.C. en adelante" },
      { label: "Cultura", valor: "Tehuelche meridional (Aónikenk)" },
      { label: "Acceso", valor: "Tours desde El Chaltén (guía especializado)" },
    ],
    faq: [
      {
        pregunta: "¿Por qué son tan comunes las manos negativas en la Patagonia?",
        respuesta:
          "La 'mano negativa' (silueta de mano en pintura) es uno de los motivos más universales del arte rupestre humano, presente en todos los continentes. En la Patagonia fue adoptada por múltiples culturas a lo largo de miles de años. Se interpreta como afirmación de identidad ('yo estuve aquí'), como ritual de pasaje o como práctica shamánica. No hay una única interpretación.",
      },
    ],
    wikipediaTitle: "Arte rupestre en la Patagonia",
  },
]

export function getArqueologiaEntry(slug: string): ArqueologiaEntry | undefined {
  return ARQUEOLOGIA_CATALOG.find((e) => e.slug === slug)
}

export const CATEGORIA_LABELS: Record<ArqueologiaCategoria, string> = {
  dinosaurio: "Dinosaurio",
  fosil: "Fósil",
  humano: "Sitio humano",
  petroglifo: "Petroglifo",
}

export const CATEGORIA_LABELS_PLURAL: Record<ArqueologiaCategoria, string> = {
  dinosaurio: "Dinosaurios",
  fosil: "Fósiles",
  humano: "Sitios humanos",
  petroglifo: "Petroglifos",
}
