import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';
import { Backpack, Store, DirectionsRun, Leaderboard, Settings } from '@mui/icons-material';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        borderRadius: '12px 12px 0 0',
        overflow: 'visible',
        background: 'rgba(26, 32, 39, 0.8)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 1000
      }} 
      elevation={0}
    >
      <BottomNavigation
        showLabels
        value={location.pathname}
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
        sx={{
          height: '64px',
          background: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 0',
            color: 'rgba(255, 255, 255, 0.5)',
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.8)',
            },
          },
          '& .Mui-selected': {
            color: '#2196f3 !important',
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.75rem',
            marginTop: '4px',
          },
        }}
      >
        <BottomNavigationAction 
          label="Инвентарь" 
          value="/inventory" 
          icon={<Backpack />}
          sx={{ flex: 1 }}
        />
        <BottomNavigationAction 
          label="Магазин" 
          value="/shop" 
          icon={<Store />}
          sx={{ flex: 1 }}
        />
        <BottomNavigationAction 
          label="Поход" 
          value="/" 
          icon={
            <Box
              sx={{
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                borderRadius: '50%',
                padding: '12px',
                transform: 'translateY(-24px)',
                boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 2,
                '&:hover': {
                  transform: 'translateY(-26px)',
                  boxShadow: '0 6px 12px rgba(33, 150, 243, 0.4)',
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                  fontSize: '28px'
                }
              }}
            >
              <DirectionsRun />
            </Box>
          }
          sx={{ 
            flex: 1,
            '&.Mui-selected': {
              color: '#2196f3'
            }
          }}
        />
        <BottomNavigationAction 
          label="Лидеры" 
          value="/leaderboard" 
          icon={<Leaderboard />}
          sx={{ flex: 1 }}
        />
        <BottomNavigationAction 
          label="Настройки" 
          value="/settings" 
          icon={<Settings />}
          sx={{ flex: 1 }}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav; 