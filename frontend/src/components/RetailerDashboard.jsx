import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import ProductsList from "./ProductsList";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function RetailerDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/retailer", { withCredentials: true })

      .then((res) => {
        console.log("✅ Full dashboard response:", res.data.data); // <-- optional full log
        console.log("🟢 Top Products from backend:", res.data.data.topProducts); // <-- 👈 add this line
        setDashboard(res.data.data);
      })
      .catch((err) => console.error("Dashboard fetch failed", err));
  }, []);

  if (!dashboard)
    return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">
        🌿 SustainX Retailer Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-600">Total Products</p>
            <h2 className="text-2xl font-semibold">
              {dashboard.totalProducts}
            </h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-600">Avg Sustainability Score</p>
            <h2 className="text-2xl font-semibold">
              {dashboard.avgSustainabilityScore}
            </h2>
            <Progress
              value={dashboard.avgSustainabilityScore}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-600">Monthly Emissions</p>
            <h2 className="text-2xl font-semibold">
              {dashboard.thisMonthEmissions} kg CO₂
            </h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-600">% Green Products</p>
            <h2 className="text-2xl font-semibold">
              {dashboard.greenProductPercent}%
            </h2>
            <Progress value={dashboard.greenProductPercent} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Chart & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2">
              📉 Carbon Emissions Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboard.emissionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis unit=" kg" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-2">
            🏆 Top Sustainable Products
          </h2>
          {dashboard.topProducts.length === 0 ? (
            <p>No sustainable products found.</p>
          ) : (
            <ul className="space-y-2">
              {dashboard.topProducts.map((product, index) => (
                <li key={index} className="bg-green-100 p-2 rounded shadow">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{product.name}</span>
                    <span className="text-green-800 font-bold">
                      Score: {product.score}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Tabs Section */}
      <div className="mb-6">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            {/* Add conditional rendering or content as per tab value */}
            <ProductsList />
          </div>
        </Tabs>
      </div>

      {/* Achievements */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">
            🎉 Recent Sustainability Achievements
          </h3>
          <ul className="list-disc list-inside text-green-600 space-y-1">
            <li>🌱 Reduced packaging waste by 20%</li>
            <li>🏅 Earned "Green Retailer" badge</li>
            <li>📉 Lowered monthly emissions by 15%</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
