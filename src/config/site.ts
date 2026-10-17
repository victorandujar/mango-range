const SITE_NAME = "Mango Range";
const TITLE_PLACEHOLDER = "%s";

export const SITE_CONFIG = {
  name: SITE_NAME,
  description: "Custom Range component with normal and fixed values modes",
  language: "en",
  titlePlaceholder: TITLE_PLACEHOLDER,
  titleTemplate: `${TITLE_PLACEHOLDER} | ${SITE_NAME}`,
} as const;
