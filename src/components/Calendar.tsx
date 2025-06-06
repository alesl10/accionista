'use client';

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
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import 'dayjs/locale/es';

export default function BasicDateCalendar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  dayjs.locale('es');
  const fechaParam = searchParams.get('fecha');
  const fechaInicial = fechaParam ? dayjs(fechaParam) : dayjs();

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(fechaInicial);
  const [currentView, setCurrentView] = useState<'year' | 'month' | 'day'>('day');

  const handleFechaChange = (newValue: Dayjs | null) => {
    if (!newValue || !newValue.isValid()) return;

    if (currentView === 'day') {
      const nuevaFecha = newValue.format('YYYY-MM-DD');
      const fechaActual = selectedDate?.format('YYYY-MM-DD');

      if (nuevaFecha !== fechaActual) {
        router.push(`/?fecha=${nuevaFecha}`);
        setSelectedDate(newValue); // Actualizamos para que el texto también se actualice
      }
    } else {
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
