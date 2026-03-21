import {
  FiMic,
  FiBookOpen,
  FiUsers,
  FiHelpCircle,
  FiMap,
  FiTrendingUp
} from "react-icons/fi";

import { GlowingEffect } from "./GlowingEffect";

export default function FeaturesGrid() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-3 xl:grid-rows-2">

      <FeatureItem
        area="md:col-span-6 xl:col-span-4"
        icon={<FiMic />}
        title="Speak from Day 1"
        description="Every class includes active speaking practice so you start communicating immediately."
      />

      <FeatureItem
        area="md:col-span-6 xl:col-span-4"
        icon={<FiBookOpen />}
        title="Grammar Made Logical"
        description="Understand patterns and structures clearly instead of memorising random rules."
      />

      <FeatureItem
        area="md:col-span-6 xl:col-span-4"
        icon={<FiUsers />}
        title="Small Focused Batches"
        description="Limited students per batch to ensure personal attention and direct feedback."
      />

      <FeatureItem
        area="md:col-span-6 xl:col-span-4"
        icon={<FiHelpCircle />}
        title="Weekly Doubt Sessions"
        description="Dedicated weekly sessions only for clearing doubts and strengthening concepts."
      />

      <FeatureItem
        area="md:col-span-6 xl:col-span-4"
        icon={<FiMap />}
        title="Real-Life Scenarios"
        description="Practice situations like doctor visits, offices, interviews and daily conversations."
      />

      <FeatureItem
        area="md:col-span-6 xl:col-span-4"
        icon={<FiTrendingUp />}
        title="Confidence Training"
        description="Build fluency, reduce hesitation and gain the confidence to speak naturally."
      />

    </ul>
  );
}

const FeatureItem = ({ area, icon, title, description }) => {
  return (
    <li className={`min-h-[8rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-neutral-800 bg-white/5 backdrop-blur-md p-2 md:rounded-3xl">

        {/* Glow Effect */}
        <GlowingEffect
          spread={70}
          glow
          disabled={false}
          proximity={80}
          inactiveZone={0.05}
        />

        {/* Content */}
        <div className="relative flex h-full flex-col gap-4 rounded-xl p-4">

          {/* Icon + Title */}
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-neutral-700 bg-[#1a1a1a] p-2 text-white text-base">
              {icon}
            </div>

            <h3 className="text-base font-semibold text-neutral-100 md:text-lg">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs text-neutral-400 md:text-sm leading-relaxed">
            {description}
          </p>

        </div>
      </div>
    </li>
  );
};