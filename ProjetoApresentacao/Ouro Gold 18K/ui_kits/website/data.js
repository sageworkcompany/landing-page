/* Ouro Gold 18K — sample catalog data for the UI kit prototype.
   Plain JS, attaches to window.OG. Loaded before the Babel scripts. */
(function () {
  const categories = [
    { slug: 'aneis',     label: 'Anéis',      count: 128 },
    { slug: 'brincos',   label: 'Brincos',    count: 96  },
    { slug: 'colares',   label: 'Colares',    count: 84  },
    { slug: 'pulseiras', label: 'Pulseiras',  count: 52  },
    { slug: 'pingentes', label: 'Pingentes',  count: 47  },
    { slug: 'aliancas',  label: 'Alianças',   count: 63  },
    { slug: 'relogios',  label: 'Relógios',   count: 38  },
  ];

  const P = (o) => Object.assign({ rating: 4.8, reviews: 24, material: 'Ouro 18K', tag: null }, o);

  const IMG = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

  const products = [
    P({ id: 'aurora',      name: 'Solitário Aurora',      cat: 'aneis',     gem: 'Diamante',  price: 4290, tag: 'new',  glyph: 'anel',     rating: 4.9, reviews: 41,
        image: IMG('photo-QPIJRZb31PY'),
        desc: 'Solitário clássico em ouro 18K com diamante de lapidação brilhante, engaste em seis garras que maximiza a entrada de luz.' }),
    P({ id: 'filo',        name: 'Colar Filo',            cat: 'colares',   gem: null,        price: 2632, oldPrice: 3290, tag: 'sale', glyph: 'colar', rating: 4.7, reviews: 33,
        image: IMG('photo-aldDZePniqg'),
        desc: 'Corrente veneziana delicada em ouro 18K, comprimento ajustável de 40 a 45 cm. Leveza para o uso diário.' }),
    P({ id: 'mare',        name: 'Brinco Maré',           cat: 'brincos',   gem: 'Pérola',    price: 1880, tag: 'best', glyph: 'brinco', rating: 4.9, reviews: 58,
        image: IMG('photo-4L75o_nqcHc'),
        desc: 'Brinco em ouro 18K com pérola de água doce, fecho tarraxa de segurança. Um clássico contemporâneo.' }),
    P({ id: 'riviera',     name: 'Anel Riviera',          cat: 'aneis',     gem: 'Diamante',  price: 8740, tag: 'best', glyph: 'anel',   rating: 5.0, reviews: 19,
        image: IMG('photo-jKSIrbfZEmA'),
        desc: 'Meia aliança riviera com diamantes em trilho contínuo, totalizando 0,75ct. Brilho ininterrupto.' }),
    P({ id: 'veneza',      name: 'Pulseira Veneza',       cat: 'pulseiras', gem: null,        price: 2140, tag: null,   glyph: 'pulseira', rating: 4.6, reviews: 27,
        image: IMG('photo-F6qEiDArzfk'),
        desc: 'Pulseira de elos venezianos em ouro 18K, fecho gaveta com trava de segurança.' }),
    P({ id: 'gota',        name: 'Pingente Gota',         cat: 'pingentes', gem: 'Safira',    price: 3120, tag: 'new',  glyph: 'pingente', rating: 4.8, reviews: 12,
        image: IMG('photo-SniDFooLoow'),
        desc: 'Pingente gota com safira azul e contorno de diamantes, acompanha corrente fina de 45 cm.' }),
    P({ id: 'lua',         name: 'Argola Lua',            cat: 'brincos',   gem: null,        price: 1490, tag: null,   glyph: 'brinco', rating: 4.7, reviews: 44,
        image: IMG('photo-77vl4dH6KKQ'),
        desc: 'Argola lisa de 18 mm em ouro 18K, perfil abaulado que reflete a luz. Fecho de pressão.' }),
    P({ id: 'compromisso', name: 'Aliança Compromisso',   cat: 'aliancas',  gem: null,        price: 1960, tag: 'best', glyph: 'aliança', rating: 4.9, reviews: 73,
        image: IMG('photo-WHUG4KXCbuI'),
        desc: 'Aliança tradicional 4 mm em ouro 18K, acabamento polido. Gravação interna gratuita.' }),
    P({ id: 'pontodeluz',  name: 'Colar Ponto de Luz',    cat: 'colares',   gem: 'Diamante',  price: 2780, tag: null,   glyph: 'colar',  rating: 4.8, reviews: 36,
        image: IMG('photo-u1Hv_erOQH0'),
        desc: 'Colar ponto de luz com diamante de 10 pontos em ouro 18K. Delicadeza que combina com tudo.' }),
    P({ id: 'meialianca',  name: 'Anel Meia Aliança',     cat: 'aneis',     gem: 'Diamante',  price: 5640, oldPrice: 6990, tag: 'sale', glyph: 'anel', rating: 4.9, reviews: 22,
        image: IMG('photo-4HkaGQ7muvk'),
        desc: 'Meia aliança com sete diamantes em ouro 18K. Símbolo de uma promessa.' }),
    P({ id: 'serena',      name: 'Brinco Serena',         cat: 'brincos',   gem: 'Esmeralda', price: 4380, tag: 'new',  glyph: 'brinco', rating: 5.0, reviews: 8,
        image: IMG('photo-W3bZJ0numwE'),
        desc: 'Brinco com esmeralda lapidação retangular e moldura de diamantes em ouro 18K.' }),
    P({ id: 'cordao',      name: 'Pulseira Cordão',       cat: 'pulseiras', gem: null,        price: 1720, tag: null,   glyph: 'pulseira', rating: 4.5, reviews: 31,
        image: IMG('photo-8K7fqGZ8iew'),
        desc: 'Pulseira cordão baiano em ouro 18K, 19 cm. Trama densa e brilho intenso.' }),
  ];

  const collections = [
    { slug: 'aurora', title: 'Aurora', eyebrow: 'Nova Coleção', glyph: 'aurora',
      desc: 'Inspirada na primeira luz do dia — peças que celebram recomeços, em ouro 18K e diamantes.' },
    { slug: 'noivado', title: 'Para Sempre', eyebrow: 'Noivado & Casamento', glyph: 'noivado',
      desc: 'Solitários, alianças e meias alianças para marcar o compromisso de uma vida.' },
    { slug: 'essenciais', title: 'Essenciais', eyebrow: 'Curadoria', glyph: 'essenciais',
      desc: 'O guarda-joias atemporal: as peças que você usa todos os dias, para sempre.' },
  ];

  window.OG = { categories, products, collections,
    fmt: (n) => 'R$ ' + n.toLocaleString('pt-BR'),
    byId: (id) => products.find(p => p.id === id),
    byCat: (slug) => products.filter(p => p.cat === slug),
  };
})();
