const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = import.meta.env.VITE_JUDGE0_API_KEY || "demo";

const languageMap: Record<string, number> = {
  python: 71,
  python3: 71,
  javascript: 63,
  java: 62,
  cpp: 54,
  "c++": 54,
  csharp: 51,
  "c#": 51,
  go: 60,
  rust: 73,
  typescript: 74,
};

export interface CodeExecutionResult {
  status: string;
  output: string | null;
  stderr: string | null;
  compile_output: string | null;
  time: string;
  memory: string;
}

export async function executeCode(
  code: string,
  language: string,
  stdin?: string
): Promise<CodeExecutionResult> {
  const languageId = languageMap[language.toLowerCase()] || languageMap.python;

  try {
    const submitResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=false`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": JUDGE0_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: code,
        stdin: stdin || "",
      }),
    });

    if (!submitResponse.ok) {
      throw new Error(`Judge0 submission error: ${submitResponse.statusText}`);
    }

    const submitData = await submitResponse.json();
    const submissionToken = submitData.token;

    if (!submissionToken) {
      throw new Error("No submission token received");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const resultResponse = await fetch(
      `${JUDGE0_API_URL}/submissions/${submissionToken}?base64_encoded=false`,
      {
        headers: {
          "X-RapidAPI-Key": JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    if (!resultResponse.ok) {
      throw new Error(`Judge0 result error: ${resultResponse.statusText}`);
    }

    const resultData = await resultResponse.json();

    return {
      status: resultData.status?.description || "Unknown",
      output: resultData.stdout || null,
      stderr: resultData.stderr || null,
      compile_output: resultData.compile_output || null,
      time: resultData.time?.toString() || "0",
      memory: resultData.memory?.toString() || "0",
    };
  } catch (error) {
    console.error("Error executing code:", error);
    throw error;
  }
}
