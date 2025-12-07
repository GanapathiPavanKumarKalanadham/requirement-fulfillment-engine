import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: { id: number; description: string };
  time: string | null;
  memory: number | null;
}

const languageMap: Record<string, number> = {
  python: 71, javascript: 63, java: 62, cpp: 54, c: 50, typescript: 74, ruby: 72, go: 60, rust: 73,
};

export function useCodeExecution() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  const executeCode = async (language: string, sourceCode: string): Promise<ExecutionResult | null> => {
    const languageId = languageMap[language.toLowerCase()];
    if (!languageId) { toast.error(`Language "${language}" is not supported`); return null; }

    setIsRunning(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('execute-code', {
        body: { source_code: sourceCode, language_id: languageId },
      });

      if (error) { console.error('Execution error:', error); toast.error('Failed to execute code'); return null; }
      setResult(data);
      return data;
    } catch (err) { console.error('Execution error:', err); toast.error('Failed to execute code'); return null; }
    finally { setIsRunning(false); }
  };

  const formatOutput = (result: ExecutionResult | null): string => {
    if (!result) return '';
    const parts: string[] = [];
    if (result.compile_output) parts.push(`Compilation:\n${result.compile_output}`);
    if (result.stderr) parts.push(`Error:\n${result.stderr}`);
    if (result.stdout) parts.push(`Output:\n${result.stdout}`);
    if (result.status) parts.push(`\nStatus: ${result.status.description}`);
    if (result.time && result.memory) parts.push(`Time: ${result.time}s | Memory: ${(result.memory / 1024).toFixed(2)} MB`);
    return parts.join('\n\n');
  };

  return { isRunning, result, executeCode, formatOutput };
}
