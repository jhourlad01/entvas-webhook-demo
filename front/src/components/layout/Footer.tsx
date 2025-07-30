'use client';

import { Box, Typography, Link as MuiLink, Container } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 Real-Time Analytics Dashboard. Built for Senior Full Stack Developer Assessment.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Technologies: Next.js, Express.js, PostgreSQL, Socket.IO
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <MuiLink href="#" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                <GitHub fontSize="small" />
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                <LinkedIn fontSize="small" />
              </MuiLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 