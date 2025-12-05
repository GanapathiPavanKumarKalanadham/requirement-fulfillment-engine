import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Search,
  Filter,
  Sparkles,
  ExternalLink,
  Heart,
  TrendingUp,
  Star,
} from "lucide-react";

const jobsData = [
  {
    id: 1,
    title: "Senior Backend Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$150K - $200K",
    type: "Full-time",
    remote: true,
    posted: "2 days ago",
    match: 95,
    skills: ["Python", "PostgreSQL", "FastAPI", "AWS"],
    description: "We're looking for a senior backend engineer to help build scalable APIs and microservices...",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$120K - $160K",
    type: "Full-time",
    remote: true,
    posted: "1 day ago",
    match: 88,
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    description: "Join our growing team to build innovative products that help millions of users...",
  },
  {
    id: 3,
    title: "Python Developer",
    company: "DataFlow Inc",
    location: "Austin, TX",
    salary: "$130K - $170K",
    type: "Full-time",
    remote: false,
    posted: "3 days ago",
    match: 92,
    skills: ["Python", "Django", "Redis", "Docker"],
    description: "Help us build data pipelines and APIs for our enterprise clients...",
  },
  {
    id: 4,
    title: "Software Engineer II",
    company: "BigTech Co",
    location: "Seattle, WA",
    salary: "$140K - $180K",
    type: "Full-time",
    remote: true,
    posted: "1 week ago",
    match: 85,
    skills: ["Python", "Go", "Kubernetes", "GCP"],
    description: "Work on distributed systems at scale serving millions of requests...",
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "FinanceApp",
    location: "Chicago, IL",
    salary: "$125K - $155K",
    type: "Full-time",
    remote: true,
    posted: "4 days ago",
    match: 78,
    skills: ["Python", "FastAPI", "PostgreSQL", "Redis"],
    description: "Build secure and reliable backend services for financial applications...",
  },
];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(jobsData[0]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRemote = !remoteOnly || job.remote;
    return matchesSearch && matchesRemote;
  });

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
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
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              Job Matches
            </h1>
            <p className="text-muted-foreground">AI-powered job recommendations based on your skills</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="glow" className="gap-1">
              <Sparkles className="w-3 h-3" />
              {filteredJobs.length} matches found
            </Badge>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 items-center"
        >
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select defaultValue="match">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Best Match</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="salary">Highest Salary</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Checkbox
              id="remote"
              checked={remoteOnly}
              onCheckedChange={(checked) => setRemoteOnly(checked as boolean)}
            />
            <Label htmlFor="remote" className="text-sm cursor-pointer">
              Remote only
            </Label>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-0">
          {/* Job List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 overflow-auto space-y-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    variant={selectedJob.id === job.id ? "glow" : "glass"}
                    className={`cursor-pointer ${
                      selectedJob.id === job.id ? "ring-1 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold">{job.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building2 className="w-3 h-3" />
                            {job.company}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-primary">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-bold">{job.match}%</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {job.salary}
                        </span>
                        {job.remote && <Badge variant="success" className="text-xs">Remote</Badge>}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Job Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card variant="glass" className="h-full overflow-auto">
              <CardHeader className="border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{selectedJob.title}</CardTitle>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {selectedJob.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedJob.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSaveJob(selectedJob.id)}
                      className={savedJobs.includes(selectedJob.id) ? "text-red-400" : ""}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          savedJobs.includes(selectedJob.id) ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    <Button variant="hero">
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Match Score */}
                <Card variant="glow" className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{selectedJob.match}%</span>
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        AI Match Score
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Your skills align strongly with this role
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Job Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="glass rounded-lg p-3">
                    <DollarSign className="w-5 h-5 text-green-400 mb-2" />
                    <p className="text-xs text-muted-foreground">Salary</p>
                    <p className="font-semibold">{selectedJob.salary}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <Briefcase className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="font-semibold">{selectedJob.type}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <MapPin className="w-5 h-5 text-warning mb-2" />
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-semibold">{selectedJob.remote ? "Remote" : "On-site"}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <Clock className="w-5 h-5 text-purple-400 mb-2" />
                    <p className="text-xs text-muted-foreground">Posted</p>
                    <p className="font-semibold">{selectedJob.posted}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-semibold mb-3">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill) => (
                      <Badge key={skill} variant="glow" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-3">About the Role</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedJob.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    As a {selectedJob.title} at {selectedJob.company}, you'll be working with
                    cutting-edge technologies to build scalable solutions. You'll collaborate with
                    cross-functional teams to deliver high-quality products that impact millions of
                    users.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button variant="hero" className="flex-1">
                    Apply Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline">Save for Later</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Jobs;
