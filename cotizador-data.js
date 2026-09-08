/* =============================================================
   Base de datos del cotizador — LA BANDOTA
   -------------------------------------------------------------
   Transcrita del portafolio oficial (PORTAFOLIO_BANDOTA_2026).
   Los valores en COP se usan para calcular el total y armar el
   PDF/mensaje de WhatsApp una vez alguien cotiza — no se muestran
   como lista de precios pública en la página.
   ============================================================= */
window.COTIZADOR_DATA = {

  formatos: [
    {
      id: "bandota15",
      nombre: "Bandota 15",
      resumen: "15 músicos en escena",
      descripcion: "La formación completa de LA BANDOTA — todo el show, a toda su potencia.",
      duracion: "1 set de 80 min ó 2 sets de 60 min",
      valor: 12000000
    },
    {
      id: "bandota10",
      nombre: "Bandota 10",
      resumen: "10 músicos en escena",
      descripcion: "Formato reducido, con toda la energía de LA BANDOTA.",
      duracion: "1 set de 80 min ó 2 sets de 60 min",
      valor: 9500000
    }
  ],

  servicios: [
    {
      id: "saxofon",
      nombre: "Saxofón",
      descripcion: "Ideal para cóctel o ceremonia.",
      duracion: "1 set de 60 minutos",
      valor: 700000
    },
    {
      id: "son-cubano",
      nombre: "Son Cubano",
      descripcion: "Quinteto para amenizar la cena.",
      duracion: "5 músicos en escena · 1 set de 60 minutos",
      valor: 1500000
    },
    {
      id: "ceremonia",
      nombre: "Ceremonia",
      descripcion: "Piano/cantante + violín — para el momento del sí.",
      duracion: "1 set de 60 min (sin sonido)",
      valor: 1000000,
      soloBodas: true
    },
    {
      id: "hora-loca",
      nombre: "Hora Loca — Congo de Cartagena",
      descripcion: "Show folclórico con disfraces y comparsa — 4 bailarines + 4 músicos.",
      duracion: "Show en vivo",
      valor: 2000000
    }
  ],

  packs: [
    {
      id: "pack-15",
      nombre: "Pack Bandota 15",
      descripcion: "Bandota 15 músicos (2 sets) + cóctel con saxofón + cena con Son Cubano (quinteto).",
      valor: 13500000
    },
    {
      id: "pack-11",
      nombre: "Pack Bandota 11",
      descripcion: "Bandota 11 músicos (2 sets) + cóctel con saxofón + cena con Son Cubano (quinteto).",
      valor: 11000000
    },
    {
      id: "pack-9",
      nombre: "Pack Orquesta 9",
      descripcion: "Orquesta 9 músicos (2 sets) + cóctel con saxofón + cena con Son Cubano (quinteto).",
      valor: 9500000
    }
  ]
};
