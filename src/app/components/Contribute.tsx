import { motion } from "motion/react";
import { Globe, BookOpen, Microscope } from "lucide-react";
import { InstallBlock } from "./InstallBlock";

const CONTRIBUTE_INSTALL_CMD = "npx skills add fkb032/code-passport/contribute-codepassport";
const CONTRIBUTE_SKILL_URL = "https://raw.githubusercontent.com/fkb032/code-passport/main/skills/contribute-codepassport/SKILL.md";
const CONTRIBUTE_FALLBACK = ""; // Will fetch from GitHub
const CONTRIBUTE_PREVIEW_LINES = [
  { divider: true },
  { key: "name", value: "contribute-codepassport" },
  { key: "description", value: "Contribute market knowledge to" },
  { indent: true, text: "Code Passport via a guided walkthrough." },
  { key: "user-invocable", value: "true" },
  { divider: true },
  { heading: true, text: "# /contribute-codepassport - Market Knowledge Contribution" },
  { text: "Share your market expertise through a guided" },
  { text: "walkthrough covering payments, trust, UX, and more..." },
];

const MODES = [
  {
    icon: <Globe className="w-5 h-5 text-indigo-500" />,
    title: "New market",
    description:
      "Know a market well? Walk through all 8 sections (payments, trust, UX, and more) to create a new knowledge file from scratch.",
  },
  {
    icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
    title: "Update existing",
    description:
      "Fill gaps in a market that already exists. The skill shows you what's covered and focuses your time on what's missing.",
  },
  {
    icon: <Microscope className="w-5 h-5 text-indigo-500" />,
    title: "Domain expert",
    description:
      "Specialist in payments, compliance, or RTL? Contribute your domain expertise across multiple markets at once.",
  },
];

export function Contribute() {
  return (
    <section
      id="contribute"
      className="py-24 bg-slate-50 border-t border-slate-200/50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            Contribute market knowledge
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500"
          >
            Code Passport is open source and community-driven. If you've built products for a specific market,
            your experience makes the audits better for everyone.
          </motion.p>
        </div>

        {/* Contribution modes */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {MODES.map((mode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4">
                {mode.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {mode.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {mode.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Install block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <InstallBlock
            installCmd={CONTRIBUTE_INSTALL_CMD}
            skillUrl={CONTRIBUTE_SKILL_URL}
            fallbackContent={CONTRIBUTE_FALLBACK}
            fileLabel="Contribute skill file"
            previewLines={CONTRIBUTE_PREVIEW_LINES}
          />
          <p className="text-sm text-slate-500 mt-6 leading-relaxed text-center max-w-lg">
            You don't need to be an expert on everything. Skip sections and let others fill in the gaps.
          </p>
          <a
            href="https://github.com/fkb032/code-passport/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors mt-3"
          >
            Read the contributing guide &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
