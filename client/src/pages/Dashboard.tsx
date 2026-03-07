import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Search,
  Layers,
  Clock,
  Smartphone,
  Server,
  FileCode2,
  LogOut,
  Building2,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@shared/schema";

const typeIcons: Record<string, any> = {
  "Web App": <Layers className="text-indigo-400" />,
  "Mobile App": <Smartphone className="text-sky-400" />,
  "Backend API": <Server className="text-purple-400" />,
};

const statusColors: Record<string, string> = {
  "In Progress": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Planning: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  Maintained: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

function formatTimeAgo(date: string | Date) {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHrs < 24) return `${diffHrs} hr ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString("th-TH");
}

function getUserDisplayName(user: any) {
  if (user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`;
  if (user?.firstName) return user.firstName;
  if (user?.email) return user.email;
  return "Developer";
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", type: "Web App" });
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: { name: string; description: string; type: string }) => {
      const res = await apiRequest("POST", "/api/projects", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setShowCreateForm(false);
      setNewProject({ name: "", description: "", type: "Web App" });
      toast({ title: "Project created successfully" });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create project",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project deleted" });
    },
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;
    createMutation.mutate(newProject);
  };

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#111113] text-slate-200 p-8 flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="flex justify-between items-end mb-12">
          <div className="flex items-center gap-4">
            {user?.profileImageUrl && (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-indigo-500/30"
                data-testid="img-avatar"
              />
            )}
            <div>
              <h1
                data-testid="text-welcome"
                className="text-3xl font-bold text-white mb-2 tracking-tight"
              >
                Welcome back, {getUserDisplayName(user)}
              </h1>
              <p className="text-slate-400 text-sm">
                Select a project to continue building or start something new.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              data-testid="button-executive"
              className="bg-[#18181b] border-indigo-500/30 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10"
              onClick={() => setLocation("/executive")}
            >
              <Building2 size={16} className="mr-2" />
              C-Level Dashboard
            </Button>
            <Button
              variant="outline"
              data-testid="button-logout"
              className="bg-transparent border-[#27272a] text-slate-300 hover:text-white hover:bg-white/5"
              onClick={() => {
                window.location.href = "/api/logout";
              }}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
            <Button
              data-testid="button-create-project"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              onClick={() => setShowCreateForm(true)}
            >
              <Plus size={16} className="mr-2" />
              Create Project
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <Input
              data-testid="input-search"
              placeholder="Search projects..."
              className="w-full bg-[#18181b] border-[#27272a] text-white pl-10 rounded-xl focus-visible:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {showCreateForm && (
          <Card className="bg-[#18181b] border-[#27272a] mb-8 p-6">
            <form onSubmit={handleCreateProject} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Create New Project</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  data-testid="input-project-name"
                  placeholder="Project name"
                  className="bg-black/40 border-[#27272a] text-white"
                  value={newProject.name}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
                <select
                  data-testid="select-project-type"
                  className="bg-black/40 border border-[#27272a] text-white rounded-md px-3 py-2"
                  value={newProject.type}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, type: e.target.value }))}
                >
                  <option value="Web App">Web App</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Backend API">Backend API</option>
                </select>
              </div>
              <Input
                data-testid="input-project-description"
                placeholder="Project description"
                className="bg-black/40 border-[#27272a] text-white"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject((prev) => ({ ...prev, description: e.target.value }))
                }
                required
              />
              <div className="flex gap-3">
                <Button
                  type="submit"
                  data-testid="button-submit-project"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? "Creating..." : "Create Project"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#27272a] text-slate-300"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              data-testid="card-create-new"
              className="bg-[#18181b]/50 border-dashed border-2 border-[#27272a] hover:border-indigo-500/50 hover:bg-[#18181b] transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[200px]"
              onClick={() => setShowCreateForm(true)}
            >
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus size={24} className="text-indigo-400" />
              </div>
              <h3 className="text-white font-medium">Start from scratch</h3>
              <p className="text-slate-500 text-xs mt-1">Web, Mobile, or API</p>
            </Card>

            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                data-testid={`card-project-${project.id}`}
                className="bg-[#18181b] border-[#27272a] hover:border-[#3f3f46] transition-all cursor-pointer group flex flex-col min-h-[200px]"
                onClick={() => setLocation(`/editor/${project.id}`)}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                      {typeIcons[project.type] || <Layers className="text-indigo-400" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] px-2 py-1 rounded-full border ${statusColors[project.status] || statusColors["Planning"]}`}
                      >
                        {project.status}
                      </span>
                      <button
                        data-testid={`button-delete-${project.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/10 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMutation.mutate(project.id);
                        }}
                      >
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-auto">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                    <div className="flex items-center text-xs text-slate-500 gap-2">
                      <Clock size={12} />
                      {formatTimeAgo(project.updatedAt)}
                    </div>
                    <div className="flex items-center text-xs text-slate-500 gap-1.5 bg-white/5 px-2 py-1 rounded">
                      <FileCode2 size={12} />
                      {project.type}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
