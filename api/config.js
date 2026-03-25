export default function handler(req, res) {
  const siteKey = process.env.RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return res
      .status(500)
      .json({ error: "Server misconfiguration: missing site key" });
  }

  res.setHeader("Cache-Control", "public, max-age=3600");
  return res.status(200).json({ siteKey });
}
