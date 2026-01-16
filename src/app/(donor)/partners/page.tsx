"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Users, Award, DollarSign, Plus } from "lucide-react"
import StatCard from '@/components/ui/statuscard'

interface Partner {
  id: number
  name: string
  enrollment: number
  attendance: number
  employment: number
  gender_f: number
  disability: number
  status: string
  email?: string
  phone?: string
  address?: string
  region?: string
  programs?: number
  staff?: number
  branches?: Branch[]
}

interface Branch {
  id: string
  name: string
  city: string
  address: string
  manager: string
  phone: string
  email: string
  enrollment: number
  employment: number
  location?: string
  managerName?: string
  managerPhone?: string
  managerEmail?: string
}

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-sm border ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
)

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)

const Button = ({ children, onClick, variant = "default", size = "default", ...props }: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline"
  size?: "default" | "sm"
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded font-medium transition ${
      variant === "outline" 
        ? "border border-gray-300 text-gray-700 hover:bg-gray-50" 
        : "bg-blue-600 text-white hover:bg-blue-700"
    } ${
      size === "sm" ? "px-3 py-1 text-sm" : ""
    } ${props.className || ""}`}
    {...props}
  >
    {children}
  </button>
)

const partnersData = [
  { id: 1, name: "Tech Skills Academy", enrollment: 450, attendance: 92, employment: 87, gender_f: 210, disability: 18, status: "Active" },
  { id: 2, name: "Digital Future Initiative", enrollment: 380, attendance: 88, employment: 82, gender_f: 195, disability: 14, status: "Active" },
  { id: 3, name: "Youth Empowerment Center", enrollment: 520, attendance: 90, employment: 85, gender_f: 280, disability: 25, status: "Active" },
  { id: 4, name: "Enterprise Solutions Ltd", enrollment: 290, attendance: 89, employment: 80, gender_f: 140, disability: 12, status: "Active" },
  { id: 5, name: "Community Development Hub", enrollment: 410, attendance: 87, employment: 78, gender_f: 220, disability: 20, status: "Onboarding" },
]

const enrollmentTrend = [
  { month: "Jan", enrollments: 800, target: 900 },
  { month: "Feb", enrollments: 950, target: 900 },
  { month: "Mar", enrollments: 1200, target: 900 },
  { month: "Apr", enrollments: 1450, target: 1000 },
  { month: "May", enrollments: 1650, target: 1000 },
  { month: "Jun", enrollments: 2050, target: 1100 },
]

export default function PartnersPage() {
  const router = useRouter()
  const [addPartnerOpen, setAddPartnerOpen] = useState(false)
  const [partners, setPartners] = useState(partnersData)

  const handleAddPartner = (newPartner: Omit<Partner, 'id' | 'status'>) => {
    const partner = {
      id: Math.max(...partners.map((p) => p.id)) + 1,
      ...newPartner,
      email: newPartner.email || "",
      phone: newPartner.phone || "",
      address: newPartner.address || "",
      region: newPartner.region || "North America",
      programs: 0,
      staff: 0,
      branches: newPartner.branches || [],
      status: "Onboarding",
    }
    setPartners([...partners, partner])
  }

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Partner Organizations</h1>
        <p className="text-gray-600">Manage and monitor all partner organizations across the portfolio</p>
      </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <StatCard 
                icon={<Users size={32} />}
                title="Total Partners"
                value={partners.length}
                subtext="Active organizations"
              />
              <StatCard 
                icon={<TrendingUp size={32} />}
                title="Total Enrollments"
                value={partners.reduce((sum, partner) => sum + partner.enrollment, 0)}
                subtext="Across all partners"
              />
              <StatCard 
                icon={<Award size={32} />}
                title="Avg Attendance"
                value={`${Math.round(partners.reduce((sum, partner) => sum + partner.attendance, 0) / partners.length)}%`}
                subtext="Portfolio average"
              />
              <StatCard 
                icon={<DollarSign size={32} />}
                title="Avg Employment"
                value={`${Math.round(partners.reduce((sum, partner) => sum + partner.employment, 0) / partners.length)}%`}
                subtext="Job placement rate"
              />
            </div>

            {/* Enrollment Trend Chart */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Portfolio Enrollment Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={enrollmentTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="enrollments" stroke="#0B609D" strokeWidth={2} name="Actual Enrollments" />
                    <Line type="monotone" dataKey="target" stroke="#34597E" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Partners Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Partners Performance</CardTitle>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    onClick={() => setAddPartnerOpen(true)}
                  >
                    Add Partner
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Partner Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Enrollments</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Attendance</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Employment</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Female %</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">PwD</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {partners.map((partner) => (
                        <tr key={partner.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{partner.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{partner.enrollment}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{partner.attendance}%</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{partner.employment}%</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {Math.round((partner.gender_f / partner.enrollment) * 100)}%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{partner.disability}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${partner.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                              {partner.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <Button variant="outline" size="sm" onClick={() => router.push(`/donor/partners/${partner.id}`)}>
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

      {/* Add Partner Form Modal */}
      {addPartnerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Partner Organisation</h2> <br />
              <p className="block text-sm">Enter organization details and add their branches (optional - can be added later).</p>
              <button 
                onClick={() => setAddPartnerOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Tech Skills Academy"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="contact@org.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                      type="tel"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+250-XXX-XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <select 
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="North America"
                  >
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="South America">South America</option>
                  </select>
                </div>

                <div className="pt-4 border-t mt-4">
                  <h3 className="font-medium mb-4">Branches</h3>
                  <p className="text-sm text-gray-600 mb-4">You can add branches after saving the organization details.</p>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setAddPartnerOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Organization
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

function AddPartnerDialog({ open, onOpenChange, onAdd }: { open: boolean; onOpenChange: (open: boolean) => void; onAdd: (partner: any) => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", region: "North America" })
  const [branches, setBranches] = useState<Branch[]>([])
  const [showBranchForm, setShowBranchForm] = useState(false)
  const [branchData, setBranchData] = useState<Omit<Branch, 'id' | 'location' | 'managerName' | 'managerPhone' | 'managerEmail'>>({ name: "", city: "", address: "", manager: "", phone: "", email: "", enrollment: 0, employment: 0 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({ 
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      region: formData.region,
      branches: branches,
      enrollment: 0,
      attendance: 0,
      employment: 0,
      gender_f: 0,
      disability: 0
    })
    setFormData({ name: "", email: "", phone: "", address: "", region: "North America" })
    setBranches([])
    onOpenChange(false)
  }

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault()
    setBranches([...branches, { 
      ...branchData, 
      id: `branch-${Date.now()}`,
      location: branchData.city,
      managerName: branchData.manager,
      managerPhone: branchData.phone,
      managerEmail: branchData.email
    }])
    setBranchData({ name: "", city: "", address: "", manager: "", phone: "", email: "", enrollment: 0, employment: 0 })
    setShowBranchForm(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-2">Add New Partner Organization</h2>
        <p className="text-gray-600 mb-6">Enter organization details and add their branches (optional - can be added later).</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="font-medium mb-4">Organization</h3>
            <div className="space-y-4">
              <input type="text" placeholder="e.g., Klab (K-Lab Ltd)" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded-lg" required />
              <input type="email" placeholder="contact@org.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 border rounded-lg" />
              <input type="tel" placeholder="+250-XXX-XXX" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border rounded-lg" />
              <input type="text" placeholder="Street address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full p-3 border rounded-lg" />
              <select value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} className="w-full p-3 border rounded-lg">
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="South America">South America</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Branches ({branches.length})</h3>
              <button type="button" onClick={() => setShowBranchForm(true)} className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">Add New Branch</button>
            </div>
            {branches.length === 0 ? (
              <p className="text-gray-500 text-sm mb-4">No branches added yet</p>
            ) : (
              <div className="space-y-2 mb-4">
                {branches.map((branch, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded border">
                    <div className="font-medium">{branch.name}</div>
                    <div className="text-sm text-gray-600">{branch.city} • {branch.manager}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <button type="submit" className="px-6 py-2 rounded text-white font-medium bg-blue-600 hover:bg-blue-700">Create Partner</button>
          </div>
        </form>
      </div>
      
      {showBranchForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Branch</h3>
            <form onSubmit={handleAddBranch} className="space-y-4">
              <input type="text" placeholder="e.g., Klab Kigali" value={branchData.name} onChange={(e) => setBranchData({...branchData, name: e.target.value})} className="w-full p-3 border rounded-lg" required />
              <input type="text" placeholder="e.g., Kigali" value={branchData.city} onChange={(e) => setBranchData({...branchData, city: e.target.value})} className="w-full p-3 border rounded-lg" />
              <input type="text" placeholder="Full address" value={branchData.address} onChange={(e) => setBranchData({...branchData, address: e.target.value})} className="w-full p-3 border rounded-lg" />
              <input type="text" placeholder="Manager name" value={branchData.manager} onChange={(e) => setBranchData({...branchData, manager: e.target.value})} className="w-full p-3 border rounded-lg" />
              <input type="tel" placeholder="+250-XXX-XXX" value={branchData.phone} onChange={(e) => setBranchData({...branchData, phone: e.target.value})} className="w-full p-3 border rounded-lg" />
              <input type="email" placeholder="manager@org.com" value={branchData.email} onChange={(e) => setBranchData({...branchData, email: e.target.value})} className="w-full p-3 border rounded-lg" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="0" value={branchData.enrollment} onChange={(e) => setBranchData({...branchData, enrollment: parseInt(e.target.value) || 0})} className="p-3 border rounded-lg" />
                <input type="number" placeholder="0" value={branchData.employment} onChange={(e) => setBranchData({...branchData, employment: parseInt(e.target.value) || 0})} className="p-3 border rounded-lg" />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowBranchForm(false)}>Cancel</Button>
                <button type="submit" className="px-6 py-2 rounded text-white font-medium bg-blue-600 hover:bg-blue-700">Add Branch</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}