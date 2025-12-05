import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Map,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  PlayCircle,
  Star,
} from "lucide-react";

const recentActivity = [
  { type: "completed", title: "Python Basics", time: "2 hours ago" },
  { type: "started", title: "Data Structures", time: "1 day ago" },
  { type: "submitted", title: "Two Sum Problem", time: "2 days ago" },
  { type: "matched", title: "3 New Job Matches", time: "3 days ago" },
];

const recommendedCourses = [
  { title: "Advanced Python", progress: 0, difficulty: "Intermediate" },
  { title: "System Design", progress: 0, difficulty: "Advanced" },
  { title: "API Development", progress: 0, difficulty: "Intermediate" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, Alex! 👋</h1>
            <p className="text-muted-foreground">Continue your learning journey where you left off.</p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/dashboard/roadmap">
              Continue Learning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="glow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Learning Streak
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">7 Days</div>
              <p className="text-sm text-muted-foreground">Keep it up! 🔥</p>
            </CardContent>
          </Card>

          <Card variant="glow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">12</div>
              <p className="text-sm text-muted-foreground">Modules this month</p>
            </CardContent>
          </Card>

          <Card variant="glow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Problems Solved
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">48</div>
              <p className="text-sm text-muted-foreground">+5 this week</p>
            </CardContent>
          </Card>

          <Card variant="glow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Job Matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">23</div>
              <p className="text-sm text-muted-foreground">New opportunities</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Progress */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card variant="glass" className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-primary" />
                  Current Roadmap Progress
                </CardTitle>
                <CardDescription>Backend Engineering Path</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span className="text-primary font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-5 h-5 text-primary" />
                      <span className="font-medium">Current Module</span>
                    </div>
                    <h3 className="text-lg font-semibold">Data Structures & Algorithms</h3>
                    <Progress value={60} className="h-2" />
                    <Button variant="glow" className="w-full" asChild>
                      <Link to="/dashboard/roadmap">Continue</Link>
                    </Button>
                  </div>

                  <div className="glass rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-warning" />
                      <span className="font-medium">Up Next</span>
                    </div>
                    <h3 className="text-lg font-semibold">System Design Basics</h3>
                    <Badge variant="locked">Locked</Badge>
                    <p className="text-sm text-muted-foreground">Complete current module to unlock</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" asChild>
                    <Link to="/dashboard/roadmap">View Full Roadmap</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/dashboard/chat">Ask AI for Help</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <Card variant="glass" className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === "completed" ? "bg-success/20" :
                        activity.type === "started" ? "bg-primary/20" :
                        activity.type === "submitted" ? "bg-purple-500/20" :
                        "bg-warning/20"
                      }`}>
                        {activity.type === "completed" && <CheckCircle2 className="w-4 h-4 text-success" />}
                        {activity.type === "started" && <PlayCircle className="w-4 h-4 text-primary" />}
                        {activity.type === "submitted" && <Code2 className="w-4 h-4 text-purple-400" />}
                        {activity.type === "matched" && <Briefcase className="w-4 h-4 text-warning" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/dashboard/practice">
              <Card variant="feature" className="cursor-pointer h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-3 group-hover:glow-sm transition-all">
                    <Code2 className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="font-medium">Practice Code</span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dashboard/chat">
              <Card variant="feature" className="cursor-pointer h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-3 group-hover:glow-sm transition-all">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-medium">AI Assistant</span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dashboard/jobs">
              <Card variant="feature" className="cursor-pointer h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center mb-3 group-hover:glow-sm transition-all">
                    <Briefcase className="w-6 h-6 text-warning" />
                  </div>
                  <span className="font-medium">Browse Jobs</span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dashboard/roadmap">
              <Card variant="feature" className="cursor-pointer h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3 group-hover:glow-sm transition-all">
                    <Map className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="font-medium">View Roadmap</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </motion.div>

        {/* Recommended */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCourses.map((course, index) => (
              <Card key={index} variant="feature">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="glow">{course.difficulty}</Badge>
                    <Badge variant="outline">New</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Start Learning</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
