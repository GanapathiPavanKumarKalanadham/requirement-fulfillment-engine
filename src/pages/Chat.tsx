import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Send,
  Sparkles,
  User,
  Bot,
  Lightbulb,
  Code2,
  Map,
  Briefcase,
  FileText,
  Youtube,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  { icon: Youtube, text: "Analyze a YouTube tutorial for me", category: "Video" },
  { icon: Map, text: "Create a learning roadmap for React", category: "Roadmap" },
  { icon: Code2, text: "Explain Big O notation with examples", category: "Code" },
  { icon: Briefcase, text: "Help me prepare for a backend interview", category: "Career" },
  { icon: FileText, text: "Review my resume for improvements", category: "Resume" },
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI learning assistant. I can help you with:\n\n• **Analyzing YouTube videos** - Share a link and I'll extract key insights\n• **Creating roadmaps** - Get personalized learning paths\n• **Explaining concepts** - From algorithms to system design\n• **Career guidance** - Interview prep and resume tips\n\nHow can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      roadmap: `Great question! Let me create a personalized roadmap for you.\n\n**React Learning Path:**\n\n1. **Fundamentals** (Week 1-2)\n   - JSX and Components\n   - Props and State\n   - Event Handling\n\n2. **Intermediate** (Week 3-4)\n   - Hooks (useState, useEffect)\n   - Context API\n   - Custom Hooks\n\n3. **Advanced** (Week 5-6)\n   - Performance Optimization\n   - State Management (Redux/Zustand)\n   - Testing with Jest\n\nWould you like me to add this to your roadmap dashboard?`,
      youtube: `I'd be happy to analyze a YouTube video for you! Just share the link and I'll:\n\n• Extract the transcript\n• Identify key concepts\n• Create study notes\n• Generate practice questions\n\nPlease paste the YouTube URL you'd like me to analyze.`,
      interview: `Excellent choice! Here's a structured approach to backend interview prep:\n\n**Technical Topics:**\n• Data Structures & Algorithms\n• System Design fundamentals\n• Database design and SQL\n• API design (REST/GraphQL)\n• Caching strategies\n\n**Practice Plan:**\n1. Solve 2-3 LeetCode problems daily\n2. Do one system design case study per week\n3. Build a side project using the tech stack\n\nWant me to generate some practice problems?`,
      default: `That's a great question! Let me help you with that.\n\nBased on your current progress and learning goals, I'd recommend focusing on:\n\n1. **Completing your current module** - You're 60% through Data Structures\n2. **Practicing with real problems** - Try the coding challenges in the Practice section\n3. **Building projects** - Apply what you learn in real-world scenarios\n\nWould you like more specific guidance on any of these areas?`,
    };

    const lowerInput = input.toLowerCase();
    let response = responses.default;
    if (lowerInput.includes("roadmap") || lowerInput.includes("react")) {
      response = responses.roadmap;
    } else if (lowerInput.includes("youtube") || lowerInput.includes("video")) {
      response = responses.youtube;
    } else if (lowerInput.includes("interview") || lowerInput.includes("prepare")) {
      response = responses.interview;
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-[calc(100vh-3rem)] flex flex-col gap-4"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              AI Assistant
            </h1>
            <p className="text-muted-foreground">Your personal learning companion</p>
          </div>
          <Badge variant="glow" className="gap-1">
            <Sparkles className="w-3 h-3" />
            Powered by AI
          </Badge>
        </motion.div>

        {/* Main Chat Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 flex flex-col"
          >
            <Card variant="glass" className="flex-1 flex flex-col overflow-hidden">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`flex gap-3 ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-xl px-4 py-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "glass"
                          }`}
                        >
                          <div className="text-sm whitespace-pre-wrap">
                            {message.content.split("\n").map((line, i) => (
                              <span key={i}>
                                {line.startsWith("**") && line.endsWith("**") ? (
                                  <strong>{line.slice(2, -2)}</strong>
                                ) : line.startsWith("• ") ? (
                                  <span className="block ml-2">{line}</span>
                                ) : (
                                  line
                                )}
                                {i < message.content.split("\n").length - 1 && <br />}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs opacity-50 mt-2 block">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        {message.role === "user" && (
                          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="glass rounded-xl px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                          <span
                            className="w-2 h-2 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <span
                            className="w-2 h-2 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask anything about learning, code, or careers..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                    className="flex-1"
                  />
                  <Button
                    variant="hero"
                    size="icon"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block"
          >
            <Card variant="glass" className="h-full">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-warning" />
                  Suggested Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedPrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => handlePromptClick(prompt.text)}
                    className="w-full text-left glass rounded-lg p-3 hover:border-primary/30 hover:glow-sm transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-2">
                      <prompt.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm">{prompt.text}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {prompt.category}
                        </Badge>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Chat;
