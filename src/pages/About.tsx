import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { Zap, ArrowRight, Target, Users, Globe, Award, Heart, Sparkles } from "lucide-react";

const team = [
  { name: "Alex Chen", role: "CEO & Founder", initials: "AC" },
  { name: "Sarah Miller", role: "Head of AI", initials: "SM" },
  { name: "James Wilson", role: "Lead Engineer", initials: "JW" },
  { name: "Maya Patel", role: "Product Design", initials: "MP" },
];

const values = [
  { icon: Target, title: "Mission-Driven", description: "Making quality tech education accessible to everyone", color: "text-sage", bgColor: "bg-sage/10" },
  { icon: Heart, title: "User-First", description: "Every feature is designed with learners in mind", color: "text-terracotta", bgColor: "bg-terracotta/10" },
  { icon: Globe, title: "Global Impact", description: "Helping learners across 150+ countries succeed", color: "text-azure", bgColor: "bg-azure/10" },
  { icon: Award, title: "Excellence", description: "Committed to delivering the best learning experience", color: "text-gold", bgColor: "bg-gold/10" },
];

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "150+", label: "Countries" },
  { value: "1M+", label: "Lessons Completed" },
  { value: "95%", label: "Job Placement Rate" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-azure/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-grid-subtle bg-[size:60px_60px] opacity-40" />
        </div>

        <div className="container mx-auto relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="subtle" className="mb-6">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-azure" />
              Our Story
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium mb-6 tracking-tight">
              About <span className="text-gradient">EduForce AI</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We're on a mission to democratize tech education through AI,
              helping aspiring developers worldwide land their dream jobs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-serif text-4xl md:text-5xl font-medium text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 tracking-tight">
                Our Story
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  EduForce AI was born from a simple observation: too many talented people
                  struggle to break into tech because traditional learning paths are outdated,
                  expensive, or overwhelming.
                </p>
                <p>
                  Our founders, former engineers at top tech companies, experienced this firsthand.
                  They saw brilliant colleagues struggle with unfocused learning and missed
                  opportunities—not because of lack of talent, but because of lack of guidance.
                </p>
                <p>
                  That's why we built EduForce AI: an intelligent platform that understands
                  your goals, adapts to your learning style, and guides you every step of the
                  way—from your first line of code to your dream job offer.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card variant="elevated" className="p-8 md:p-10">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-lg">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-medium mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To make world-class tech education accessible to everyone,
                  regardless of their background or location, powered by AI that
                  truly understands each learner's unique journey.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">Our Values</h2>
            <p className="text-muted-foreground">What drives us every day</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card variant="default" className="h-full text-center p-6">
                  <CardContent className="pt-4">
                    <div className={`w-14 h-14 rounded-2xl ${value.bgColor} flex items-center justify-center mx-auto mb-6`}>
                      <value.icon className={`w-7 h-7 ${value.color}`} />
                    </div>
                    <h3 className="font-serif text-lg font-medium mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">Meet the Team</h2>
            <p className="text-muted-foreground">The people behind EduForce AI</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4 text-xl font-medium">
                  {member.initials}
                </div>
                <h3 className="font-medium mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl border border-border/50 shadow-elegant p-10 md:p-16 max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">Join Our Community</h2>
            <p className="text-lg text-muted-foreground mb-10">
              Become part of a global community of learners and start your journey today.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/auth">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 EduForce AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
