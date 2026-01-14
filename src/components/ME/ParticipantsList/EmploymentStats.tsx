import { Briefcase, UserPlus, TrendingUp, Users } from 'lucide-react';
import StatCard from '@/components/ui/statuscard';
import { Participant } from '@/types/participant';

interface EmploymentStatsProps {
  participants: Participant[];
}

export default function EmploymentStats({ participants }: EmploymentStatsProps) {
  const employmentStats = {
    employed: participants.filter(p => p.employment === "Employed").length,
    selfEmployed: participants.filter(p => p.employment === "Self-Employed").length,
    unemployed: participants.filter(p => p.employment === "Unemployed").length,
    students: participants.filter(p => p.employment === "Student").length
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        icon={<Briefcase size={20} />} 
        title="Employed" 
        value={employmentStats.employed} 
        subtext="Full-time positions"
      />
      <StatCard 
        icon={<UserPlus size={20} />} 
        title="Self-Employed" 
        value={employmentStats.selfEmployed} 
        subtext="Independent workers"
      />
      <StatCard 
        icon={<TrendingUp size={20} />} 
        title="Unemployed" 
        value={employmentStats.unemployed} 
        subtext="Seeking employment"
      />
      <StatCard 
        icon={<Users size={20} />} 
        title="Students" 
        value={employmentStats.students} 
        subtext="Currently studying"
      />
    </div>
  );
}