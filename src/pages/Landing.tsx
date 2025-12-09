import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import {
  ArrowRight,
  Brain,
  Code2,
  Briefcase,
  Youtube,
  FileText,
  Map,
  Sparkles,
  CheckCircle2,
  Zap,
  Play,
  BookOpen,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Youtube,
    title: "AI Video Analysis",
    description: "Extract knowledge from any YouTube video with AI-powered transcript analysis.",
    color: "text-terracotta",
    bgColor: "bg-terracotta/10",
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    description: "Upload PDFs and resumes. Our AI understands complex document layouts.",
    color: "text-azure",
    bgColor: "bg-azure/10",
  },
  {
    icon: Map,
    title: "Dynamic Roadmaps",
    description: "Get personalized learning paths generated based on your goals.",
    color: "text-sage",
    bgColor: "bg-sage/10",
  },
  {
    icon: Code2,
    title: "Code Practice",
    description: "Secure sandbox with Monaco Editor. Practice in Python, JavaScript & more.",
    color: "text-lavender",
    bgColor: "bg-lavender/10",
  },
  {
    icon: Briefcase,
    title: "Smart Job Matching",
    description: "AI-powered semantic matching connects you with perfect opportunities.",
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    icon: Brain,
    title: "AI Career Assistant",
    description: "Personalized advice, interview prep, and career guidance powered by AI.",
    color: "text-azure",
    bgColor: "bg-azure/10",
  },
];

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "1M+", label: "Videos Analyzed" },
  { value: "95%", label: "Job Match Rate" },
  { value: "24/7", label: "AI Support" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4">
        {/* Subtle background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-sage/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-azure/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-grid-subtle bg-[size:60px_60px] opacity-40" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge variant="subtle" className="mb-8">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-sage" />
                AI-Powered Learning Platform
              </Badge>
            </motion.div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium mb-8 leading-[1.1] tracking-tight">
              Master Skills.
              <br />
              <span className="text-gradient">Land Jobs.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              EduForce AI transforms how you learn software development. Analyze videos, 
              generate personalized roadmaps, practice coding, and get matched with your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/dashboard">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/features" className="group">
                  <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  See How It Works
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              {/* Floating cards preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Video Analysis Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="md:mt-8"
                >
                  <Card variant="elevated" className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center mb-4">
                      <Youtube className="w-6 h-6 text-terracotta" />
                    </div>
                    <h3 className="font-serif text-lg font-medium mb-2">Video Analysis</h3>
                    <div className="space-y-3">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1.5, delay: 1 }}
                          className="h-full bg-gradient-to-r from-terracotta to-gold rounded-full"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">Processing: 85%</p>
                    </div>
                  </Card>
                </motion.div>

                {/* Roadmap Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Card variant="elevated" className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center mb-4">
                      <Map className="w-6 h-6 text-sage" />
                    </div>
                    <h3 className="font-serif text-lg font-medium mb-4">Your Roadmap</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Python Basics</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-sage flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                        </div>
                        <span className="text-sm font-medium">Data Structures</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-muted" />
                        <span className="text-sm text-muted-foreground">Algorithms</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Code Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="md:mt-8"
                >
                  <Card variant="elevated" className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-lavender/10 flex items-center justify-center mb-4">
                      <Code2 className="w-6 h-6 text-lavender" />
                    </div>
                    <h3 className="font-serif text-lg font-medium mb-4">Code Practice</h3>
                    <div className="font-mono text-sm bg-muted/50 rounded-xl p-4 text-foreground/80">
                      <div><span className="text-lavender">def</span> solve(n):</div>
                      <div className="pl-4"><span className="text-azure">return</span> n * 2</div>
                      <div className="mt-2 text-success text-xs">✓ All tests passed</div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border/50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="font-serif text-4xl md:text-5xl font-medium text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <Badge variant="subtle" className="mb-4">
              <Target className="w-3.5 h-3.5 mr-1.5 text-azure" />
              Features
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 tracking-tight">
              Everything You Need to{" "}
              <span className="text-gradient">Succeed</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete platform designed to take you from learning to landing your dream job.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card variant="feature" className="h-full p-8">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage/5 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card rounded-3xl md:rounded-[2rem] border border-border/50 shadow-elegant p-10 md:p-16 text-center max-w-4xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6 tracking-tight">
              Ready to Transform Your Career?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Join thousands of learners who are already using EduForce AI to accelerate their journey into tech.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/dashboard">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-border/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-medium">EduForce AI</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link to="/privacy" className="link-underline hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="link-underline hover:text-foreground transition-colors">Terms</Link>
              <Link to="/contact" className="link-underline hover:text-foreground transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 EduForce AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
