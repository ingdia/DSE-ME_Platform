import { Building2, Users, TrendingUp, AlertTriangle, CheckCircle, Heart } from "lucide-react";
import { type Partner } from "@/types/partners";
import { calculatePercentage, safeAverage } from "@/utils/calculations";
import StatCard from "@/components/ui/statuscard";

interface PartnersStatsProps {
  partners: Partner[];
}

export default function PartnersStats({ partners }: PartnersStatsProps) {
  const activePartners = partners.filter(p => p.status === 'Active');
  const totalParticipants = partners.reduce((sum, p) => sum + p.totalParticipants, 0);
  const totalActive = partners.reduce((sum, p) => sum + p.activeParticipants, 0);
  const totalCompleted = partners.reduce((sum, p) => sum + p.completedParticipants, 0);
  const avgEmploymentRate = activePartners.length > 0 
    ? safeAverage(activePartners.map((p) => p.employmentRate))
    : 0;
  const avgDropoutRate = activePartners.length > 0 
    ? safeAverage(activePartners.map((p) => p.dropoutRate))
    : 0;
  const totalDisabilityParticipants = partners.reduce((sum, p) => sum + p.participantsWithDisability, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard 
        icon={<Building2 size={20} />} 
        title="Active Partners" 
        value={activePartners.length} 
        subtext={`${partners.length} total`}
      />
      <StatCard 
        icon={<Users size={20} />} 
        title="Total Participants" 
        value={totalParticipants.toLocaleString()} 
        subtext={`${totalActive} currently active`}
      />
      <StatCard 
        icon={<CheckCircle size={20} />} 
        title="Employment Rate" 
        value={`${Math.round(avgEmploymentRate)}%`} 
        subtext="Average across partners"
      />
      <StatCard 
        icon={<AlertTriangle size={20} />} 
        title="Dropout Rate" 
        value={`${Math.round(avgDropoutRate * 10) / 10}%`} 
        subtext="Program average"
      />
      <StatCard 
        icon={<TrendingUp size={20} />} 
        title="Completion Rate" 
        value={`${calculatePercentage(totalCompleted, totalParticipants)}%`} 
        subtext={`${totalCompleted.toLocaleString()} completed`}
      />
      <StatCard 
        icon={<Heart size={20} />} 
        title="Disability Inclusion" 
        value={totalDisabilityParticipants} 
        subtext={`${calculatePercentage(totalDisabilityParticipants, totalParticipants)}% of participants`}
      />
    </div>
  );
}