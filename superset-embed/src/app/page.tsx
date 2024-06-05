"use client"
import Image from "next/image";

import axios from 'axios';
import { use, useEffect } from 'react';
import { embedDashboard } from "@superset-ui/embedded-sdk"


// An app that displays an embedded Superset dashboard
export default function Home() {
  const dashboard = {
    data: {
      dashboard_id: "1"
    }
  };
  // Load the Superset dashboard
  const loadDashboard = async () => {
    // Fetch the dashboard metadata
    const dashboardData = dashboard.data;
    // Embed the dashboard
    const container = document.getElementById("superset-container");

    useEffect(() => {
      const embed = async () => {
        await embedDashboard({
          id: dashboardData.dashboard_id,
          supersetDomain: "http://localhost:8088",
          mountPoint: container,
          fetchGuestToken: async () => {
            const token = await axios.get("/guest-token");
            return token.data;
          },
          dashboardUiConfig: {
            hideTitle: true,
            hideChartControls: true,
            hideTab: true
          },
        });
      }
      if (container) {
        embed();
      }

    }, []);
  }

  loadDashboard();
  return (
    <main className="">
      <h1 className="text-4xl font-bold text-center">Superset Dashboard</h1>
      <div className="flex justify-center" id="superset-container">

      </div>
    </main>
  );
}
