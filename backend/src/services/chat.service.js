import { Scholarship } from "../models/Scholarship.js";
import { CATEGORIES, LEVELS } from "../models/constants.js";
import { escapeRegex } from "../utils/slugify.js";

const LEVEL_WORDS = {
  School: ["school", "class 10", "class 12", "10th", "12th", "secondary", "high school"],
  Diploma: ["diploma", "polytechnic", "iti", "vocational"],
  Undergraduate: ["undergraduate", "bachelor", "btech", "b.tech", "bsc", "b.sc", "ba ", "bcom", "degree", "ug "],
  Postgraduate: ["postgraduate", "master", "mtech", "m.tech", "msc", "mba", "pg "],
  PhD: ["phd", "doctoral", "doctorate", "research scholar"],
};

const CATEGORY_WORDS = {
  Merit: ["merit", "topper", "marks", "academic"],
  "Need-based": ["need", "income", "poor", "financial", "low income"],
  Women: ["women", "woman", "girl", "female"],
  Minority: ["minority", "sc", "st", "obc", "tribal"],
  Sports: ["sport", "athlete", "athletics"],
  Research: ["research", "fellowship"],
  Government: ["government", "govt", "state", "central"],
  International: ["abroad", "international", "overseas", "foreign"],
  STEM: ["stem", "engineering", "science", "technology", "math", "computer"],
};

const COUNTRIES = ["India", "USA", "UK", "Canada", "Germany", "Australia", "Global"];

const STOPWORDS = new Set([
  "the", "and", "for", "with", "any", "are", "there", "show", "find", "me", "i", "a", "an", "of", "to", "in", "on",
  "scholarship", "scholarships", "need", "want", "looking", "get", "can", "what", "which", "that", "have", "please",
]);

const SUGGESTIONS = ["Closing soon", "Undergraduate scholarships", "Scholarships for women", "How do I apply?"];

const projection = "title slug amountLabel deadline level country category";

const has = (text, words) => words.some((word) => text.includes(word));

function reply(message, extra = {}) {
  return { reply: message, suggestions: SUGGESTIONS, scholarships: [], ...extra };
}

function openFilter(extra = {}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return { status: "active", deadline: { $gte: today }, ...extra };
}

async function closingSoon() {
  const items = await Scholarship.find(openFilter(), projection).sort({ deadline: 1 }).limit(4).lean();
  if (!items.length) return reply("There are no open scholarships right now. Please check back soon.");
  return reply("These scholarships have the nearest deadlines. Apply early to avoid last minute issues.", {
    scholarships: items,
  });
}

function detect(text) {
  const levels = LEVELS.filter((level) => has(text, LEVEL_WORDS[level] || []));
  const categories = CATEGORIES.filter((category) => has(text, CATEGORY_WORDS[category] || []));
  const countries = COUNTRIES.filter((country) => text.includes(country.toLowerCase()));
  return { levels, categories, countries };
}

async function search(text) {
  const { levels, categories, countries } = detect(text);
  const filter = openFilter();
  if (levels.length) filter.level = { $in: levels };
  if (categories.length) filter.category = { $in: categories };
  if (countries.length) filter.country = { $in: countries };

  const hasFilter = levels.length || categories.length || countries.length;
  if (!hasFilter) {
    const words = text
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 2 && !STOPWORDS.has(word))
      .slice(0, 5);
    if (!words.length) return null;
    filter.$or = words.flatMap((word) => {
      const pattern = new RegExp(escapeRegex(word), "i");
      return [{ title: pattern }, { provider: pattern }, { summary: pattern }];
    });
  }

  const items = await Scholarship.find(filter, projection).sort({ deadline: 1 }).limit(4).lean();
  if (!items.length) return null;
  return reply(`I found ${items.length} scholarship${items.length > 1 ? "s" : ""} that match. Open one to see eligibility and how to apply.`, {
    scholarships: items,
  });
}

export async function answer(message) {
  const text = message.toLowerCase().trim();

  if (/^(hi|hello|hey|hii|namaste|good (morning|afternoon|evening))\b/.test(text)) {
    return reply("Hi! I am the EduGrand assistant. Tell me your course level, country or category and I will find matching scholarships.");
  }
  if (has(text, ["deadline", "closing", "last date", "soon", "urgent", "expire"])) return closingSoon();
  if (has(text, ["document", "certificate", "paper", "proof"])) {
    return reply("Most scholarships ask for an ID proof, your latest mark sheets, an income certificate for need-based awards, a bank passbook and a passport size photo. Each scholarship page lists its exact documents.");
  }
  if (has(text, ["how to apply", "how do i apply", "apply", "application", "process"])) {
    return reply("Applying is simple: 1) Find a scholarship and check eligibility. 2) Keep your documents ready. 3) Press Apply Now on the scholarship page to reach the official application. 4) Submit before the deadline and save your acknowledgement.");
  }
  if (has(text, ["eligib", "qualify", "who can"])) {
    return reply("Eligibility depends on the scholarship. It usually covers your course level, marks, family income, category and country. Open any scholarship page to see its exact criteria, or tell me your profile and I will suggest matches.");
  }
  if (has(text, ["contact", "support", "human", "email", "help desk"])) {
    return reply("You can reach our team from the Contact page and we usually reply within two working days.");
  }
  if (has(text, ["free", "cost", "fee", "charge", "price"])) {
    return reply("EduGrand is free for students. We never charge for browsing or applying. Be careful of anyone asking for money to give you a scholarship.");
  }
  if (has(text, ["thank", "thanks", "bye"])) {
    return reply("You are welcome! Best of luck with your applications.");
  }

  const found = await search(text);
  if (found) return found;
  return reply("I could not find an exact match. Try a level such as undergraduate or postgraduate, a country, or a category like women, merit or research.");
}
