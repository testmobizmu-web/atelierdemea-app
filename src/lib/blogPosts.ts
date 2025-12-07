// src/lib/blogPosts.ts

export type BlogPost = {
  slug: string;
  image: string;
  title_en: string;
  title_fr: string;
  category_en: string;
  category_fr: string;
  excerpt_en: string;
  excerpt_fr: string;
  content_en: string;
  content_fr: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "satin-bonnet-night-hair-care",
    image: "/blog/satin-bonnet.jpg",
    title_en:
      "Satin sleep bonnet – protect your curls every night in Mauritius",
    title_fr:
      "Bonnet en satin – protégez vos cheveux chaque nuit à Maurice",
    category_en: "Hair Care",
    category_fr: "Soin des cheveux",
    excerpt_en:
      "Discover why a satin bonnet is essential to reduce breakage, frizz and dryness – especially in our Mauritian climate.",
    excerpt_fr:
      "Découvrez pourquoi le bonnet en satin est indispensable pour réduire la casse, les frisottis et la sécheresse – surtout dans notre climat mauricien.",
    content_en: [
      "If you wake up every morning with dry, tangled or flattened hair, your pillowcase may be part of the problem. Cotton absorbs the natural oils and moisture of your hair, which creates friction, breakage and frizz overnight.",
      "A satin sleep bonnet creates a smooth protective barrier between your hair and the pillow. Instead of rubbing, your curls glide gently on the fabric. This helps you keep definition for longer, reduces split ends and keeps your hair feeling soft and hydrated.",
      "Our satin bonnet is designed for the Mauritian woman: light, breathable and comfortable even on hot nights. It suits natural hair, relaxed hair, braids, twists and silk presses. Simply moisturise your hair, put on the bonnet before bed, and let it work while you sleep.",
      "At Rs 175, it is a small investment that can totally change your hair routine. Pair it with a weekly deep treatment and you will very quickly notice less breakage, less frizz and better length retention."
    ].join("\n\n"),
    content_fr: [
      "Si vous vous réveillez chaque matin avec des cheveux secs, emmêlés ou complètement aplatis, votre taie d’oreiller peut être en cause. Le coton absorbe les huiles naturelles et l’hydratation des cheveux, ce qui crée de la friction, de la casse et des frisottis pendant la nuit.",
      "Le bonnet en satin crée une barrière lisse et protectrice entre vos cheveux et l’oreiller. Au lieu de frotter, vos boucles glissent doucement sur le tissu. Résultat : vos boucles gardent leur définition plus longtemps, les pointes cassent moins et les cheveux restent doux et hydratés.",
      "Notre bonnet en satin est pensé pour les Mauriciennes : léger, respirant et confortable même lorsqu’il fait chaud. Il convient aux cheveux naturels, défrisés, tressés, en twist ou lissés. Il suffit d’hydrater vos cheveux, de mettre le bonnet avant de dormir et de le laisser travailler pour vous.",
      "À Rs 175, c’est un petit investissement qui peut transformer votre routine capillaire. Combiné à un soin profond hebdomadaire, vous verrez très vite moins de casse, moins de frisottis et une meilleure rétention de longueur."
    ].join("\n\n")
  },
  {
    slug: "printed-pouch-everyday-style",
    image: "/blog/printed-pouch.jpg",
    title_en: "Printed pouch – the small everyday bag that goes everywhere",
    title_fr:
      "Pochette imprimée – le petit essentiel qui vous suit partout",
    category_en: "Accessories",
    category_fr: "Accessoires",
    excerpt_en:
      "A lightweight printed pouch to keep your phone, makeup and essentials organised – at work, on a night out or while travelling.",
    excerpt_fr:
      "Une pochette imprimée légère pour garder téléphone, maquillage et essentiels bien organisés – au travail, en sortie ou en voyage.",
    content_en: [
      "We all have those little things that end up lost at the bottom of our bag: lip balm, keys, headphones, mini perfume, tissues, jewellery. A printed pouch is the easiest way to keep everything together and easy to find.",
      "Our handmade printed pouch measures 24 × 20 cm – the perfect size to slip into a larger handbag or carry on its own. It is big enough for your phone, a small wallet and a few beauty essentials, but still slim and lightweight.",
      "Because it is handmade in Mauritius, each pouch has its own personality. Prints are chosen to reflect a modern island style – soft tones, tropical inspiration and chic details that make your everyday routine feel a little more special.",
      "At just Rs 175, it is a thoughtful gift for a friend, a colleague or yourself. Use it for work days, weekends, beach outings or as a small travel organiser inside your luggage."
    ].join("\n\n"),
    content_fr: [
      "On a toutes ces petites affaires qui se perdent au fond du sac : baume à lèvres, clés, écouteurs, mini-parfum, mouchoirs, bijoux… La pochette imprimée est la solution la plus simple pour tout garder ensemble et à portée de main.",
      "Notre pochette faite main mesure 24 × 20 cm – une taille idéale pour la glisser dans un cabas ou la porter seule. Elle est suffisamment grande pour accueillir votre téléphone, un petit porte-monnaie et quelques essentiels beauté, tout en restant fine et légère.",
      "Comme elle est fabriquée à la main à Maurice, chaque pochette a sa propre personnalité. Les imprimés sont choisis pour refléter un style insulaire moderne : teintes douces, inspiration tropicale et touches chic qui rendent votre quotidien un peu plus spécial.",
      "À seulement Rs 175, c’est une idée cadeau parfaite pour une amie, une collègue ou pour vous-même. Utilisez-la pour le boulot, le week-end, la plage ou comme organiseur de voyage dans votre valise."
    ].join("\n\n")
  },
  {
    slug: "ethnic-toiletry-bag-chic-travel",
    image: "/blog/toiletry-bag.jpg",
    title_en:
      "Ethnic chic toiletry bag – travel organised, Mauritian style",
    title_fr:
      "Trousse de toilette ethnique chic – voyager organisée, à la mauricienne",
    category_en: "Travel",
    category_fr: "Voyage",
    excerpt_en:
      "A roomy, sturdy toiletry bag with ethnic and animal-print patchwork – perfect for makeup, skincare and travel essentials.",
    excerpt_fr:
      "Une trousse de toilette spacieuse et résistante avec patchwork ethnique et animalier – idéale pour maquillage, soins et essentiels de voyage.",
    content_en: [
      "Whether you are going for a weekend at the coast or flying overseas, a good toiletry bag makes all the difference. No more bottles rolling around in your suitcase or makeup crushed between clothes.",
      "Our ethnic chic toiletry bag is 24 × 12 × 11 cm with a structured shape that stands on its own. It offers enough space for your skincare, makeup, toothbrush, hair accessories and more, while remaining compact enough to slip into a carry-on.",
      "The patchwork animal and ethnic motif adds a bold yet elegant touch that feels unique and fashion-forward. It is a small detail, but it completely elevates your bathroom shelf or travel bag.",
      "Made from quality fabric with a strong zip, this bag is designed to be used every day – not just kept for special trips. At Rs 200, it’s a durable accessory you will use for years."
    ].join("\n\n"),
    content_fr: [
      "Que vous partiez en week-end à la côte ou en voyage à l’étranger, une bonne trousse de toilette change tout. Fini les flacons qui se baladent dans la valise ou le maquillage écrasé entre deux vêtements.",
      "Notre trousse de toilette ethnique chic mesure 24 × 12 × 11 cm avec une forme structurée qui tient debout toute seule. Elle offre assez de place pour vos soins, votre maquillage, votre brosse à dents, vos accessoires cheveux et plus encore, tout en restant compacte pour entrer dans un bagage cabine.",
      "Le patchwork animalier et ethnique ajoute une touche audacieuse mais élégante, qui donne un vrai style à votre salle de bain ou à votre sac de voyage.",
      "Confectionnée dans un tissu de qualité avec une fermeture éclair solide, cette trousse est pensée pour être utilisée tous les jours, pas seulement pour les grandes vacances. À Rs 200, c’est un accessoire durable que vous garderez longtemps."
    ].join("\n\n")
  },
  {
    slug: "wide-headband-everyday-comfort",
    image: "/blog/wide-headband.jpg",
    title_en:
      "Wide headband – effortless everyday style with extra comfort",
    title_fr:
      "Bandeau large – du style au quotidien avec un confort total",
    category_en: "Hair Accessories",
    category_fr: "Accessoires cheveux",
    excerpt_en:
      "A soft, wide headband that holds your hair in place without tightness – perfect for busy days, gym sessions and casual outfits.",
    excerpt_fr:
      "Un bandeau large et doux qui maintient les cheveux sans serrer – idéal pour les journées chargées, le sport et les looks casual.",
    content_en: [
      "Some days you want your hair out of your face, but you still want to look put together. A wide headband is the easiest solution: slide it on and you instantly look more polished.",
      "Our wide headband is made from a soft, stretchy fabric that does not dig into your scalp. It is wide enough to cover the roots, tame baby hairs and secure protective styles, while remaining breathable and comfortable for all-day wear.",
      "It works with every texture – from coils and curls to straight blow-outs. Wear it with a high puff, a low bun, a wash-and-go or even under your favourite turban for extra protection at the hairline.",
      "Available in several colours, it becomes that accessory you reach for again and again: school run, office, errands, gym, café dates… At Rs 100, you can build a small collection to match all your outfits."
    ].join("\n\n"),
    content_fr: [
      "Certains jours, on veut juste dégager le visage tout en restant présentable. Le bandeau large est la solution la plus simple : on le glisse et, en quelques secondes, la coiffure semble plus nette.",
      "Notre bandeau large est confectionné dans un tissu doux et extensible qui ne fait pas mal au cuir chevelu. Sa largeur permet de couvrir les racines, discipliner les petits cheveux et sécuriser les coiffures protectrices, tout en restant respirant et confortable toute la journée.",
      "Il convient à toutes les textures – des boucles serrées aux cheveux lissés. Portez-le avec un puff, un chignon bas, un wash-and-go ou même sous votre turban préféré pour protéger la bordure.",
      "Disponible en plusieurs couleurs, il devient vite l’accessoire que vous attrapez tous les jours : école, bureau, courses, sport, sorties café… À Rs 100, vous pouvez vous constituer une petite collection assortie à vos tenues."
    ].join("\n\n")
  },
  {
    slug: "bonnet-turban-protective-style",
    image: "/blog/bonnet-turban.jpg",
    title_en:
      "Bonnet turban – chic protection for busy days and self-care nights",
    title_fr:
      "Bonnet turban – protection chic pour journées chargées et soirées cocooning",
    category_en: "Protective Style",
    category_fr: "Style protecteur",
    excerpt_en:
      "A ready-to-wear turban bonnet that combines style, comfort and hair protection – perfect for every moment of your routine.",
    excerpt_fr:
      "Un bonnet turban prêt à porter qui combine style, confort et protection des cheveux – idéal pour chaque moment de votre journée.",
    content_en: [
      "The bonnet turban is the perfect mix between a protective bonnet and a stylish turban. You get the look of a wrapped headpiece, without needing any tying skills.",
      "Made from a soft, stretchy fabric, it gently hugs the head without slipping. Wear it on self-care days while doing your skincare or masks, on lazy Sundays when you do not feel like styling your hair, or even out and about with a pair of earrings for a chic, effortless look.",
      "It helps reduce friction and keeps your hairstyle in place, whether you are protecting fresh twists, braids or a blow-out. It is also ideal for quick runs to the shop, school drop-off or video calls when you need to look presentable in seconds.",
      "At Rs 200 and in several trendy colours, it quickly becomes a favourite in your wardrobe – especially if you love low-maintenance, elegant looks."
    ].join("\n\n"),
    content_fr: [
      "Le bonnet turban est le parfait mélange entre le bonnet protecteur et le turban stylé. Vous obtenez l’effet d’un joli turban noué, sans avoir à faire de pliage compliqué.",
      "Confectionné dans un tissu doux et extensible, il épouse délicatement la tête sans glisser. Portez-le les jours de soin, pendant vos routines skincare ou vos masques, les dimanches chill où vous n’avez pas envie de coiffer vos cheveux, ou même en sortie avec de belles boucles d’oreilles pour un look chic sans effort.",
      "Il limite la friction et aide à maintenir la coiffure en place, que vous protégiez des twists, des tresses ou un brushing. C’est aussi l’allié idéal pour les petites sorties rapides, les trajets école ou les appels vidéo de dernière minute.",
      "À Rs 200 et décliné en plusieurs couleurs tendance, il devient vite un indispensable de votre garde-robe, surtout si vous aimez les looks élégants mais faciles à vivre."
    ].join("\n\n")
  },
  {
    slug: "large-bandeau-everyday-chic",
    image: "/blog/large-bandeau.jpg",
    title_en:
      "Large bandeau – the chic & comfy accessory for every hairstyle",
    title_fr:
      "Large bandeau – l’accessoire chic et confortable pour toutes vos coiffures",
    category_en: "Hair Accessories",
    category_fr: "Accessoires cheveux",
    excerpt_en:
      "A versatile large bandeau that works for sport, work and weekends – soft on the hair, strong on style.",
    excerpt_fr:
      "Un large bandeau polyvalent pour le sport, le travail et le week-end – doux pour les cheveux, fort en style.",
    content_en: [
      "The large bandeau is one of those accessories that can completely change a look with almost no effort. Slide it on and your ponytail, puff or loose curls instantly feel more intentional.",
      "Our version is wide, comfortable and made from a gentle fabric that does not rough up the hair cuticle. It sits securely without digging in, making it perfect for long days at the office, active days with the kids or a quick gym session.",
      "It is designed to suit all hair textures and head sizes, with enough stretch to adapt without feeling tight. You can wear it folded for a thinner look or fully open for maximum coverage.",
      "Because it is available in several colours and prints, you can mix and match with your outfits – neutral tones for minimal days, bold shades when you want your accessory to stand out. It is a small detail that gives a very polished, Mauritian-chic finish to your everyday style."
    ].join("\n\n"),
    content_fr: [
      "Le large bandeau fait partie de ces accessoires qui changent complètement un look sans demander beaucoup d’efforts. En quelques secondes, votre queue de cheval, votre puff ou vos boucles détachées paraissent plus travaillés.",
      "Notre modèle est large, confortable et réalisé dans un tissu doux qui respecte la fibre capillaire. Il tient bien en place sans serrer, ce qui le rend idéal pour de longues journées de travail, des journées actives avec les enfants ou une séance de sport.",
      "Il est pensé pour convenir à toutes les textures et tailles de tête, avec juste ce qu’il faut d’élasticité pour s’adapter sans comprimer. Vous pouvez le plier pour un effet plus fin ou le porter bien large pour une couverture maximale.",
      "Proposé en plusieurs couleurs et imprimés, il se marie facilement avec vos tenues : tons neutres pour les looks minimalistes, teintes plus vives quand vous voulez que l’accessoire soit la star. Un petit détail pour une finition très chic et très mauricienne au quotidien."
    ].join("\n\n")
  }
];
