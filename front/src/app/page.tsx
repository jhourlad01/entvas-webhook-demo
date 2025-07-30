'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Analytics, Timeline, TrendingUp } from '@mui/icons-material';
import StatsCard from '@/components/dashboard/StatsCard';
import EventsPerMinuteChart from '@/components/dashboard/EventsPerMinuteChart';
import TopEventTypes from '@/components/dashboard/TopEventTypes';
import TimeFilter, { TimeRange } from '@/components/dashboard/TimeFilter';

// Generate live data for demonstration
const generateLiveData = () => {
  const now = new Date();
  const data = [];
  
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000); // Each minute
    data.push({
      timestamp: time.toISOString(),
      count: Math.floor(Math.random() * 50) + 10, // Random count between 10-60
    });
  }
  
  return data;
};

const generateTopEventTypes = () => {
  const types = ['page_view', 'button_click', 'form_submit', 'api_call', 'error_log'];
  const total = Math.floor(Math.random() * 1000) + 2000;
  
  return types.map((type, index) => {
    const count = Math.floor(Math.random() * (total * 0.4)) + 50;
    return {
      type,
      count,
      percentage: (count / total) * 100,
    };
  }).sort((a, b) => b.count - a.count).slice(0, 5);
};

export default function Home() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('24h');
  const [totalEvents, setTotalEvents] = useState(2770);
  const [eventsThisMinute, setEventsThisMinute] = useState(23);
  const [activeUsers, setActiveUsers] = useState(156);
  const [successRate, setSuccessRate] = useState(98.5);
  const [chartData, setChartData] = useState(generateLiveData());
  const [topEventTypes, setTopEventTypes] = useState(generateTopEventTypes());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update stats
      setEventsThisMinute(prev => prev + Math.floor(Math.random() * 5));
      setTotalEvents(prev => prev + Math.floor(Math.random() * 10));
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
      setSuccessRate(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      
      // Update chart data
      setChartData(prev => {
        const newData = [...prev.slice(1)]; // Remove oldest point
        const now = new Date();
        newData.push({
          timestamp: now.toISOString(),
          count: Math.floor(Math.random() * 50) + 10,
        });
        return newData;
      });
      
      // Update top event types
      setTopEventTypes(generateTopEventTypes());
    }, 3000); // Update every 3 seconds for more live feel

    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Real-Time Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor live events and analytics with real-time updates
        </Typography>
      </Box>

      {/* Time Filter */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Box sx={{ flex: 1, maxWidth: 400 }}>
          <TimeFilter
            selectedRange={selectedTimeRange}
            onRangeChange={setSelectedTimeRange}
          />
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <StatsCard
          title="Total Events"
          value={totalEvents}
          subtitle="All time events"
          trend="up"
          trendValue="+12% from last hour"
          icon={<Analytics />}
        />
        <StatsCard
          title="Events This Minute"
          value={eventsThisMinute}
          subtitle="Live count"
          trend="up"
          trendValue="+3 from last minute"
          icon={<Timeline />}
        />
        <StatsCard
          title="Active Users"
          value={activeUsers}
          subtitle="Currently online"
          trend="neutral"
          icon={<TrendingUp />}
        />
        <StatsCard
          title="Success Rate"
          value={`${successRate.toFixed(1)}%`}
          subtitle="API calls"
          trend="up"
          trendValue="+0.2% from yesterday"
          icon={<TrendingUp />}
        />
      </Box>

      {/* Charts and Analytics */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
        <EventsPerMinuteChart 
          data={chartData}
          title={`Events per Minute (${selectedTimeRange === '1h' ? 'Last Hour' : selectedTimeRange === '24h' ? 'Last Day' : 'Last Week'})`}
        />
        <TopEventTypes data={topEventTypes} />
      </Box>
    </Container>
  );
}
