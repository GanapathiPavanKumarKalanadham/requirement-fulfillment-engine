import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Zap, Menu, X, User, LogOut, Settings, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const initials = user?.email?.slice(0, 2).toUpperCase() || "U";
  const avatarUrl = user?.user_metadata?.avatar_url || profile?.avatar_url;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center glow-sm group-hover:glow transition-all duration-300">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">EduForce AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : user ? (
            <>
              <Button variant="ghost" asChild><Link to="/dashboard">Dashboard</Link></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src={avatarUrl || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild><Link to="/dashboard/profile" className="gap-2"><User className="w-4 h-4" />Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/dashboard/settings" className="gap-2"><Settings className="w-4 h-4" />Settings</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="gap-2 text-destructive"><LogOut className="w-4 h-4" />Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="hero" asChild><Link to="/auth">Get Started</Link></Button>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      {isMenuOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden glass border-b border-border/50">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/features" className="py-2">Features</Link>
            <Link to="/pricing" className="py-2">Pricing</Link>
            <Link to="/about" className="py-2">About</Link>
            <div className="pt-4 border-t border-border">
              {user ? (
                <Button variant="outline" className="w-full" asChild><Link to="/dashboard">Dashboard</Link></Button>
              ) : (
                <Button variant="hero" className="w-full" asChild><Link to="/auth">Get Started</Link></Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
