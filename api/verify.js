export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.body || {};

  if (!token) {
    return res.status(400).json({ error: "Missing reCAPTCHA token" });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    return res
      .status(500)
      .json({ error: "Server misconfiguration: missing secret key" });
  }

  try {
    const params = new URLSearchParams({ secret: secretKey, response: token });

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      },
    );

    const data = await response.json();

    return res.status(200).json({
      success: data.success,
      score: data.score,
      action: data.action,
      challenge_ts: data.challenge_ts,
      error_codes: data["error-codes"] || [],
    });
  } catch (err) {
    return res
      .status(502)
      .json({ error: "Failed to verify token with Google", detail: err.message });
  }
}
