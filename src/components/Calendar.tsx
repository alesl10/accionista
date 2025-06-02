'use client'

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LuTextSearch } from 'react-icons/lu';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import 'dayjs/locale/es';

export default function BasicDateCalendar() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [currentView, setCurrentView] = useState<'year' | 'month' | 'day'>('day');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    dayjs.locale('es');
    const fechaParam = searchParams.get('fecha');
    if (fechaParam) {
      setSelectedDate(dayjs(fechaParam));
    } else {
      setSelectedDate(dayjs());
    }
  }, []);

  const handleFechaChange = (newValue: Dayjs | null) => {
    if (!newValue || !newValue.isValid()) return;
  
    // Solo redireccionamos si el usuario seleccionó un día
    if (currentView === 'day') {
      const nuevaFecha = newValue.format('YYYY-MM-DD');
      const fechaActual = selectedDate?.format('YYYY-MM-DD');
  
      if (nuevaFecha !== fechaActual) {
        setSelectedDate(newValue);
        router.push(`/?fecha=${nuevaFecha}`);
      }
    } else {
      // Actualiza la fecha seleccionada solo si no estamos en la vista de 'day'
      setSelectedDate(newValue);
    }
  };

  return (
    <div className="flex flex-col py-3 items-center mx-auto text-center w-full rounded-xl border bg-white border-gray-300 shadow-lg p-2">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <h3 className="font-bold text-shadow-blue-950 py-2 mb-2 bg-blue-700/20 border-y w-full">
          Edición del <br />
          {selectedDate && selectedDate.format('DD [de] MMMM [de] YYYY')}
        </h3>
        <span className="font-semibold text-md">Ediciones Anteriores</span>

        {selectedDate && (
          <DateCalendar
            slotProps={{
              day: {
                sx: {
                  width: 30,
                  height: 30,
                  fontSize: '0.75rem',
                },
              },
            }}
            sx={{
              width: '100%',
              maxWidth: 500,
              padding: '4px',
              maxHeight: '18rem',
              '& .MuiYearCalendar-root': {
                width: '100%',
                maxHeight: '14rem',
                overflowY: 'auto',
                columnGap: '8px',
                rowGap: '4px',
              },
              '& .MuiYearCalendar-button': {
                fontSize: '0.75rem',
                width: 80,
                height: 36,
                padding: '4px 8px',
              },
              '& .MuiMonthCalendar-root': {
                width: '100%',
                maxHeight: '14rem',
                overflowY: 'auto',
                columnGap: '12px',
                rowGap: '8px',
              },
              '& .MuiPickersMonth-monthButton': {
                fontSize: '0.75rem',
                width: 80,
                height: 36,
                padding: '4px 8px',
              },
            }}
            views={['year', 'month', 'day']}
            maxDate={dayjs()}
            value={selectedDate}
            onChange={handleFechaChange}
            onViewChange={(view) => setCurrentView(view)}
          />
        )}

        <FormControl className="bg-white" variant="outlined" size="small" sx={{ mt: 2 }}>
          <InputLabel>Buscar avisos</InputLabel>
          <OutlinedInput
            id="search"
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" aria-label="buscar avisos">
                  <LuTextSearch />
                </IconButton>
              </InputAdornment>
            }
            label="Buscar por palabra"
          />
        </FormControl>
      </LocalizationProvider>
    </div>
  );
}
