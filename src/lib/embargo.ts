export type RestrictedDestination = {
  code: string;
  label: string;
  aliases: string[];
};

export const restrictedDestinations: RestrictedDestination[] = [
  {
    code: "KP",
    label: "North Korea (Democratic People's Republic of Korea)",
    aliases: [
      "north korea",
      "dprk",
      "democratic people's republic of korea",
      "korea, democratic people's republic of",
    ],
  },
  {
    code: "IR",
    label: "Iran (Islamic Republic of)",
    aliases: [
      "iran",
      "iran (islamic republic of)",
      "islamic republic of iran",
      "iran, islamic republic of",
      "lran",
    ],
  },
  {
    code: "MM",
    label: "Myanmar",
    aliases: ["myanmar", "burma", "myanmar (burma)", "mlyanmar"],
  },
  {
    code: "RU",
    label: "Russia (Russian Federation)",
    aliases: ["russia", "russian federation"],
  },
  {
    code: "SY",
    label: "Syria (Syrian Arab Republic)",
    aliases: ["syria", "syrian arab republic"],
  },
  {
    code: "CU",
    label: "Cuba",
    aliases: ["cuba"],
  },
  {
    code: "SS",
    label: "South Sudan",
    aliases: ["south sudan"],
  },
  {
    code: "YE",
    label: "Yemen",
    aliases: ["yemen"],
  },
  {
    code: "HT",
    label: "Haiti",
    aliases: ["haiti"],
  },
  {
    code: "VE",
    label: "Venezuela",
    aliases: [
      "venezuela",
      "venezuela (bolivarian republic of)",
      "bolivarian republic of venezuela",
    ],
  },
  {
    code: "AF",
    label: "Afghanistan",
    aliases: ["afghanistan", "afgnanistan"],
  },
];

export const restrictedCodes = new Set(
  restrictedDestinations.map((item) => item.code),
);

export function isRestrictedCountry(code: string): boolean {
  return restrictedCodes.has(code);
}

export function restrictedLabelList(): string {
  return restrictedDestinations.map((item) => item.label).join("; ");
}
