import { useState } from "react";
import { Layout } from "@/components/Layout/Layout";
import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Settings } from "@/components/Settings/Settings";
import { Tracking } from "@/components/Tracking/Tracking";
import { Tasks } from "@/components/Tasks/Tasks";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "tracking" && <Tracking />}
      {activeTab === "task" && <Tasks />}
      {activeTab === "settings" && <Settings />}
    </Layout>
  );
}

export default App;
