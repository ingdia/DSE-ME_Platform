import { Users, UserCheck, Award, TrendingUp } from 'lucide-react';
import StatCard from '@/components/ui/statuscard';
import { Participant } from '@/types/participant';

interface StatsCardsProps {
  participants: Participant[];
}

export default function StatsCards({ participants }: StatsCardsProps) {
  const totalParticipants = participants.length;
  const completedParticipants = participants.filter(p => p.status === "Completed").length;
  const avgScore = participants.filter(p => p.score).length > 0 
    ? Math.round(participants.filter(p => p.score).reduce((a,b)=>a+b.score!,0) / participants.filter(p=>p.score).length)
    : 0;
  const activeCohorts = new Set(participants.map(p => p.cohort)).size;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 mb-8">
      <StatCard 
        icon={<Users size={20} />} 
        title="Total Participants" 
        value={totalParticipants} 
        subtext={`+${Math.floor(totalParticipants * 0.1)} from last month`}
      />
      <StatCard 
        icon={<UserCheck size={20} />} 
        title="Completed" 
        value={completedParticipants} 
        subtext={`${Math.round((completedParticipants/totalParticipants)*100)}% completion rate`}
      />
      <StatCard 
        icon={<Award size={20} />} 
        title="Average Score" 
        value={`${avgScore}%`} 
        subtext="Target: 85%"
      />
      <StatCard 
        icon={<TrendingUp size={20} />} 
        title="Active Cohorts" 
        value={activeCohorts} 
        subtext="Currently running"
      />
    </div>
  );
}