import { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Code2,
  FileText,
  Lightbulb,
  Send,
} from "lucide-react";

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
    ],
    starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Your code here
    pass

# Test your solution
print(two_sum([2, 7, 11, 15], 9))`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
    ],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: 's = "()"', output: "true", explanation: "The brackets are properly closed." },
    ],
    starterCode: `def is_valid(s: str) -> bool:
    # Your code here
    pass

# Test your solution
print(is_valid("()[]{}"))`,
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
    ],
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    difficulty: "Medium",
    description: "Merge two sorted linked lists and return it as a sorted list.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "The two lists are merged in sorted order." },
    ],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(l1: ListNode, l2: ListNode) -> ListNode:
    # Your code here
    pass`,
    testCases: [],
  },
];

const Practice = () => {
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [code, setCode] = useState(selectedProblem.starterCode);
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);

  const handleRunCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("");
    setTestResults([]);

    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock output
    setOutput(`>>> Running ${selectedProblem.title}...
>>> Test Case 1: [2, 7, 11, 15], target=9
>>> Output: [0, 1]
>>> Expected: [0, 1]
>>> ✓ Passed

>>> Test Case 2: [3, 2, 4], target=6
>>> Output: [1, 2]
>>> Expected: [1, 2]
>>> ✓ Passed

All test cases passed! 🎉`);

    setTestResults([
      { passed: true, message: "Test Case 1 passed" },
      { passed: true, message: "Test Case 2 passed" },
    ]);

    setIsRunning(false);
  }, [selectedProblem]);

  const handleReset = () => {
    setCode(selectedProblem.starterCode);
    setOutput("");
    setTestResults([]);
  };

  const handleProblemChange = (problemId: string) => {
    const problem = problems.find((p) => p.id.toString() === problemId);
    if (problem) {
      setSelectedProblem(problem);
      setCode(problem.starterCode);
      setOutput("");
      setTestResults([]);
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-3rem)] flex flex-col gap-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <Code2 className="w-6 h-6 text-primary" />
            <Select value={selectedProblem.id.toString()} onValueChange={handleProblemChange}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {problems.map((problem) => (
                  <SelectItem key={problem.id} value={problem.id.toString()}>
                    {problem.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge
              variant={
                selectedProblem.difficulty === "Easy"
                  ? "success"
                  : selectedProblem.difficulty === "Medium"
                  ? "warning"
                  : "destructive"
              }
            >
              {selectedProblem.difficulty}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button variant="hero" size="sm" onClick={handleRunCode} disabled={isRunning}>
              {isRunning ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Code
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
          {/* Problem Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-h-0"
          >
            <Card variant="glass" className="h-full overflow-hidden flex flex-col">
              <Tabs defaultValue="description" className="flex-1 flex flex-col">
                <TabsList className="mx-4 mt-4 w-fit">
                  <TabsTrigger value="description" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="hints" className="gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Hints
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="flex-1 overflow-auto p-4 pt-2">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">{selectedProblem.title}</h2>
                    <p className="text-muted-foreground">{selectedProblem.description}</p>

                    <div className="space-y-3">
                      <h3 className="font-semibold">Examples:</h3>
                      {selectedProblem.examples.map((example, index) => (
                        <div key={index} className="glass rounded-lg p-4 space-y-2">
                          <div>
                            <span className="text-xs text-muted-foreground">Input:</span>
                            <pre className="text-sm font-mono mt-1">{example.input}</pre>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">Output:</span>
                            <pre className="text-sm font-mono mt-1">{example.output}</pre>
                          </div>
                          {example.explanation && (
                            <div>
                              <span className="text-xs text-muted-foreground">Explanation:</span>
                              <p className="text-sm mt-1">{example.explanation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="hints" className="flex-1 overflow-auto p-4 pt-2">
                  <div className="space-y-3">
                    <Card variant="glow" className="p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Hint 1</h4>
                          <p className="text-sm text-muted-foreground">
                            Think about using a hash map to store the values you've seen.
                          </p>
                        </div>
                      </div>
                    </Card>
                    <Card variant="glow" className="p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Hint 2</h4>
                          <p className="text-sm text-muted-foreground">
                            For each element, check if target - element exists in your map.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>

          {/* Code Editor and Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4 min-h-0"
          >
            {/* Editor */}
            <Card variant="glass" className="flex-1 overflow-hidden min-h-0">
              <div className="h-full">
                <Editor
                  height="100%"
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    fontFamily: "JetBrains Mono, monospace",
                    minimap: { enabled: false },
                    padding: { top: 16, bottom: 16 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    lineNumbersMinChars: 3,
                  }}
                />
              </div>
            </Card>

            {/* Output Terminal */}
            <Card variant="glass" className="h-48 overflow-hidden">
              <CardHeader className="py-2 px-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Output</CardTitle>
                  {testResults.length > 0 && (
                    <div className="flex items-center gap-2">
                      {testResults.every((r) => r.passed) ? (
                        <Badge variant="success" className="gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          All Passed
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <XCircle className="w-3 h-3" />
                          Failed
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-45px)] overflow-auto">
                <pre className="p-4 font-mono text-sm terminal-text whitespace-pre-wrap">
                  {output || "Click 'Run Code' to execute your solution..."}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Practice;
