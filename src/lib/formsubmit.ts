export const FORM_SUBMIT_TO = "kinopayment@outlook.com";

export async function submitToFormSubmit(
  payload: Record<string, string>,
): Promise<void> {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(FORM_SUBMIT_TO)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _captcha: "false",
        _template: "table",
        ...payload,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Could not send the form.");
  }

  const data = (await response.json()) as { success?: string };
  if (data.success !== "true") {
    throw new Error("Could not send the form.");
  }
}
