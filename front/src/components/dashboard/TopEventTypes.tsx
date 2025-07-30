'use client';

import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import { Circle } from '@mui/icons-material';

interface EventType {
  type: string;
  count: number;
  percentage: number;
}

interface TopEventTypesProps {
  data: EventType[];
  title?: string;
}

const getEventTypeColor = (index: number) => {
  const colors = ['#1976d2', '#dc004e', '#388e3c', '#f57c00', '#7b1fa2'];
  return colors[index] || '#757575';
};

export default function TopEventTypes({ 
  data, 
  title = "Top 5 Event Types" 
}: TopEventTypesProps) {
  return (
    <Card sx={{ height: '100%', minHeight: 300 }}>
      <CardContent>
        <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        
        {data.length > 0 ? (
          <List sx={{ p: 0 }}>
            {data.map((eventType, index) => (
              <ListItem 
                key={eventType.type} 
                sx={{ 
                  px: 0, 
                  py: 1,
                  borderBottom: index < data.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider'
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Circle 
                    sx={{ 
                      color: getEventTypeColor(index),
                      fontSize: 12 
                    }} 
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {eventType.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {eventType.count.toLocaleString()}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {eventType.percentage.toFixed(1)}% of total events
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box
            sx={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
            }}
          >
            <Typography variant="body2">
              No event data available
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
} 