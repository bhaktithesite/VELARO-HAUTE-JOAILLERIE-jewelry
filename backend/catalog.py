"""VELARO's editorial sample collection. Prices and availability require concierge confirmation."""

def photo(identifier):
    return f"https://images.unsplash.com/{identifier}?auto=format&fit=crop&w=900&q=85"

GOLD = ["18K Yellow Gold", "Platinum / White Gold", "18K Rose Gold"]
RING = [5, 6, 7, 8, 9, 10, 11]
IMAGES = {
    "ring": photo("photo-1605100804763-247f67b3557e"),
    "pendant": photo("photo-1599643478518-a784e5dc4c8f"),
    "emerald": photo("photo-1603561591411-07134e71a2a9"),
    "drop": photo("photo-1515562141207-7a88fb7ce338"),
    "earring": photo("photo-1630019852942-f89202989a59"),
    "bridal": photo("photo-1742627032795-1dfb552448ce"),
    "bracelet": photo("photo-1663568675454-ecd65012d8f0"),
    "gold": photo("photo-1625792508553-5e66a81659fa"),
    "royal": photo("photo-1721103418312-b0057a8c31c2"),
    "heritage": photo("photo-1601121141499-17ae80afc03a"),
}

def piece(id, name, category, sub, price, original, rating, reviews, image, description, specs, metals=None, sizes=None, best=False, featured=False, gender="Women", edition="Signature"):
    return dict(id=id, name=name, category=category, subCategory=sub, price=price,
                originalPrice=original, rating=rating, reviewCount=reviews, image=IMAGES[image],
                description=description, specs=specs, metals=metals or GOLD,
                sizes=[str(s) for s in (sizes or RING)], isBestSeller=best,
                isFeatured=featured, gender=gender, edition=edition,
                stock=2 if featured else 4)

CATALOG = [
    piece("VEL-RN-101", "Floral Diamond Blossom Ring", "Rings", "Floral & Solitaire", 1299, 1450, 4.9, 128, "ring", "A stunning floral-inspired ring crafted in 18K solid gold, featuring brilliant round-cut diamonds that symbolize timeless blooming elegance.", "0.85 ct Total Diamond Weight • Clarity: VVS1 • Color: E–F • BIS Hallmarked", sizes=[5,6,7,8,9,10], best=True, featured=True),
    piece("VEL-PD-201", "Crossed Hearts Diamond Pendant", "Pendants", "Romantic Heritage", 895, 1050, 4.8, 94, "pendant", "Intricate filigree craftsmanship interlocking two eternal hearts with bezel-set pavé diamonds on an 18K gold Italian wheat chain.", "0.60 ct Diamond • 18K Hallmarked Gold • 4.2g Net Weight", metals=["18K Yellow Gold", "18K Rose Gold", "Platinum"], sizes=["16 inch chain", "18 inch chain"], best=True, featured=True),
    piece("VEL-ER-301", "Diamond Eternity Huggie Hoops", "Earrings", "Everyday Luxury", 899, 1100, 4.9, 110, "earring", "Seamless inside-out round brilliant diamond huggies with a secure luxury click closure. Designed for effortless radiance.", "1.10 ct Total Weight • French Pavé Setting • 18K Solid Gold", sizes=["12mm Diameter", "15mm Diameter"], best=True),
    piece("VEL-BR-501", "Duchess Brilliant Tennis Bracelet", "Bracelets", "Classic Tennis", 3850, 4200, 4.9, 88, "bracelet", "An unbroken stream of four-prong set round brilliant diamonds featuring our proprietary double-latch safety clasp.", "4.50 ct Total Diamond Weight • VS1 Clarity • 14.5g Platinum", metals=["Platinum / White Gold", "18K Yellow Gold"], sizes=["6.5 inch", "7.0 inch", "7.5 inch"], best=True, featured=True, gender="Unisex"),
    piece("VEL-RN-102", "Sacred Geometry Emerald-Cut Ring", "Rings", "Statement Rings", 2450, 2800, 5.0, 76, "emerald", "Inspired by ancient imperial geometry, featuring an exquisite 1.50 ct center stone embraced by tapered diamond baguettes in solid gold.", "1.50 ct Center Gem • 0.40 ct Baguettes • GIA Certified", metals=GOLD[:2], sizes=[6,7,8,9,10], best=True),
    piece("VEL-PD-202", "Classic Teardrop Solitaire Pendant", "Pendants", "Classic Drops", 699, 850, 4.9, 152, "drop", "A pure pear-shaped brilliant diamond suspended in a floating halo cage, catching ambient light with every subtle breath.", "0.75 ct Pear Diamond • VVS2 Clarity • GIA Certified", sizes=["16 inch chain", "18 inch chain", "20 inch chain"], featured=True),
    piece("VEL-NK-401", "The Imperial VELARO Royal Choker & Crown Suite", "Bridal", "Haute Joaillerie", 18500, 21000, 5.0, 31, "bridal", "A museum-grade master choker crafted with pigeon-blood rubies, cascading pear diamonds, and a matching heritage tiara. Made for your most unforgettable chapter.", "14.80 ct Unheated Rubies • 22.40 ct D–F Color Diamonds • BIS Certified", metals=["22K Imperial Gold", "Platinum & 18K Gold Hybrid"], sizes=["Bespoke Fitted Neck Collar"], featured=True, edition="Royal Heritage"),
    piece("VEL-RN-103", "The Sovereign Signet Ring", "Rings", "Men's Luxury", 1650, 1900, 4.8, 42, "emerald", "A heavyweight solid gold signet ring engraved with VELARO’s iconic diamond crest, flanked by satin-brushed shoulder facets.", "16.8g Solid 18K Gold • Hand-carved Monogram • Comfort Fit", metals=["18K Yellow Gold", "Platinum"], sizes=[8,9,10,11,12], gender="Men"),
    piece("VEL-RN-104", "The Empress Solitaire Ring", "Rings", "Solitaire Specials", 3450, 3800, 4.9, 67, "ring", "A remarkable round brilliant solitaire, lifted by six delicate claws to reveal its natural fire. A quiet declaration of forever.", "2.40 ct Round Brilliant • VVS1 Clarity • IGI Certified", featured=True, edition="Solitaire Specials"),
    piece("VEL-PD-203", "Celestial Lotus Royal Pendant", "Pendants", "Royal Heritage", 4850, 5200, 4.9, 38, "royal", "A ruby-centered lotus framed in finely articulated diamond petals, suspended from a handcrafted gold chain.", "1.80 ct Ruby • 1.20 ct Diamonds • 18K Gold", sizes=["16 inch chain", "18 inch chain"], edition="Royal Heritage"),
    piece("VEL-ER-302", "Lumière Diamond Studs", "Earrings", "Solitaire Specials", 1250, 1400, 4.9, 96, "earring", "Perfectly matched brilliant diamonds in an open gallery setting. Your everyday heirloom, made luminous.", "1.00 ct Pair • VS1 Clarity • IGI Certified", sizes=["Standard screw back"], best=True, edition="Solitaire Specials", gender="Unisex"),
    piece("VEL-BR-502", "The Serpentine Gold Cuff", "Bracelets", "Sculptural Gold", 2150, 2400, 4.8, 32, "bracelet", "A sinuous cuff with hand-burnished curves, finished with a discreet line of brilliant-cut diamonds.", "18.2g Solid Gold • 0.30 ct Diamonds • BIS Hallmarked", sizes=["Small · 15cm", "Medium · 17cm", "Large · 19cm"], edition="New Arrivals", gender="Unisex"),
    piece("VEL-NK-402", "Maharani Ruby Heritage Necklace", "Bridal", "Royal Heritage", 12800, 14000, 5.0, 24, "royal", "An opulent procession of ruby and pearl motifs, honoring the ceremonial jewels of India's royal courts.", "8.60 ct Rubies • Natural Pearls • 22K Gold", metals=["22K Imperial Gold"], sizes=["Bespoke fitted"], edition="Royal Heritage"),
    piece("VEL-RN-105", "Étoile Diamond Eternity Band", "Rings", "Solitaire Specials", 1850, 2100, 4.9, 82, "ring", "An uninterrupted constellation of diamonds encircles the finger. Beautiful alone, extraordinary together.", "1.25 ct Total Weight • F–G Color • VVS2 Clarity", edition="Solitaire Specials", gender="Unisex"),
    piece("VEL-PD-204", "Aurelia Golden Lariat", "Pendants", "Contemporary Classics", 1150, 1300, 4.8, 29, "gold", "Fluid golden links fall into a delicate lariat, bringing sculptural simplicity to the neckline.", "7.8g 18K Yellow Gold • Hand-polished Links", sizes=["18 inch chain", "20 inch chain"], edition="New Arrivals"),
    piece("VEL-ER-303", "Royal Chandbali Diamond Drops", "Earrings", "Royal Heritage", 4200, 4600, 4.9, 47, "heritage", "Crescent silhouettes, fine gold granulation, and luminous diamonds in a tribute to imperial adornment.", "2.80 ct Diamonds • 22K Gold • Hand-set", metals=["22K Imperial Gold"], sizes=["45mm drop"], edition="Royal Heritage"),
    piece("VEL-BR-503", "Petite Lumière Chain Bracelet", "Bracelets", "Everyday Luxury", 650, 750, 4.8, 56, "bracelet", "A single brilliant diamond sits between fine golden links. A little light for every day.", "0.20 ct Diamond • 3.1g 18K Gold", sizes=["6 inch", "6.5 inch", "7 inch"], edition="New Arrivals"),
    piece("VEL-MN-601", "The Regent Gold Cufflinks", "Men", "Men's Luxury", 1450, 1600, 4.9, 21, "emerald", "Architectural cufflinks with brushed gold faces and a subtle diamond accent. Distinction in the details.", "12.4g 18K Gold • 0.12 ct Diamond Pair", metals=["18K Yellow Gold", "Platinum"], sizes=["One size"], gender="Men", edition="New Arrivals"),
    piece("VEL-RN-106", "Rosée Pear Diamond Ring", "Rings", "Solitaire Specials", 2850, 3200, 5.0, 35, "ring", "A pear-shaped diamond rests in a soft rose-gold embrace. A silhouette as individual as the woman who wears it.", "1.50 ct Pear Diamond • VVS2 Clarity • GIA Certified", metals=["18K Rose Gold", "Platinum / White Gold", "18K Yellow Gold"], edition="Solitaire Specials"),
    piece("VEL-NK-403", "The Versailles Bridal Suite", "Bridal", "Haute Joaillerie", 24500, 27000, 5.0, 16, "bridal", "An exceptional necklace and earring suite in cascading diamond garlands, created for life's grandest entrance.", "18.50 ct Diamonds • Platinum • GIA Certified Center Stones", metals=["Platinum", "18K Yellow Gold"], sizes=["Bespoke fitted"], edition="Royal Heritage", featured=True),
]