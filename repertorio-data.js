/* =============================================================
   Base de datos del repertorio — LA BANDOTA
   -------------------------------------------------------------
   Cargado desde el PDF real de repertorio (2024). Cada canción es
   { title, artist } y opcionalmente { spotify, youtube } con el
   link exacto de esa versión, verificado por búsqueda real. Si
   falta spotify/youtube en una canción, la página arma
   automáticamente un link de búsqueda — así nunca queda un botón
   roto mientras se van completando los links que faltan.

   Cobertura actual: 180/189 con Spotify, 169/189 con YouTube.

   Notas de la transcripción (ver resumen en el chat):
   - El PDF no tenía secciones propias de Bachata, Afro ni Rock en
     inglés — así que esos subgéneros no aparecen aquí todavía.
   - "Son Cubano + Boleros" es una pestaña propia (no estaba en la
     lista original de categorías) porque el PDF sí trae esa sección.
   - El bloque "Colombianos" del PDF (Carmen de Bolívar, Toro Negro,
     etc.) no traía intérprete, así que quedaron como "Tradicional"
     salvo los que se identificaron con certeza (La Mosaico de la
     Chula → Joe Arroyo, Sal si Puedes → Lucho Bermúdez, Guayabo de
     la Ye → Lisandro Meza).
   - Correcciones de artista hechas durante la búsqueda de links:
     "Fíjate Bien" es de Juanes (no Ekhymosis), "Si Tú me Besas" y
     "He Tratado" son de Víctor Manuelle (no Victor Manuel — son
     artistas distintos), "Avispas" es "Las Avispas" de Juan Luis
     Guerra, "Se Enamora de Mí" y "Montón de Estrellas" (Son Cubano)
     son de Polo Montañez.
   - Sin link encontrado todavía (quedan con buscador automático):
     Donde e Que e, 20 de Enero, Arturo García, La Ola (Cris y
     Ronnie), y algunas canciones tradicionales sin versión clara.
   ============================================================= */
window.REPERTORIO_DATA = [
  {
    id: "latinos",
    label: "Latinos",
    subgenres: [
      {
        id: "salsa",
        label: "Salsa",
        songs: [
          { title: "Baile Inolvidable", artist: "Bad Bunny", spotify: "https://open.spotify.com/track/2lTm559tuIvatlT1u0JYG2", youtube: "https://www.youtube.com/watch?v=a1Femq4NPxs" },
          { title: "Eres", artist: "Grupo Niche", spotify: "https://open.spotify.com/track/38gX4JM0CoEYAzGr66kKmo", youtube: "https://www.youtube.com/watch?v=9mg1cME9gEs" },
          { title: "Algo que se Quede", artist: "Grupo Niche", spotify: "https://open.spotify.com/track/1JXcB149QtbcIpDUA6YZOB", youtube: "https://www.youtube.com/watch?v=N4kNBEuWxuY" },
          { title: "Cali Pachanguero", artist: "Grupo Niche", spotify: "https://open.spotify.com/track/4MHKP5n9kyXJNFh6oOb8a2", youtube: "https://www.youtube.com/watch?v=7KxkMLAZlzw" },
          { title: "Cali Ají", artist: "Grupo Niche", spotify: "https://open.spotify.com/track/32gkUsqe0yHTxRyijjADyI", youtube: "https://www.youtube.com/watch?v=oWI9Tr-1FBk" },
          { title: "La Magia de tus Besos", artist: "Grupo Niche", spotify: "https://open.spotify.com/track/3fqa7EHPTlURvvqNTdCH3x", youtube: "https://www.youtube.com/watch?v=GL1-GB3XvjI" },
          { title: "Vivir mi Vida", artist: "Marc Anthony", spotify: "https://open.spotify.com/track/3tm3GG9BBOYhUzKWlS6A74", youtube: "https://www.youtube.com/watch?v=YXnjy5YlDwk" },
          { title: "Flor Pálida", artist: "Marc Anthony", youtube: "https://www.youtube.com/watch?v=3VmoZrxXbmg" },
          { title: "Valió la Pena", artist: "Marc Anthony", spotify: "https://open.spotify.com/track/3Ll4D5HXvICXck8KmOjytI", youtube: "https://www.youtube.com/watch?v=hM8EHtN9RMw" },
          { title: "Tu Amor me Hace Bien", artist: "Marc Anthony", spotify: "https://open.spotify.com/track/5CRoi4x7cqpQuYFfhC0Nu2", youtube: "https://www.youtube.com/watch?v=qcrdZhVPOxs" },
          { title: "Almas Gemelas", artist: "Gilberto Santa Rosa", spotify: "https://open.spotify.com/track/3a09UyeSiFl7NF31K5vXKF", youtube: "https://www.youtube.com/watch?v=h79Y2jbIhZY" },
          { title: "La Agarro Bajando", artist: "Gilberto Santa Rosa", spotify: "https://open.spotify.com/track/3GgI4QQWvsqqdKCvnNN0UM", youtube: "https://www.youtube.com/watch?v=xWDsNex_VKA" },
          { title: "La Conciencia", artist: "Gilberto Santa Rosa", spotify: "https://open.spotify.com/track/5bccusEjEtnC5cDfWXQ8rf", youtube: "https://www.youtube.com/watch?v=7kbjKCj-rMQ" },
          { title: "Perdóname", artist: "Gilberto Santa Rosa", spotify: "https://open.spotify.com/track/4smp2WEnwg9DvKb4rC2Nwo", youtube: "https://www.youtube.com/watch?v=7eZXQ-hyUgc" },
          { title: "Montón de Estrellas", artist: "Gilberto Santa Rosa", spotify: "https://open.spotify.com/track/217TOCj7OIv3rYDIyTgCfc" },
          { title: "Sabes una Cosa", artist: "Charlie Aponte", spotify: "https://open.spotify.com/track/6Qvm6CW0kDnWp6PX9gnA7a", youtube: "https://www.youtube.com/watch?v=LN2TpFduu7E" },
          { title: "Centurión de la Noche", artist: "Joe Arroyo", spotify: "https://open.spotify.com/track/4zr2taIo069PD8AmN0xtOr", youtube: "https://www.youtube.com/watch?v=SBh7IYb6AG0" },
          { title: "Musa Original", artist: "Joe Arroyo", spotify: "https://open.spotify.com/track/74lF1ulOJEYQFABN5dWHw8", youtube: "https://www.youtube.com/watch?v=u5VLLTs3rDA" },
          { title: "Sabré Olvidar", artist: "Joe Arroyo", spotify: "https://open.spotify.com/track/4RY1qxHTmLjxuw2gT5FBf3", youtube: "https://www.youtube.com/watch?v=52EN2Kd45qU" },
          { title: "Tania", artist: "Joe Arroyo", spotify: "https://open.spotify.com/track/4iI7Q2CfhJ8bumjiYI25AU" },
          { title: "La Rebelión", artist: "Joe Arroyo", spotify: "https://open.spotify.com/track/6zOXdmW4919xmAjDnRyyLh", youtube: "https://www.youtube.com/watch?v=oWBf9hfW_4Y" },
          { title: "Juliana", artist: "DLG", spotify: "https://open.spotify.com/track/6K5UtSAXChS6Rpm2NZJnrF", youtube: "https://www.youtube.com/watch?v=KB8jjy9IGuA" },
          { title: "La Quiero a Morir", artist: "DLG", spotify: "https://open.spotify.com/track/2KJRpc0L4COhZGmxw3FYB0", youtube: "https://www.youtube.com/watch?v=wCBu0PkoNPs" },
          { title: "Medley Celia Cruz (Quimbara + Carnaval + Bemba Colorá)", artist: "Celia Cruz", spotify: "https://open.spotify.com/track/2z6GKX80FId5aRSS0c4oUy", youtube: "https://www.youtube.com/watch?v=k5eQI3FFTwk" },
          { title: "La Negra Tiene Tumbao", artist: "Celia Cruz", spotify: "https://open.spotify.com/track/7nflSbrgBCitUnW4psdR7a", youtube: "https://www.youtube.com/watch?v=imeXSRNRMeg" },
          { title: "Tu Cariñito", artist: "Puerto Rican Power", spotify: "https://open.spotify.com/track/3bLgBopG4lTULW1PcdrnLH", youtube: "https://www.youtube.com/watch?v=Me7ozJA7cwQ" },
          { title: "Tuyo", artist: "Tito Nieves", spotify: "https://open.spotify.com/track/7ggQ5PoZIRXkvWkoYYcH0F", youtube: "https://www.youtube.com/watch?v=97IWHAsrr-4" },
          { title: "De Oro", artist: "Familia André", spotify: "https://open.spotify.com/track/3A60dyaN65cBnN3E6fr2DM", youtube: "https://www.youtube.com/watch?v=sWZsrsbXTrE" },
          { title: "Donde e Que e", artist: "Familia André" },
          { title: "Llorarás", artist: "Oscar de León", spotify: "https://open.spotify.com/track/5AU8zGfBM0tiZe7NZiNIWD" },
          { title: "Mi Libertad", artist: "Jerry Rivera, Julio Voltio", spotify: "https://open.spotify.com/track/0lDnf4zY8pkAONDVd3jJyP", youtube: "https://www.youtube.com/watch?v=dH7bTCsNlNo" },
          { title: "Si Tú me Besas", artist: "Víctor Manuelle", spotify: "https://open.spotify.com/track/5981zpjMYeKGoEQ6K9794L", youtube: "https://www.youtube.com/watch?v=TuY1py-wPl4" },
          { title: "He Tratado", artist: "Víctor Manuelle", spotify: "https://open.spotify.com/track/3Aw66bt9BL2sjqxhFRpyDy", youtube: "https://www.youtube.com/watch?v=7wpVJvRIKYQ" },
          { title: "Idilio", artist: "Willie Colón", spotify: "https://open.spotify.com/track/6VQ2fI8goSX8mpSvytXkXR", youtube: "https://www.youtube.com/watch?v=CIcDWHxR-ao" },
          { title: "El Cantante", artist: "Héctor Lavoe", spotify: "https://open.spotify.com/track/0C279YvVWJcmFMSDtqIGfq", youtube: "https://www.youtube.com/watch?v=krRwxZiPCvQ" },
          { title: "Decisiones", artist: "Rubén Blades", spotify: "https://open.spotify.com/track/5oPpaBXlgkjSt5wONqO0Vg", youtube: "https://www.youtube.com/watch?v=GyhwmZAQB-Y" },
          { title: "Amor y Control", artist: "Rubén Blades", spotify: "https://open.spotify.com/track/6IPdQlKTwj0cV3sjqcgUS5", youtube: "https://www.youtube.com/watch?v=22sg9Kw45ZU" }
        ]
      },
      {
        id: "merengue",
        label: "Merengue",
        songs: [
          { title: "El Tiburón", artist: "Magic Juan", spotify: "https://open.spotify.com/track/0sfo40CjT81IlQIHh5N00P", youtube: "https://www.youtube.com/watch?v=kyp7fsaZOBU" },
          { title: "Another Night", artist: "Magic Juan", spotify: "https://open.spotify.com/track/1l2WgTUV5S3iaRYnKJkSeg", youtube: "https://www.youtube.com/watch?v=zD9VRaUfJwY" },
          { title: "Hoy Será la Última Vez", artist: "Magic Juan", spotify: "https://open.spotify.com/track/5jWIe5hvOG0r9Z1hkvA751", youtube: "https://www.youtube.com/watch?v=F_NjHAkXn2Q" },
          { title: "La Ventanita", artist: "Sergio Vargas", spotify: "https://open.spotify.com/track/5CmVYFZinikaqh9Mf2J1Xl", youtube: "https://www.youtube.com/watch?v=DpPLUC2YWWA" },
          { title: "La Quiero a Morir", artist: "Sergio Vargas", spotify: "https://open.spotify.com/track/66cquyyzQVJr3XFTokrHxl", youtube: "https://www.youtube.com/watch?v=h1Fz2ncBWno" },
          { title: "Anoche Hablamos del Amor", artist: "Sergio Vargas", spotify: "https://open.spotify.com/track/7amoU20AgBgNmKbcd7yPfD", youtube: "https://www.youtube.com/watch?v=wBuBBqjQRNI" },
          { title: "Si Algún Día la Ves", artist: "Sergio Vargas", spotify: "https://open.spotify.com/track/1R9RMdwiiqa4M9YkVJa9mM", youtube: "https://www.youtube.com/watch?v=EjVC5Ft-9MM" },
          { title: "Ni Tú ni Yo", artist: "Sergio Vargas", spotify: "https://open.spotify.com/track/3TFKYMRkenpSubrTJ5k8c4", youtube: "https://www.youtube.com/watch?v=21JSByO4SYM" },
          { title: "La Pastilla", artist: "Sergio Vargas", spotify: "https://open.spotify.com/track/1Wmsd8Xrcn5m62rVWlfR6l", youtube: "https://www.youtube.com/watch?v=kub1LEaZV-E" },
          { title: "Procura", artist: "Chichi Peralta", spotify: "https://open.spotify.com/track/7xmp7f74I0rxUOPjVuIOE8", youtube: "https://www.youtube.com/watch?v=RnpCTcpSwfo" },
          { title: "La Ciguapa", artist: "Chichi Peralta", spotify: "https://open.spotify.com/track/0WIVXqPOdctBwyiStMLzsd", youtube: "https://www.youtube.com/watch?v=L-a_VVRv8Lo" },
          { title: "Vale la Pena", artist: "Juan Luis Guerra", spotify: "https://open.spotify.com/track/7uC9TpGGHrAssX8NUKBqed", youtube: "https://www.youtube.com/watch?v=zQ9tN8u1Nus" },
          { title: "A Pedir su Mano", artist: "Juan Luis Guerra", spotify: "https://open.spotify.com/track/5BETy9N8cMWYEqpU4qmUcf", youtube: "https://www.youtube.com/watch?v=_koz_f4mthE" },
          { title: "Tú", artist: "Juan Luis Guerra", spotify: "https://open.spotify.com/track/4yybz50FDQZnpqwNa6jgwN", youtube: "https://www.youtube.com/watch?v=Nkloca2M6hU" },
          { title: "Avispas", artist: "Juan Luis Guerra", spotify: "https://open.spotify.com/track/0mfCiCk9Vs9fn1LQBCWZt3", youtube: "https://www.youtube.com/watch?v=nfmdbKeSh7I" },
          { title: "Bilirrubina", artist: "Juan Luis Guerra", spotify: "https://open.spotify.com/track/39NozwtCPxAiqbxWs9ObpN", youtube: "https://www.youtube.com/watch?v=2Sxr040XBSI" },
          { title: "El Niágara en Bicicleta", artist: "Juan Luis Guerra", spotify: "https://open.spotify.com/track/2jFh9RG2j3Ba7JfILrUHI9", youtube: "https://www.youtube.com/watch?v=Ae6EQYHjN4M" },
          { title: "Travesía", artist: "Juan Luis Guerra", spotify: "https://open.spotify.com/track/7BL1WTerk9Upwd5Xj4LGLi", youtube: "https://www.youtube.com/watch?v=D92KUnsF-zQ" },
          { title: "Todo Tiene su Hora", artist: "Juan Luis Guerra", spotify: "https://open.spotify.com/track/4K6dPIhUmHJMIEJLcIJUcM", youtube: "https://www.youtube.com/watch?v=07314LhFag4" },
          { title: "Eres mi Sueño", artist: "Fonseca", spotify: "https://open.spotify.com/track/6FrTsTMjihUNNInGFNK5Ff", youtube: "https://www.youtube.com/watch?v=NrxYsK7tisw" },
          { title: "Para Siempre", artist: "Eddy Herrera", spotify: "https://open.spotify.com/track/5KwwZ4AgWfcisij5v4eNjI", youtube: "https://www.youtube.com/watch?v=FcktdxGUWMw" },
          { title: "Ajena", artist: "Eddy Herrera", spotify: "https://open.spotify.com/track/6pGo3LtgPMput4agOBKZze", youtube: "https://www.youtube.com/watch?v=uzU3x_egiEk" },
          { title: "Pégame tu Vicio", artist: "Eddy Herrera", spotify: "https://open.spotify.com/track/0oA8lcmVLf3iXw04k69FKj" },
          { title: "Tu Sonrisa", artist: "Elvis Crespo", spotify: "https://open.spotify.com/track/2pPgF067E3mtYhA5paJfcI", youtube: "https://www.youtube.com/watch?v=3CqNeJLqvL0" },
          { title: "Déjame Acompañarte", artist: "Elvis Crespo", spotify: "https://open.spotify.com/track/0oz0VMlkCAc73vWis5dYzv", youtube: "https://www.youtube.com/watch?v=KmI4Z99tcWg" },
          { title: "Suavemente", artist: "Elvis Crespo", spotify: "https://open.spotify.com/track/7cpFmkNmh3MM0WqXPSbs9f", youtube: "https://www.youtube.com/watch?v=WPiEbYSF9kE" },
          { title: "Píntame", artist: "Elvis Crespo", spotify: "https://open.spotify.com/track/4Sn9EjH32TQm6e5Fk4haWu", youtube: "https://www.youtube.com/watch?v=hBhIA8lDi2c" },
          { title: "Nuestra Canción", artist: "Elvis Crespo", spotify: "https://open.spotify.com/track/2yB721Szta49XabGt5FQ0u", youtube: "https://www.youtube.com/watch?v=o-uN_Bt_MkE" },
          { title: "25 Horas", artist: "Proyecto Uno", spotify: "https://open.spotify.com/track/5fq4jxlqyjAVFLOB0lZIdT", youtube: "https://www.youtube.com/watch?v=4iBwipKkX6k" },
          { title: "Tienes la Magia", artist: "Lil Silvio y El Vega", spotify: "https://open.spotify.com/track/0fyx2JEi8DCNPinj46NjDg", youtube: "https://www.youtube.com/watch?v=XpPRXTAUw_o" },
          { title: "Oye", artist: "Manny Cruz", youtube: "https://www.youtube.com/watch?v=vEDn-xoL4Ss" },
          { title: "La Dueña del Swing", artist: "Hermanos Rosario", spotify: "https://open.spotify.com/track/0BPUz4JAxDtxclZlzTUgVF", youtube: "https://www.youtube.com/watch?v=HN6ACmknaiw" }
        ]
      }
    ]
  },
  {
    id: "son-cubano-boleros",
    label: "Son Cubano + Boleros",
    subgenres: [
      {
        id: "son-cubano",
        label: "Son Cubano / Boleros",
        songs: [
          { title: "Bodeguero", artist: "Tradicional", spotify: "https://open.spotify.com/track/2SJ9Zh7lYy75yNhCy0jdTL", youtube: "https://www.youtube.com/watch?v=rONlPkU83L8" },
          { title: "Son de la Loma", artist: "Tradicional", spotify: "https://open.spotify.com/track/7jG8kdWy4k0ABHse8AASjB" },
          { title: "Carretero", artist: "Tradicional", spotify: "https://open.spotify.com/track/6DOArmLfD3NmxhY5bV88fU" },
          { title: "Chan Chan", artist: "Tradicional", spotify: "https://open.spotify.com/track/5sbw5zIz9ck2pOEDXUR0QU", youtube: "https://www.youtube.com/watch?v=COJWMAfirxo" },
          { title: "Bilongo (La Negra Tomasa)", artist: "Tradicional", spotify: "https://open.spotify.com/track/6cVHu0HmKo4oEOSOqooTa3" },
          { title: "Dos Gardenias", artist: "Tradicional", spotify: "https://open.spotify.com/track/5OYh9n1QDnKdYhLaSNajvt", youtube: "https://www.youtube.com/watch?v=BS_agmp2Cy0" },
          { title: "Como Fue", artist: "Tradicional", spotify: "https://open.spotify.com/track/7dbSNvhDTNugY9x44kzVwi", youtube: "https://www.youtube.com/watch?v=Ojytcx7cabQ" },
          { title: "El Cuarto de Tula", artist: "Tradicional", spotify: "https://open.spotify.com/track/2uC7uUiWFbmXUwBWWh2oBw", youtube: "https://www.youtube.com/watch?v=CYxv6N_gUhE" },
          { title: "El Manicero", artist: "Tradicional", spotify: "https://open.spotify.com/track/7IJpwt3SiHhTRFs5cHZbj7", youtube: "https://www.youtube.com/watch?v=40gUx-aOhV8" },
          { title: "Guantanamera", artist: "Tradicional", spotify: "https://open.spotify.com/track/649gUZnLnl8Am80SmZCeRq", youtube: "https://www.youtube.com/watch?v=UosEcrrMo7I" },
          { title: "Lágrimas Negras", artist: "Tradicional", spotify: "https://open.spotify.com/track/35A5lPe1w1sP4DP2KNLjd1", youtube: "https://www.youtube.com/watch?v=Bnc7Bz57CME" },
          { title: "El Cinturón del Taxi", artist: "Tradicional", spotify: "https://open.spotify.com/track/57hdbNFl6ZNZcw44sAhGlA", youtube: "https://www.youtube.com/watch?v=vEuc1HRFrHs" },
          { title: "De Oro", artist: "Familia André", spotify: "https://open.spotify.com/track/3A60dyaN65cBnN3E6fr2DM", youtube: "https://www.youtube.com/watch?v=sWZsrsbXTrE" },
          { title: "Isla del Encanto", artist: "Tradicional", spotify: "https://open.spotify.com/track/48dBGgZ9Y4fArc9c4gV8PU", youtube: "https://www.youtube.com/watch?v=SPUUhtCp2UM" },
          { title: "Idilio", artist: "Willie Colón", spotify: "https://open.spotify.com/track/6VQ2fI8goSX8mpSvytXkXR", youtube: "https://www.youtube.com/watch?v=CIcDWHxR-ao" },
          { title: "Se Enamora de Mí", artist: "Polo Montañez", spotify: "https://open.spotify.com/track/2ra9Bqxm9Yu6hTaMljCs75", youtube: "https://www.youtube.com/watch?v=_Vostx1o07s" },
          { title: "Montón de Estrellas", artist: "Polo Montañez", spotify: "https://open.spotify.com/track/2g96zYTxK9OE19lK9Qf72l", youtube: "https://www.youtube.com/watch?v=_3bsI9AK8Ak" },
          { title: "La Cartera", artist: "Carlos Vives", spotify: "https://open.spotify.com/track/0JC81ojQymAE7l1KuJpNCq", youtube: "https://www.youtube.com/watch?v=cJFKeOmIPJA" },
          { title: "Piel Canela", artist: "Andrés Cepeda", spotify: "https://open.spotify.com/track/6AxMX4W9tasxIIf3degsCd", youtube: "https://www.youtube.com/watch?v=XD2zaWUAMHw" },
          { title: "Carpintero", artist: "Andrés Cepeda", spotify: "https://open.spotify.com/track/1QBgeuljBZCfzh7aQLTjn4", youtube: "https://www.youtube.com/watch?v=s-J8hE5SbDU" },
          { title: "Embrujo", artist: "Andrés Cepeda", spotify: "https://open.spotify.com/track/07grNdVo5tqlZ44iMRSHVn", youtube: "https://www.youtube.com/watch?v=CNp7UpWUXOI" },
          { title: "Caraluna", artist: "Bacilos", spotify: "https://open.spotify.com/track/3tQIDEYBjzcp2Lm562eJhS", youtube: "https://www.youtube.com/watch?v=-zgDXIi1uYw" },
          { title: "Tabaco y Chanel", artist: "Bacilos", spotify: "https://open.spotify.com/track/08y6YzgoqY51XNbeDzTHM7", youtube: "https://www.youtube.com/watch?v=6JqnbsQpljU" }
        ]
      }
    ]
  },
  {
    id: "colombiana",
    label: "Música Colombiana",
    subgenres: [
      {
        id: "vallenato",
        label: "Vallenato",
        songs: [
          { title: "Fruta Fresca", artist: "Carlos Vives", spotify: "https://open.spotify.com/track/5ZJ4VhM7qpwjNmdu7blVzP", youtube: "https://www.youtube.com/watch?v=qOqsVrihwq0" },
          { title: "La Hamaca Grande", artist: "Adolfo Pacheco", spotify: "https://open.spotify.com/track/6ZDpwkizpyyfjFkvXbISWI", youtube: "https://www.youtube.com/watch?v=5_cfj6z7RCc" },
          { title: "La Casa en el Aire", artist: "Rafael Escalona", spotify: "https://open.spotify.com/track/6Dskic2YCmIr0fifDNmDB6", youtube: "https://www.youtube.com/watch?v=fGlWQZYNYuk" },
          { title: "La Consentida", artist: "Fabián Corrales", spotify: "https://open.spotify.com/track/0jvkcaW5tsnsxojdgNbKqN", youtube: "https://www.youtube.com/watch?v=oBY92yK37eE" },
          { title: "Mírame Fijamente", artist: "Alejo Durán", spotify: "https://open.spotify.com/track/785FsTNZyKSYMByEZsuUVL", youtube: "https://www.youtube.com/watch?v=CnRUlzcWAyg" },
          { title: "Ella es mi Fiesta", artist: "Carlos Vives", spotify: "https://open.spotify.com/track/2P7R7pf2X3BxnIjiokxvh9", youtube: "https://www.youtube.com/watch?v=HmxFA67OeOs" },
          { title: "Medley Carlos Vives (Tierra del Olvido + Carito + Pa Mayté)", artist: "Carlos Vives", spotify: "https://open.spotify.com/track/5zqb9vPcTA8rCwvIJQSxoO", youtube: "https://www.youtube.com/watch?v=-QkmEVNA-fo" },
          { title: "La Plata", artist: "Diomedes Díaz", spotify: "https://open.spotify.com/track/45VsMaP6WahpW8r4Hq979Q", youtube: "https://www.youtube.com/watch?v=sgyEV9JXvfI" },
          { title: "La Candelosa", artist: "Rafael Orozco", spotify: "https://open.spotify.com/track/3SYAPMG9QA7kK4nniLOoel", youtube: "https://www.youtube.com/watch?v=DnGrD-9QHUI" },
          { title: "Obsesión", artist: "Peter Manjarres", spotify: "https://open.spotify.com/track/0nvWkw1UJ0RO6G5LqPdamk", youtube: "https://www.youtube.com/watch?v=t-6sW5YMrks" },
          { title: "Tu Amor Eterno", artist: "Carlos Vives", spotify: "https://open.spotify.com/track/0HB3gmAMC46FIPFoebTbk5", youtube: "https://www.youtube.com/watch?v=36NEIZxbesA" },
          { title: "La Cartera", artist: "Carlos Vives", spotify: "https://open.spotify.com/track/0JC81ojQymAE7l1KuJpNCq", youtube: "https://www.youtube.com/watch?v=cJFKeOmIPJA" }
        ]
      },
      {
        id: "porro",
        label: "Porro y folclor colombiano",
        songs: [
          { title: "Carmen de Bolívar", artist: "Tradicional", spotify: "https://open.spotify.com/track/3Fv7ZH5fRb910De7P8hm9l", youtube: "https://www.youtube.com/watch?v=W1H9igpQtr4" },
          { title: "Toro Negro", artist: "Tradicional", spotify: "https://open.spotify.com/track/1OoCMRpurIZ7mCW66g57g1", youtube: "https://www.youtube.com/watch?v=Hnpc5v2WrWo" },
          { title: "Colombia Tierra Querida", artist: "Tradicional", spotify: "https://open.spotify.com/track/3DwedX467tabb9zUzdqfcq", youtube: "https://www.youtube.com/watch?v=Q_CkpjQi7_Q" },
          { title: "Fiesta en Turbaco", artist: "Tradicional", youtube: "https://www.youtube.com/watch?v=COCj4gmmct8" },
          { title: "Checumbia", artist: "Tradicional", spotify: "https://open.spotify.com/track/5mypVbpHEZT9rcpBh2O2YL", youtube: "https://www.youtube.com/watch?v=wIJRGOQdYc0" },
          { title: "La Mosaico de la Chula", artist: "Joe Arroyo", spotify: "https://open.spotify.com/track/62O1pmJ6MIN9bHMQTtL51K", youtube: "https://www.youtube.com/watch?v=L7Yrj4Aygwk" },
          { title: "20 de Enero", artist: "Tradicional" },
          { title: "Sal si Puedes", artist: "Lucho Bermúdez", spotify: "https://open.spotify.com/track/5wqJdvxM8JdKMfQ8ZfkItm", youtube: "https://www.youtube.com/watch?v=5-F6lNVlfW8" },
          { title: "Arturo García", artist: "Tradicional" },
          { title: "Los Sabores del Porro", artist: "Tradicional", spotify: "https://open.spotify.com/track/40LrMG4S5rE3qzpFngqbfe" },
          { title: "Guayabo de la Ye", artist: "Lisandro Meza", spotify: "https://open.spotify.com/track/4cF39yJTMASdoXG6FAAj56", youtube: "https://www.youtube.com/watch?v=YL6W6OZmE2w" }
        ]
      }
    ]
  },
  {
    id: "urbano",
    label: "Género Urbano",
    subgenres: [
      {
        id: "reggaeton",
        label: "Reguetón",
        songs: [
          { title: "Después de la Playa", artist: "Bad Bunny", spotify: "https://open.spotify.com/track/1dm6z1fWB0cErMszU25dy2", youtube: "https://www.youtube.com/watch?v=-4AJXOhrIFI" },
          { title: "Titi me Preguntó", artist: "Bad Bunny", spotify: "https://open.spotify.com/track/1IHWl5LamUGEuP4ozKQSXZ", youtube: "https://www.youtube.com/watch?v=vMxkCh13WYM" },
          { title: "Feliz Cumpleaños", artist: "Feid", spotify: "https://open.spotify.com/track/2u012tIoOgtOuT0RObgTmx", youtube: "https://www.youtube.com/watch?v=jRxDUsGmwuc" },
          { title: "Provenza", artist: "Karol G", spotify: "https://open.spotify.com/track/7dSZ6zGTQx66c2GF91xCrb", youtube: "https://www.youtube.com/watch?v=ca48oMV59LU" },
          { title: "Pepas", artist: "Farruko", spotify: "https://open.spotify.com/track/1DoHfsleUGdRymwT67GPSu", youtube: "https://www.youtube.com/watch?v=V67r0ldt1Ns" },
          { title: "Tusa", artist: "Karol G", spotify: "https://open.spotify.com/track/1ycZZiZQHtALg0iJNK7wGO", youtube: "https://www.youtube.com/watch?v=tbneQDc2H3I" },
          { title: "Vida de Rico", artist: "Camilo", spotify: "https://open.spotify.com/track/7EepWKgNz9CJhRKF6XUknD", youtube: "https://www.youtube.com/watch?v=OS--ru82gPw" },
          { title: "Kesi", artist: "Camilo", spotify: "https://open.spotify.com/track/42lpuSQmnLUM1ZXJVzIVOi", youtube: "https://www.youtube.com/watch?v=w1vqy4cIHvs" },
          { title: "Por Primera Vez", artist: "Camilo", spotify: "https://open.spotify.com/track/5OiNhbBIGdfugNqcNwJRxn", youtube: "https://www.youtube.com/watch?v=YwodhCjFbQ8" },
          { title: "Hawái", artist: "Maluma", spotify: "https://open.spotify.com/track/60J23H9KkOJ1YudiIKoa0N", youtube: "https://www.youtube.com/watch?v=wvcXTeNxYHo" },
          { title: "Vamos pa la Playa", artist: "Pedro Capó", spotify: "https://open.spotify.com/track/4ycYah6nbsU3bjctpe9AYM", youtube: "https://www.youtube.com/watch?v=8EFalFXALEA" },
          { title: "Gozadera", artist: "Gente de Zona", spotify: "https://open.spotify.com/track/0OMRAvrtLWE2TvcXorRiB9", youtube: "https://www.youtube.com/watch?v=VMp55KH_3wo" },
          { title: "Dile", artist: "Don Omar", spotify: "https://open.spotify.com/track/1QahkgZHnZYH8mS1ESBtvE", youtube: "https://www.youtube.com/watch?v=zODmu06pqvg" },
          { title: "Travesura", artist: "Nicky Jam", spotify: "https://open.spotify.com/track/7fohZFlcFEsskMg1Sg2Ui5", youtube: "https://www.youtube.com/watch?v=OxxggwHFj7M" },
          { title: "El Amante", artist: "Nicky Jam", spotify: "https://open.spotify.com/track/6lnsNCU0R1KZGhTRAJsmoo", youtube: "https://www.youtube.com/watch?v=YG2p6XBuSKA" },
          { title: "Me Llamas", artist: "Piso 21", spotify: "https://open.spotify.com/track/3jpqMaJREkmVDYlRvW1qWC", youtube: "https://www.youtube.com/watch?v=A12g_0CK7PE" },
          { title: "Ella me Levantó", artist: "Daddy Yankee", spotify: "https://open.spotify.com/track/7fGODUqa0gtkb72oBVCgCD", youtube: "https://www.youtube.com/watch?v=CGIAziEuZVs" },
          { title: "Bachata", artist: "Manuel Turizo", spotify: "https://open.spotify.com/track/5ww2BF9slyYgNOk37BlC4u", youtube: "https://www.youtube.com/watch?v=dfb6LDPoqMs" },
          { title: "El Perdedor", artist: "Romeo Santos", spotify: "https://open.spotify.com/track/0uO9KWlXaDfIKT3DNrnV5n" }
        ]
      },
      {
        id: "champeta",
        label: "Champeta",
        songs: [
          { title: "Mírame", artist: "Criss Ronny", spotify: "https://open.spotify.com/track/2IjeDNZ0WF5AQCNq5xOa9C", youtube: "https://www.youtube.com/watch?v=t_JR1e_d3NA" },
          { title: "La Pupileta", artist: "Bazurto All Stars", spotify: "https://open.spotify.com/track/2b1MbQVLniCswBanEupc3O", youtube: "https://www.youtube.com/watch?v=KjQS5ze-5_c" },
          { title: "La Invité a Bailar", artist: "Kevin Florez", spotify: "https://open.spotify.com/track/5Hw55cBfVv9QTdtNBX8aAw" },
          { title: "Paola", artist: "Sayayin", spotify: "https://open.spotify.com/track/07rzF2jiwidYzEX51mulN9", youtube: "https://www.youtube.com/watch?v=mTVFcbZJe9U" },
          { title: "El Reemplazo", artist: "Eddy Jay", spotify: "https://open.spotify.com/track/4S8Iv6L3Vi7hH5364HkXdQ", youtube: "https://www.youtube.com/watch?v=3TZFIM9bPOA" },
          { title: "Busco Alguien que me Quiera", artist: "Afinaito", spotify: "https://open.spotify.com/track/1IHSUlfPjNiixMcoG1P8f2", youtube: "https://www.youtube.com/watch?v=11pl0nUF0iE" },
          { title: "El Liso", artist: "PR Music", spotify: "https://open.spotify.com/track/6vVp9urFjBYdqXjHGBz7lM", youtube: "https://www.youtube.com/watch?v=f5O9Z4Qvryo" },
          { title: "El Avioncito", artist: "G-Black", spotify: "https://open.spotify.com/track/4LpLAy1TgTVg097hienIjS", youtube: "https://www.youtube.com/watch?v=Rz4NfW7oq9A" },
          { title: "La Ola", artist: "Cris y Ronnie" },
          { title: "Catalina", artist: "Mr Black", spotify: "https://open.spotify.com/track/3kjbxc3euQmgQT177qNWPa" },
          { title: "Serrucho", artist: "Mr Black", spotify: "https://open.spotify.com/track/2A2L1veh3wbsfqT5L7tOCO", youtube: "https://www.youtube.com/watch?v=thjYtBM0-hc" },
          { title: "Bandida", artist: "Mr Black", spotify: "https://open.spotify.com/track/2Xm6BGuoSYILUWBrG0qVq1", youtube: "https://www.youtube.com/watch?v=xLKajvjiAi4" },
          { title: "Champetua", artist: "Oscar Prince", spotify: "https://open.spotify.com/track/4cdwkVSwjdM2NxIMLpfKJ4", youtube: "https://www.youtube.com/watch?v=W_cLP-8-ui0" }
        ]
      }
    ]
  },
  {
    id: "internacional",
    label: "Música Internacional",
    subgenres: [
      {
        id: "rock-espanol",
        label: "Rock en Español",
        songs: [
          { title: "Mil Horas", artist: "Los Abuelos de la Nada", spotify: "https://open.spotify.com/track/60llaOqCKPIhm0rvBaci7a", youtube: "https://www.youtube.com/watch?v=JZRUxh5ROz0" },
          { title: "La Flaca", artist: "Andrés Calamaro", spotify: "https://open.spotify.com/track/70Oa3kfxNRrhXbvercvtwW", youtube: "https://www.youtube.com/watch?v=UCF9oHXhDMU" },
          { title: "Lamento Boliviano", artist: "Enanitos Verdes", spotify: "https://open.spotify.com/track/0821BwO92shNo9TCFnzcjf", youtube: "https://www.youtube.com/watch?v=lYC5wlY8d6A" },
          { title: "Sin Documentos", artist: "Los Rodríguez", spotify: "https://open.spotify.com/track/4BzQlAd7QUdqRydbEnO5R5", youtube: "https://www.youtube.com/watch?v=BUKHMGiW_rY" },
          { title: "Medley Soda Stereo", artist: "Soda Stereo", spotify: "https://open.spotify.com/track/2WD9ggmpZE7Wodh3qVVCgg", youtube: "https://www.youtube.com/watch?v=SoVpRihyvTM" },
          { title: "Medley Fabulosos Cadillacs", artist: "Los Fabulosos Cadillacs", spotify: "https://open.spotify.com/track/4S0p4Z0KuVUWm2bxKoGPRJ", youtube: "https://www.youtube.com/watch?v=2nZ4lV7Qp_g" },
          { title: "Medley Mosca", artist: "Mosca" },
          { title: "Oye mi Amor", artist: "Maná", spotify: "https://open.spotify.com/track/5EJ2THuhAapEIeQOtXUQ0x", youtube: "https://www.youtube.com/watch?v=Se3iEHVLpZM" },
          { title: "Me Vale", artist: "Maná", spotify: "https://open.spotify.com/track/7co2mWqqXcv8rXj1VTLZXV", youtube: "https://www.youtube.com/watch?v=i35z5Q3t_xc" },
          { title: "Burro", artist: "Molotov" },
          { title: "Mi Generación", artist: "Poligamia", spotify: "https://open.spotify.com/track/7mXiYFYLWJaAit8wtZcSCM", youtube: "https://www.youtube.com/watch?v=h2Mxx_cmO9g" },
          { title: "Fíjate Bien", artist: "Juanes", spotify: "https://open.spotify.com/track/4BTVJKamCWSc3mmyknabNQ", youtube: "https://www.youtube.com/watch?v=vzrWvuGhFSc" }
        ]
      },
      {
        id: "anglo",
        label: "Música Anglo",
        songs: [
          { title: "Rivers of Babylon", artist: "Boney M", spotify: "https://open.spotify.com/track/78His8pbKjbDQF7aX5asgv", youtube: "https://www.youtube.com/watch?v=jSxQJUv1e8k" },
          { title: "Billie Jean", artist: "Michael Jackson", spotify: "https://open.spotify.com/track/6vR5u5b8JeRESx5nZaIWx6", youtube: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y" },
          { title: "All Night Long", artist: "Lionel Richie", spotify: "https://open.spotify.com/track/28uI9fFNHCelCuLS613SVi", youtube: "https://www.youtube.com/watch?v=nqAvFx3NxUM" },
          { title: "Hot Stuff", artist: "Donna Summer", spotify: "https://open.spotify.com/track/6RVevoPzbGygqvm6LxHAuf", youtube: "https://www.youtube.com/watch?v=KhcaPNuaJNU" },
          { title: "YMCA", artist: "Village People", spotify: "https://open.spotify.com/track/54OR1VDpfkBuOY5zZjhZAY", youtube: "https://www.youtube.com/watch?v=ytEwF13FJeQ" },
          { title: "Could You Be Loved", artist: "Bob Marley", spotify: "https://open.spotify.com/track/5O4erNlJ74PIF6kGol1ZrC", youtube: "https://www.youtube.com/watch?v=zBqW6yKz8WA" },
          { title: "Sweat (A La La La La Long)", artist: "Inner Circle", spotify: "https://open.spotify.com/track/49oQk0q0yS60ZlH3SzMOrO", youtube: "https://www.youtube.com/watch?v=-SvridcLD-I" },
          { title: "I Will Survive", artist: "Gloria Gaynor", spotify: "https://open.spotify.com/track/5xdlnf7VOBlgoO6ckL4qSC" },
          { title: "Locked Out of Heaven", artist: "Bruno Mars", spotify: "https://open.spotify.com/track/3XvbtG5MiftBdqFeSgkGut", youtube: "https://www.youtube.com/watch?v=WzsYtW8zyXU" },
          { title: "Treasure", artist: "Bruno Mars", spotify: "https://open.spotify.com/track/210uebcUKocf1NhSin4XVI", youtube: "https://www.youtube.com/watch?v=jz7C2W4m26U" },
          { title: "Uptown Funk", artist: "Bruno Mars", spotify: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS", youtube: "https://www.youtube.com/watch?v=OPf0YbXqDm0" },
          { title: "Levitating", artist: "Dua Lipa", spotify: "https://open.spotify.com/track/39LLxExYz6ewLAcYrzQQyP", youtube: "https://www.youtube.com/watch?v=ovG2QwiObhk" },
          { title: "Don't Start Now", artist: "Dua Lipa", spotify: "https://open.spotify.com/track/3PfIrDoz19wz7qK7tYeu62", youtube: "https://www.youtube.com/watch?v=8CLkVWB_Lj8" },
          { title: "I Wanna Dance with Somebody", artist: "Whitney Houston", spotify: "https://open.spotify.com/track/2tUBqZG2AbRi7Q0BIrVrEj" },
          { title: "If I Ain't Got You", artist: "Alicia Keys", spotify: "https://open.spotify.com/track/3XVBdLihbNbxUwZosxcGuJ", youtube: "https://www.youtube.com/watch?v=VGJWeQ9BE0c" },
          { title: "No One", artist: "Alicia Keys", spotify: "https://open.spotify.com/track/7gK6qAXaZFoUS0zEWE2xxL", youtube: "https://www.youtube.com/watch?v=rywUS-ohqeE" },
          { title: "Hello", artist: "Adele", spotify: "https://open.spotify.com/track/4aebBr4JAihzJQR0CiIZJv", youtube: "https://www.youtube.com/watch?v=YQHsXMglC9A" },
          { title: "Sir Duke", artist: "Stevie Wonder", spotify: "https://open.spotify.com/track/5NbSl0S4u3yySgSK2cSz71", youtube: "https://www.youtube.com/watch?v=s6fPN5aQVDI" },
          { title: "Want to Want Me", artist: "Jason Derulo", spotify: "https://open.spotify.com/track/7oGZAicScQt96OAW4AruYy", youtube: "https://www.youtube.com/watch?v=rClUOdS5Zyw" },
          { title: "Chunky", artist: "Bruno Mars", spotify: "https://open.spotify.com/track/0Y7gvXEAHngo7OyIodDuwS", youtube: "https://www.youtube.com/watch?v=oacaq_1TkMU" },
          { title: "Can't Stop the Feeling", artist: "Justin Timberlake", spotify: "https://open.spotify.com/track/6JV2JOEocMgcZxYSZelKcc", youtube: "https://www.youtube.com/watch?v=ru0K8uYEZWw" },
          { title: "Love Never Felt so Good", artist: "Michael Jackson", spotify: "https://open.spotify.com/track/3A7QVuIULMFC0B2XYju1u0", youtube: "https://www.youtube.com/watch?v=GJDdBbgJafU" },
          { title: "Rock with You", artist: "Michael Jackson", spotify: "https://open.spotify.com/track/5yxIenY5kSLlgTr3XGYw9p", youtube: "https://www.youtube.com/watch?v=5X-Mrc2l1d0" },
          { title: "Blame it on the Boogie", artist: "Michael Jackson", spotify: "https://open.spotify.com/track/45lTNyyHpgwGhVnaphmSXw", youtube: "https://www.youtube.com/watch?v=nqxVMLVe62U" },
          { title: "Beat It", artist: "Michael Jackson", spotify: "https://open.spotify.com/track/3lmLEmDqEPbuYjWASjxGQ5", youtube: "https://www.youtube.com/watch?v=oRdxUFDoQe0" },
          { title: "Higher Ground", artist: "Stevie Wonder", spotify: "https://open.spotify.com/track/4BepsAKHV5B5vQ7Y9k32VI", youtube: "https://www.youtube.com/watch?v=I1_uU9eIZRo" },
          { title: "Master Blaster", artist: "Stevie Wonder", spotify: "https://open.spotify.com/track/6jTPsAlPeGxIKMRvECDBZZ", youtube: "https://www.youtube.com/watch?v=44F34jc7wGI" },
          { title: "Sugar", artist: "Maroon 5", spotify: "https://open.spotify.com/track/2iuZJX9X9P0GKaE93xcPjk", youtube: "https://www.youtube.com/watch?v=N1BcpzPGlYQ" },
          { title: "I Feel Good", artist: "James Brown", spotify: "https://open.spotify.com/track/5ImL3flLj362nzf0a6Rqhh" },
          { title: "Lady", artist: "Modjo", spotify: "https://open.spotify.com/track/3ZT1fULYM6noGtAkd5Q26V", youtube: "https://www.youtube.com/watch?v=yhU_oCnul1Q" }
        ]
      }
    ]
  }
];
