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
        console.log("✅ Full dashboard response:", res.data.data);
        setDashboard(res.data.data);
      })
      .catch((err) => console.error("Dashboard fetch failed", err));
  }, []);

  if (!dashboard)
    return (
      <p className="text-center mt-10 text-[#8BC34A]">Loading dashboard...</p>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <h1 className="text-4xl font-bold mb-6 text-[#8BC34A]">
        🌿 SustainX Retailer Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Products",
            value: dashboard.totalProducts,
          },
          {
            label: "Avg Sustainability Score",
            value: dashboard.avgSustainabilityScore,
            progress: dashboard.avgSustainabilityScore,
          },
          {
            label: "Monthly Emissions",
            value: `${dashboard.thisMonthEmissions} kg CO₂`,
          },
          {
            label: "% Green Products",
            value: `${dashboard.greenProductPercent}%`,
            progress: dashboard.greenProductPercent,
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-lg rounded-xl border border-white/10"
          >
            <CardContent className="p-4">
              <p className="text-[#9E9E9E]">{item.label}</p>
              <h2 className="text-2xl font-bold text-[#8BC34A]">{item.value}</h2>
              {item.progress !== undefined && (
                <Progress
                  value={item.progress}
                  className="mt-2 bg-white/10"
                  indicatorColor="bg-gradient-to-r from-[#00C853] to-[#64dd17]"
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Emissions Chart */}
        <Card className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-lg rounded-xl border border-white/10">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-[#8BC34A] mb-2">
              📉 Carbon Emissions Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboard.emissionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis unit=" kg" stroke="#fff" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="#64dd17"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-lg rounded-xl border border-white/10 p-4">
          <h2 className="text-xl font-bold text-[#8BC34A] mb-2">
            🏆 Top Sustainable Products
          </h2>
          {dashboard.topProducts.length === 0 ? (
            <p className="text-[#E53935]">No sustainable products found.</p>
          ) : (
            <ul className="space-y-2">
              {dashboard.topProducts.map((product, index) => (
                <li
                  key={index}
                  className="bg-white/10 p-3 rounded shadow-sm flex justify-between items-center"
                >
                  <span className="font-semibold text-[#8BC34A]">
                    {product.name}
                  </span>
                  <span className="font-bold text-[#8BC34A]">
                    Score: {product.score}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Tabs Section */}
      <div className="mb-6">
        <Tabs defaultValue="overview">
          <TabsList className="bg-white/10 backdrop-blur-md border border-white/10">
            {["overview", "products", "suppliers", "badges"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="text-[#8BC34A] data-[state=active]:bg-gradient-to-r from-[#00C853] to-[#64dd17] data-[state=active]:text-white"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4">
            <ProductsList />
          </div>
        </Tabs>
      </div>

      {/* Achievements */}
      <Card className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-lg rounded-xl border border-white/10">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-[#8BC34A] mb-4">
            🎉 Recent Sustainability Achievements
          </h3>
          <ul className="list-disc list-inside text-[#8BC34A] space-y-1">
            <li>🌱 Reduced packaging waste by 20%</li>
            <li>🏅 Earned "Green Retailer" badge</li>
            <li>📉 Lowered monthly emissions by 15%</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
