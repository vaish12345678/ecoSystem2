import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import ProductsList from "./ProductsList"; 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function RetailerDashboard() {
  const emissionsData = [
    { month: "Jan", emissions: 520 },
    { month: "Feb", emissions: 480 },
    { month: "Mar", emissions: 430 },
    { month: "Apr", emissions: 390 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">SustainX Retailer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-600">Total Products</p>
            <h2 className="text-2xl font-semibold">156</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-600">Avg Sustainability Score</p>
            <h2 className="text-2xl font-semibold">78</h2>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-600">This Month's Emissions</p>
            <h2 className="text-2xl font-semibold">432 kg CO₂</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-600">% Green Products</p>
            <h2 className="text-2xl font-semibold">62%</h2>
            <Progress value={62} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2">Carbon Emissions Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={emissionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis unit=" kg" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="emissions" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2">Top Sustainable Products</h3>
            <ul className="space-y-2">
              <li className="flex justify-between"><span>EcoBag</span><span>Score: 92</span></li>
              <li className="flex justify-between"><span>Organic T-Shirt</span><span>Score: 89</span></li>
              <li className="flex justify-between"><span>Paper Straw Pack</span><span>Score: 85</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="overview" className="mb-6">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="products">Products</TabsTrigger>
    <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
    <TabsTrigger value="badges">Badges</TabsTrigger>
  </TabsList>

  <div className="mt-4">
    <TabsTrigger value="overview">
      {/* you can place overview summary or leave empty */}
    </TabsTrigger>
    <TabsTrigger value="products">
      <ProductsList />
    </TabsTrigger>
  </div>
</Tabs>

      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">Recent Sustainability Achievements</h3>
          <ul className="list-disc list-inside text-green-600">
            <li>🌿 Reduced packaging waste by 20%</li>
            <li>🏅 Earned "Green Retailer" badge for 75% green products</li>
            <li>📉 Reduced monthly emissions by 15%</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}