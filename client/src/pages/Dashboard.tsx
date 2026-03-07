import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FolderKanban, Plus, Search, Layers, Clock, ArrowRight, Activity, Smartphone, Server, FileCode2, LogOut, UserCircle } from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState("Developer");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    setLocation("/login");
  };

  const projects = [
    {
      id: "proj-1",
      name: "Corporate SSO Integration",
      description: "ระบบยืนยันตัวตนรวมด้วย Azure AD สำหรับพนักงานทั้งหมด",
      updatedAt: "2 ชั่วโมงที่แล้ว",
      type: "Web App",
      status: "In Progress",
      icon: <Layers className="text-indigo-400" />
    },
    {
      id: "proj-2",
      name: "Customer Loyalty Dashboard",
      description: "Dashboard สำหรับให้ Partner ดูประวัติการใช้คะแนนสะสม",
      updatedAt: "1 วันที่แล้ว",
      type: "Web App",
      status: "Completed",
      icon: <Activity className="text-emerald-400" />
    },
    {
      id: "proj-3",
      name: "Sales Force Mobile",
      description: "แอปพนักงานขายสำหรับบันทึกข้อมูลลูกค้าตอนออกบูธ (Flutter)",
      updatedAt: "3 วันที่แล้ว",
      type: "Mobile App",
      status: "Planning",
      icon: <Smartphone className="text-sky-400" />
    },
    {
      id: "proj-4",
      name: "Core Banking Gateway API",
      description: "API Gateway สำหรับเชื่อมระบบเก่าเข้ากับ Microservices ใหม่",
      updatedAt: "1 สัปดาห์ที่แล้ว",
      type: "Backend API",
      status: "Maintained",
      icon: <Server className="text-purple-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#111113] text-slate-200 p-8 flex justify-center">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back, {userRole}</h1>
            <p className="text-slate-400 text-sm">Select a project to continue building or start something new.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              className="bg-[#18181b] border-indigo-500/30 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10"
              onClick={() => setLocation("/executive")}
            >
              <Building2 size={16} className="mr-2" />
              C-Level Dashboard
            </Button>
            <Button 
              variant="outline"
              className="bg-transparent border-[#27272a] text-slate-300 hover:text-white hover:bg-white/5"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              onClick={() => setLocation("/editor/new")}
            >
              <Plus size={16} className="mr-2" />
              Create Project
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <Input 
              placeholder="Search projects..." 
              className="w-full bg-[#18181b] border-[#27272a] text-white pl-10 rounded-xl focus-visible:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Card */}
          <Card 
            className="bg-[#18181b]/50 border-dashed border-2 border-[#27272a] hover:border-indigo-500/50 hover:bg-[#18181b] transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[200px]"
            onClick={() => setLocation("/editor/new")}
          >
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={24} className="text-indigo-400" />
            </div>
            <h3 className="text-white font-medium">Start from scratch</h3>
            <p className="text-slate-500 text-xs mt-1">Web, Mobile, or API</p>
          </Card>

          {/* Existing Projects */}
          {projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((project) => (
            <Card 
              key={project.id} 
              className="bg-[#18181b] border-[#27272a] hover:border-[#3f3f46] transition-all cursor-pointer group flex flex-col min-h-[200px]"
              onClick={() => setLocation(`/editor/${project.id}`)}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                    {project.icon}
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full border ${
                    project.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}>
                    {project.status}
                  </span>
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
                    {project.updatedAt}
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
      </div>
    </div>
  );
}