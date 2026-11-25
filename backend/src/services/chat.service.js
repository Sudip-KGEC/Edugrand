import { Scholarship } from "../models/Scholarship.js";
import { CATEGORIES, LEVELS } from "../models/constants.js";
import { env } from "../config/env.js";
import { escapeRegex } from "../utils/slugify.js";
import { generateReply } from "./gemini.service.js";

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

const cardFields = "title slug amountLabel deadline level country category";
const contextFields = `${cardFields} provider summary eligibility benefits`;

const has = (text, words) => words.some((word) => text.includes(word));

function reply(message, extra = {}) {
  return { reply: message, suggestions: SUGGESTIONS, scholarships: [], ...extra };
}

function openFilter(extra = {}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return { status: "active", deadline: { $gte: today }, ...extra };
}

function detect(text) {
  const levels = LEVELS.filter((level) => has(text, LEVEL_WORDS[level] || []));
  const categories = CATEGORIES.filter((category) => has(text, CATEGORY_WORDS[category] || []));
  const countries = COUNTRIES.filter((country) => text.includes(country.toLowerCase()));
  return { levels, categories, countries };
}

async function retrieve(text, fields, limit) {
  const { levels, categories, countries } = detect(text);
  const filter = openFilter();
  if (levels.length) filter.level = { $in: levels };
  if (categories.length) filter.category = { $in: categories };
  if (countries.length) filter.country = { $in: countries };

  let matched = Boolean(levels.length || categories.length || countries.length);
  if (!matched) {
    const words = text
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 2 && !STOPWORDS.has(word))
      .slice(0, 5);
    if (words.length) {
      filter.$or = words.flatMap((word) => {
        const pattern = new RegExp(escapeRegex(word), "i");
        return [{ title: pattern }, { provider: pattern }, { summary: pattern }];
      });
      matched = true;
    }
  }

  let items = matched ? await Scholarship.find(filter, fields).sort({ deadline: 1 }).limit(limit).lean() : [];
  if (!items.length) {
    matched = false;
    items = await Scholarship.find(openFilter(), fields).sort({ deadline: 1 }).limit(limit).lean();
  }
  return { items, matched };
}

async function closingSoon() {
  const items = await Scholarship.find(openFilter(), cardFields).sort({ deadline: 1 }).limit(4).lean();
  if (!items.length) return reply("There are no open scholarships right now. Please check back soon.");
  return reply("These scholarships have the nearest deadlines. Apply early to avoid last minute issues.", {
    scholarships: items,
  });
}

async function ruleAnswer(text) {
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

  const { items, matched } = await retrieve(text, cardFields, 4);
  if (matched && items.length) {
    return reply(`I found ${items.length} scholarship${items.length > 1 ? "s" : ""} that match. Open one to see eligibility and how to apply.`, {
      scholarships: items,
    });
  }
  return reply("I could not find an exact match. Try a level such as undergraduate or postgraduate, a country, or a category like women, merit or research.");
}

export async function answer(message, history = []) {
  const text = message.toLowerCase().trim();

  if (env.geminiApiKey) {
    try {
      const lastUser = [...history].reverse().find((turn) => turn.role === "user");
      const short = text.split(/\s+/).length <= 4;
      const searchText = short && lastUser ? `${lastUser.text.toLowerCase()} ${text}` : text;
      const { items, matched } = await retrieve(searchText, contextFields, 6);
      const result = await generateReply({ message, history, scholarships: items, matched });
      return {
        reply: result.reply,
        suggestions: result.suggestions.length ? result.suggestions : SUGGESTIONS,
        scholarships: result.showScholarships
          ? items.slice(0, 3).map(({ _id, title, slug, amountLabel, deadline, level, country, category }) => ({
              _id,
              title,
              slug,
              amountLabel,
              deadline,
              level,
              country,
              category,
            }))
          : [],
      };
    } catch (error) {
      console.error("Gemini unavailable, using rule based reply:", error.message);
    }
  }

  return ruleAnswer(text);
}