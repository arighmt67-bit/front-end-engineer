/**
 * Grounded Sources untuk sayuran sesuai model label Teachable Machine.
 * Memberikan grounding data nutrisi dan fakta ilmiah riil untuk model SLM (LaMini-Flan-T5)
 * agar output tidak mengarang (hallucination), tetap relevan, dan memiliki referensi valid.
 */

export const VEGETABLE_GROUNDED_SOURCES = {
  Beetroot: {
    scientificName: 'Beta vulgaris',
    category: 'Root Vegetable',
    nutritionHighlights: 'Kaya nitrat anorganik alami yang membantu menurunkan tekanan darah dan meningkatkan stamina fisik, serta pigmen betalain antioksidan tinggi.',
    funFactSeed: 'Beetroot sering digunakan sebagai pewarna alami merah dan memiliki kandungan nitrat yang terbukti secara klinis meningkatkan efisiensi oksigen pada atlet.',
    source: 'USDA FoodData Central / Healthline Nutrition'
  },
  Paprika: {
    scientificName: 'Capsicum annuum',
    category: 'Bell Pepper / Solanaceae',
    nutritionHighlights: 'Sumber vitamin C luar biasa (bahkan lebih tinggi dari jeruk), vitamin A, dan antioksidan karotenoid seperti capsanthin.',
    funFactSeed: 'Satu buah paprika merah ukuran sedang dapat mencukupi lebih dari 150% kebutuhan harian vitamin C untuk orang dewasa.',
    source: 'USDA Agricultural Research Service'
  },
  Cabbage: {
    scientificName: 'Brassica oleracea var. capitata',
    category: 'Cruciferous Vegetable',
    nutritionHighlights: 'Sangat kaya vitamin K untuk pembekuan darah, vitamin C, serta senyawa sulforaphane pelindung sel.',
    funFactSeed: 'Kubis telah dibudidayakan lebih dari 4.000 tahun dan fermentasinya (seperti kimchi atau sauerkraut) menghasilkan probiotik alami yang sangat baik bagi mikrobioma usus.',
    source: 'Harvard T.H. Chan School of Public Health'
  },
  Carrot: {
    scientificName: 'Daucus carota',
    category: 'Root Vegetable',
    nutritionHighlights: 'Sumber beta-karoten (provitamin A) terkemuka untuk kesehatan retina mata, serat pektin, dan vitamin B6.',
    funFactSeed: 'Wortel awalnya berwarna ungu atau kuning di Persia abad pertengahan; varietas oranye populer dikembangkan oleh petani Belanda pada abad ke-17.',
    source: 'World Carrot Museum / USDA Nutrition'
  },
  Cauliflower: {
    scientificName: 'Brassica oleracea var. botrytis',
    category: 'Cruciferous Vegetable',
    nutritionHighlights: 'Tinggi serat makanan, kolin untuk perkembangan fungsi memori otak, dan senyawa glukosinolat anti-inflamasi.',
    funFactSeed: 'Kembang kol sering menjadi pengganti rendah karbohidrat populer untuk nasi, pizza base, dan kentang tumbuk karena teksturnya yang padat dan netral.',
    source: 'National Institutes of Health (NIH)'
  },
  Chilli: {
    scientificName: 'Capsicum frutescens',
    category: 'Spice / Vegetable',
    nutritionHighlights: 'Mengandung capsaicin yang merangsang metabolisme tubuh, vitamin C pekat, dan bioflavonoid.',
    funFactSeed: 'Rasa pedas capsaicin pada cabai sebenarnya tidak merusak lidah melainkan menipu reseptor panas nyeri tubuh (TRPV1) sehingga memicu pelepasan endorfin yang membahagiakan.',
    source: 'Scoville Scale / Oxford Nutrition'
  },
  Corn: {
    scientificName: 'Zea mays',
    category: 'Cereal Grain / Cereal Vegetable',
    nutritionHighlights: 'Sumber energi karbohidrat kompleks, serat tidak larut, serta antioksidan lutein dan zeaxanthin untuk penglihatan.',
    funFactSeed: 'Jumlah bulir jagung pada satu tongkol selalu berjumlah genap (rata-rata sekitar 800 bulir tersusun dalam 16 baris).',
    source: 'Food and Agriculture Organization (FAO)'
  },
  Cucumber: {
    scientificName: 'Cucumis sativus',
    category: 'Gourd Family (Cucurbitaceae)',
    nutritionHighlights: 'Mengandung 95% air untuk hidrasi optimal sel tubuh, silika organik untuk kesehatan jaringan kulit, serta kalium.',
    funFactSeed: 'Secara botani mentimun adalah buah berbiji, dan bagian dalam mentimun bisa bersuhu hingga 10 derajat Fahrenheit lebih sejuk dibanding suhu udara di luarnya.',
    source: 'USDA Nutrient Database'
  },
  eggplant: {
    scientificName: 'Solanum melongena',
    category: 'Nightshade Family (Solanaceae)',
    nutritionHighlights: 'Kulit ungunya kaya nasunin (antioksidan anthocyanin kuat pelindung membran sel otak), serat, dan mangan.',
    funFactSeed: 'Terong dinamai eggplant oleh bangsa Eropa karena varietas awal abad ke-18 yang mereka lihat berukuran kecil, oval, dan berwarna putih seperti telur angsa.',
    source: 'Encyclopaedia Britannica'
  },
  Garlic: {
    scientificName: 'Allium sativum',
    category: 'Allium Family',
    nutritionHighlights: 'Kaya allicin aktif yang memiliki sifat antimikroba alami, mendukung regulasi kolesterol LDL, dan menjaga elastisitas pembuluh darah.',
    funFactSeed: 'Untuk mengaktifkan allicin secara maksimal, bawang putih yang dicincang atau dimemarkan sebaiknya didiamkan selama 10 menit sebelum dimasak.',
    source: 'Journal of Nutrition / NIH'
  },
  Ginger: {
    scientificName: 'Zingiber officinale',
    category: 'Zingiberaceae Rhizome',
    nutritionHighlights: 'Memiliki senyawa gingerol bioaktif dengan efek gastroprotektif (meredakan mual), anti-inflamasi sendi, dan antioksidan.',
    funFactSeed: 'Jahe telah digunakan lebih dari 5.000 tahun dalam pengobatan holistik Asia dan terbukti efektif meredakan mabuk perjalanan serta mual pagi hari.',
    source: 'National Center for Complementary and Integrative Health'
  },
  Lettuce: {
    scientificName: 'Lactuca sativa',
    category: 'Leafy Green',
    nutritionHighlights: 'Sangat rendah kalori dengan kadar air tinggi, kaya vitamin A, folat (vitamin B9), dan vitamin K1.',
    funFactSeed: 'Batang selada kuno mengeluarkan cairan getah putih susu yang disebut lactucarium yang pada peradaban Yunani dan Romawi kuno dimanfaatkan untuk membantu tidur lelap.',
    source: 'USDA National Nutrient Database'
  },
  Onion: {
    scientificName: 'Allium cepa',
    category: 'Allium Family',
    nutritionHighlights: 'Sumber flavonoid quercetin konsentrasi tinggi untuk antihistamin alami, vitamin C, dan prebiotik inulin.',
    funFactSeed: 'Bawang bombai membuat mata menangis karena saat dipotong, enzim melepaskan gas syn-propanethial-S-oxide yang bereaksi dengan air mata membentuk asam sulfat ringan.',
    source: 'American Chemical Society (ACS)'
  },
  Peas: {
    scientificName: 'Pisum sativum',
    category: 'Legumes (Fabaceae)',
    nutritionHighlights: 'Sumber protein nabati yang sangat baik di antara sayuran, kaya serat larut, zat besi nabati, dan seng.',
    funFactSeed: 'Gregor Mendel menemukan hukum dasar genetika modern pada abad ke-19 melalui eksperimen perkawinan silang tanaman kacang polong di kebun biaranya.',
    source: 'Nature Education / USDA'
  },
  Potato: {
    scientificName: 'Solanum tuberosum',
    category: 'Tuber (Solanaceae)',
    nutritionHighlights: 'Sumber kalium tinggi (lebih tinggi dari rata-rata pisang), vitamin B6, vitamin C, dan pati resisten yang ramah bagi pencernaan.',
    funFactSeed: 'Kentang adalah tanaman pangan pertama yang berhasil ditanam dan tumbuh di luar angkasa dalam misi pesawat ulang-alik Columbia tahun 1995.',
    source: 'NASA / International Potato Center'
  },
  Turnip: {
    scientificName: 'Brassica rapa subsp. rapa',
    category: 'Root Brassica',
    nutritionHighlights: 'Kaya vitamin C, glukosinolat antikanker, kalsium, dan kalium dengan kandungan kalori yang sangat rendah.',
    funFactSeed: 'Sebelum labu oranye menjadi tradisi modern Halloween di Amerika, masyarakat Irlandia dan Skotlandia kuno memahat wajah seram pada lobak turnip.',
    source: 'Smithsonian Magazine / USDA'
  },
  Soybean: {
    scientificName: 'Glycine max',
    category: 'Legume',
    nutritionHighlights: 'Salah satu dari sedikit tanaman dengan protein lengkap (mengandung seluruh 9 asam amino esensial), kaya isoflavon dan kalsium.',
    funFactSeed: 'Kedelai menyediakan bahan baku untuk tempe dan tahu, makanan fermentasi yang menjadi salah satu warisan kuliner nabati tertua di dunia.',
    source: 'Harvard School of Public Health'
  },
  Spinach: {
    scientificName: 'Spinacia oleracea',
    category: 'Leafy Green (Amaranthaceae)',
    nutritionHighlights: 'Padat nutrisi zat besi, asam folat, lutein, vitamin A, C, dan K, serta mineral magnesium.',
    funFactSeed: 'Meskipun mitos kekuatan super Popeye terinspirasi oleh kekeliruan letak desimal kadar zat besi pada tahun 1870, bayam tetap menjadi salah satu ratu sayuran berdaun hijau terpadat nutrisi di dunia.',
    source: 'Oxford Academic / USDA'
  }
};

/**
 * Mencari data grounded source berdasarkan nama sayuran (case-insensitive).
 */
export const getGroundedSource = (vegetableName) => {
  if (!vegetableName || typeof vegetableName !== 'string') return null;

  const normalized = vegetableName.trim().toLowerCase();
  for (const [key, data] of Object.entries(VEGETABLE_GROUNDED_SOURCES)) {
    if (key.toLowerCase() === normalized) {
      return {
        vegetableKey: key,
        ...data
      };
    }
  }

  return {
    vegetableKey: vegetableName,
    scientificName: 'Plantae',
    category: 'Sayuran Segar',
    nutritionHighlights: 'Mengandung serat alami, vitamin, mineral esensial, dan mikronutrien penting bagi daya tahan tubuh.',
    funFactSeed: `${vegetableName} merupakan salah satu sayuran bernutrisi yang memberikan kontribusi gizi penting bagi pola makan seimbang.`,
    source: 'USDA FoodData Central'
  };
};
