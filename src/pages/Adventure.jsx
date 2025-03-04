import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { DirectionsRun } from '@mui/icons-material';

function Adventure() {
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          width: '100%',
          textAlign: 'center',
          marginBottom: 3
        }}
      >
        Поход
      </Typography>
      
      <Paper 
        className="card"
        elevation={0}
      >
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          <DirectionsRun sx={{ fontSize: 48, color: '#2196f3', mb: 1 }} />
          <Typography variant="h6" gutterBottom align="center">
            Новое приключение
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }} align="center">
            Отправляйтесь в поход, чтобы найти сокровища и сразиться с монстрами
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2 30%, #00bcd4 90%)',
              }
            }}
          >
            Начать поход
          </Button>
        </Box>
      </Paper>

      <Paper 
        className="card"
        elevation={0}
      >
        <Typography variant="h6" gutterBottom align="center">
          Последние походы
        </Typography>
        <Box sx={{ 
          p: 2, 
          borderRadius: 1, 
          bgcolor: 'rgba(0,0,0,0.2)',
          width: '100%',
          textAlign: 'center'
        }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Пока нет завершенных походов
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Adventure; 