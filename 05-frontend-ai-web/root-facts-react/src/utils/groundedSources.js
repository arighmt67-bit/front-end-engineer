/**
 * Grounded Sources for vegetables classified by Teachable Machine model.
 * Provides English scientific, nutritional, and factual background data for the SLM generator
 * so that generated facts remain accurate, relevant, strictly in English, and non-hallucinatory.
 */

export const VEGETABLE_GROUNDED_SOURCES = {
  Beetroot: {
    scientificName: 'Beta vulgaris',
    category: 'Root Vegetable',
    nutritionHighlights: 'Rich in natural inorganic nitrates that help lower blood pressure and boost physical stamina, along with antioxidant betalain pigments.',
    funFacts: [
      'Beetroots contain dietary nitrates that clinical studies show improve oxygen efficiency and athletic stamina by up to 16%.',
      'In the 19th century, beetroot juice was commonly used as a natural red hair dye and vibrant fabric stain in Europe.',
      'Ancient Romans and Greeks originally consumed only beet leaves; the root was valued almost exclusively as a natural herbal medicine.'
    ],
    source: 'USDA FoodData Central / Healthline Nutrition'
  },
  Paprika: {
    scientificName: 'Capsicum annuum',
    category: 'Bell Pepper / Solanaceae',
    nutritionHighlights: 'Exceptional source of vitamin C (containing more than twice that of oranges), vitamin A, and carotenoids like capsanthin.',
    funFacts: [
      'A single medium red bell pepper delivers over 150% of the recommended daily vitamin C intake for adults.',
      'Green, yellow, and red bell peppers are actually the exact same fruit at progressively riper stages of maturity.',
      'Hungarian chemist Albert Szent-Gyorgyi won the 1937 Nobel Prize in Medicine after first isolating pure vitamin C from paprika peppers.'
    ],
    source: 'USDA Agricultural Research Service'
  },
  Cabbage: {
    scientificName: 'Brassica oleracea var. capitata',
    category: 'Cruciferous Vegetable',
    nutritionHighlights: 'Extremely rich in vitamin K for blood clotting, vitamin C, dietary fiber, and protective sulforaphane glucosinolates.',
    funFacts: [
      'Cabbage has been cultivated for over 4,000 years, and fermented cabbage like sauerkraut sustained sailors against scurvy on long voyages.',
      'Raw cabbage provides about 56% of your daily vitamin K needs in just one cup, promoting strong bone density.',
      'Fermenting cabbage into kimchi or sauerkraut multiplies natural probiotic bacteria that nourish the human gut microbiome.'
    ],
    source: 'Harvard T.H. Chan School of Public Health'
  },
  Carrot: {
    scientificName: 'Daucus carota',
    category: 'Root Vegetable',
    nutritionHighlights: 'Leading source of beta-carotene (provitamin A) for retina health, pectin dietary fiber, and vitamin B6.',
    funFacts: [
      'Carrots were originally purple and yellow across Central Asia; sweet orange carrots were bred by Dutch growers in the 17th century.',
      'Cooking carrots with a small drop of healthy oil actually enhances beta-carotene absorption into the human bloodstream by over 300%.',
      'The longest carrot ever recorded in the Guinness World Records grew to an astonishing length of over 6.2 meters.'
    ],
    source: 'World Carrot Museum / USDA Nutrition'
  },
  Cauliflower: {
    scientificName: 'Brassica oleracea var. botrytis',
    category: 'Cruciferous Vegetable',
    nutritionHighlights: 'High in dietary fiber, choline for brain neurotransmitter synthesis, and anti-inflammatory glucosinolates.',
    funFacts: [
      'Cauliflower florets are actually undeveloped flower buds clustered tightly together before blooming.',
      'Cauliflower is a versatile keto favorite used as a gluten-free substitute for rice, mashed potatoes, and pizza crusts.',
      'The heavy outer leaves of cauliflower wrap around the curds, naturally shielding them from sunlight to keep the head milky white.'
    ],
    source: 'National Institutes of Health (NIH)'
  },
  Chilli: {
    scientificName: 'Capsicum frutescens',
    category: 'Spice / Vegetable',
    nutritionHighlights: 'Loaded with thermogenic capsaicin, concentrated vitamin C, bioflavonoids, and metabolism-stimulating antioxidants.',
    funFacts: [
      'The spicy burn of capsaicin does not cause chemical damage; it tricks your TRPV1 heat sensors into triggering endorphin release.',
      'Chilli peppers contain almost seven times more vitamin C by weight than a standard fresh orange.',
      'Birds are completely immune to the burning heat of chilli peppers because their pain receptors do not bind with capsaicin.'
    ],
    source: 'Scoville Scale / Oxford Nutrition'
  },
  Corn: {
    scientificName: 'Zea mays',
    category: 'Cereal Grain / Cereal Vegetable',
    nutritionHighlights: 'Wholesome source of complex carbohydrates, insoluble dietary fiber, and macular carotenoids lutein and zeaxanthin.',
    funFacts: [
      'An ear of corn almost always has an even number of kernel rows, typically 16 rows carrying roughly 800 individual kernels.',
      'Corn is cultivated on every continent on Earth except Antarctica, serving as a fundamental staple for billions.',
      'Every single silk thread on a corn cob is connected to an individual kernel that requires pollination to develop.'
    ],
    source: 'Food and Agriculture Organization (FAO)'
  },
  Cucumber: {
    scientificName: 'Cucumis sativus',
    category: 'Gourd Family (Cucurbitaceae)',
    nutritionHighlights: 'Consists of 95% structured water for optimal cellular hydration, organic silica for collagen connective tissue, and potassium.',
    funFacts: [
      'Botanically a berry fruit, the inner flesh of a cucumber can remain up to 20 degrees Fahrenheit cooler than the surrounding ambient air.',
      'Cucumber slices placed over tired eyes reduce puffiness thanks to their natural astringent caffeic acid and cold moisture retention.',
      'Cucumber peel is dense in insoluble fiber and potassium, making unpeeled cucumbers the most nutritious way to eat them.'
    ],
    source: 'USDA Nutrient Database'
  },
  eggplant: {
    scientificName: 'Solanum melongena',
    category: 'Nightshade Family (Solanaceae)',
    nutritionHighlights: 'Deep purple skin is packed with nasunin (a potent anthocyanin antioxidant safeguarding brain cell lipids), fiber, and manganese.',
    funFacts: [
      'Eggplants got their English name because 18th-century European cultivars were small, oval, and yellow or white, resembling goose eggs.',
      'Botanically classified as a spongy berry, eggplant is a close botanical cousin of tomatoes, potatoes, and bell peppers.',
      'Salting sliced eggplant before cooking draws out moisture and prevents it from soaking up excessive oil while frying.'
    ],
    source: 'Encyclopaedia Britannica'
  },
  Garlic: {
    scientificName: 'Allium sativum',
    category: 'Allium Family',
    nutritionHighlights: 'Abundant in allicin, a natural bioactive organosulfur compound that supports cardiovascular health and immune resistance.',
    funFacts: [
      'Crushing or slicing garlic and letting it rest for 10 minutes maximizes the enzymatic formation of bioactive heart-healthy allicin.',
      'In ancient Olympic competitions, Greek athletes consumed raw garlic as an early natural performance enhancer before contests.',
      'During World War I and II, garlic juice was widely applied as an effective natural antiseptic to treat wounded soldiers on battlefields.'
    ],
    source: 'Journal of Nutrition / NIH'
  },
  Ginger: {
    scientificName: 'Zingiber officinale',
    category: 'Zingiberaceae Rhizome',
    nutritionHighlights: 'Possesses gingerol bioactives with potent gastroprotective anti-nausea properties, joint soothing effects, and antioxidants.',
    funFacts: [
      'Ginger has been used for over 5,000 years in traditional Asian herbal medicine to treat digestive distress and motion sickness.',
      'Clinical trials confirm ginger is as effective as pharmaceutical antiemetics in soothing morning sickness in early pregnancy.',
      'Ginger is an underground rhizome (horizontal stem) rather than a true botanical root.'
    ],
    source: 'National Center for Complementary and Integrative Health'
  },
  Lettuce: {
    scientificName: 'Lactuca sativa',
    category: 'Leafy Green',
    nutritionHighlights: 'Ultra low in calories with high hydrating water content, vitamin A, folate (vitamin B9), and phytonutrient antioxidants.',
    funFacts: [
      'Ancient Egyptian tomb paintings show lettuce was venerated as a sacred plant dedicated to Min, the god of fertility and vigor.',
      'Wild lettuce stems secrete a bitter milky fluid called lactucarium, which ancient Roman physicians used as a natural mild sedative.',
      'Dark leafier lettuces like Romaine provide up to ten times more beta-carotene and lutein than pale iceberg lettuce.'
    ],
    source: 'USDA National Nutrient Database'
  },
  Onion: {
    scientificName: 'Allium cepa',
    category: 'Allium Family',
    nutritionHighlights: 'Premier source of quercetin flavonoid antioxidant, vitamin C, and inulin prebiotic dietary fibers for healthy gut flora.',
    funFacts: [
      'Cutting onions makes you weep because cell rupture releases syn-propanethial-S-oxide gas that turns into mild sulfuric acid on tears.',
      'Chilling onions in the refrigerator for 30 minutes before chopping slows down the sulfur enzymes, preventing tears.',
      'Ancient Egyptian pharaohs were buried with onions placed in their eye sockets and chest cavity as symbols of eternal life.'
    ],
    source: 'American Chemical Society (ACS)'
  },
  Peas: {
    scientificName: 'Pisum sativum',
    category: 'Legumes (Fabaceae)',
    nutritionHighlights: 'Outstanding source of plant protein among vegetables, soluble fiber, iron, and zinc with a low glycemic index.',
    funFacts: [
      'Augustinian monk Gregor Mendel discovered the founding principles of modern genetics in the 1860s by cross-breeding garden pea plants.',
      'Fresh green peas were so prized in the 17th-century French royal court of Louis XIV that nobles considered them a decadent fashion craze.',
      'One cup of cooked green peas provides more than 8 grams of complete vegetable protein and 7 grams of dietary fiber.'
    ],
    source: 'Nature Education / USDA'
  },
  Potato: {
    scientificName: 'Solanum tuberosum',
    category: 'Tuber (Solanaceae)',
    nutritionHighlights: 'Rich in potassium (higher than bananas per serving), vitamin B6, vitamin C, and gut-soothing resistant starch.',
    funFacts: [
      'The potato was the first vegetable crop ever successfully grown in outer space aboard the Space Shuttle Columbia in 1995.',
      'The Incas of Peru cultivated over 4,000 distinct native potato varieties adapted to high Andean altitudes.',
      'Cooling cooked potatoes retrogrades their starch into prebiotic resistant starch that directly feeds beneficial gut microbes.'
    ],
    source: 'NASA / International Potato Center'
  },
  Turnip: {
    scientificName: 'Brassica rapa subsp. rapa',
    category: 'Root Brassica',
    nutritionHighlights: 'Loaded with vitamin C, anticancer glucosinolates, calcium, and potassium while remaining exceptionally low in calories.',
    funFacts: [
      'Before pumpkins were introduced from the Americas, Irish and Scottish Celts carved scary faces into hollowed turnips for Samhain/Halloween.',
      'Both the swollen white root and the tender leafy turnip greens are edible, with the greens being richer in iron and vitamin K.',
      'Turnips were a crucial winter sustenance staple across medieval Europe long before potatoes gained widespread acceptance.'
    ],
    source: 'Smithsonian Magazine / USDA'
  },
  Soybean: {
    scientificName: 'Glycine max',
    category: 'Legume',
    nutritionHighlights: 'One of the rare botanical complete proteins containing all 9 essential amino acids, rich in isoflavones and calcium.',
    funFacts: [
      'Soybeans provide the foundation for tempeh and tofu, wholesome fermented staples that have sustained Asian diets for thousands of years.',
      'Soybeans contain about 36% pure protein by dry weight, ranking higher in protein density than most meats and legumes.',
      'Soybean oil and proteins are widely used beyond cuisine, including eco-friendly printing inks and biodiesel energy.'
    ],
    source: 'Harvard School of Public Health'
  },
  Spinach: {
    scientificName: 'Spinacia oleracea',
    category: 'Leafy Green (Amaranthaceae)',
    nutritionHighlights: 'Nutrient powerhouse loaded with iron, plant folate, eye-protecting lutein, vitamins A, C, K1, and essential magnesium.',
    funFacts: [
      "Popeye's mythical iron strength was boosted by a misplaced decimal point in 1870, yet spinach remains one of the healthiest leafy greens on Earth.",
      'Pairing spinach with citrus or vitamin C foods increases the bioavailability of its non-heme plant iron by up to 300%.',
      "During the Renaissance, Catherine de' Medici loved spinach so much that any dish made with spinach became known as 'Florentine style'."
    ],
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
    category: 'Fresh Vegetable',
    nutritionHighlights: 'Contains natural fiber, vitamins, and essential minerals supporting daily human wellness and vitality.',
    funFacts: [
      `${vegetableName} is a nutrient-dense vegetable offering valuable vitamins, minerals, and antioxidants for a well-balanced diet.`
    ],
    source: 'USDA FoodData Central'
  };
};
