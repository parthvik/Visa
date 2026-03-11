"""
Mock Visa Card Data - Comprehensive benefits database for all Visa card tiers.
"""

CARD_TIERS = {
    "classic": {
        "id": "classic",
        "name": "Visa Classic",
        "tier": "Classic",
        "tagline": "Your everyday essential",
        "annual_fee": "$0",
        "color_primary": "#1A1F71",
        "color_secondary": "#4B5EAA",
        "gradient": "from-[#1A1F71] to-[#4B5EAA]",
        "benefits": [
            {
                "id": "classic_purchase_protection",
                "category": "Insurance",
                "title": "Purchase Protection",
                "description": "Covers eligible purchases against damage or theft for up to 90 days from the date of purchase. Maximum coverage of $500 per claim and $25,000 per cardholder per year.",
                "max_value": "$500/claim",
                "icon": "shield"
            },
            {
                "id": "classic_zero_liability",
                "category": "Security",
                "title": "Zero Liability Policy",
                "description": "You won't be held responsible for unauthorized charges made with your account or account information. Applies to purchases made in-store, over the phone, online, or via a mobile device.",
                "max_value": "Full coverage",
                "icon": "lock"
            },
            {
                "id": "classic_emergency_card",
                "category": "Travel",
                "title": "Emergency Card Replacement",
                "description": "If your card is lost or stolen while traveling, Visa will arrange for an emergency replacement card, typically within 1-3 business days, at no additional charge.",
                "max_value": "Free replacement",
                "icon": "credit-card"
            },
            {
                "id": "classic_roadside",
                "category": "Travel",
                "title": "Roadside Dispatch",
                "description": "Access to Visa's roadside dispatch service providing towing, tire changes, jump starts, lockout service, and fuel delivery referrals when you're stranded on the road.",
                "max_value": "Pay-per-use",
                "icon": "car"
            },
            {
                "id": "classic_atm",
                "category": "Convenience",
                "title": "Global ATM Access",
                "description": "Access cash at over 2 million Visa/Plus ATMs worldwide. Get local currency when traveling internationally with competitive exchange rates.",
                "max_value": "2M+ ATMs",
                "icon": "banknote"
            },
            {
                "id": "classic_offers",
                "category": "Shopping",
                "title": "Visa Offers & Deals",
                "description": "Exclusive discounts and cashback offers from popular retailers, restaurants, and entertainment venues. Simply use your Visa card and savings are applied automatically.",
                "max_value": "Up to 15% off",
                "icon": "tag"
            }
        ]
    },
    "gold": {
        "id": "gold",
        "name": "Visa Gold",
        "tier": "Gold",
        "tagline": "Elevated everyday rewards",
        "annual_fee": "$95",
        "color_primary": "#D4AF37",
        "color_secondary": "#AA8C2C",
        "gradient": "from-[#D4AF37] to-[#AA8C2C]",
        "benefits": [
            {
                "id": "gold_travel_insurance",
                "category": "Travel",
                "title": "Travel Accident Insurance",
                "description": "Provides coverage up to $250,000 for accidental death or dismemberment when the entire common carrier fare is charged to your Visa Gold card. Covers air, bus, train, and cruise travel.",
                "max_value": "$250,000",
                "icon": "plane"
            },
            {
                "id": "gold_lost_luggage",
                "category": "Travel",
                "title": "Lost Luggage Reimbursement",
                "description": "If your checked or carry-on luggage is lost or damaged by the common carrier, you can be reimbursed up to $3,000 per passenger for the value of the luggage and its contents.",
                "max_value": "$3,000",
                "icon": "luggage"
            },
            {
                "id": "gold_extended_warranty",
                "category": "Shopping",
                "title": "Extended Warranty Protection",
                "description": "Extends the manufacturer's warranty by up to one additional year on eligible purchases made with your Visa Gold card, for items with an existing warranty of 3 years or less.",
                "max_value": "+1 year",
                "icon": "clock"
            },
            {
                "id": "gold_purchase_protection",
                "category": "Insurance",
                "title": "Purchase Security",
                "description": "Protects most new purchases made with your Visa Gold card against theft or accidental damage for 90 days. Coverage up to $10,000 per claim with a maximum of $50,000 per year.",
                "max_value": "$10,000/claim",
                "icon": "shield"
            },
            {
                "id": "gold_dining",
                "category": "Dining",
                "title": "Dining Rewards",
                "description": "Earn 3x points at restaurants worldwide. Access exclusive dining experiences and reservation privileges at select partner restaurants in major cities.",
                "max_value": "3x points",
                "icon": "utensils"
            },
            {
                "id": "gold_concierge",
                "category": "Lifestyle",
                "title": "24/7 Concierge Service",
                "description": "Personal concierge service available around the clock to assist with travel bookings, restaurant reservations, event tickets, gift ideas, and more.",
                "max_value": "Unlimited",
                "icon": "headphones"
            },
            {
                "id": "gold_roadside",
                "category": "Travel",
                "title": "Roadside Assistance",
                "description": "Complimentary roadside assistance including towing up to 25 miles, tire changes, jump starts, lockout service, and emergency fuel delivery.",
                "max_value": "4 calls/year",
                "icon": "car"
            },
            {
                "id": "gold_zero_liability",
                "category": "Security",
                "title": "Zero Liability Protection",
                "description": "Complete protection against unauthorized transactions. If fraudulent charges appear on your account, you will not be held responsible for any unauthorized amount.",
                "max_value": "Full coverage",
                "icon": "lock"
            }
        ]
    },
    "platinum": {
        "id": "platinum",
        "name": "Visa Platinum",
        "tier": "Platinum",
        "tagline": "Premium privileges, refined living",
        "annual_fee": "$295",
        "color_primary": "#E5E4E2",
        "color_secondary": "#B0B0B0",
        "gradient": "from-[#E5E4E2] to-[#B0B0B0]",
        "benefits": [
            {
                "id": "platinum_travel_insurance",
                "category": "Travel",
                "title": "Comprehensive Travel Insurance",
                "description": "Up to $500,000 in travel accident insurance covering flights, trains, and cruises. Includes trip cancellation coverage up to $5,000 per trip and trip delay reimbursement.",
                "max_value": "$500,000",
                "icon": "plane"
            },
            {
                "id": "platinum_lounge",
                "category": "Travel",
                "title": "Airport Lounge Access",
                "description": "Complimentary access to over 1,000 airport lounges worldwide through the Visa Airport Companion program. Enjoy premium amenities including food, drinks, WiFi, and shower facilities.",
                "max_value": "6 visits/year",
                "icon": "armchair"
            },
            {
                "id": "platinum_hotel",
                "category": "Travel",
                "title": "Visa Luxury Hotel Collection",
                "description": "Exclusive perks at 900+ luxury hotels worldwide: automatic room upgrades, late checkout, complimentary breakfast, $25 spa/dining credit, and free WiFi.",
                "max_value": "$25+ credit/stay",
                "icon": "building"
            },
            {
                "id": "platinum_purchase",
                "category": "Insurance",
                "title": "Premium Purchase Protection",
                "description": "Protects purchases against damage or theft for 120 days. Coverage up to $25,000 per claim and $100,000 per cardholder per year.",
                "max_value": "$25,000/claim",
                "icon": "shield"
            },
            {
                "id": "platinum_warranty",
                "category": "Shopping",
                "title": "Extended Warranty",
                "description": "Doubles the manufacturer's warranty up to an additional 2 years on eligible purchases. Covers items with an original warranty up to 5 years.",
                "max_value": "+2 years",
                "icon": "clock"
            },
            {
                "id": "platinum_dining",
                "category": "Dining",
                "title": "Premium Dining Program",
                "description": "Earn 5x points at restaurants worldwide. Complimentary membership in exclusive dining networks with access to prix fixe menus, chef's tables, and wine pairing events.",
                "max_value": "5x points",
                "icon": "utensils"
            },
            {
                "id": "platinum_concierge",
                "category": "Lifestyle",
                "title": "Platinum Concierge",
                "description": "Dedicated Platinum concierge team available 24/7 for premium travel arrangements, exclusive event access, personal shopping, and bespoke experiences.",
                "max_value": "Dedicated team",
                "icon": "headphones"
            },
            {
                "id": "platinum_rental",
                "category": "Travel",
                "title": "Rental Car Insurance",
                "description": "Primary rental car collision damage waiver when you rent and pay with your Visa Platinum card. Covers damage and theft up to $75,000 MSRP.",
                "max_value": "$75,000",
                "icon": "car"
            },
            {
                "id": "platinum_emergency_med",
                "category": "Insurance",
                "title": "Emergency Medical Coverage",
                "description": "Up to $100,000 in emergency medical and dental coverage when traveling internationally. Includes medical evacuation and repatriation services.",
                "max_value": "$100,000",
                "icon": "heart-pulse"
            }
        ]
    },
    "signature": {
        "id": "signature",
        "name": "Visa Signature",
        "tier": "Signature",
        "tagline": "Curated experiences, exclusive access",
        "annual_fee": "$450",
        "color_primary": "#1A1F71",
        "color_secondary": "#0A0E45",
        "gradient": "from-[#0A0E45] to-[#1A1F71]",
        "benefits": [
            {
                "id": "sig_travel_insurance",
                "category": "Travel",
                "title": "Elite Travel Insurance Suite",
                "description": "Comprehensive travel protection including $1,000,000 in accident insurance, trip cancellation up to $10,000, trip interruption, baggage delay, and travel medical coverage up to $250,000.",
                "max_value": "$1,000,000",
                "icon": "plane"
            },
            {
                "id": "sig_lounge",
                "category": "Travel",
                "title": "Premium Lounge Access",
                "description": "Unlimited access to 1,300+ airport lounges worldwide including Priority Pass Select membership. Bring one guest free on each visit.",
                "max_value": "Unlimited + 1 guest",
                "icon": "armchair"
            },
            {
                "id": "sig_luxury_hotel",
                "category": "Travel",
                "title": "Signature Luxury Hotels",
                "description": "Best available rate guaranteed at 1,200+ luxury properties. Enjoy automatic upgrades, $50 property credit, complimentary breakfast, late checkout, and early check-in.",
                "max_value": "$50 credit/stay",
                "icon": "building"
            },
            {
                "id": "sig_entertainment",
                "category": "Entertainment",
                "title": "Signature Experiences",
                "description": "Exclusive access to premium events including VIP concert packages, sold-out sporting events, culinary festivals, and fashion weeks. Pre-sale tickets for major tours.",
                "max_value": "VIP access",
                "icon": "ticket"
            },
            {
                "id": "sig_shopping",
                "category": "Shopping",
                "title": "Signature Shopping Benefits",
                "description": "Earn 4x points on all purchases. Access to private sales, personal shopping services at luxury retailers, and complimentary gift wrapping at select stores.",
                "max_value": "4x points",
                "icon": "shopping-bag"
            },
            {
                "id": "sig_dining",
                "category": "Dining",
                "title": "Signature Dining Collection",
                "description": "Earn 6x points at restaurants. Exclusive access to chef's table experiences, wine country tours, and curated dining events. Complimentary appetizer or dessert at 200+ partner restaurants.",
                "max_value": "6x points",
                "icon": "utensils"
            },
            {
                "id": "sig_purchase",
                "category": "Insurance",
                "title": "Signature Purchase Protection",
                "description": "120-day protection against damage or theft for purchases. Coverage up to $50,000 per claim and $200,000 per year. Includes price protection for 60 days.",
                "max_value": "$50,000/claim",
                "icon": "shield"
            },
            {
                "id": "sig_wellness",
                "category": "Wellness",
                "title": "Wellness & Spa Access",
                "description": "Complimentary access to premium wellness programs, spa credits at luxury resorts, and discounted memberships at partner fitness clubs worldwide.",
                "max_value": "$200/year",
                "icon": "sparkles"
            },
            {
                "id": "sig_concierge",
                "category": "Lifestyle",
                "title": "Signature Lifestyle Manager",
                "description": "Dedicated lifestyle manager for personalized assistance with travel itineraries, event planning, luxury purchases, and exclusive experiences.",
                "max_value": "Dedicated manager",
                "icon": "headphones"
            }
        ]
    },
    "infinite": {
        "id": "infinite",
        "name": "Visa Infinite",
        "tier": "Infinite",
        "tagline": "Without limits, without compromise",
        "annual_fee": "$550",
        "color_primary": "#020617",
        "color_secondary": "#1E293B",
        "gradient": "from-[#020617] via-[#1A1F71] to-[#020617]",
        "benefits": [
            {
                "id": "inf_travel_insurance",
                "category": "Travel",
                "title": "Infinite Travel Protection",
                "description": "The most comprehensive travel insurance suite: $2,500,000 accident insurance, trip cancellation/interruption up to $25,000, baggage coverage up to $5,000, travel medical up to $500,000, and emergency evacuation with no limit.",
                "max_value": "$2,500,000",
                "icon": "plane"
            },
            {
                "id": "inf_lounge",
                "category": "Travel",
                "title": "Infinite Lounge Program",
                "description": "Unlimited access to 1,500+ airport lounges globally including first-class lounges. Bring up to 2 guests free. Includes spa services and private suites at select airports.",
                "max_value": "Unlimited + 2 guests",
                "icon": "armchair"
            },
            {
                "id": "inf_hotel",
                "category": "Travel",
                "title": "Infinite Luxury Collection",
                "description": "Access to 2,000+ ultra-luxury properties worldwide with automatic suite upgrades, $100 property credit per stay, complimentary breakfast, airport transfers, and late checkout.",
                "max_value": "$100 credit/stay",
                "icon": "building"
            },
            {
                "id": "inf_dining",
                "category": "Dining",
                "title": "Infinite Dining Privileges",
                "description": "Earn 10x points at restaurants globally. Exclusive access to Michelin-starred chef experiences, private vineyard tours, and reservation privileges at the world's most sought-after restaurants.",
                "max_value": "10x points",
                "icon": "utensils"
            },
            {
                "id": "inf_entertainment",
                "category": "Entertainment",
                "title": "Infinite Experiences",
                "description": "Ultra-exclusive access to global events: front-row concert seats, F1 paddock access, private museum tours, fashion week front row, and bespoke cultural experiences worldwide.",
                "max_value": "Ultra-exclusive",
                "icon": "ticket"
            },
            {
                "id": "inf_purchase",
                "category": "Insurance",
                "title": "Infinite Purchase Assurance",
                "description": "180-day purchase protection up to $100,000 per claim. Includes price protection, return protection for 90 days, and extended warranty up to 3 additional years.",
                "max_value": "$100,000/claim",
                "icon": "shield"
            },
            {
                "id": "inf_wellness",
                "category": "Wellness",
                "title": "Infinite Wellness Suite",
                "description": "Premium wellness program including annual health screening credits, luxury spa memberships, meditation app subscriptions, and access to exclusive wellness retreats.",
                "max_value": "$500/year",
                "icon": "sparkles"
            },
            {
                "id": "inf_concierge",
                "category": "Lifestyle",
                "title": "Infinite Lifestyle Concierge",
                "description": "Your personal Infinite concierge team available globally, 24/7. Handles everything from private jet charters and yacht rentals to impossible dinner reservations and rare item procurement.",
                "max_value": "Global 24/7 team",
                "icon": "headphones"
            },
            {
                "id": "inf_golf",
                "category": "Lifestyle",
                "title": "Golf & Country Club Access",
                "description": "Complimentary green fees at 1,000+ premium golf courses worldwide. Includes preferential tee times, equipment rental credits, and access to exclusive members-only clubs.",
                "max_value": "1,000+ courses",
                "icon": "flag"
            },
            {
                "id": "inf_rental",
                "category": "Travel",
                "title": "Premium Auto Benefits",
                "description": "Primary rental car coverage up to $100,000 MSRP. Includes luxury and exotic vehicle coverage. Complimentary Hertz President's Circle and Avis Chairman's Club status.",
                "max_value": "$100,000",
                "icon": "car"
            }
        ]
    }
}

SUPPORTED_LANGUAGES = [
    {"code": "en", "name": "English", "native": "English", "flag": "GB"},
    {"code": "es", "name": "Spanish", "native": "Espanol", "flag": "ES"},
    {"code": "fr", "name": "French", "native": "Francais", "flag": "FR"},
    {"code": "de", "name": "German", "native": "Deutsch", "flag": "DE"},
    {"code": "it", "name": "Italian", "native": "Italiano", "flag": "IT"},
    {"code": "pt", "name": "Portuguese", "native": "Portugues", "flag": "PT"},
    {"code": "hi", "name": "Hindi", "native": "Hindi", "flag": "IN"},
    {"code": "zh", "name": "Chinese (Simplified)", "native": "Zhongwen", "flag": "CN"},
    {"code": "ja", "name": "Japanese", "native": "Nihongo", "flag": "JP"},
    {"code": "ko", "name": "Korean", "native": "Hangugeo", "flag": "KR"},
    {"code": "ar", "name": "Arabic", "native": "Arabi", "flag": "SA"},
    {"code": "ru", "name": "Russian", "native": "Russkiy", "flag": "RU"},
    {"code": "th", "name": "Thai", "native": "Phasa Thai", "flag": "TH"},
    {"code": "vi", "name": "Vietnamese", "native": "Tieng Viet", "flag": "VN"},
    {"code": "tr", "name": "Turkish", "native": "Turkce", "flag": "TR"},
    {"code": "nl", "name": "Dutch", "native": "Nederlands", "flag": "NL"},
    {"code": "sv", "name": "Swedish", "native": "Svenska", "flag": "SE"},
    {"code": "pl", "name": "Polish", "native": "Polski", "flag": "PL"},
    {"code": "id", "name": "Indonesian", "native": "Bahasa Indonesia", "flag": "ID"},
    {"code": "ms", "name": "Malay", "native": "Bahasa Melayu", "flag": "MY"},
    {"code": "bn", "name": "Bengali", "native": "Bangla", "flag": "BD"},
    {"code": "ta", "name": "Tamil", "native": "Tamil", "flag": "IN"},
    {"code": "uk", "name": "Ukrainian", "native": "Ukrainska", "flag": "UA"},
    {"code": "he", "name": "Hebrew", "native": "Ivrit", "flag": "IL"},
    {"code": "fil", "name": "Filipino", "native": "Filipino", "flag": "PH"},
]

BENEFIT_CATEGORIES = [
    {"id": "all", "name": "All Benefits", "icon": "layers"},
    {"id": "Travel", "name": "Travel", "icon": "plane"},
    {"id": "Dining", "name": "Dining", "icon": "utensils"},
    {"id": "Shopping", "name": "Shopping", "icon": "shopping-bag"},
    {"id": "Insurance", "name": "Insurance", "icon": "shield"},
    {"id": "Security", "name": "Security", "icon": "lock"},
    {"id": "Lifestyle", "name": "Lifestyle", "icon": "sparkles"},
    {"id": "Entertainment", "name": "Entertainment", "icon": "ticket"},
    {"id": "Wellness", "name": "Wellness", "icon": "heart-pulse"},
    {"id": "Convenience", "name": "Convenience", "icon": "zap"},
]

CONTEXT_TRIGGERS = {
    "travel": {
        "keywords": ["flight", "hotel", "travel", "vacation", "trip", "airport", "booking"],
        "relevant_categories": ["Travel", "Insurance"],
        "message": "Planning a trip? Here are the travel benefits that matter most right now."
    },
    "dining": {
        "keywords": ["restaurant", "dinner", "lunch", "food", "dining", "eat", "reservation"],
        "relevant_categories": ["Dining", "Lifestyle"],
        "message": "Heading out to eat? Maximize your dining rewards with these benefits."
    },
    "shopping": {
        "keywords": ["buy", "purchase", "shop", "store", "online", "order", "deal"],
        "relevant_categories": ["Shopping", "Insurance"],
        "message": "Shopping? Here's how your card protects and rewards your purchases."
    },
    "entertainment": {
        "keywords": ["concert", "show", "movie", "event", "sports", "game", "ticket"],
        "relevant_categories": ["Entertainment", "Lifestyle"],
        "message": "Looking for entertainment? Check out these exclusive access benefits."
    },
    "wellness": {
        "keywords": ["spa", "gym", "health", "wellness", "fitness", "yoga", "meditation"],
        "relevant_categories": ["Wellness", "Lifestyle"],
        "message": "Focus on wellness? Your card includes these health and relaxation perks."
    }
}
