import type { Relacionado } from "@/lib/relacionados"

export type GastronomiaCategoria = "plato" | "bebida" | "postre" | "condimento" | "conserva" | "ingrediente"

export type GastronomiaEntry = {
  slug: string
  nombre: string
  pais: "AR" | "CL" | "AR/CL"
  categoria: GastronomiaCategoria
  descripcion: string[]
  datosExtra: Array<{ label: string; valor: string }>
  faq: Array<{ pregunta: string; respuesta: string }>
  urlFuente?: string
  wikipediaTitle?: string
  /** Search query used against the Pexels API when there's no coverImageUrl or Wikipedia image. */
  pexelsQuery?: string
  coverImageUrl?: string
  relacionados?: Relacionado[]
  /** Productos de Amazon relacionados, mostrados en el sidebar con link de afiliado. */
  productosRecomendados?: Array<{ nombre: string; query: string }>
}

export const CATEGORIA_LABELS: Record<GastronomiaCategoria, string> = {
  plato: "Plato",
  bebida: "Bebida",
  postre: "Postre",
  condimento: "Condimento",
  conserva: "Conserva",
  ingrediente: "Ingrediente",
}

export const CATEGORIA_LABELS_PLURAL: Record<GastronomiaCategoria, string> = {
  plato: "Platos",
  bebida: "Bebidas",
  postre: "Postres",
  condimento: "Condimentos",
  conserva: "Conservas",
  ingrediente: "Ingredientes",
}

export const PAIS_LABELS: Record<GastronomiaEntry["pais"], string> = {
  AR: "Argentina",
  CL: "Chile",
  "AR/CL": "Argentina y Chile",
}

export const GASTRONOMIA_CATALOG: GastronomiaEntry[] = [
  {
    slug: "cordero-patagonico",
    nombre: "Cordero patagónico",
    pais: "AR",
    categoria: "plato",
    descripcion: [
      "El cordero patagónico es el ovino joven criado en la región patagónica bajo sistemas extensivos de pastoreo natural, generalmente faenado con pocos meses de vida. No es una raza específica, sino un producto definido por su origen geográfico, su alimentación a base de pastos nativos y el manejo ganadero adaptado a un clima frío, seco y ventoso: el resultado es una carne magra, de fibras cortas y sabor delicado.",
      "La denominación se asocia principalmente al producto de origen argentino: en Chile, sobre todo en la región de Magallanes, la producción ovina equivalente se comercializa como cordero magallánico o cordero austral. En Argentina, las provincias con más producción ovina son Chubut, Santa Cruz, Río Negro y Tierra del Fuego, que en conjunto concentran más del 60% del stock ovino nacional. La mayoría de los animales pertenecen a razas Corriedale y Merino, históricamente adaptadas a estos sistemas extensivos.",
      "La preparación más emblemática es el cordero al asador: se cocina entero, abierto en cruz, a fuego lento durante 3 a 5 horas, condimentado principalmente con sal gruesa. Es habitual en celebraciones comunitarias, esquilas y fiestas rurales, y forma parte del patrimonio cultural inmaterial de la Patagonia.",
      "No existe una Indicación Geográfica ni una Denominación de Origen de alcance nacional que regule el uso del nombre \"cordero patagónico\": la denominación responde a una referencia geográfica y cultural, no a un estándar normativo único. En las últimas décadas surgieron además enfoques de ganadería regenerativa —como el impulsado por la organización patagónica Ovis21— que buscan revertir la desertificación histórica asociada al sobrepastoreo, usando al ovino como herramienta de restauración de suelos en vez de solo como factor de degradación.",
    ],
    datosExtra: [
      { label: "Regiones productoras", valor: "Chubut, Santa Cruz, Río Negro, Tierra del Fuego" },
      { label: "Participación en el stock ovino nacional", valor: "Más del 60%" },
      { label: "Razas principales", valor: "Corriedale y Merino" },
      { label: "Preparación típica", valor: "Al asador, en cruz, 3 a 5 horas" },
      { label: "Denominación de origen", valor: "No existe una IG nacional" },
    ],
    faq: [
      { pregunta: "¿Qué diferencia al cordero patagónico de otros corderos?", respuesta: "La diferencia está principalmente en su origen geográfico y en el contexto productivo. Se cría en sistemas extensivos propios de la Patagonia, condicionados por el clima, el paisaje y el manejo rural." },
      { pregunta: "¿El cordero patagónico es una raza?", respuesta: "No. No es una raza específica, sino una denominación descriptiva para corderos criados en la región patagónica, generalmente de razas Corriedale y Merino." },
      { pregunta: "¿Dónde se produce principalmente?", respuesta: "Principalmente en Chubut, Santa Cruz, Río Negro y Tierra del Fuego, donde se concentra la mayor parte de la producción ovina patagónica." },
      { pregunta: "¿Qué es el cordero patagónico al asador?", respuesta: "Es una preparación tradicional del sur argentino en la que el cordero se cocina entero, abierto en cruz, a fuego lento durante varias horas, con sal gruesa como condimento principal." },
      { pregunta: "¿El cordero patagónico tiene certificación de origen?", respuesta: "No existe una certificación de origen ni una Indicación Geográfica nacional que regule de forma uniforme el uso del nombre." },
    ],
    coverImageUrl: "https://outdoorpatagonia.dreamhosters.com/wp-content/uploads/2025/12/cordero-patagonico-10.jpg",
  },
  {
    slug: "curanto-chilote-historia-receta",
    nombre: "Curanto",
    pais: "CL",
    categoria: "plato",
    descripcion: [
      "El curanto es un método de cocción al vapor bajo tierra que combina mariscos (cholgas, choritos, almejas), carnes (cerdo ahumado, cordero, pollo, longaniza) y preparaciones de papa (milcao y chapalele), cocido en capas dentro de un hoyo cubierto con hojas y tierra. El nombre viene del mapudungún curantü, \"piedra caliente\", en referencia a las piedras que generan el calor de cocción.",
      "La técnica fue desarrollada por los pueblos originarios del archipiélago de Chiloé —chonos y huilliches— para cocinar grandes cantidades de alimento en comunidad. Según fuentes de divulgación turística, la práctica de cocinar con piedras calientes bajo tierra tendría al menos 6.000 años en la isla (esta cifra no proviene de un estudio arqueológico publicado, por lo que conviene tomarla como referencia aproximada). Con la llegada de los colonos hispano-criollos, la receta incorporó carnes de cerdo y aves.",
      "Se cava un hoyo de medio metro de profundidad, se cubre el fondo con piedras que se calientan en una fogata hasta quedar al rojo vivo, y una vez retirados los carbones se colocan los ingredientes en capas separadas por hojas de nalca (o de higuera y repollo si no hay nalca disponible). Se cubre todo con más hojas y tierra para sellar el calor, y se deja cocinar entre 2 y 3 horas. Cuando no hay forma de cavar un hoyo, se prepara la misma combinación en una olla grande tapada herméticamente: esta versión se conoce como pulmay.",
      "Chiloé —Ancud, Castro, Dalcahue— sigue siendo el destino de referencia para comerlo preparado en hoyo, especialmente en ferias costumbristas. Como puerta de entrada a la Patagonia chilena, también es habitual encontrarlo en restaurantes de Puerto Montt y en circuitos turísticos que combinan la isla con el resto de la región.",
    ],
    datosExtra: [
      { label: "Origen del nombre", valor: "Mapudungún curantü, \"piedra caliente\"" },
      { label: "Tiempo de cocción en hoyo", valor: "2 a 3 horas" },
      { label: "Ingredientes típicos", valor: "Cholgas, choritos, almejas, cerdo ahumado, cordero, longaniza, milcao, chapalele" },
      { label: "Versión sin hoyo", valor: "Pulmay (cocido en olla)" },
      { label: "Dónde probarlo", valor: "Chiloé (Ancud, Castro, Dalcahue) y Puerto Montt" },
    ],
    faq: [
      { pregunta: "¿Qué significa la palabra curanto?", respuesta: "Viene del mapudungún curantü, que significa \"piedra caliente\"." },
      { pregunta: "¿Cuánto dura la cocción del curanto en hoyo?", respuesta: "Entre 2 y 3 horas, dependiendo de la cantidad de comida y de la temperatura de las piedras." },
      { pregunta: "¿Cuál es la diferencia entre curanto y pulmay?", respuesta: "El pulmay usa los mismos ingredientes pero se cocina en una olla en vez de en un hoyo bajo tierra." },
      { pregunta: "¿Dónde se puede comer curanto en la Patagonia chilena?", respuesta: "En Chiloé (Ancud, Castro, Dalcahue) y en restaurantes de Puerto Montt." },
      { pregunta: "¿Qué son el milcao y el chapalele?", respuesta: "Panes de papa tradicionales de Chiloé que acompañan el curanto: el milcao se hace con papa rallada y papa cocida, el chapalele es una masa de papa cocida al vapor." },
    ],
    wikipediaTitle: "Curanto",
  },
  {
    slug: "paila-marina-chilena-receta-historia",
    nombre: "Paila marina",
    pais: "CL",
    categoria: "plato",
    descripcion: [
      "La paila marina es una sopa o guiso de mariscos y pescado cocido en caldo, con base de cebolla, tomate, ajo y condimentos como ají de color, orégano y comino. Se sirve tradicionalmente en una paila, el recipiente de greda o metal que le da nombre al plato.",
      "Su origen exacto es incierto: una versión la sitúa en épocas prehispánicas, cuando los pueblos costeros preparaban caldos de mar en ollas de cobre; otra la ubica en la época colonial, cuando pescadores y mariscadores cocinaban en pailas de metal sobre fuego abierto lo que capturaban durante el día. En ambos casos, nació como una comida pensada para aprovechar la pesca fresca al volver de la faena.",
      "La base siempre incluye cebolla, tomate, ajo, ají de color, orégano y comino sofritos, más caldo de pescado y vino blanco. A eso se suman mariscos —choritos, almejas, machas, camarones— y algún pescado firme como congrio, merluza o salmón, agregado al final para que no se deshaga.",
      "En Chile existe la creencia popular de que ayuda a reponerse de la resaca: sin evidencia científica que lo respalde, es una tradición muy arraigada, sobre todo cada Año Nuevo en el Mercado Central de Santiago. El plato varía según la zona costera: en el centro del país (Valparaíso, Viña del Mar) suele llevar más variedad de mariscos, mientras que hacia el sur, cerca de Puerto Montt —puerta de entrada a la Patagonia chilena—, es habitual que incorpore pescados y algas propias de esas aguas frías.",
    ],
    datosExtra: [
      { label: "Base del caldo", valor: "Cebolla, tomate, ajo, ají de color, orégano, comino" },
      { label: "Mariscos habituales", valor: "Choritos, almejas, machas, camarones" },
      { label: "Pescado firme", valor: "Congrio, merluza o salmón" },
      { label: "Fama popular", valor: "Creencia de que ayuda con la resaca" },
      { label: "Zona de referencia sur", valor: "Puerto Montt" },
    ],
    faq: [
      { pregunta: "¿Qué significa \"paila\"?", respuesta: "Es el recipiente de greda o metal en el que tradicionalmente se sirve el plato." },
      { pregunta: "¿Es lo mismo que el caldillo de congrio?", respuesta: "No. El caldillo de congrio lleva solo congrio y papas; la paila marina suma una variedad de mariscos." },
      { pregunta: "¿De verdad sirve para la resaca?", respuesta: "Es una creencia popular muy extendida en Chile, sin respaldo científico, pero parte central de la tradición del plato." },
      { pregunta: "¿Qué mariscos lleva?", respuesta: "Generalmente choritos, almejas, machas y camarones, junto con un pescado firme como congrio, merluza o salmón." },
      { pregunta: "¿Se come todo el año?", respuesta: "Sí, aunque es especialmente popular en Año Nuevo y durante el verano austral." },
    ],
    wikipediaTitle: "Paila marina",
  },
  {
    slug: "torta-galesa-historia-receta-patagonia",
    nombre: "Torta galesa",
    pais: "AR",
    categoria: "postre",
    descripcion: [
      "La torta galesa es un budín oscuro y compacto hecho con manteca, azúcar negra, huevos, harina, especias (canela, jengibre, clavo de olor, nuez moscada) y una generosa cantidad de fruta seca —pasas, ciruelas, nueces y fruta abrillantada— macerada en licor. También se la conoce como torta negra galesa, por el color oscuro que le dan el azúcar negra y las especias.",
      "El 28 de julio de 1865, 162 inmigrantes galeses llegaron a Puerto Madryn a bordo del velero Mimosa, escapando de la presión cultural y religiosa que sufrían en Gales bajo dominio inglés. Se instalaron en el valle del río Chubut, donde debieron enfrentar escasez de alimentos y un clima árido muy distinto al de su tierra natal: la torta galesa nació de esa necesidad, una receta que se conservaba sin refrigeración gracias a la fruta seca, el azúcar negra y el alcohol.",
      "La tradición del té galés se mantiene viva en pueblos fundados por esos mismos colonos: Gaiman, Trevelin y, en menor medida, Trelew y Esquel. Sus casas de té —muchas llevadas por descendientes directos de los colonos del Mimosa— sirven la torta galesa como parte de una mesa de té completa que incluye scones y mermeladas caseras, y reciben cada año a miles de visitantes.",
      "Una receta clásica lleva manteca, azúcar negra, huevos, harina, pasas de uva, ciruelas pasas, nueces, fruta abrillantada, coñac y especias, horneada a 160 °C durante aproximadamente 1 hora y 15 minutos. La combinación de fruta seca y alcohol actúa como conservante natural, por lo que muchas reposteras patagónicas afirman que la torta no solo se conserva varias semanas sin heladera, sino que mejora de sabor con el paso de los días.",
    ],
    datosExtra: [
      { label: "Llegada de los colonos", valor: "28 de julio de 1865, velero Mimosa" },
      { label: "Inmigrantes originales", valor: "162 galeses" },
      { label: "Pueblos de referencia", valor: "Gaiman, Trevelin, Trelew, Esquel" },
      { label: "Horneado", valor: "160 °C, ~1h15" },
      { label: "Conservación", valor: "Varias semanas sin heladera" },
    ],
    faq: [
      { pregunta: "¿De dónde viene la torta galesa?", respuesta: "De los colonos galeses que llegaron a Chubut en 1865 a bordo del velero Mimosa." },
      { pregunta: "¿Cuánto dura la torta galesa?", respuesta: "Gracias a la fruta seca y el alcohol, se conserva varias semanas sin refrigeración e incluso mejora su sabor con el tiempo." },
      { pregunta: "¿Dónde se puede tomar el té galés tradicional?", respuesta: "En las casas de té de Gaiman, Trevelin y Esquel, en la provincia de Chubut." },
      { pregunta: "¿Qué diferencia hay entre la torta galesa y la torta negra galesa?", respuesta: "Son nombres para la misma preparación; \"torta negra\" hace referencia al color oscuro que le dan el azúcar negra y las especias." },
      { pregunta: "¿Lleva alcohol la receta original?", respuesta: "Sí, tradicionalmente coñac u otro licor, aunque existen versiones sin alcohol." },
    ],
    urlFuente: "https://www.argentina.gob.ar/jefatura/turismo/viaja-por-argentina/torta-galesa",
  },
  {
    slug: "descubri-el-mate-la-bebida-tradicional-de-sudamerica",
    nombre: "Mate",
    pais: "AR/CL",
    categoria: "bebida",
    descripcion: [
      "El mate es una infusión elaborada a partir de las hojas de la yerba mate (Ilex paraguariensis), planta nativa de Sudamérica. Se prepara colocando yerba en el recipiente que le da nombre, agregando agua caliente sin llegar a hervir, y se toma a través de una bombilla que filtra la infusión mientras se sorbe. No es exclusivo de la Patagonia sino de toda Sudamérica —Argentina, Uruguay, Paraguay, Brasil y Chile—, pero funciona como un símbolo cultural de la región.",
      "Lo que lo distingue es la mateína, un compuesto similar a la cafeína que da un efecto estimulante más suave y duradero, sin los nervios que puede provocar el café. La yerba aporta además antioxidantes y vitaminas B1, B2 y C.",
      "La preparación tradicional: se llena el mate hasta 3/4 partes con yerba, se inclina y se agita para que las hojas finas queden arriba, se humedece una parte con agua tibia (nunca hirviendo) para no quemarla, se coloca la bombilla firme del lado húmedo, y se ceba con agua entre 70 y 80 °C. En ronda, se toma todo antes de devolver el mate al cebador, sin saltear a nadie. Existen variantes como el mate dulce (con azúcar) o el mate mixto, combinando yerba con hierbas digestivas como menta, boldo o manzanilla.",
      "Se acompaña culturalmente con alimentos secos —bizcochitos de grasa, facturas, galletitas, alfajores— que ayudan a equilibrar el amargor de la yerba. Hoy se consigue yerba mate y mates artesanales en tiendas especializadas de Europa y Norteamérica, señal de su popularidad creciente fuera de Sudamérica.",
    ],
    datosExtra: [
      { label: "Nombre científico", valor: "Ilex paraguariensis" },
      { label: "Componente activo", valor: "Mateína" },
      { label: "Temperatura del agua", valor: "70–80 °C" },
      { label: "Instrumento para tomarlo", valor: "Bombilla" },
      { label: "Países de consumo tradicional", valor: "Argentina, Uruguay, Paraguay, Brasil, Chile" },
    ],
    faq: [
      { pregunta: "¿De dónde viene el mate y por qué es tan importante en la Patagonia?", respuesta: "Es una tradición enraizada en toda Sudamérica, especialmente en Argentina, Uruguay, Paraguay, Brasil y Chile, pero en la Patagonia se considera un símbolo cultural de la región." },
      { pregunta: "¿Qué planta se usa para hacer el mate?", respuesta: "Se elabora a partir de las hojas de la yerba mate, planta nativa de Sudamérica conocida científicamente como Ilex paraguariensis." },
      { pregunta: "¿Cómo se prepara correctamente el mate?", respuesta: "Se coloca yerba en el recipiente y se agrega agua caliente sin que llegue a hervir. Se toma a través de una bombilla, que filtra la yerba mientras se sorbe." },
      { pregunta: "¿Es el mate solo una bebida para compartir en grupo?", respuesta: "Aunque tradicionalmente es grupal, también es compañía habitual en momentos de soledad, trabajo o estudio." },
      { pregunta: "¿En qué temperatura se debe servir el agua para el mate?", respuesta: "El agua debe estar caliente pero sin llegar a hervir, entre 70 y 80 °C, ya que el agua hirviendo quema la yerba y afecta su sabor." },
      { pregunta: "¿Cuál es el instrumento especial que se necesita para tomar mate?", respuesta: "Una bombilla, un tubo generalmente de metal o caña que filtra las hojas de yerba mientras se sorbe." },
    ],
    coverImageUrl: "https://outdoorpatagonia.dreamhosters.com/wp-content/uploads/2024/10/mate-con-mano-camping.jpg",
  },
  {
    slug: "llao-llao-patagonia",
    nombre: "Llao llao (hongo)",
    pais: "AR/CL",
    categoria: "ingrediente",
    descripcion: [
      "El llao llao, cuyo nombre científico es Cyttaria hariotii, es un hongo que parasita los troncos y ramas de árboles del género Nothofagus —coihue, lenga, ñire— muy comunes en los bosques patagónicos de ambos lados de la cordillera. Al parasitarlos genera tumores globosos llamados \"nudos\" que obstruyen los conductos de savia, a través de los cuales el hongo se expande. Se presenta en racimos esféricos blanco-amarillentos de entre 2 y 5 centímetros, y cuando fructifica produce esferas comestibles conocidas como llao llao.",
      "El nombre viene del mapudungún, la lengua mapuche, donde \"llao llao\" significa \"dulce dulce\", en referencia al sabor de las esferas comestibles que las comunidades indígenas recolectaban tradicionalmente como alimento. También se lo conoce como llaullao o pan de indio. Su relación con el árbol huésped es en gran medida simbiótica: le provoca deformaciones en la corteza pero no pone en peligro su vida.",
      "Crece principalmente en los bosques andino-patagónicos del sur de Argentina y Chile; el Parque Nacional Nahuel Huapi y el área del Cerro Llao Llao son puntos de referencia para observarlo en su hábitat. Es comestible y se ha incorporado a la cocina regional en preparaciones como salteados con aceite de oliva y hierbas, guisos con verduras y legumbres, o ensaladas con hojas verdes y frutos secos.",
      "Su recolección se realiza de forma regulada para evitar la sobreexplotación, ya que su presencia se considera un indicador de la salud del bosque en el que crece.",
    ],
    datosExtra: [
      { label: "Nombre científico", valor: "Cyttaria hariotii" },
      { label: "Otros nombres", valor: "Llaullao, pan de indio" },
      { label: "Árboles huésped", valor: "Coihue, lenga, ñire (Nothofagus)" },
      { label: "Tamaño", valor: "2 a 5 cm de diámetro" },
      { label: "Dónde observarlo", valor: "Parque Nacional Nahuel Huapi, Cerro Llao Llao" },
    ],
    faq: [
      { pregunta: "¿Qué es exactamente el hongo llao llao y dónde se encuentra?", respuesta: "Es un hongo parásito (Cyttaria hariotii) que crece en troncos y ramas de árboles Nothofagus —coihue, lenga, ñire— en bosques patagónicos de Argentina y Chile, donde forma \"nudos\" que se expanden por los conductos de savia del árbol." },
      { pregunta: "¿Por qué es importante para la biodiversidad de la Patagonia?", respuesta: "Su presencia y preservación son un indicador de la salud de los bosques y las redes ecológicas que dependen de ellos." },
      { pregunta: "¿Qué otros nombres recibe?", respuesta: "Llaullao o pan de indio, nombres usados históricamente por comunidades locales y recolectores." },
      { pregunta: "¿Cómo se usa en la gastronomía patagónica?", respuesta: "Se prepara salteado con aceite de oliva y hierbas, en guisos con verduras y legumbres, o crudo en ensaladas con frutos secos." },
      { pregunta: "¿Qué rol cumple en el turismo de la región?", respuesta: "Atrae a turistas y científicos interesados en la biodiversidad patagónica, y forma parte de circuitos de turismo de naturaleza en torno al Nahuel Huapi." },
      { pregunta: "¿Daña a los árboles donde crece?", respuesta: "Genera tumores globosos que alteran la corteza y los conductos de savia, pero en general no pone en peligro la vida del árbol." },
    ],
    coverImageUrl: "https://outdoorpatagonia.dreamhosters.com/wp-content/uploads/2024/10/hongo-llao-llao.jpeg",
    relacionados: [{ tipo: "gastronomia", slug: "hongo-de-pino-recoleccion-secado-usos" }],
  },
  {
    slug: "comprar-merken-en-la-patagonia",
    nombre: "Merkén",
    pais: "AR/CL",
    categoria: "condimento",
    descripcion: [
      "El merkén, también conocido como ají cacho de cabra ahumado, es un condimento tradicional de la cultura mapuche del sur de Chile y Argentina. Se elabora secando y ahumando un ají de sabor profundo y picante, que luego se muele junto con sal y, a veces, semillas de cilantro: ese proceso de ahumado es lo que le da su sabor característico.",
      "Su elaboración fue desarrollada por los mapuches como forma de preservar alimentos en un entorno de bajas temperaturas y alta humedad. Con el tiempo se extendió a la Patagonia argentina, donde realza ingredientes locales como el cordero patagónico o el salmón. Además del sabor, se le atribuyen propiedades antioxidantes por la vitamina C del ají, efecto antiinflamatorio y estimulante de la digestión, junto con una larga vida útil gracias al ahumado y la sal.",
      "En la cocina se usa al final de la cocción de carnes a la parrilla, en guisos y sopas para sumar profundidad, en salsas para untar, e incluso en combinación con chocolate en algunas propuestas de cocina gourmet. Se consigue en tiendas especializadas y mercados regionales de toda la Patagonia y también online; marcas reconocidas incluyen Trallenko y Santa Juana (Catirai). El precio de referencia ronda entre 8 y 15 dólares los 250 gramos, según la calidad y si el proceso de ahumado es artesanal.",
    ],
    datosExtra: [
      { label: "Nombre alternativo", valor: "Ají cacho de cabra ahumado" },
      { label: "Origen", valor: "Cultura mapuche" },
      { label: "Elaboración", valor: "Ají ahumado, secado y molido con sal" },
      { label: "Precio de referencia", valor: "USD 8–15 los 250 g" },
      { label: "Marcas conocidas", valor: "Trallenko, Santa Juana (Catirai)" },
    ],
    faq: [
      { pregunta: "¿Qué es exactamente el merkén y de dónde proviene?", respuesta: "Es un condimento tradicional mapuche del sur de Chile y Argentina, elaborado secando y ahumando un ají picante que luego se muele con sal y a veces semillas de cilantro." },
      { pregunta: "¿Por qué el merkén es tan popular en la cocina patagónica?", respuesta: "Por su capacidad de adaptarse a distintos platos y resaltar sabores autóctonos, especialmente carnes y pescados locales." },
      { pregunta: "¿En qué tipos de comidas se puede usar?", respuesta: "En carnes, pescados, sopas, salsas e incluso postres como el chocolate con merkén." },
      { pregunta: "¿Cuál es el proceso tradicional de elaboración?", respuesta: "Se secan y ahúman ajíes picantes, que luego se muelen junto con sal y ocasionalmente semillas de cilantro." },
      { pregunta: "¿El merkén tiene otro nombre?", respuesta: "Sí, también se lo conoce como \"ají cacho de cabra ahumado\", por la forma del ají utilizado." },
      { pregunta: "¿Cuánto tiempo lleva siendo parte de la cultura patagónica?", respuesta: "Ha sido parte de la cultura mapuche durante siglos y se ha integrado a la gastronomía patagónica de ambos lados de la cordillera." },
    ],
    coverImageUrl: "https://outdoorpatagonia.dreamhosters.com/wp-content/uploads/2024/10/comprar-merken-en-la-patagonia.jpg",
  },
  {
    slug: "recoleccion-morillas-patagonia-consejos",
    nombre: "Morillas",
    pais: "AR/CL",
    categoria: "ingrediente",
    descripcion: [
      "Las morillas (género Morchella) son hongos silvestres que en la Patagonia Andina crecen sobre todo en bosques de ciprés (Austrocedrus chilensis), emergiendo tras el calentamiento del suelo en primavera. En el hemisferio sur su temporada es corta, de mediados de septiembre a fines de octubre; en el hemisferio norte, de fines de marzo a principios de mayo.",
      "Se distinguen por un sabor terroso y una textura carnosa muy distinta a la de otros hongos más viscosos, lo que las vuelve muy codiciadas en la gastronomía. Su recolección manual en zonas libres de contaminación y la dificultad para encontrarlas explican que sean uno de los hongos silvestres más caros del mercado.",
      "Para buscarlas conviene identificar zonas de ciprés, salir a principios de primavera apenas se calienta el suelo, prestar atención a áreas recién quemadas o con suelos ricos en nutrientes, evitar la recolección excesiva y usar herramientas limpias al cortarlas. Una vez recolectadas, se limpian suavemente si hace falta (en general no se lavan con agua), se airean sobre una superficie limpia y, ya secas, se conservan en frascos de vidrio con hojas de laurel, en un lugar fresco y oscuro.",
      "En la cocina patagónica se usan en tagliatelle con crema, en sopas cremosas con caldo de verduras, o como relleno de ravioles con mozzarella, siempre con salsas suaves que no opaquen su sabor delicado.",
    ],
    datosExtra: [
      { label: "Género", valor: "Morchella" },
      { label: "Hábitat", valor: "Bosques de ciprés (Austrocedrus chilensis)" },
      { label: "Temporada (hemisferio sur)", valor: "Mediados de septiembre a fines de octubre" },
      { label: "Temporada (hemisferio norte)", valor: "Fines de marzo a principios de mayo" },
      { label: "Precio", valor: "Elevado, por su recolección manual y escasez" },
    ],
    faq: [
      { pregunta: "¿En qué época del año se recolectan morillas en la Patagonia?", respuesta: "La temporada es corta: de mediados de septiembre a fines de octubre en el hemisferio sur, y de fines de marzo a principios de mayo en el hemisferio norte." },
      { pregunta: "¿Dónde crecen las morillas en la Patagonia?", respuesta: "Especialmente en bosques de ciprés de la cordillera (Austrocedrus chilensis) de la Patagonia Andina." },
      { pregunta: "¿Qué condiciones del suelo necesitan para aparecer?", respuesta: "Emergen cuando el suelo se calienta después del invierno, con buena exposición solar dentro del bosque." },
      { pregunta: "¿A qué género científico pertenecen?", respuesta: "Al género Morchella." },
      { pregunta: "¿Por qué son tan valoradas en la gastronomía?", respuesta: "Por su sabor terroso distintivo y su textura carnosa, además de la dificultad de su recolección manual." },
      { pregunta: "¿Cuál es la mejor técnica para recolectarlas sin dañar el ecosistema?", respuesta: "Cortar con herramientas limpias, no recolectar en exceso y ser respetuoso con el bosque de ciprés donde crecen." },
    ],
    coverImageUrl: "https://outdoorpatagonia.dreamhosters.com/wp-content/uploads/2024/06/hongo-morilla.jpg",
  },
  {
    slug: "hongo-de-pino-recoleccion-secado-usos",
    nombre: "Hongo de pino",
    pais: "AR",
    categoria: "ingrediente",
    descripcion: [
      "El hongo de pino (Suillus luteus) crece en simbiosis con los pinos, en densos bosques de coníferas patagónicos, debajo de las acículas (hojas de pino). Se identifica por un sombrero de color castaño oscuro a ocre amarillento, liso y viscoso, y un tallo firme y claro; un ejemplar sano tiene la base esponjosa amarillenta, sin manchas oscuras ni partes blandas. Se recolecta sobre todo en otoño, y de forma menos común a inicios de primavera.",
      "Para cosecharlo se corta con un cuchillo limpio y afilado en la base del tallo, cuidando no dañar el micelio, o se extrae con un giro suave desde la base. Una práctica de recolectores locales es devolver al bosque los restos de la limpieza —esponja del sombrero, pedazos de tallo— cerca del punto de recolección, ya que puede favorecer nuevos brotes en la misma temporada o al año siguiente.",
      "Por su alto contenido de agua, conviene ponerlos a secar apenas se recolectan: se retira la piel viscosa del sombrero, se raspa la parte esponjosa inferior si está dañada y se limpia el tallo, todo en seco, sin lavar con agua. Se dejan reposar una noche extendidos sobre papel, y al día siguiente se secan al aire libre o enhebrados y colgados en un lugar seco y ventilado, hasta quedar con textura crocante. Bien secos y guardados en un lugar fresco, oscuro y seco —agregar hojas de laurel ayuda a la conservación—, se mantienen por meses o incluso años sin perder aroma.",
      "Además de usarse secos y rehidratados en salteados, risottos o pastas, una de las preparaciones más destacadas en la Patagonia es el escabeche de hongos de pino frescos. Nutricionalmente aportan proteínas, vitaminas del grupo B, vitamina D, antioxidantes y minerales como zinc y selenio, con bajo contenido de grasas. La recolección sostenible —nunca agotar todos los ejemplares de un mismo grupo— es clave para que el hongo siga reproduciéndose.",
    ],
    datosExtra: [
      { label: "Nombre científico", valor: "Suillus luteus" },
      { label: "Temporada", valor: "Otoño (también, menos común, primavera)" },
      { label: "Hábitat", valor: "Bosques de pino, en simbiosis con sus raíces" },
      { label: "Conservación seco", valor: "Meses o años, en frasco y lugar oscuro" },
      { label: "Identificación", valor: "Sombrero viscoso castaño-ocre, base amarillenta" },
    ],
    faq: [
      { pregunta: "¿Cómo se limpian correctamente los hongos de pino?", respuesta: "Se retira la piel viscosa del sombrero y se limpian el tallo y el himeneo con un cuchillo, en seco, sin lavar con agua." },
      { pregunta: "¿Cuánto duran los hongos secos?", respuesta: "Si se almacenan en frascos de vidrio con laurel, en un lugar seco y oscuro, pueden conservarse por años sin perder aroma ni sabor." },
      { pregunta: "¿Cuándo es temporada de hongos de pino en la Patagonia?", respuesta: "La mejor época es el otoño, especialmente después de lluvias suaves; en algunas zonas también se encuentran a inicios de primavera." },
      { pregunta: "¿Cómo saber si un hongo de pino es comestible?", respuesta: "Debe tener sombrero firme, base amarillenta y sin manchas negras o partes blandas; ante la duda, no se debe consumir." },
      { pregunta: "¿Qué propiedades nutricionales tiene?", respuesta: "Es bajo en grasas y rico en vitamina D, fibra, antioxidantes y minerales como selenio y zinc." },
      { pregunta: "¿Dónde exactamente hay que buscarlos en el bosque?", respuesta: "En bosques densos de coníferas, bajo los pinos y entre sus acículas, ya que crecen en simbiosis con estos árboles." },
    ],
    coverImageUrl: "https://outdoorpatagonia.dreamhosters.com/wp-content/uploads/2024/06/patagonia-honos-de-pino-7.jpg",
    relacionados: [{ tipo: "gastronomia", slug: "hongos-de-pino-en-escabeche" }],
    productosRecomendados: [
      { nombre: "Deshidratador de alimentos", query: "food dehydrator for mushrooms herbs" },
      { nombre: "Cuchillo de forrajeo plegable", query: "folding mushroom foraging knife brush" },
      { nombre: "Frascos de vidrio herméticos", query: "airtight glass mason jars for food storage" },
      { nombre: "Guía de hongos comestibles", query: "field guide edible mushrooms identification book" },
    ],
  },
  {
    slug: "hongos-de-pino-en-escabeche",
    nombre: "Hongos de pino en escabeche",
    pais: "AR",
    categoria: "conserva",
    descripcion: [
      "En la Patagonia, donde los bosques de coníferas cubren vastas extensiones y la cultura del forrajeo silvestre resurgió con fuerza, los hongos de pino en escabeche se ganaron un lugar propio en la cocina regional. Es una preparación que conserva los sabores de temporada y aprovecha, de forma ancestral y sustentable, lo que ofrece el bosque.",
      "Se elabora con hongos de pino frescos recién recolectados en otoño, o rehidratados si están secos, cubiertos en una marinada de vinagre y especias que permite conservarlos varios días. Agregar hojas de laurel y granos de pimienta enteros al escabeche suma aroma. Además del hongo de pino, pueden usarse otras variedades como girgolas, portobellos o champiñones.",
      "El resultado se conserva hasta 15 días cerrado en la heladera, y entre 5 y 7 días una vez abierto el frasco; para conservaciones más prolongadas conviene esterilizar los frascos antes de envasar. Es un aperitivo habitual en picadas y bruschettas, y un acompañamiento clásico de otros platos.",
    ],
    datosExtra: [
      { label: "Ingrediente base", valor: "Hongo de pino, fresco o rehidratado" },
      { label: "Conservación cerrado", valor: "Hasta 15 días en heladera" },
      { label: "Conservación abierto", valor: "5 a 7 días" },
      { label: "Tip de conservación", valor: "Laurel y pimienta en grano en el escabeche" },
      { label: "Otros hongos usables", valor: "Girgolas, portobellos, champiñones" },
    ],
    faq: [
      { pregunta: "¿Qué tipos de hongos se pueden usar para escabeche?", respuesta: "Los más comunes son los de pino, girgolas, portobellos y champiñones." },
      { pregunta: "¿Cuánto dura el escabeche de hongos en la heladera?", respuesta: "Hasta 15 días cerrado. Una vez abierto, se recomienda consumir en 5 a 7 días." },
      { pregunta: "¿Se puede hacer escabeche con hongos secos?", respuesta: "Sí, deben hidratarse previamente. El sabor y la textura cambian respecto al hongo fresco." },
      { pregunta: "¿Es necesario esterilizar los frascos?", respuesta: "Sí, especialmente para conservación prolongada." },
      { pregunta: "¿Dónde se consiguen hongos de pino en Argentina?", respuesta: "Se recolectan en otoño en la Patagonia o se compran a productores locales." },
    ],
    coverImageUrl: "https://outdoorpatagonia.dreamhosters.com/wp-content/uploads/2025/06/hongos-de-pino-en-escabeche-outdoor-patagonia.jpg",
    relacionados: [{ tipo: "gastronomia", slug: "hongo-de-pino-recoleccion-secado-usos" }],
    productosRecomendados: [
      { nombre: "Frascos de vidrio con cierre hermético", query: "airtight glass mason jars for pickling canning" },
      { nombre: "Kit de esterilización de frascos", query: "canning jar sterilizing kit funnel tongs" },
      { nombre: "Vinagre de manzana orgánico", query: "organic apple cider vinegar for pickling" },
      { nombre: "Libro de conservas y encurtidos", query: "book pickling canning preserving recipes" },
    ],
  },
  {
    slug: "mermelada-rosa-mosqueta-patagonica",
    nombre: "Mermelada de rosa mosqueta",
    pais: "AR",
    categoria: "conserva",
    descripcion: [
      "La mermelada de rosa mosqueta es uno de los productos más emblemáticos de la Patagonia argentina: se elabora con el fruto (escaramujo) de la rosa mosqueta, una planta ornamental originaria de Europa que se naturalizó en los valles y montañas del sur y hoy crece de forma silvestre en la región. Su aroma silvestre y sabor intenso la convirtieron en un clásico de la mesa patagónica, y es un buen ejemplo de aprovechamiento sustentable de un recurso que antes se consideraba maleza.",
      "Se consigue sobre todo en ferias artesanales y tiendas de productos regionales de Bariloche, Esquel y El Bolsón. Aporta vitamina C y antioxidantes, y existen variantes elaboradas con miel o stevia en vez de azúcar para quienes buscan una versión más liviana. Se diferencia de la jalea de rosa mosqueta en que esta última se hace solo con el jugo del fruto, mientras que la mermelada conserva parte de la pulpa.",
    ],
    datosExtra: [
      { label: "Fruto utilizado", valor: "Escaramujo de la rosa mosqueta" },
      { label: "Origen de la planta", valor: "Introducida desde Europa" },
      { label: "Zona de referencia", valor: "Bariloche, El Bolsón, Esquel" },
      { label: "Beneficio destacado", valor: "Alto contenido de vitamina C" },
      { label: "Variante sin azúcar", valor: "Con miel o stevia" },
    ],
    faq: [
      { pregunta: "¿Qué beneficios tiene la mermelada de rosa mosqueta?", respuesta: "Aporta vitamina C, antioxidantes y ayuda a fortalecer el sistema inmunológico." },
      { pregunta: "¿Dónde se consigue la mejor mermelada de rosa mosqueta?", respuesta: "En ferias artesanales de la Patagonia y tiendas de productos regionales, especialmente en Bariloche, Esquel y El Bolsón." },
      { pregunta: "¿Cómo conservar la mermelada casera?", respuesta: "En frascos esterilizados, en un lugar fresco y oscuro. Una vez abierta, conservar en la heladera." },
      { pregunta: "¿Qué diferencia hay entre la mermelada y la jalea de mosqueta?", respuesta: "La jalea se hace solo con el jugo del fruto, mientras que la mermelada conserva parte de la pulpa." },
      { pregunta: "¿Se puede hacer sin azúcar?", respuesta: "Sí, se puede elaborar con miel o stevia manteniendo su sabor característico." },
    ],
    coverImageUrl: "https://outdoorpatagonia.dreamhosters.com/wp-content/uploads/2025/10/rosa-mosqueta-1-1.jpg",
    productosRecomendados: [
      { nombre: "Frascos de vidrio para mermelada", query: "glass mason jars for jam making" },
      { nombre: "Kit de esterilización de frascos", query: "canning jar sterilizing kit funnel tongs" },
      { nombre: "Cuchara mezcladora de madera", query: "wooden mixing spoon for cooking jam" },
      { nombre: "Libro de mermeladas y conservas caseras", query: "homemade jam preserving recipes book" },
    ],
  },
  {
    slug: "kuchen-chileno-historia-tradicion",
    nombre: "Kuchen",
    pais: "CL",
    categoria: "postre",
    descripcion: [
      "El kuchen es un postre de origen alemán —tipo torta— que se convirtió en un símbolo gastronómico de la Patagonia chilena, con variantes como el plum kuchen (de ciruelas), el kaesekuchen (torta de queso) y el tradicional baum kuchen. Llegó de la mano de los colonos alemanes que se instalaron en la región durante el siglo XIX, y hoy conecta la identidad patagónica con esas raíces europeas.",
      "La versión patagónica se adapta con frutos locales —ciruelas, murtillas, frambuesas— y técnicas propias de la región, aunque mantiene la base de masa y relleno del kuchen alemán original. Ciudades como Frutillar, Puerto Varas y Puerto Montt, todas de fuerte impronta de colonización alemana, son reconocidas por sus pastelerías y cafés especializados en kuchen.",
    ],
    datosExtra: [
      { label: "Origen", valor: "Colonización alemana, siglo XIX" },
      { label: "Variantes", valor: "Plum kuchen, kaesekuchen, baum kuchen" },
      { label: "Frutos locales usados", valor: "Ciruela, murtilla, frambuesa" },
      { label: "Dónde probarlo", valor: "Frutillar, Puerto Varas, Puerto Montt" },
    ],
    faq: [
      { pregunta: "¿Qué es el kuchen?", respuesta: "Es un postre alemán, tipo torta, muy popular en la Patagonia chilena, con variantes que incluyen frutas, quesos y masas dulces." },
      { pregunta: "¿Por qué el kuchen es tan importante en la Patagonia chilena?", respuesta: "Por la fuerte influencia de la inmigración alemana que llegó en el siglo XIX, cuyas tradiciones gastronómicas se fusionaron con ingredientes locales." },
      { pregunta: "¿Dónde probar el mejor kuchen en la Patagonia?", respuesta: "Ciudades como Frutillar, Puerto Varas y Puerto Montt son reconocidas por sus pastelerías y cafés con buen kuchen." },
      { pregunta: "¿El kuchen patagónico tiene variaciones respecto al original alemán?", respuesta: "Sí, se adapta con frutos locales como ciruelas, murtillas y frambuesas, con técnicas y sabores propios de la región." },
      { pregunta: "¿Se puede preparar kuchen en casa fácilmente?", respuesta: "Sí, existen recetas simples para horno casero con ingredientes accesibles." },
    ],
    coverImageUrl: "https://outdoorpatagonia.dreamhosters.com/wp-content/uploads/2025/06/kuchen-de-Frutos-Rojos.jpg",
  },
  {
    slug: "trucha-patagonica-recetas-pesca",
    nombre: "Trucha patagónica",
    pais: "AR/CL",
    categoria: "plato",
    descripcion: [
      "La trucha no es nativa de la Patagonia: se introdujo en lagos y ríos de Argentina y Chile durante las dos primeras décadas del siglo XX para desarrollar la pesca deportiva. Las especies que mejor se adaptaron fueron la arcoíris, la de arroyo, la marrón y la de lago, que encontraron en las aguas frías y muy oxigenadas de la cordillera un ambiente ideal para prosperar.",
      "La pesca con mosca es la tradición asociada a la trucha patagónica: la temporada se abre en noviembre y se extiende hasta mayo, con lagos, ríos y arroyos de ambos países como destino de pescadores de todo el mundo. Hoy existen guías y excursiones pensadas para quienes nunca pescaron.",
      "En la cocina se prepara de muchas formas: a la parrilla —la más tradicional—, a la plancha, al horno, en escabeche, en ceviche, en paté, en carpaccio o confitada. La trucha ahumada artesanal es el producto emblemático de la región: se elabora sobre todo con trucha arcoíris de criadero, criada sin antibióticos ni vacunas, ahumada en frío o caliente según el productor.",
    ],
    datosExtra: [
      { label: "Especies principales", valor: "Arcoíris, arroyo, marrón, de lago" },
      { label: "Introducción a la región", valor: "Primeras dos décadas del siglo XX" },
      { label: "Temporada de pesca", valor: "Noviembre a mayo" },
      { label: "Preparación más tradicional", valor: "A la parrilla" },
      { label: "Producto emblemático", valor: "Trucha ahumada artesanal" },
    ],
    faq: [
      { pregunta: "¿De dónde viene la trucha de la Patagonia?", respuesta: "Fue introducida a principios del siglo XX para desarrollar la pesca deportiva; no es una especie nativa de la región." },
      { pregunta: "¿Cuándo es la temporada de pesca?", respuesta: "De noviembre a mayo, según la provincia o región." },
      { pregunta: "¿Cómo se prepara tradicionalmente?", respuesta: "A la parrilla es la forma más tradicional, aunque también se prepara a la plancha, al horno, ahumada o en ceviche." },
      { pregunta: "¿Qué es la trucha ahumada patagónica?", respuesta: "Un producto artesanal elaborado con trucha arcoíris de criadero, ahumada en frío o caliente, muy asociado a la región de los lagos." },
      { pregunta: "¿Se puede pescar sin experiencia previa?", respuesta: "Sí, hay guías y excursiones de pesca con mosca pensadas para principiantes en toda la Patagonia." },
    ],
    wikipediaTitle: "Trucha arcoíris",
    pexelsQuery: "grilled trout fish dish",
  },
  {
    slug: "centolla-patagonica",
    nombre: "Centolla",
    pais: "AR/CL",
    categoria: "plato",
    descripcion: [
      "La centolla patagónica (Lithodes santolla) —también llamada centolla magallánica o centolla austral— es un crustáceo que vive en el lecho marino de las aguas frías del extremo sur de Sudamérica, y uno de los productos gastronómicos más asociados a Tierra del Fuego y la región de Magallanes.",
      "En Chile, la temporada extractiva en Magallanes va del 15 de julio al 15 de diciembre; está prohibida su captura (veda) entre el 1 de marzo y el 30 de junio. Se pesca sobre todo en invierno, cuando la calidad de su carne es óptima. Su extracción es una actividad económica clave para las localidades del archipiélago fueguino.",
      "La forma más simple de comerla es al vapor o hervida, con una salsa de mantequilla y ajo o apenas un toque de limón. En Punta Arenas, el plato clásico es el chupe de centolla, horneado en plato de greda con la pulpa, crema y queso parmesano. También se la encuentra en ensaladas, cazuelas, pastas rellenas, gratinados, sopas, empanadas y sushi.",
    ],
    datosExtra: [
      { label: "Nombre científico", valor: "Lithodes santolla" },
      { label: "Temporada extractiva (Magallanes)", valor: "15 de julio a 15 de diciembre" },
      { label: "Veda", valor: "1 de marzo a 30 de junio" },
      { label: "Preparación clásica", valor: "Chupe de centolla (Punta Arenas)" },
      { label: "Zona de referencia", valor: "Tierra del Fuego, Magallanes" },
    ],
    faq: [
      { pregunta: "¿Qué es la centolla magallánica?", respuesta: "Un crustáceo (Lithodes santolla) que vive en el lecho marino del extremo sur de Sudamérica, muy asociado a la gastronomía de Tierra del Fuego y Magallanes." },
      { pregunta: "¿Cuándo es la temporada de centolla?", respuesta: "En la región de Magallanes, la temporada extractiva va del 15 de julio al 15 de diciembre; está vedada del 1 de marzo al 30 de junio." },
      { pregunta: "¿Cómo se prepara la centolla?", respuesta: "Al vapor o hervida, con mantequilla, ajo y limón; en Punta Arenas el clásico es el chupe de centolla, horneado con crema y parmesano." },
      { pregunta: "¿Dónde se consigue fresca?", respuesta: "En Tierra del Fuego y la región de Magallanes, sobre todo durante la temporada extractiva de invierno." },
      { pregunta: "¿Por qué es tan cara?", respuesta: "Por la dificultad y estacionalidad de su captura, y por la veda que protege su reproducción durante buena parte del año." },
    ],
    pexelsQuery: "king crab seafood dish",
  },
  {
    slug: "carnes-de-caza-patagonicas-guanaco-liebre",
    nombre: "Carnes de caza: guanaco y liebre",
    pais: "AR/CL",
    categoria: "plato",
    descripcion: [
      "El guanaco (Lama guanicoe) fue la presa central de la dieta tehuelche: un pueblo cazador-recolector que basaba su alimentación en guanacos, ñandúes y aves, cazados en las estepas de Chubut, Santa Cruz y el centro de Río Negro. Se conserva hasta hoy la costumbre de preparar charqui de guanaco —carne salada y secada al sol— y algunos restaurantes patagónicos ofrecen milanesas de guanaco. Es una carne magra, de sabor intenso y algo dulzón, sin la grasa intramuscular del vacuno: aporta 24 gramos de proteína cada 100 gramos, más que la carne vacuna o el pollo, con bajo contenido de colesterol y de grasa visible.",
      "La liebre europea (Lepus europaeus) llegó en cambio en 1888, introducida desde Alemania para fomentar la caza deportiva en Río Negro y Santa Fe. Su enorme capacidad reproductiva la convirtió en plaga agrícola en gran parte de Argentina y Chile, lo que impulsó una industria frigorífica de exportación: Argentina es hoy el primer exportador mundial de carne de liebre, sobre todo a la Unión Europea. Su carne es oscura, casi negruzca, muy distinta a los tonos pálidos del conejo. La preparación tradicional es la \"liebre a la patagónica\": se macera la carne en vino tinto con laurel, perejil, zanahoria y apio durante unas 12 horas antes de cocinarla.",
    ],
    datosExtra: [
      { label: "Guanaco — proteína", valor: "24 g cada 100 g" },
      { label: "Guanaco — preparación tradicional", valor: "Charqui, milanesas" },
      { label: "Liebre — introducción", valor: "1888, desde Alemania" },
      { label: "Liebre — estatus", valor: "Especie exótica invasora / plaga agrícola" },
      { label: "Liebre — preparación clásica", valor: "Liebre a la patagónica (macerada en vino tinto)" },
    ],
    faq: [
      { pregunta: "¿A qué sabe la carne de guanaco?", respuesta: "Es una carne magra, de sabor intenso y algo dulzón, sin la grasa intramuscular característica del vacuno." },
      { pregunta: "¿Qué es el charqui de guanaco?", respuesta: "Carne de guanaco salada y secada al sol, una técnica de conservación de origen tehuelche que se mantiene hasta hoy." },
      { pregunta: "¿Por qué hay tanta liebre europea en la Patagonia?", respuesta: "Fue introducida en 1888 para caza deportiva y, por su alta capacidad reproductiva, se convirtió en una especie invasora que hoy se considera plaga agrícola." },
      { pregunta: "¿Argentina exporta carne de liebre?", respuesta: "Sí, es el primer exportador mundial de carne de liebre, principalmente a la Unión Europea." },
      { pregunta: "¿Cómo se prepara la liebre a la patagónica?", respuesta: "Se macera la carne en vino tinto con laurel, perejil, zanahoria y apio durante unas 12 horas antes de cocinarla." },
    ],
    pexelsQuery: "grilled game meat dish",
    relacionados: [{ tipo: "fauna", slug: "guanaco" }],
  },
  {
    slug: "tortas-fritas-patagonicas",
    nombre: "Tortas fritas",
    pais: "AR",
    categoria: "postre",
    descripcion: [
      "Las tortas fritas son masas simples de harina, agua o leche y grasa (o manteca), fritas en abundante aceite o grasa hasta dorarse, con un corte característico en el centro. Su origen se remonta al kreppel alemán, que llegó a Sudamérica con la colonización europea y se arraigó en Argentina y Uruguay hasta volverse un clásico propio.",
      "En Argentina, y especialmente en el campo patagónico, adquirieron identidad propia gracias a la vida gaucha: una preparación simple, barata y rendidora, hecha con lo que hubiera a mano —harina, agua y grasa del ganado—. La tradición de hacerlas en los días de lluvia viene de esa misma lógica campestre: se dice que los gauchos aprovechaban el agua de lluvia recolectada para amasar. Se comen recién hechas, espolvoreadas con azúcar o sal, y son un acompañamiento clásico del mate o el café con leche en las tardes de mal tiempo.",
    ],
    datosExtra: [
      { label: "Origen", valor: "Kreppel alemán, adaptado en el Río de la Plata" },
      { label: "Ingredientes base", valor: "Harina, agua o leche, grasa o manteca" },
      { label: "Tradición asociada", valor: "Días de lluvia, acompañadas con mate" },
      { label: "Variantes", valor: "Dulces (con azúcar) o saladas" },
    ],
    faq: [
      { pregunta: "¿De dónde vienen las tortas fritas?", respuesta: "Su origen se remonta al kreppel alemán, que llegó con la colonización europea y se convirtió en un clásico propio de Argentina y Uruguay." },
      { pregunta: "¿Por qué se comen los días de lluvia?", respuesta: "Es una tradición del campo: se dice que los gauchos aprovechaban el agua de lluvia recolectada para amasar la masa." },
      { pregunta: "¿Qué ingredientes lleva la receta clásica?", respuesta: "Harina, agua, grasa o manteca y una pizca de sal; las versiones de campo usan grasa derretida tanto en la masa como para freír." },
      { pregunta: "¿Se comen dulces o saladas?", respuesta: "Ambas versiones existen: espolvoreadas con azúcar, o simplemente con sal, según la región y la costumbre familiar." },
      { pregunta: "¿Con qué se acompañan tradicionalmente?", respuesta: "Con mate o café con leche, como parte de la merienda." },
    ],
    wikipediaTitle: "Torta frita",
    pexelsQuery: "fried dough pastry argentina",
  },
  {
    slug: "salmon-a-lo-pobre",
    nombre: "Salmón a lo pobre",
    pais: "CL",
    categoria: "plato",
    descripcion: [
      "El salmón a lo pobre es la versión con pescado de los clásicos platos \"a lo pobre\" de la cocina chilena, que combinan una proteína a la plancha con papas fritas, cebolla salteada y uno o dos huevos fritos encima. El nombre y el formato vienen del bistec a lo pobre, popularizado en Santiago a principios del siglo XX —posiblemente con influencia de la cocina francesa— y asociado por la tradición al campo chileno y a las zonas ganaderas del Maule.",
      "La versión con salmón reemplaza el bistec por un filete de salmón, manteniendo los acompañamientos tradicionales: es una manera de acercar un plato de identidad muy chilena a quienes prefieren pescado antes que carne roja.",
    ],
    datosExtra: [
      { label: "Base del plato", valor: "Papas fritas, cebolla salteada, huevo frito" },
      { label: "Origen del formato", valor: "Bistec a lo pobre, Santiago, principios del siglo XX" },
      { label: "Variante", valor: "Filete de salmón en vez de carne vacuna" },
    ],
    faq: [
      { pregunta: "¿Qué lleva el salmón a lo pobre?", respuesta: "Un filete de salmón a la plancha o a la mantequilla, acompañado de papas fritas, cebolla salteada y huevo frito." },
      { pregunta: "¿De dónde viene el nombre \"a lo pobre\"?", respuesta: "Del bistec a lo pobre, un plato popularizado en Santiago a principios del siglo XX que combina una proteína simple con papas, cebolla y huevo." },
      { pregunta: "¿Es un plato tradicional o una variación moderna?", respuesta: "Es una variación relativamente reciente del bistec a lo pobre, que reemplaza la carne vacuna por salmón." },
    ],
    pexelsQuery: "salmon steak with fries and egg",
  },
]

export function getGastronomiaEntry(slug: string): GastronomiaEntry | undefined {
  return GASTRONOMIA_CATALOG.find((e) => e.slug === slug)
}
