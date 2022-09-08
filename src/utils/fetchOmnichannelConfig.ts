const fetchOmnichannelConfig = () => {
  const omnichannelConfig = {
    // Default config
    orgId: "18e109bd-afd1-42bd-a111-ab1983f843fc",
    orgUrl:
      "https://unq18e109bdafd142bda111ab1983f84-crm4.omnichannelengagementhub.com",
    widgetId: "03f25f27-ba98-49c3-9a96-082b85e77f63"
  };

  const urlParams = new URLSearchParams(window.location.search);

  // Overrides default config if URL any param is found
  if (urlParams.get("orgUrl") !== null) {
    omnichannelConfig.orgUrl = urlParams.get("orgUrl")!;
  }

  if (urlParams.get("orgId") !== null) {
    omnichannelConfig.orgId = urlParams.get("orgId")!;
  }

  if (urlParams.get("widgetId") !== null) {
    omnichannelConfig.widgetId = urlParams.get("widgetId")!;
  }

  return omnichannelConfig;
};

export default fetchOmnichannelConfig;
